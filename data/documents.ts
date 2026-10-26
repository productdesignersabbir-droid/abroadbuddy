import {
  READINESS_QUESTIONS,
  UNDECIDED,
  type ReadinessOption,
  type ReadinessProfile,
} from "@/data/readiness";
import { backgroundPick } from "@/data/background";
import type { Country } from "@/data/universities";

// The documents checklist changes with the plan: school leavers need
// certificates and teacher references, PhDs often a research proposal, and
// each destination adds the paper its visa asks for. Ticked items share the
// area's 20 points equally.

const BASE = READINESS_QUESTIONS.find((q) => q.area === "documents")!.options;
const base = (id: string) => BASE.find((o) => o.id === id)!;

// PhD applications in these countries are mostly through a lab, without a proposal up front.
const NO_PROPOSAL: Country[] = ["USA", "Canada"];

const VISA_DOC: Partial<Record<Country, ReadinessOption>> = {
  USA: {
    id: "doc-funds",
    label: "Bank statement for your I-20",
    points: 0,
    todo: {
      title: "Prepare funds for your I-20",
      detail:
        "US universities ask for bank proof covering your first year before they issue the I-20 you need for the visa.",
      priority: "medium",
    },
  },
  UK: {
    id: "doc-tb",
    label: "TB test certificate",
    points: 0,
    todo: {
      title: "Book your TB test",
      detail:
        "UK visa applicants from Bangladesh need a TB test from an approved clinic. Book it once you have an offer.",
      priority: "medium",
    },
  },
  Germany: {
    id: "doc-blocked",
    label: "Blocked account opened",
    points: 0,
    todo: {
      title: "Open a blocked account",
      detail:
        "The German student visa needs a blocked account with a year of living costs. Opening one takes a few weeks.",
      priority: "medium",
    },
  },
  Canada: {
    id: "doc-funds",
    label: "Proof of funds for your study permit",
    points: 0,
    todo: {
      title: "Get your proof of funds ready",
      detail:
        "The study permit asks for tuition plus a year of living costs, shown through bank statements or a GIC.",
      priority: "medium",
    },
  },
  Australia: {
    id: "doc-gs",
    label: "Genuine Student statement draft",
    points: 0,
    todo: {
      title: "Draft your Genuine Student answers",
      detail:
        "The student visa asks why this course, this country and how it fits your plans. Write it alongside your SOP.",
      priority: "medium",
    },
  },
};

const GENERIC_FUNDS: ReadinessOption = {
  id: "doc-funds",
  label: "Bank statement for proof of funds",
  points: 0,
  todo: {
    title: "Prepare your proof of funds",
    detail:
      "Most student visas ask for bank statements covering tuition and a year of living costs. Check your country's amount.",
    priority: "medium",
  },
};

export function documentOptionsFor(profile: ReadinessProfile): ReadinessOption[] {
  const country =
    profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;
  const bachelors = profile.degree === "bachelors";
  const phd = profile.degree === "phd";

  const items: ReadinessOption[] = [
    base("doc-passport"),
    bachelors
      ? { ...base("doc-transcript"), label: "SSC and HSC certificates and transcripts" }
      : base("doc-transcript"),
    bachelors
      ? {
          ...base("doc-cv"),
          label: "List of activities and awards",
          todo: {
            title: "List your activities and awards",
            detail: "Note what you did, when, and any result or role. You'll reuse it in every application form.",
            priority: "medium",
          },
        }
      : base("doc-cv"),
    bachelors
      ? {
          ...base("doc-sop"),
          label: "Personal statement draft",
          todo: {
            title: "Draft your personal statement",
            detail:
              "Write about what you want to study and why, using one or two real stories. Expect several drafts.",
            priority: "high",
          },
        }
      : base("doc-sop"),
    bachelors
      ? {
          ...base("doc-lor"),
          label: "1–2 teacher references agreed",
          todo: {
            title: "Ask teachers for references",
            detail: "Ask a teacher who knows you well, ideally in your subject, at least a month before your deadline.",
            priority: "high",
          },
        }
      : phd
        ? { ...base("doc-lor"), label: "3 recommenders agreed" }
        : base("doc-lor"),
  ];

  if (phd && (!country || !NO_PROPOSAL.includes(country))) {
    items.push({
      id: "doc-proposal",
      label: "Research proposal draft",
      points: 0,
      todo: {
        title: "Write your research proposal",
        detail:
          "Most PhDs outside North America ask for 2–5 pages: question, why it matters, method and timeline. Shape it with a likely supervisor.",
        priority: "high",
      },
    });
  }

  if (!bachelors && backgroundPick(profile.background, "now") === "working") {
    items.push({
      id: "doc-experience",
      label: "Experience letter from your employer",
      points: 0,
      todo: {
        title: "Ask for an experience letter",
        detail: "Get a signed letter on company letterhead with your role, dates and main duties.",
        priority: "low",
      },
    });
  }

  if (country) items.push(VISA_DOC[country] ?? GENERIC_FUNDS);

  return items;
}
