import { UNDECIDED, type ReadinessProfile, type Todo } from "@/data/readiness";
import type { Country } from "@/data/universities";

// "Your situation": what the student is doing now and who comes with them.
// Unscored, but it drives advice on gaps, work experience and dependants.
// Answers are stored on the profile as `${questionId}:${optionId}`.

export type BackgroundQuestion = {
  id: string;
  title: string;
  options: { id: string; label: string }[];
};

const NOW_GRAD: BackgroundQuestion = {
  id: "now",
  title: "What are you doing now?",
  options: [
    { id: "final", label: "Final-year student" },
    { id: "working", label: "Graduated and working" },
    { id: "gap", label: "Graduated, not working" },
  ],
};

const NOW_SCHOOL: BackgroundQuestion = {
  id: "now",
  title: "Where are you with school?",
  options: [
    { id: "hsc-sitting", label: "Sitting HSC or A levels" },
    { id: "hsc-recent", label: "Finished this year" },
    { id: "gap", label: "Finished a year or more ago" },
  ],
};

const WORK_YEARS: BackgroundQuestion = {
  id: "work",
  title: "How long have you worked?",
  options: [
    { id: "lt1", label: "Under 1 year" },
    { id: "1-3", label: "1 – 3 years" },
    { id: "3plus", label: "3+ years" },
  ],
};

const WORK_FIT: BackgroundQuestion = {
  id: "fit",
  title: "Is it related to what you want to study?",
  options: [
    { id: "yes", label: "Yes" },
    { id: "partly", label: "Partly" },
    { id: "no", label: "No" },
  ],
};

const GAP_LENGTH: BackgroundQuestion = {
  id: "gaplen",
  title: "Since when?",
  options: [
    { id: "lt1", label: "Under 1 year" },
    { id: "1-2", label: "1 – 2 years" },
    { id: "2plus", label: "More than 2 years" },
  ],
};

const FAMILY: BackgroundQuestion = {
  id: "family",
  title: "Who's coming with you?",
  options: [
    { id: "solo", label: "Just me" },
    { id: "spouse", label: "My spouse" },
    { id: "kids", label: "Spouse and children" },
  ],
};

const pick = (answers: string[] | undefined, id: string) =>
  answers?.find((a) => a.startsWith(`${id}:`))?.slice(id.length + 1);

export function backgroundQuestions(profile: ReadinessProfile): BackgroundQuestion[] {
  const answers = profile.background;
  if (profile.degree === "bachelors") {
    return pick(answers, "now") === "gap" ? [NOW_SCHOOL, GAP_LENGTH] : [NOW_SCHOOL];
  }
  const now = pick(answers, "now");
  return [
    NOW_GRAD,
    ...(now === "working" ? [WORK_YEARS, WORK_FIT] : []),
    ...(now === "gap" ? [GAP_LENGTH] : []),
    FAMILY,
  ];
}

export const backgroundAnswered = (profile: ReadinessProfile) =>
  backgroundQuestions(profile).every((q) => pick(profile.background, q.id));

/** Keep only answers to questions still shown, so stale picks never count. */
export function setBackground(profile: ReadinessProfile, qid: string, oid: string): string[] {
  const next = [...(profile.background ?? []).filter((a) => !a.startsWith(`${qid}:`)), `${qid}:${oid}`];
  const shown = new Set(backgroundQuestions({ ...profile, background: next }).map((q) => q.id));
  return next.filter((a) => shown.has(a.split(":")[0]));
}

export const backgroundPick = pick;

const MBA_MAJORS = ["Business", "Finance"];

export function backgroundTodos(profile: ReadinessProfile): Todo[] {
  const a = profile.background;
  if (!a?.length) return [];
  const country =
    profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;
  const out: Todo[] = [];
  const now = pick(a, "now");
  const gap = pick(a, "gaplen");
  const family = pick(a, "family");
  const graduate = profile.degree === "masters" || profile.degree === "phd";

  if (now === "gap" && (gap === "1-2" || gap === "2plus")) {
    const genuine =
      country === "Australia"
        ? " Australia's Genuine Student requirement asks you to explain it, so keep proof of what you did."
        : country === "UK"
          ? " UK visa officers may ask about it in a credibility interview."
          : "";
    out.push({
      title: "Explain your study gap",
      detail: `Universities and visa officers will ask what you did. A short, honest account with proof — courses, freelance work, family duties — answers it.${genuine}`,
      priority: gap === "2plus" ? "high" : "medium",
    });
  }

  if (now === "gap" && gap === "lt1" && graduate) {
    out.push({
      title: "Use the months before you apply",
      detail:
        "An internship, a research assistant role or an online certificate in your field fills the gap and gives your SOP something recent to talk about.",
      priority: "low",
    });
  }

  if (graduate && profile.major && MBA_MAJORS.includes(profile.major)) {
    if (now !== "working" || pick(a, "work") === "lt1") {
      out.push({
        title: "Pick a master's that fits your experience",
        detail:
          "Most MBAs expect 2–3 years of work. With less, look at an MSc in Management, Finance or Business Analytics — they take graduates straight from a bachelor's.",
        priority: "medium",
      });
    }
  }

  if (now === "working" && pick(a, "fit") === "yes" && pick(a, "work") !== "lt1") {
    out.push({
      title: "Lead with your work experience",
      detail:
        "Put measurable results from your job in your CV and SOP, and ask your manager for one of your recommendation letters.",
      priority: "low",
    });
  }

  if (now === "working" && pick(a, "fit") === "no") {
    out.push({
      title: "Connect your job to your new field",
      detail:
        "Show the skills that carry over, and add a short course or project in your target field so your switch looks planned, not sudden.",
      priority: "medium",
    });
  }

  if (family === "spouse" || family === "kids") {
    if (country === "UK" && profile.degree !== "phd") {
      out.push({
        title: "UK taught master's can't bring family",
        detail:
          "Since January 2024, students on taught courses can't bring dependants to the UK. PhD and research master's students still can. Consider a research degree, or another country.",
        priority: "high",
      });
    } else if (country) {
      const extra =
        country === "USA"
          ? " F-2 dependants can't work in the US."
          : country === "Canada"
            ? " Spouses get an open work permit only for some programs, such as master's of 16+ months and PhDs, so check yours."
            : country === "Australia"
              ? " Your family also needs health cover (OSHC) for the whole stay."
              : "";
      out.push({
        title: "Plan proof of funds for your family",
        detail: `Visas ask for extra money for each family member, on top of your own costs.${extra}`,
        priority: "medium",
      });
    }
  }

  return out;
}
