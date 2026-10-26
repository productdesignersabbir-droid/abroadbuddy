import {
  READINESS_QUESTIONS,
  UNIVERSITY_FINDER,
  type DegreeLevel,
  type ReadinessOption,
  type Todo,
} from "@/data/readiness";

// The grades gate asks for different results depending on the degree:
// school leavers give SSC and HSC, master's applicants their bachelor's CGPA
// (plus a first master's if they have one), PhD applicants both.

export type GradePartId = "ssc" | "hsc" | "ug" | "ms";

export type GradePart = {
  id: GradePartId;
  title: string;
  options: ReadinessOption[];
};

/** Answer ids are stored as `${part}:${optionId}`, plus a yes/no for a first master's. */
export const HAS_MASTERS_YES = "has-ms:yes";
export const HAS_MASTERS_NO = "has-ms:no";

const CGPA_OPTIONS = READINESS_QUESTIONS.find((q) => q.area === "cgpa")!.options;

const strengthen: Todo = {
  title: "Strengthen the rest of your application",
  detail:
    "A good English score, a clear personal statement and real activities can balance your grades.",
  priority: "medium",
  link: UNIVERSITY_FINDER,
};

const HSC_OPTIONS: ReadinessOption[] = [
  { id: "gpa-5", label: "GPA 5.00", points: 20 },
  { id: "gpa-45", label: "4.50 – 4.99", points: 14, todo: strengthen },
  {
    id: "gpa-40",
    label: "4.00 – 4.49",
    points: 8,
    todo: {
      title: "Target universities that accept your grades",
      detail:
        "Check each university's HSC or A-level entry rule. A foundation year is a common route into UK and Australian universities.",
      priority: "high",
      link: UNIVERSITY_FINDER,
    },
  },
  {
    id: "gpa-low",
    label: "Below 4.00",
    points: 3,
    todo: {
      title: "Look at foundation and diploma pathways",
      detail:
        "Universities in the UK, Australia, Malaysia and Canada run one-year foundation programs that lead straight into a degree.",
      priority: "high",
      link: UNIVERSITY_FINDER,
    },
  },
];

// SSC counts toward the score; the advice comes from HSC, the more recent result.
const SSC_OPTIONS: ReadinessOption[] = HSC_OPTIONS.map((o) => ({ ...o, todo: undefined }));

const PARTS: Record<GradePartId, GradePart> = {
  ssc: { id: "ssc", title: "SSC GPA (out of 5.00)", options: SSC_OPTIONS },
  hsc: { id: "hsc", title: "HSC GPA (out of 5.00)", options: HSC_OPTIONS },
  ug: { id: "ug", title: "Bachelor's CGPA (out of 4.00)", options: CGPA_OPTIONS },
  ms: { id: "ms", title: "Master's CGPA (out of 4.00)", options: CGPA_OPTIONS },
};

/** Master's and PhD applicants are asked whether they already hold a master's. */
export const asksAboutMasters = (degree?: DegreeLevel) => degree === "masters" || degree === "phd";

export function gradeCopy(
  degree?: DegreeLevel,
  sittingHsc = false
): { question: string; hint: string } {
  if (degree === "bachelors" && sittingHsc) {
    return {
      question: "What are your SSC and expected HSC results?",
      hint: "Still sitting your exams? Pick the HSC result you expect from your test exams, or your predicted A-level grades.",
    };
  }
  if (degree === "bachelors") {
    return {
      question: "What are your SSC and HSC results?",
      hint: "O and A-level students: pick the closest match to your grades or predicted grades.",
    };
  }
  if (degree === "phd") {
    return {
      question: "What are your bachelor's and master's CGPA?",
      hint: "PhD committees look at both. Applying straight after your bachelor's? Pick No below.",
    };
  }
  if (degree === "masters") {
    return {
      question: "What are your grades so far?",
      hint: "Use your latest bachelor's CGPA. Already have a master's? Add that too.",
    };
  }
  return {
    question: "What's your current CGPA (out of 4.00)?",
    hint: "Use your latest undergraduate CGPA.",
  };
}

/** The grade pickers this student should see, given what they have said so far. */
export function gradePartsFor(degree: DegreeLevel | undefined, answers: string[]): GradePart[] {
  if (degree === "bachelors") return [PARTS.ssc, PARTS.hsc];
  if (asksAboutMasters(degree) && answers.includes(HAS_MASTERS_YES)) return [PARTS.ug, PARTS.ms];
  return [PARTS.ug];
}

export const pickedFor = (answers: string[], part: GradePart) => {
  const id = answers.find((a) => a.startsWith(`${part.id}:`))?.slice(part.id.length + 1);
  return part.options.find((o) => o.id === id);
};

export function gradesAnswered(degree: DegreeLevel | undefined, answers: string[]) {
  if (asksAboutMasters(degree) && !answers.some((a) => a.startsWith("has-ms:"))) return false;
  return gradePartsFor(degree, answers).every((p) => pickedFor(answers, p));
}

/** Average of the results given; the advice comes from the weakest one that has some. */
export function gradeScore(degree: DegreeLevel | undefined, answers: string[]) {
  const picked = gradePartsFor(degree, answers)
    .map((p) => pickedFor(answers, p))
    .filter((o): o is ReadinessOption => Boolean(o));
  if (!picked.length) return { points: 0, todo: undefined };
  const points = Math.round(picked.reduce((sum, o) => sum + o.points, 0) / picked.length);
  const todo = [...picked].sort((a, b) => a.points - b.points).find((o) => o.todo)?.todo;
  return { points, todo };
}

/** The bachelor's CGPA option id, used to prefill University Finder. */
export const bachelorsCgpaId = (answers: string[]) =>
  answers.find((a) => a.startsWith("ug:"))?.slice(3);
