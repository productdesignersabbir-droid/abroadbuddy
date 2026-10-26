// Application Studio: pick a document, answer a few boxes, get a structured
// draft to copy and finish. Anything left blank stays as a [bracketed] note
// telling the student what to write there.

export type StudioDegree = "bachelors" | "masters" | "phd";
export type DocId = "cv" | "statement" | "proposal" | "reference";

export const STUDIO_DEGREES: { id: StudioDegree; label: string }[] = [
  { id: "bachelors", label: "Bachelor's" },
  { id: "masters", label: "Master's" },
  { id: "phd", label: "PhD" },
];

export type DocField = {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
};

export type DocInfo = { id: DocId; label: string; blurb: string; fields: DocField[] };

export function docsFor(degree: StudioDegree): DocInfo[] {
  const bachelors = degree === "bachelors";
  const TARGET: DocField = {
    key: "target",
    label: "Program and university",
    placeholder: bachelors
      ? "e.g. BSc Computer Science, University of Leeds"
      : degree === "phd"
        ? "e.g. PhD in Environmental Science, University of Melbourne"
        : "e.g. MSc Data Science, University of Toronto",
  };
  const docs: DocInfo[] = [
    {
      id: "cv",
      label: bachelors ? "Activities list" : "CV",
      blurb: bachelors
        ? "Your activities, awards and roles in one clean list."
        : degree === "phd"
          ? "An academic CV that leads with research."
          : "A one- or two-page CV for your application.",
      fields: [
        { key: "name", label: "Full name", placeholder: "e.g. Nusrat Jahan" },
        TARGET,
        {
          key: "education",
          label: "Education",
          placeholder: bachelors
            ? "HSC, Notre Dame College, 2026, GPA 5.00\nSSC, Viqarunnisa Noon School, 2024, GPA 5.00"
            : "BSc in CSE, BUET, 2021–2025, CGPA 3.72",
          multiline: true,
        },
        {
          key: "experience",
          label: bachelors ? "Activities and awards" : degree === "phd" ? "Research and publications" : "Experience and projects",
          placeholder: bachelors
            ? "Bangladesh Math Olympiad, regional winner, 2025\nDebate club president, 2025–2026"
            : "Research assistant, Data Lab, 2024–2025: cleaned survey data for 3,000 households",
          multiline: true,
        },
        { key: "skills", label: "Skills and languages", placeholder: "e.g. Python, SQL, Bangla, English (IELTS 7.5)" },
      ],
    },
    {
      id: "statement",
      label: bachelors ? "Personal statement" : "Statement of purpose",
      blurb: "Your reasons, your proof and your plan, in a clear order.",
      fields: [
        TARGET,
        { key: "why", label: "What got you interested in this field?", placeholder: "One real moment or question, not a quote.", multiline: true },
        {
          key: "proof",
          label: "What have you done that shows it?",
          placeholder: bachelors ? "A project, olympiad, club or job, and what you learned." : "A project, thesis, job or paper, and the result.",
          multiline: true,
        },
        { key: "goal", label: "What do you want to do after?", placeholder: "The job, research or change you're aiming for.", multiline: true },
      ],
    },
  ];
  if (!bachelors) {
    docs.push({
      id: "proposal",
      label: "Research proposal",
      blurb: degree === "phd" ? "The 2–5 page plan most PhDs outside North America ask for." : "A short plan for a research master's or thesis.",
      fields: [
        TARGET,
        { key: "question", label: "Your research question", placeholder: "e.g. Can low-cost sensors predict flash floods in Sylhet?", multiline: true },
        { key: "why", label: "Why it matters", placeholder: "Who it helps and what's missing in current work.", multiline: true },
        { key: "method", label: "How you'd study it", placeholder: "Data, method and where you'd do it.", multiline: true },
      ],
    });
  }
  docs.push({
    id: "reference",
    label: "Reference request",
    blurb: "A polite email asking a teacher or supervisor for a letter.",
    fields: [
      TARGET,
      { key: "referee", label: "Who are you asking?", placeholder: bachelors ? "e.g. Mr Karim, my physics teacher" : "e.g. Dr Rahman, my thesis supervisor" },
      { key: "relation", label: "How do they know you?", placeholder: "e.g. taught me physics for two years" },
      { key: "deadline", label: "Deadline", placeholder: "e.g. 15 December" },
    ],
  });
  return docs;
}

const or = (value: string | undefined, note: string) => (value?.trim() ? value.trim() : `[${note}]`);
const bullets = (value: string | undefined, note: string) =>
  value?.trim()
    ? value
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => `• ${l}`)
        .join("\n")
    : `• [${note}]`;

export function buildDraft(doc: DocId, degree: StudioDegree, v: Record<string, string>): string {
  const target = or(v.target, "program and university");
  const bachelors = degree === "bachelors";

  if (doc === "cv") {
    const expHeading = bachelors ? "ACTIVITIES AND AWARDS" : degree === "phd" ? "RESEARCH AND PUBLICATIONS" : "EXPERIENCE AND PROJECTS";
    return [
      or(v.name, "Your full name").toUpperCase(),
      "[Email] · [Phone] · [LinkedIn or portfolio]",
      `Applying for: ${target}`,
      "",
      "EDUCATION",
      bullets(v.education, "Degree or exam, institution, years, result"),
      "",
      expHeading,
      bullets(v.experience, "Role or activity, place, dates: what you did and the result"),
      "",
      "SKILLS AND LANGUAGES",
      or(v.skills, "Tools, methods and languages, with test scores"),
    ].join("\n");
  }

  if (doc === "statement") {
    return [
      or(v.why, "Open with the moment or question that pulled you into this field. Keep it specific."),
      "",
      or(v.proof, "Show one or two things you did about it, and what you learned."),
      "",
      bachelors
        ? `I want to study at ${target} because [name one or two modules or opportunities there and say why they fit you].`
        : `I am applying to ${target} because [name two courses, labs or professors there and say why they fit you].`,
      "",
      or(v.goal, "Say what you want to do after, and how this program gets you there."),
      "",
      "[Check the word limit and any set questions on the university's page before you finish.]",
    ].join("\n");
  }

  if (doc === "proposal") {
    return [
      "WORKING TITLE",
      "[A short title you can change later]",
      "",
      "RESEARCH QUESTION",
      or(v.question, "One clear question you can answer"),
      "",
      "WHY IT MATTERS",
      or(v.why, "Who it helps, and what current research hasn't settled"),
      "",
      "WHAT'S ALREADY KNOWN",
      "[3–5 key studies and the gap they leave]",
      "",
      "METHOD",
      or(v.method, "Data, method, and where and how you'd do it"),
      "",
      "TIMELINE",
      degree === "phd" ? "[Year 1: … · Year 2: … · Year 3: …]" : "[Months 1–2: … · Months 3–5: … · Month 6: write-up]",
      "",
      `FIT WITH ${target.toUpperCase()}`,
      "[Name a likely supervisor and how your question fits their work]",
      "",
      "REFERENCES",
      "[List the sources you cite]",
    ].join("\n");
  }

  return [
    `Subject: Reference for my application to ${target}`,
    "",
    `Dear ${or(v.referee, "referee's name")},`,
    "",
    `I'm applying to ${target}, and I'd be grateful if you could write a reference for me. You know me well, as you ${or(v.relation, "how they know you")}.`,
    "",
    `The deadline is ${or(v.deadline, "deadline")}. I've attached my ${bachelors ? "activities list" : "CV"} and a draft of my statement, and I'm happy to send anything else that helps.`,
    "",
    "Thank you for your time and support.",
    "",
    "Best wishes,",
    "[Your name]",
  ].join("\n");
}
