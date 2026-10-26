import { SPECIALISATIONS } from "@/data/specialisations";
import type { Major } from "@/data/universities";

// Find my research direction: four short answers become three starting
// points. These are templates to discuss with a supervisor, not validated
// research titles, and the page says so.

export type Stage = "project" | "masters" | "phd";
export type Access = "library" | "data" | "field" | "lab";

export const STAGES: { id: Stage; label: string; scope: string }[] = [
  { id: "project", label: "A course or own project", scope: "A small study you can finish in 1–3 months." },
  { id: "masters", label: "A master's thesis", scope: "One focused study you can finish in 6–12 months." },
  { id: "phd", label: "A PhD proposal", scope: "Two or three linked studies over 3–4 years." },
];

export const ACCESS: { id: Access; label: string }[] = [
  { id: "library", label: "Articles and a library" },
  { id: "data", label: "Open data and a computer" },
  { id: "field", label: "People to survey or interview" },
  { id: "lab", label: "A lab, with supervision" },
];

export type Direction = {
  title: string;
  question: string;
  method: string;
  firstStep: string;
};

export const topicsFor = (major: Major) => SPECIALISATIONS[major];

/** What the student wants to explore, in their words if they gave any. */
export function focusOf(major: Major, topic?: string, interest?: string) {
  const own = interest?.trim();
  if (own) return own;
  return (topic ?? major).toLowerCase();
}

/** The middle direction depends on what the student can actually use. */
function methodDirection(access: Access, focus: string): Direction {
  switch (access) {
    case "data":
      return {
        title: "Test a pattern in public data",
        question: `What can open data show about ${focus} across places, groups or years?`,
        method: "Analysis of public data",
        firstStep: "Find one dataset you can download today, and check it really covers your question.",
      };
    case "field":
      return {
        title: "Learn from the people involved",
        question: `How do people in Bangladesh experience or deal with ${focus}?`,
        method: "Survey or interviews",
        firstStep:
          "Draft 8–10 questions, then check ethics approval and consent rules with a supervisor before you contact anyone.",
      };
    case "lab":
      return {
        title: "Compare two methods in the lab",
        question: `How do two approaches to ${focus} compare on one clear measure?`,
        method: "Supervised lab experiment",
        firstStep: "Agree a small experiment, the equipment and the safety rules with your supervisor.",
      };
    default:
      return {
        title: "Compare two approaches",
        question: `How do two leading approaches to ${focus} differ, and when does each work better?`,
        method: "Comparative analysis of published work",
        firstStep: "Pick two approaches and build a table of their results from published papers.",
      };
  }
}

export function directionsFor(focus: string, access: Access): Direction[] {
  return [
    {
      title: "Map what's already known",
      question: `What does recent research say about ${focus}, and what is still unclear?`,
      method: "Structured literature review",
      firstStep: "Read 10–15 recent papers. Note each one's question, method and the limits it admits.",
    },
    methodDirection(access, focus),
    {
      title: "Bring it home to Bangladesh",
      question: `Where in Bangladesh does ${focus} matter most, and what would a small first study there look like?`,
      method: "Case study",
      firstStep: "Name one local problem, then find two studies that tried something similar elsewhere.",
    },
  ];
}

/** Paper searches for the student's keywords; nothing is sent until they click. */
export function paperSearches(focus: string) {
  const q = encodeURIComponent(focus);
  return [
    { label: "Google Scholar", href: `https://scholar.google.com/scholar?q=${q}` },
    { label: "Semantic Scholar", href: `https://www.semanticscholar.org/search?q=${q}` },
  ];
}
