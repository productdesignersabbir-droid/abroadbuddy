import { findIntake, UNDECIDED, type ReadinessProfile } from "@/data/readiness";
import { graduateTestFor } from "@/data/english-tests";
import type { Country } from "@/data/universities";

// A month-by-month route to the chosen intake, worked backwards from the
// start date. Steps already behind us roll up into "catch up now".

export type Milestone = {
  date: Date;
  title: string;
  detail: string;
};

/** The paper each country issues once you accept an offer. */
const OFFER_PAPER: Partial<Record<Country, string>> = {
  USA: "your I-20",
  UK: "your CAS",
  Australia: "your CoE",
  Canada: "your letter of acceptance",
  "New Zealand": "your offer of place",
};

const monthsBefore = (start: Date, n: number) => new Date(start.getFullYear(), start.getMonth() - n, 1);

export function planFor(profile: ReadinessProfile, now: Date): Milestone[] | null {
  const intake = findIntake(profile, now);
  if (!intake) return null;
  const start = new Date(intake.start);
  const country =
    profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;
  const bachelors = profile.degree === "bachelors";
  const phd = profile.degree === "phd";
  const grad = graduateTestFor(profile);

  const steps: [number, string, string][] = [
    [
      12,
      grad ? `Take your English test and ${grad}` : "Take your English test",
      "Results take about two weeks, and leave room for a retake before deadlines.",
    ],
    phd
      ? [11, "Email professors", "Write to 10–15 professors whose work fits yours. Their replies shape where you apply."]
      : [11, "Shortlist universities", "Pick 6–10: a few reach, most match, one or two safe."],
    [
      10,
      bachelors ? "Write your personal statement" : "Finish your SOP and CV",
      bachelors
        ? "Ask teachers for references now too."
        : "Ask your recommenders now, at least six weeks before the first deadline.",
    ],
    [9, "Apply for scholarships", "Many close 8–12 months before classes start, often with the admission form."],
    [8, "Submit your applications", "Some programs close earlier, so check each deadline on your shortlist."],
    country === "Germany"
      ? [6, "Open a blocked account and book a visa appointment", "Embassy appointments in Dhaka can take weeks to get."]
      : [
          5,
          `Accept your offer${country && OFFER_PAPER[country] ? ` and get ${OFFER_PAPER[country]}` : ""}`,
          "Pay any deposit by the deadline in your offer letter.",
        ],
    [3, "Apply for your visa", "Have bank statements, offer papers and your passport ready before you book."],
    [1, "Book your flight and housing", "Arrive a week or two early for orientation."],
    [0, "Classes start", `${intake.label}. Your journey begins.`],
  ];

  return steps.map(([n, title, detail]) => ({ date: monthsBefore(start, n), title, detail }));
}
