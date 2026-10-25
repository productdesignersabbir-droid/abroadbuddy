import {
  AREA_MAX,
  FIELD_TIPS,
  INTAKE_OPTIONS,
  PROFESSORS,
  READINESS_QUESTIONS,
  SCHOLARSHIPS,
  UNDECIDED,
  UNIVERSITY_FINDER,
  type Priority,
  type ReadinessArea,
  type ReadinessProfile,
  type ReadinessQuestion,
  type Todo,
} from "@/data/readiness";
import { COUNTRY_INFO, type Country } from "@/data/universities";
import { BDT_PER_USD } from "@/lib/university-match";

// Single-choice areas store one option id; the documents checklist stores many.
export type ReadinessAnswers = Partial<Record<ReadinessArea, string[]>>;

export type AreaResult = {
  area: ReadinessArea;
  label: string;
  points: number;
};

export type RankedTodo = Todo & { areaLabel: string };

export type ReadinessTier = {
  label: string;
  summary: string;
};

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

/** The question as this student should see it: school leavers get their own wording. */
export function questionFor(q: ReadinessQuestion, profile: ReadinessProfile): ReadinessQuestion {
  if (profile.degree !== "bachelors" || !q.forBachelors) return q;
  const alt = q.forBachelors;
  return {
    ...q,
    areaLabel: alt.areaLabel,
    question: alt.question,
    hint: alt.hint,
    options: q.options.map((o, i) => ({
      ...o,
      label: alt.options[i]?.label ?? o.label,
      todo: alt.options[i]?.todo,
    })),
  };
}

export function isAnswered(
  answers: ReadinessAnswers,
  index: number
): boolean {
  const q = READINESS_QUESTIONS[index];
  // A checklist with nothing ticked is still a valid answer.
  if (q.kind === "checklist") return true;
  return (answers[q.area]?.length ?? 0) > 0;
}

/** Whole months from `from` to `to`, never below zero. */
export function monthsBetween(from: Date, to: Date) {
  const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  return Math.max(0, months);
}

const fmtUsd = (n: number) => `$${Math.round(n / 1000)}k`;
const fmtLakh = (usd: number) => `৳${Math.round((usd * BDT_PER_USD) / 100000)} lakh`;

/** To-dos that depend on who the student is, not just how they scored. */
function personalTodos(
  profile: ReadinessProfile,
  answers: ReadinessAnswers,
  now: Date
): RankedTodo[] {
  const out: RankedTodo[] = [];
  const intake = INTAKE_OPTIONS.find((i) => i.id === profile.intake);
  const country =
    profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;
  const info = country ? COUNTRY_INFO[country] : undefined;
  const budget = answers.budget?.[0];

  if (intake) {
    const months = monthsBetween(now, new Date(intake.start));
    if (months <= 9) {
      out.push({
        title: `${intake.label} is about ${months} months away`,
        detail:
          "Most deadlines close 6–9 months before classes start. Shortlist universities this month and apply for scholarships alongside admission.",
        priority: "high",
        link: SCHOLARSHIPS,
        areaLabel: "Timeline",
      });
    } else if (months <= 15) {
      out.push({
        title: "Start applications in the next 2–3 months",
        detail: `${intake.label} is about ${months} months away. Close your top to-dos first, then apply in the first round, when scholarship chances are best.`,
        priority: "medium",
        link: SCHOLARSHIPS,
        areaLabel: "Timeline",
      });
    } else {
      out.push({
        title: "Use the extra time to build your profile",
        detail: `About ${months} months to go. Work on research, test scores and grades now. Applications usually open about a year before intake.`,
        priority: "low",
        areaLabel: "Timeline",
      });
    }

    if (info && intake.season === "spring" && !info.intakes.some((t) => /jan|feb|mar|spring/i.test(t))) {
      out.push({
        title: `Check whether ${country} has a spring intake`,
        detail: `Most programs in ${country} start in ${info.intakes.join(" or ")}. Plan for the next fall intake, or confirm each program's start date.`,
        priority: "medium",
        areaLabel: "Timeline",
      });
    }
  }

  if (country && info) {
    const [lo, hi] = info.livingCost;
    out.push({
      title: `Plan your ${country} visa and living costs`,
      detail: `You'll need a ${info.visa}. Budget about ${fmtUsd(lo)}–${fmtUsd(hi)} a year for living costs (${fmtLakh(lo)}–${fmtLakh(hi)}) on top of tuition, and expect to show these funds for the visa.`,
      priority: budget === "bud-unsure" || budget === "bud-partial" ? "high" : "medium",
      link: { href: `/universities?country=${encodeURIComponent(country)}`, label: `See universities in ${country}` },
      areaLabel: "Destination",
    });
  } else if (profile.country === UNDECIDED) {
    out.push({
      title: "Pick 2–3 target countries",
      detail:
        "Compare living costs, post-study work rights and scholarships side by side, then shortlist where your budget and goals fit.",
      priority: "medium",
      link: UNIVERSITY_FINDER,
      areaLabel: "Destination",
    });
  }

  const tip = FIELD_TIPS.find((t) => profile.major && t.majors.some((m) => m === profile.major));
  if (tip) {
    out.push({ ...tip.todo, areaLabel: String(profile.major) });
  } else if (profile.major === UNDECIDED) {
    out.push({
      title: "Narrow down your field",
      detail:
        "List the courses you enjoyed most and the jobs you want after. Then compare 2–3 fields in University Finder before you shortlist.",
      priority: "medium",
      link: UNIVERSITY_FINDER,
      areaLabel: "Field",
    });
  }

  if (profile.degree === "phd") {
    out.push({
      title: "Contact professors before you apply",
      detail:
        "PhD offers and funding often come through a supervisor. Email 5–10 professors whose recent papers match your interests, 3–4 months before deadlines.",
      priority: "high",
      link: PROFESSORS,
      areaLabel: "PhD",
    });
  } else if (profile.degree === "unsure") {
    out.push({
      title: "Decide between a master's and a PhD",
      detail:
        "A PhD is research-heavy and usually funded. A master's is shorter and often self-funded. Your research and budget answers point the way.",
      priority: "low",
      areaLabel: "Degree",
    });
  }

  return out;
}

export function scoreAnswers(
  answers: ReadinessAnswers,
  profile: ReadinessProfile = {},
  now: Date = new Date()
) {
  const areas: AreaResult[] = [];
  const todos: RankedTodo[] = [];

  for (const raw of READINESS_QUESTIONS) {
    const q = questionFor(raw, profile);
    const picked = new Set(answers[q.area] ?? []);
    let points = 0;

    for (const option of q.options) {
      const chosen = picked.has(option.id);
      if (chosen) points += option.points;

      // Single choice: the chosen answer carries the to-do.
      // Checklist: every unticked item becomes a to-do.
      const todoApplies = q.kind === "single" ? chosen : !chosen;
      if (todoApplies && option.todo) {
        // Research decides PhD admissions, so its gaps move to the top.
        const priority: Priority =
          profile.degree === "phd" && q.area === "research" ? "high" : option.todo.priority;
        todos.push({ ...option.todo, priority, areaLabel: q.areaLabel });
      }
    }

    areas.push({ area: q.area, label: q.areaLabel, points: Math.min(points, AREA_MAX) });
  }

  todos.push(...personalTodos(profile, answers, now));
  todos.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  const total = areas.reduce((sum, a) => sum + a.points, 0);
  return { total, areas, todos, tier: tierFor(total) };
}

export function tierFor(total: number): ReadinessTier {
  if (total >= 80) {
    return {
      label: "Ready for takeoff",
      summary: "Your profile is strong. Finalise your shortlist and start applying.",
    };
  }
  if (total >= 60) {
    return {
      label: "Almost boarding",
      summary: "You're close. Clear the high-priority items below and you're ready to apply.",
    };
  }
  if (total >= 40) {
    return {
      label: "Checking in",
      summary: "You have a solid base. Give yourself 6–12 months to close the gaps below.",
    };
  }
  return {
    label: "Planning your trip",
    summary: "You're at the start — that's fine. Work through the list below one step at a time.",
  };
}
