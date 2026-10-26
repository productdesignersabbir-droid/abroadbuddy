import {
  findIntake,
  UNDECIDED,
  UNIVERSITY_FINDER,
  type ReadinessProfile,
  type Todo,
} from "@/data/readiness";
import { monthsBetween, type ReadinessAnswers } from "@/lib/readiness-score";
import { backgroundPick } from "@/data/background";
import { missesRequiredSubject, streamPicked } from "@/data/stream";
import type { Country, Major } from "@/data/universities";

// Advice only a school leaver needs: how each country takes bachelor's
// applications, what HSC students should check, and field tips that don't
// assume a degree, research or work experience.

const FIELD_TIPS: { majors: Major[]; todo: Todo }[] = [
  {
    majors: ["Computer Science", "Data Science", "Artificial Intelligence", "Cybersecurity"],
    todo: {
      title: "Build one project you can talk about",
      detail:
        "A small app, a website or a programming contest result, such as the Bangladesh Informatics Olympiad, gives your personal statement a real story.",
      priority: "medium",
    },
  },
  {
    majors: [
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Biomedical Engineering",
      "Renewable Energy",
    ],
    todo: {
      title: "Show how you use maths and physics",
      detail:
        "A robotics club, a science fair project or an olympiad shows engineering schools you enjoy the subjects the degree builds on.",
      priority: "medium",
    },
  },
  {
    majors: ["Architecture"],
    todo: {
      title: "Build a portfolio of drawings",
      detail:
        "Most architecture schools ask for one. Collect sketches, drawings, models or photos that show how you see and make things.",
      priority: "high",
    },
  },
  {
    majors: ["Business", "Finance", "Economics", "Supply Chain Management"],
    todo: {
      title: "Show your interest in business or economics",
      detail:
        "A business competition, a small venture or a club role gives your personal statement real examples. You don't need the GMAT or work experience for a bachelor's.",
      priority: "medium",
    },
  },
  {
    majors: ["Public Health", "Pharmacy", "Biotechnology"],
    todo: {
      title: "Show your interest in health and science",
      detail:
        "Volunteering with a health NGO, a biology olympiad or a science fair project gives you something concrete to write about.",
      priority: "medium",
    },
  },
  {
    majors: ["Physics", "Mathematics", "Chemistry"],
    todo: {
      title: "Take part in an olympiad",
      detail:
        "Bangladesh runs national olympiads in maths, physics and chemistry. Taking part, even without a medal, shows real interest.",
      priority: "medium",
    },
  },
  {
    majors: ["Environmental Science", "Agriculture", "Public Policy"],
    todo: {
      title: "Show your interest through a project",
      detail:
        "An environment club, a community project or volunteering with an NGO gives you real stories for your personal statement.",
      priority: "medium",
    },
  },
];

// Government schemes with an undergraduate track; elsewhere it's mostly university awards.
const BACHELORS_SCHOLARSHIPS: Partial<Record<Country, string>> = {
  USA: "Need-based and merit aid from individual colleges",
  Germany: "Deutschlandstipendium; most public universities charge little or no tuition",
  Japan: "MEXT undergraduate scholarship, university awards",
  "South Korea": "GKS undergraduate scholarship, university awards",
  China: "Chinese Government Scholarship (CSC), university awards",
  Turkey: "Türkiye Burslari (undergraduate too)",
};

/** The destination card's scholarship line for a school leaver. */
export const bachelorsScholarships = (country: Country) =>
  BACHELORS_SCHOLARSHIPS[country] ?? "Merit scholarships from universities; few full awards";

const LAW_GRADUATE_ONLY: Country[] = ["USA", "Canada"];

function lawTodo(country: Country | undefined): Todo {
  if (country && LAW_GRADUATE_ONLY.includes(country)) {
    return {
      title: `Law in ${country === "USA" ? "the USA" : country} comes after a first degree`,
      detail:
        "Here law is studied as a JD after a bachelor's in another subject. Pick a first degree you enjoy, such as politics or economics, or look at the UK or Australia, where you can study law (LLB) straight after school.",
      priority: "high",
    };
  }
  return {
    title: "Check LLB entry rules",
    detail:
      "Law is popular and competitive. Some universities set an admissions test or ask for top grades in essay-based subjects, so check each one.",
    priority: "medium",
  };
}

export function bachelorsTodos(
  profile: ReadinessProfile,
  answers: ReadinessAnswers,
  now: Date
): (Todo & { areaLabel: string })[] {
  if (profile.degree !== "bachelors") return [];
  const out: (Todo & { areaLabel: string })[] = [];
  const country =
    profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;
  const intake = findIntake(profile, now);
  const alevel = streamPicked(profile, "group", "alevel");
  const school = alevel ? "A-level" : "HSC";

  if (profile.major === "Law") {
    out.push({ ...lawTodo(country), areaLabel: "Law" });
  } else if (!missesRequiredSubject(profile)) {
    // Without the required subjects, the subject-gap advice comes first instead.
    const tip = FIELD_TIPS.find((t) => profile.major && t.majors.includes(profile.major as Major));
    if (tip) out.push({ ...tip.todo, areaLabel: String(profile.major) });
  }

  if (country === "UK") {
    out.push({
      title: "Apply through UCAS",
      detail:
        "UK bachelor's applications go through UCAS: up to five choices and one personal statement. The main deadline is in late January for September starts; Oxford, Cambridge and medicine close in mid-October.",
      priority: "high",
      link: UNIVERSITY_FINDER,
      areaLabel: "Applying",
    });
  }
  if (country === "USA") {
    out.push({
      title: "Apply through the Common App",
      detail:
        "Most US colleges take the Common App, with your essay, school report and a counsellor letter. Many are test-optional, but several selective colleges ask for the SAT or ACT again, so check each one.",
      priority: "high",
      link: UNIVERSITY_FINDER,
      areaLabel: "Applying",
    });
    if (intake?.season === "spring") {
      out.push({
        title: "Check which colleges take first-years in spring",
        detail:
          "Many US colleges admit first-year students only for fall. Confirm spring entry on each college's site, or plan for the fall after.",
        priority: "high",
        areaLabel: "Timeline",
      });
    }
  }
  // The Studienkolleg rule is for HSC; A-level students follow other rules.
  if (country === "Germany" && !alevel) {
    out.push({
      title: "Plan a Studienkolleg year",
      detail:
        "Bangladeshi HSC usually doesn't give direct entry to a German bachelor's. Most students first pass a Studienkolleg foundation year, or study a year at university at home. Most bachelor's are taught in German, and a Studienkolleg usually asks for German at around B1 to get in.",
      priority: "high",
      areaLabel: "Applying",
    });
  }
  if ((country === "UK" || country === "Australia") && !alevel) {
    out.push({
      title: "Check whether HSC gives direct entry",
      detail: `Some ${country} universities accept HSC for first year; others ask HSC students to take a foundation program first. Check each university's Bangladesh entry page.`,
      priority: "medium",
      areaLabel: "Applying",
    });
  }

  const sitting = backgroundPick(profile.background, "now") === "hsc-sitting";
  if (sitting && intake && monthsBetween(now, new Date(intake.start)) <= 9) {
    out.push({
      title: `Check your ${school} results come out in time`,
      detail: `You need your final ${school} result before you can enrol. If it won't be out well before ${intake.label}, plan for the intake after.`,
      priority: "high",
      areaLabel: "Timeline",
    });
  }
  if (sitting) {
    out.push({
      title: `Apply before your ${school} results`,
      detail: alevel
        ? "Universities judge you on your predicted grades and send conditional offers. Ask your school for predictions early, and send final results as soon as they're out."
        : "Apply with your SSC results and school record. Offers will usually be conditional on your HSC result, so send it as soon as it's out.",
      priority: "medium",
      areaLabel: "Your situation",
    });
  }

  if (alevel && answers.english?.some((a) => a.startsWith("test:"))) {
    out.push({
      title: "See if your O-level English counts",
      detail:
        "Some universities accept an O-level or IGCSE English grade in place of IELTS. Check each university's English page before you book or retake a test.",
      priority: "low",
      areaLabel: "English test",
    });
  }

  return out;
}
