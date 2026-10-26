import {
  READINESS_QUESTIONS,
  UNDECIDED,
  type ReadinessOption,
  type ReadinessProfile,
  type Todo,
} from "@/data/readiness";
import type { Country, Major } from "@/data/universities";

// The English gate changes with the destination: students pick a test the
// country accepts, then see score bands on that test's own scale. US
// graduate applicants are also asked about the GRE or GMAT.

export type TestId = "ielts" | "toefl" | "pte" | "duolingo" | "moi";

type Test = {
  id: TestId;
  label: string;
  /**
   * Score bands lined up with IELTS 8.0+, 7.5, 7.0, 6.5, 6.0 and 5.5 or lower,
   * using each test maker's published comparison with IELTS.
   */
  bands?: [string, string, string, string, string, string];
};

const TESTS: Record<TestId, Test> = {
  ielts: { id: "ielts", label: "IELTS", bands: ["8.0 or above", "7.5", "7.0", "6.5", "6.0", "5.5 or lower"] },
  toefl: {
    id: "toefl",
    label: "TOEFL iBT",
    bands: ["110 or above", "102 – 109", "94 – 101", "79 – 93", "60 – 78", "59 or lower"],
  },
  pte: {
    id: "pte",
    label: "PTE Academic",
    bands: ["80 or above", "73 – 79", "66 – 72", "58 – 65", "50 – 57", "49 or lower"],
  },
  duolingo: {
    id: "duolingo",
    label: "Duolingo",
    bands: ["135 or above", "130", "120 – 125", "115", "105 – 110", "100 or lower"],
  },
  moi: { id: "moi", label: "English-medium (MOI) letter" },
};

// Duolingo is not on the visa test lists for Australia or New Zealand.
const NO_DUOLINGO: Country[] = ["Australia", "New Zealand"];

// Countries where many universities accept proof that your degree was taught in English.
const MOI_OK: Country[] = [
  "Germany",
  "Italy",
  "Hungary",
  "Malaysia",
  "Turkey",
  "Poland",
  "Czech Republic",
  "China",
  "South Korea",
  "Taiwan",
];

const GRE_COUNTRIES: Country[] = ["USA"];
const GMAT_MAJORS: Major[] = ["Business", "Finance", "Supply Chain Management"];

const countryOf = (profile: ReadinessProfile) =>
  profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;

export function testsFor(profile: ReadinessProfile): Test[] {
  const country = countryOf(profile);
  const ids: TestId[] = ["ielts", "toefl", "pte"];
  if (!country || !NO_DUOLINGO.includes(country)) ids.push("duolingo");
  if (country && MOI_OK.includes(country) && profile.degree !== "bachelors") ids.push("moi");
  return ids.map((id) => TESTS[id]);
}

export function englishCopy(profile: ReadinessProfile): { question: string; hint: string } {
  const country = countryOf(profile);
  if (!country) {
    return {
      question: "Which English test are you taking?",
      hint: "Pick your test, then where you are with it.",
    };
  }
  const where = ["USA", "UK", "Netherlands", "Czech Republic"].includes(country) ? `the ${country}` : country;
  const extra = NO_DUOLINGO.includes(country)
    ? " Duolingo isn't accepted for student visas there."
    : MOI_OK.includes(country) && profile.degree !== "bachelors"
      ? " Some universities there accept an English-medium letter instead."
      : "";
  return {
    question: "Which English test are you taking?",
    hint: `These are the tests universities in ${where} commonly accept.${extra} Check each university's list too.`,
  };
}

/** Graduate applicants to the US are asked about the GRE, or GMAT for business fields. */
export function graduateTestFor(profile: ReadinessProfile): "GRE" | "GMAT or GRE" | null {
  const country = countryOf(profile);
  if (!country || !GRE_COUNTRIES.includes(country)) return null;
  if (profile.degree !== "masters" && profile.degree !== "phd") return null;
  return profile.major && GMAT_MAJORS.includes(profile.major as Major) ? "GMAT or GRE" : "GRE";
}

export const GRAD_TEST_OPTIONS = [
  { id: "gre:taken", label: "Taken" },
  { id: "gre:planned", label: "Planning to take it" },
  { id: "gre:none", label: "My programs don't need it" },
  { id: "gre:unsure", label: "Not sure yet" },
];

export type GradTest = "gre" | "gmat";

export const GRAD_TEST_NAMES: Record<GradTest, string> = { gre: "GRE", gmat: "GMAT Focus" };

/** Score bands once the GRE or GMAT is taken; the last two add advice. */
export const GRAD_SCORE_BANDS: Record<GradTest, { id: string; label: string }[]> = {
  gre: [
    { id: "gradscore:top", label: "325 or above" },
    { id: "gradscore:good", label: "315 – 324" },
    { id: "gradscore:fair", label: "305 – 314" },
    { id: "gradscore:low", label: "304 or lower" },
  ],
  gmat: [
    { id: "gradscore:top", label: "655 or above" },
    { id: "gradscore:good", label: "605 – 645" },
    { id: "gradscore:fair", label: "555 – 595" },
    { id: "gradscore:low", label: "554 or lower" },
  ],
};

/** Which graduate test the student took: always GRE unless business fields pick GMAT. */
export function gradTestOf(profile: ReadinessProfile, answers: string[]): GradTest | undefined {
  const grad = graduateTestFor(profile);
  if (grad === "GRE") return "gre";
  return answers.find((a) => a.startsWith("gradtest:"))?.slice(9) as GradTest | undefined;
}

const BASE = READINESS_QUESTIONS.find((q) => q.area === "english")!.options;
const base = (id: string) => BASE.find((o) => o.id === id)!;

const MOI_OPTION: ReadinessOption = {
  id: "eng-moi",
  label: "I have an MOI letter",
  points: 14,
  todo: {
    title: "Confirm each university accepts your MOI letter",
    detail:
      "Rules differ by university and program. If even one on your list asks for IELTS or TOEFL, book a test now.",
    priority: "medium",
  },
};

/** Where-are-you options for the chosen test, labelled on its own scale. */
export function statusOptionsFor(test: TestId | undefined): ReadinessOption[] {
  if (!test) return [];
  if (test === "moi") return [MOI_OPTION];
  const bands = TESTS[test].bands!;
  return [
    { ...base("eng-high"), id: "eng-80", label: bands[0] },
    { ...base("eng-high"), id: "eng-75", label: bands[1] },
    { ...base("eng-high"), label: bands[2] },
    { ...base("eng-mid"), label: bands[3] },
    { ...base("eng-low"), label: bands[4] },
    { ...base("eng-low"), id: "eng-lower", label: bands[5], points: 5 },
    base("eng-booked"),
    { ...base("eng-none"), label: "Haven't started preparing" },
  ];
}

export const testOf = (answers: string[]) =>
  answers.find((a) => a.startsWith("test:"))?.slice(5) as TestId | typeof UNDECIDED | undefined;

export function englishAnswered(profile: ReadinessProfile, answers: string[]) {
  const test = testOf(answers);
  if (!test) return false;
  if (test !== UNDECIDED) {
    // A test the new country doesn't take, or no status yet, needs another look.
    if (!testsFor(profile).some((t) => t.id === test)) return false;
    if (!statusOptionsFor(test).some((o) => answers.includes(o.id))) return false;
  }
  if (graduateTestFor(profile)) {
    if (!answers.some((a) => a.startsWith("gre:"))) return false;
    if (answers.includes("gre:taken")) {
      if (!gradTestOf(profile, answers)) return false;
      if (!answers.some((a) => a.startsWith("gradscore:"))) return false;
    }
  }
  return true;
}

export function englishScore(profile: ReadinessProfile, answers: string[]) {
  const test = testOf(answers);
  const status =
    test === UNDECIDED ? base("eng-none") : statusOptionsFor(test).find((o) => answers.includes(o.id));
  const bachelors = profile.degree === "bachelors";
  // Bachelor's programs usually ask for less than master's, so 6.0 is often enough.
  const adjusted =
    bachelors && status?.id === "eng-low"
      ? {
          ...status,
          points: 14,
          todo: {
            title: "Check each university's English rule",
            detail:
              "This meets many bachelor's programs, but some ask for more, such as IELTS 6.5. Check each one before you decide to retake.",
            priority: "medium" as const,
          },
        }
      : bachelors && status?.id === "eng-lower"
        ? {
            ...status,
            todo: {
              title: "Raise your score or look at foundation programs",
              detail:
                "Most bachelor's programs ask for more than this. Retake after 6–8 weeks of practice, or look at foundation and pathway programs, which often accept lower scores.",
              priority: "high" as const,
            },
          }
        : status;
  const todos: Todo[] = adjusted?.todo ? [adjusted.todo] : [];

  const grad = graduateTestFor(profile);
  const took = grad && answers.includes("gre:taken") ? gradTestOf(profile, answers) : undefined;
  if (took && answers.includes("gradscore:low")) {
    const name = GRAD_TEST_NAMES[took];
    todos.push({
      title: `Retake the ${name} or favour test-optional programs`,
      detail: `Your ${name} score is below what most competitive US programs report. A retake after 6–8 weeks of practice often adds points; meanwhile, shortlist programs where the ${name} is optional.`,
      priority: "medium",
    });
  } else if (took && answers.includes("gradscore:fair")) {
    const name = GRAD_TEST_NAMES[took];
    todos.push({
      title: `Compare your ${name} with each program's average`,
      detail: `Apply where your score is near or above the class average, and let research, grades and your SOP carry the rest.`,
      priority: "low",
    });
  }
  if (grad && (answers.includes("gre:planned") || answers.includes("gre:unsure"))) {
    todos.push({
      title: `Check which programs need the ${grad}`,
      detail:
        "Many US programs made it optional, but some top programs and funded PhDs still ask for it. Check each program page, and book early if you need it.",
      priority: "medium",
    });
  }
  return { points: adjusted?.points ?? 0, todos };
}
