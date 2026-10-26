import { UNDECIDED, UNIVERSITY_FINDER, type ReadinessProfile, type Todo } from "@/data/readiness";
import { MAJORS, type Major } from "@/data/universities";

// For bachelor's applicants the useful question isn't a specialisation —
// they choose that in year three — but which school subjects they took,
// because most fields have subject entry rules. Answers are stored on the
// profile as `${questionId}:${optionId}`.

export type Subject = "maths" | "physics" | "chem" | "bio" | "econ";

const SUBJECT_NAMES: Record<Subject, string> = {
  maths: "Maths",
  physics: "Physics",
  chem: "Chemistry",
  bio: "Biology",
  econ: "Economics",
};

export type StreamQuestion = {
  id: string;
  title: string;
  options: { id: string; label: string }[];
  multi?: boolean;
};

const GROUP: StreamQuestion = {
  id: "group",
  title: "Which group are you in?",
  options: [
    { id: "science", label: "Science" },
    { id: "commerce", label: "Business Studies" },
    { id: "humanities", label: "Humanities" },
    { id: "alevel", label: "O and A levels" },
  ],
};

const SCIENCE_OPTIONAL: StreamQuestion = {
  id: "sci",
  title: "Physics and Chemistry are in the group. Which of these did you also take?",
  options: [
    { id: "both", label: "Higher Maths and Biology" },
    { id: "maths", label: "Higher Maths" },
    { id: "bio", label: "Biology" },
  ],
};

const A_LEVEL_SUBJECTS: StreamQuestion = {
  id: "al",
  title: "Which A-level subjects? Pick all that apply",
  multi: true,
  options: [
    { id: "maths", label: "Maths" },
    { id: "physics", label: "Physics" },
    { id: "chem", label: "Chemistry" },
    { id: "bio", label: "Biology" },
    { id: "econ", label: "Economics" },
    { id: "other", label: "Other subjects" },
  ],
};

const picks = (answers: string[] | undefined, id: string) =>
  (answers ?? []).filter((a) => a.startsWith(`${id}:`)).map((a) => a.slice(id.length + 1));

export const streamPicked = (profile: ReadinessProfile, qid: string, oid: string) =>
  picks(profile.stream, qid).includes(oid);

export function streamQuestions(profile: ReadinessProfile): StreamQuestion[] {
  const group = picks(profile.stream, "group")[0];
  if (group === "science") return [GROUP, SCIENCE_OPTIONAL];
  if (group === "alevel") return [GROUP, A_LEVEL_SUBJECTS];
  return [GROUP];
}

export const streamAnswered = (profile: ReadinessProfile) =>
  streamQuestions(profile).every((q) => picks(profile.stream, q.id).length > 0);

/** Toggle or set an answer, dropping answers to questions no longer shown. */
export function setStream(profile: ReadinessProfile, q: StreamQuestion, oid: string): string[] {
  const id = `${q.id}:${oid}`;
  const current = profile.stream ?? [];
  const next = q.multi
    ? current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id]
    : [...current.filter((a) => !a.startsWith(`${q.id}:`)), id];
  const shown = new Set(streamQuestions({ ...profile, stream: next }).map((x) => x.id));
  return next.filter((a) => shown.has(a.split(":")[0]));
}

export function streamLabel(profile: ReadinessProfile): string | undefined {
  const group = picks(profile.stream, "group")[0];
  if (group === "alevel") return "A levels";
  const label = GROUP.options.find((o) => o.id === group)?.label;
  return label ? `HSC ${label}` : undefined;
}

/** The school subjects this student has, from their group and picks. */
export function subjectsOf(profile: ReadinessProfile): Set<Subject> {
  const group = picks(profile.stream, "group")[0];
  const out = new Set<Subject>();
  if (group === "science") {
    out.add("physics");
    out.add("chem");
    const sci = picks(profile.stream, "sci")[0];
    if (sci === "both" || sci === "maths") out.add("maths");
    if (sci === "both" || sci === "bio") out.add("bio");
  }
  if (group === "alevel") {
    for (const s of picks(profile.stream, "al")) if (s in SUBJECT_NAMES) out.add(s as Subject);
  }
  return out;
}

type Rule = {
  /** Each inner list is "one of these"; every list must be met. */
  need?: Subject[][];
  /** Not strictly required, but many universities ask for it. */
  prefer?: Subject[][];
  note?: string;
};

const MATHS_ONLY: Rule = { need: [["maths"]] };
const ENGINEERING: Rule = { need: [["maths"], ["physics"]] };

/** Usual subject rules for a bachelor's in each field. Entry rules vary by university. */
const RULES: Record<Major, Rule> = {
  "Computer Science": MATHS_ONLY,
  "Data Science": MATHS_ONLY,
  "Artificial Intelligence": MATHS_ONLY,
  Cybersecurity: { need: [["maths"]] },
  "Electrical Engineering": ENGINEERING,
  "Mechanical Engineering": ENGINEERING,
  "Civil Engineering": ENGINEERING,
  "Chemical Engineering": { need: [["maths"], ["chem"]], prefer: [["physics"]] },
  "Biomedical Engineering": ENGINEERING,
  "Renewable Energy": ENGINEERING,
  Physics: ENGINEERING,
  Mathematics: MATHS_ONLY,
  Chemistry: { need: [["chem"], ["maths", "physics", "bio"]] },
  Architecture: { prefer: [["maths"]], note: "Most architecture schools also ask for a portfolio of drawings." },
  Pharmacy: { need: [["chem"], ["bio", "maths"]] },
  Biotechnology: { need: [["bio"], ["chem"]] },
  Agriculture: { need: [["bio", "chem"]] },
  "Environmental Science": { prefer: [["bio", "chem", "physics"]] },
  "Public Health": { prefer: [["bio"]] },
  Economics: { prefer: [["maths"]], note: "Top economics programs, especially in the UK, ask for Maths." },
  Finance: { prefer: [["maths"]] },
  Business: {},
  "Supply Chain Management": {},
  "Public Policy": {},
  Law: {},
};

const missing = (lists: Subject[][] | undefined, have: Set<Subject>) =>
  (lists ?? []).filter((any) => !any.some((s) => have.has(s)));

const describe = (lists: Subject[][]) =>
  lists.map((any) => any.map((s) => SUBJECT_NAMES[s]).join(" or ")).join(" and ");

/** Fields whose usual and preferred subject rules this student already meets. */
export function fittingMajors(profile: ReadinessProfile): Major[] {
  const have = subjectsOf(profile);
  return MAJORS.filter(
    (m) => missing(RULES[m].need, have).length === 0 && missing(RULES[m].prefer, have).length === 0,
  );
}

/** True when a bachelor's student lacks a subject their field usually requires. */
export function missesRequiredSubject(profile: ReadinessProfile): boolean {
  if (profile.degree !== "bachelors" || !streamAnswered(profile)) return false;
  if (!profile.major || profile.major === UNDECIDED) return false;
  return missing(RULES[profile.major as Major].need, subjectsOf(profile)).length > 0;
}

export function streamTodos(profile: ReadinessProfile): Todo[] {
  if (profile.degree !== "bachelors" || !streamAnswered(profile)) return [];
  const have = subjectsOf(profile);
  const fits = fittingMajors(profile);
  const suggest = (exclude?: string) =>
    fits
      .filter((m) => m !== exclude)
      .slice(0, 5)
      .join(", ");

  if (!profile.major || profile.major === UNDECIDED) {
    return [
      {
        title: "Shortlist fields that fit your subjects",
        detail: `With your subjects, fields like ${suggest()} are open to you without extra courses.`,
        priority: "medium",
        link: UNIVERSITY_FINDER,
      },
    ];
  }

  const major = profile.major as Major;
  const rule = RULES[major];
  const out: Todo[] = [];
  const gaps = missing(rule.need, have);
  if (gaps.length) {
    out.push({
      title: `${major} usually needs ${describe(gaps)}`,
      detail: `Most universities ask for ${describe(gaps)} at HSC or A level for ${major}. Look at foundation years or International Year One programs that teach it, or consider ${suggest(major)}.`,
      priority: "high",
      link: UNIVERSITY_FINDER,
    });
  }
  const soft = missing(rule.prefer, have);
  if (soft.length || rule.note) {
    out.push({
      title: soft.length
        ? `Check each university's ${describe(soft)} rule`
        : `Check ${major} entry rules`,
      detail: [
        soft.length ? `Many ${major} programs prefer ${describe(soft)}; some accept you without it.` : "",
        rule.note ?? "",
      ]
        .filter(Boolean)
        .join(" "),
      priority: soft.length ? "medium" : "low",
      link: UNIVERSITY_FINDER,
    });
  }
  return out;
}
