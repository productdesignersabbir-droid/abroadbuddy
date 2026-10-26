import {
  READINESS_QUESTIONS,
  UNDECIDED,
  type ReadinessOption,
  type ReadinessProfile,
} from "@/data/readiness";
import type { Country } from "@/data/universities";

// The funding gate uses short labels, and adapts to the plan: PhDs are
// usually funded, school leavers have fewer full scholarships, and each
// country has its own well-known schemes.

const BASE = READINESS_QUESTIONS.find((q) => q.area === "budget")!.options;
const base = (id: string) => BASE.find((o) => o.id === id)!;

/** Well-known full scholarships, for graduate study and for bachelor's. */
const SCHEMES: Partial<Record<Country, { grad: string; bachelors?: string }>> = {
  USA: { grad: "Assistantships, Fulbright" },
  UK: { grad: "Chevening, Commonwealth" },
  Canada: { grad: "Research assistantships" },
  Australia: { grad: "Australia Awards, RTP" },
  Germany: { grad: "DAAD" },
  Japan: { grad: "MEXT", bachelors: "MEXT" },
  "South Korea": { grad: "GKS", bachelors: "GKS" },
  China: { grad: "CSC", bachelors: "CSC" },
  Turkey: { grad: "Türkiye Burslari", bachelors: "Türkiye Burslari" },
  Netherlands: { grad: "Erasmus Mundus" },
  Sweden: { grad: "SI Scholarship" },
};

const countryOf = (profile: ReadinessProfile) =>
  profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;

export type FundingOption = ReadinessOption & { hint?: string };

export function fundingOptionsFor(profile: ReadinessProfile): FundingOption[] {
  const country = countryOf(profile);
  const phd = profile.degree === "phd";
  const bachelors = profile.degree === "bachelors";
  const scheme = country ? SCHEMES[country] : undefined;
  const fullHint = bachelors
    ? scheme?.bachelors ?? "Few full scholarships exist for bachelor's"
    : phd
      ? "Most PhDs pay a stipend through the lab"
      : scheme?.grad ?? "Erasmus Mundus and university awards";

  const funded = base("bud-funded");
  return [
    { ...base("bud-full"), label: "Self-funded", hint: "Savings, family or a sponsor" },
    { ...base("bud-year"), label: "Self-funded for year one" },
    { ...base("bud-partial"), label: "Partial scholarship", hint: "Tuition waiver or part funding" },
    {
      ...funded,
      label: "Full funding",
      hint: fullHint,
      // Funding is the normal route for a PhD, so it isn't a weak answer there.
      points: phd ? 16 : funded.points,
      todo: phd
        ? {
            title: "Email professors about funded positions",
            detail:
              "PhD funding usually comes through a lab. Write to 10–15 professors whose work fits yours, then apply where they have openings.",
            priority: "high",
            link: funded.todo?.link,
          }
        : bachelors
          ? {
              title: "Shortlist full bachelor's scholarships",
              detail: `Full funding for bachelor's is rare and competitive${scheme?.bachelors ? `; ${scheme.bachelors} is the main one for ${country}` : ""}. Apply early and keep a self-funded backup.`,
              priority: "high",
              link: funded.todo?.link,
            }
          : funded.todo,
    },
    { ...base("bud-unsure"), label: "Not sure yet" },
  ];
}

export function fundingCopy(profile: ReadinessProfile): { question: string; hint: string } {
  const country = countryOf(profile);
  const where = country
    ? ["USA", "UK", "Netherlands", "Czech Republic"].includes(country)
      ? `the ${country}`
      : country
    : undefined;
  return {
    question: "How will you fund your studies?",
    hint: where
      ? `Think tuition, living costs and the proof of funds ${where} asks for at the visa stage.`
      : "Think tuition, living costs and the visa's proof of funds.",
  };
}
