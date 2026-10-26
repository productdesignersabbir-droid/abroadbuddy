import { COUNTRY_INFO, type Country, type Major } from "@/data/universities";

export type ReadinessArea = "cgpa" | "english" | "research" | "budget" | "documents";

export type Priority = "high" | "medium" | "low";

export type TodoLink = { href: string; label: string };

export type Todo = {
  title: string;
  detail: string;
  priority: Priority;
  link?: TodoLink;
};

export type ReadinessOption = {
  id: string;
  label: string;
  points: number;
  // What to do next if the student picks this answer. Top answers have none.
  todo?: Todo;
};

/** Wording for school leavers applying for a bachelor's, option by option. */
export type BachelorsVersion = {
  areaLabel: string;
  question: string;
  hint: string;
  options: { label: string; todo?: Todo }[];
};

export type SingleQuestion = {
  kind: "single";
  area: ReadinessArea;
  areaLabel: string;
  question: string;
  hint: string;
  options: ReadinessOption[];
  forBachelors?: BachelorsVersion;
};

// Documents is a checklist: each ticked item earns points, each unticked item
// becomes a to-do.
export type ChecklistQuestion = {
  kind: "checklist";
  area: ReadinessArea;
  areaLabel: string;
  question: string;
  hint: string;
  options: ReadinessOption[];
  forBachelors?: BachelorsVersion;
};

export type ReadinessQuestion = SingleQuestion | ChecklistQuestion;

// Every area is worth 20 points, so the total score is out of 100.
export const AREA_MAX = 20;

export const UNIVERSITY_FINDER: TodoLink = { href: "/universities", label: "Open University Finder" };
export const SCHOLARSHIPS: TodoLink = { href: "/scholarships", label: "Browse scholarships" };
export const PROFESSORS: TodoLink = { href: "/lab-kemon", label: "Find your professor" };
const CONFERENCES: TodoLink = { href: "/conferences", label: "See conference deadlines" };

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    kind: "single",
    area: "cgpa",
    areaLabel: "CGPA",
    question: "What's your current CGPA (out of 4.00)?",
    hint: "Use your latest undergraduate CGPA.",
    options: [
      { id: "cgpa-37", label: "3.70 or above", points: 20 },
      {
        id: "cgpa-34",
        label: "3.40 – 3.69",
        points: 16,
        todo: {
          title: "Aim a few reach schools, not all",
          detail:
            "Your CGPA is competitive. Mix reach, match and safe universities so one result doesn't decide everything.",
          priority: "low",
          link: UNIVERSITY_FINDER,
        },
      },
      {
        id: "cgpa-30",
        label: "3.00 – 3.39",
        points: 11,
        todo: {
          title: "Balance your CGPA with a strong profile",
          detail:
            "Shortlist universities where your CGPA meets the minimum, and lean on research, test scores and your SOP to stand out.",
          priority: "medium",
          link: UNIVERSITY_FINDER,
        },
      },
      {
        id: "cgpa-25",
        label: "2.50 – 2.99",
        points: 6,
        todo: {
          title: "Target universities that accept your CGPA",
          detail:
            "Filter by CGPA first. A high GRE or strong last-two-years grades can help — mention an upward trend in your SOP.",
          priority: "high",
          link: UNIVERSITY_FINDER,
        },
      },
      {
        id: "cgpa-low",
        label: "Below 2.50",
        points: 2,
        todo: {
          title: "Look at pathway and foundation programs",
          detail:
            "Many universities offer pre-master's or pathway programs. Work experience and a strong test score will matter most for you.",
          priority: "high",
          link: UNIVERSITY_FINDER,
        },
      },
    ],
    // The grade pickers themselves change by degree; see data/grades.ts.
    forBachelors: {
      areaLabel: "Grades",
      question: "What are your SSC and HSC results?",
      hint: "O and A-level students: pick the closest match to your grades or predicted grades.",
      options: [],
    },
  },
  {
    kind: "single",
    area: "english",
    areaLabel: "English test",
    question: "Where are you with your English test?",
    hint: "IELTS, TOEFL, PTE or Duolingo all count.",
    options: [
      { id: "eng-high", label: "IELTS 7.0+ / TOEFL 100+", points: 20 },
      {
        id: "eng-mid",
        label: "IELTS 6.5 / TOEFL 90–99",
        points: 16,
        todo: {
          title: "Check each program's band requirement",
          detail:
            "Your score meets most requirements. Some top programs ask for 7.0 overall or 6.5 in every band — check before applying.",
          priority: "low",
        },
      },
      {
        id: "eng-low",
        label: "IELTS 6.0 or lower",
        points: 9,
        todo: {
          title: "Retake your English test",
          detail:
            "Most master's programs need IELTS 6.5 or higher. Plan 6–8 weeks of focused practice on your weakest band, then retake.",
          priority: "high",
        },
      },
      {
        id: "eng-booked",
        label: "Test booked, not taken yet",
        points: 6,
        todo: {
          title: "Prepare for your test date",
          detail:
            "Take at least two full mock tests before your exam, and aim for 6.5+ overall with no band below 6.0.",
          priority: "medium",
        },
      },
      {
        id: "eng-none",
        label: "Haven't started",
        points: 2,
        todo: {
          title: "Book your English test",
          detail:
            "Results take about two weeks and most applications need them. Book a date 2–3 months out and start preparing now.",
          priority: "high",
        },
      },
    ],
  },
  {
    kind: "single",
    area: "research",
    areaLabel: "Research",
    question: "How much research experience do you have?",
    hint: "Matters most for research master's and PhD applications.",
    options: [
      { id: "res-pub", label: "Published paper(s)", points: 20 },
      {
        id: "res-review",
        label: "Paper under review, or thesis done",
        points: 15,
        todo: {
          title: "Turn your thesis into a paper",
          detail:
            "Submit to a conference or journal before you apply — even \"under review\" strengthens your CV.",
          priority: "medium",
          link: CONFERENCES,
        },
      },
      {
        id: "res-ongoing",
        label: "Thesis or research project in progress",
        points: 10,
        todo: {
          title: "Aim for a submission before deadlines",
          detail:
            "Pick a conference with a deadline before your applications are due, and plan your project around it.",
          priority: "medium",
          link: CONFERENCES,
        },
      },
      {
        id: "res-course",
        label: "Course projects only",
        points: 5,
        todo: {
          title: "Join a research project",
          detail:
            "Ask a faculty member to join their lab or thesis group. Six months of real research makes a big difference to your profile.",
          priority: "high",
          link: PROFESSORS,
        },
      },
      {
        id: "res-none",
        label: "No research yet",
        points: 2,
        todo: {
          title: "Start building research experience",
          detail:
            "Find a professor whose work interests you and offer to help. If you're going for a coursework master's, focus on projects and internships instead.",
          priority: "high",
          link: PROFESSORS,
        },
      },
    ],
    forBachelors: {
      areaLabel: "Activities",
      question: "What have you done outside class?",
      hint: "Olympiads, clubs, competitions, projects or volunteering all count.",
      options: [
        { label: "National or international award" },
        {
          label: "Led a club, team or big project",
          todo: {
            title: "Show your impact in your personal statement",
            detail: "Say what you led, what changed because of it and what you learned.",
            priority: "medium",
          },
        },
        {
          label: "Regular member of a club or team",
          todo: {
            title: "Take on a role you can talk about",
            detail:
              "Volunteer to organise an event or lead a project this term. One clear story beats a long list of memberships.",
            priority: "medium",
          },
        },
        {
          label: "A few school activities",
          todo: {
            title: "Go deep on one activity",
            detail:
              "Pick one thing — an olympiad, a coding project, debate or volunteering — and stick with it for a few months.",
            priority: "high",
          },
        },
        {
          label: "Not much yet",
          todo: {
            title: "Build something you can show",
            detail:
              "Admissions teams look for curiosity. Join an olympiad, a club, or an online course with a final project.",
            priority: "high",
          },
        },
      ],
    },
  },
  {
    kind: "single",
    area: "budget",
    areaLabel: "Budget",
    question: "How will you pay for your studies?",
    hint: "Think tuition, living costs and the visa's proof-of-funds.",
    options: [
      { id: "bud-full", label: "Savings or sponsor cover the full cost", points: 20 },
      {
        id: "bud-year",
        label: "I can cover the first year",
        points: 15,
        todo: {
          title: "Plan funding for year two",
          detail:
            "Apply for partial scholarships and look for assistantships once you arrive. Keep your bank statements ready for the visa.",
          priority: "medium",
          link: SCHOLARSHIPS,
        },
      },
      {
        id: "bud-partial",
        label: "I need a partial scholarship",
        points: 10,
        todo: {
          title: "Shortlist partial scholarships now",
          detail:
            "Many deadlines fall 8–12 months before intake. Filter universities by budget and apply for tuition waivers alongside admission.",
          priority: "high",
          link: SCHOLARSHIPS,
        },
      },
      {
        id: "bud-funded",
        label: "I can only go fully funded",
        points: 6,
        todo: {
          title: "Target fully funded programs",
          detail:
            "Focus on PhD and research assistantships, plus scholarships like DAAD, MEXT, Chevening and Erasmus Mundus. Contact professors early.",
          priority: "high",
          link: SCHOLARSHIPS,
        },
      },
      {
        id: "bud-unsure",
        label: "Not sure yet",
        points: 2,
        todo: {
          title: "Work out your budget",
          detail:
            "Add up tuition, rent, living costs and visa proof-of-funds for your target country. It decides where you can realistically apply.",
          priority: "high",
          link: UNIVERSITY_FINDER,
        },
      },
    ],
  },
  {
    kind: "checklist",
    area: "documents",
    areaLabel: "Documents",
    question: "Which documents do you already have?",
    hint: "Tick everything that's ready to send today.",
    options: [
      {
        id: "doc-passport",
        label: "Valid passport",
        points: 4,
        todo: {
          title: "Apply for or renew your passport",
          detail:
            "It should be valid for your whole study period. Passport delivery can take weeks, so start now.",
          priority: "high",
        },
      },
      {
        id: "doc-transcript",
        label: "Official transcripts",
        points: 4,
        todo: {
          title: "Request official transcripts",
          detail:
            "Ask your university registrar for sealed copies and attested English versions — this often takes 2–4 weeks.",
          priority: "medium",
        },
      },
      {
        id: "doc-cv",
        label: "Academic CV",
        points: 4,
        todo: {
          title: "Write your academic CV",
          detail:
            "Keep it to two pages: education, research, publications, projects, skills and awards — in that order.",
          priority: "medium",
        },
      },
      {
        id: "doc-sop",
        label: "Statement of purpose draft",
        points: 4,
        todo: {
          title: "Draft your statement of purpose",
          detail:
            "Explain why this field, why this program and what you'll do after. Expect to write 3–4 drafts, so start early.",
          priority: "high",
        },
      },
      {
        id: "doc-lor",
        label: "2+ recommenders agreed",
        points: 4,
        todo: {
          title: "Ask for recommendation letters",
          detail:
            "Ask 2–3 faculty members who know your work at least six weeks before your first deadline.",
          priority: "high",
        },
      },
    ],
  },
];

// About you: unscored questions that personalise the results.

export type DegreeLevel = "masters" | "phd" | "bachelors" | "unsure";

export const UNDECIDED = "undecided";

export type ReadinessProfile = {
  degree?: DegreeLevel;
  major?: Major | typeof UNDECIDED;
  /** Up to three specialisations inside the major, or [UNDECIDED]. */
  focus?: string[];
  country?: Country | typeof UNDECIDED;
  intake?: string;
  /** "Your situation" answers, stored as `${questionId}:${optionId}`. */
  background?: string[];
};

export type ProfileKey = keyof ReadinessProfile;

export const DEGREE_OPTIONS: { id: DegreeLevel; label: string; hint: string }[] = [
  { id: "masters", label: "Master's", hint: "MS, MSc, MEng, MBA or MA" },
  { id: "phd", label: "PhD", hint: "Research degree, often fully funded" },
  { id: "bachelors", label: "Bachelor's", hint: "Straight after HSC or A levels" },
  { id: "unsure", label: "Not sure yet", hint: "We'll help you decide" },
];

export type IntakeOption = {
  id: string;
  label: string;
  /** Rough first day of classes, used to count months left. */
  start: string;
  season: "spring" | "fall";
  /** Extra line under the label, e.g. the month a "Fall" intake starts. */
  hint?: string;
};

export const INTAKE_OPTIONS: IntakeOption[] = [
  { id: "spring-2027", label: "Spring 2027", start: "2027-01-15", season: "spring" },
  { id: "fall-2027", label: "Fall 2027", start: "2027-09-01", season: "fall" },
  { id: "spring-2028", label: "Spring 2028", start: "2028-01-15", season: "spring" },
  { id: "fall-2028", label: "Fall 2028 or later", start: "2028-09-01", season: "fall" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Countries that read better with "the" in a sentence. */
const WITH_THE = new Set<Country>(["USA", "UK", "Netherlands", "Czech Republic"]);
export const countryInSentence = (c: Country) => (WITH_THE.has(c) ? `the ${c}` : c);

/** Pull the first month out of labels like "Fall (Aug–Sep)" or "September". */
function monthOf(label: string): number {
  const lower = label.toLowerCase();
  let best = -1;
  let at = Infinity;
  MONTHS.forEach((m, i) => {
    const pos = lower.indexOf(m.slice(0, 3).toLowerCase());
    if (pos >= 0 && pos < at) {
      at = pos;
      best = i;
    }
  });
  return best;
}

/**
 * The next real intakes for a country, from its own intake months, for about
 * the next two and a half years. Without a country, falls back to spring/fall.
 */
export function intakeOptionsFor(country: Country | undefined, now: Date): IntakeOption[] {
  const info = country ? COUNTRY_INFO[country] : undefined;
  if (!info) return INTAKE_OPTIONS;

  const kinds = info.intakes
    .map((label) => ({ label, month: monthOf(label) }))
    .filter((k) => k.month >= 0);
  const earliest = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  const latest = new Date(now.getFullYear(), now.getMonth() + 30, 1);
  const out: IntakeOption[] = [];
  for (let year = now.getFullYear(); year <= latest.getFullYear(); year++) {
    for (const k of kinds) {
      const start = new Date(year, k.month, 1);
      if (start < earliest || start > latest) continue;
      // "Fall (Aug–Sep)" becomes "Fall 2027"; "September" becomes "September 2027".
      const season = k.label.includes("(") ? k.label.split("(")[0].trim() : "";
      const month = MONTHS[k.month];
      out.push({
        id: `${year}-${String(k.month + 1).padStart(2, "0")}`,
        label: season ? `${season} ${year}` : `${month} ${year}`,
        hint: season ? `Starts in ${month}` : undefined,
        start: `${year}-${String(k.month + 1).padStart(2, "0")}-01`,
        season: k.month < 6 ? "spring" : "fall",
      });
    }
  }
  return out.sort((a, b) => a.start.localeCompare(b.start)).slice(0, 5);
}

/** The intake the student picked, looked up against their country's options. */
export function findIntake(profile: ReadinessProfile, now: Date): IntakeOption | undefined {
  const country =
    profile.country && profile.country !== UNDECIDED ? (profile.country as Country) : undefined;
  return intakeOptionsFor(country, now).find((i) => i.id === profile.intake);
}

export const PROFILE_QUESTIONS: Record<ProfileKey, { question: string; hint: string }> = {
  degree: {
    question: "What do you want to study abroad?",
    hint: "This changes which questions and advice you see.",
  },
  major: {
    question: "Which field are you aiming for?",
    hint: "Pick the closest match. You can change it later in University Finder.",
  },
  focus: {
    question: "Which areas interest you most?",
    hint: "Pick up to three. Not sure yet is fine too.",
  },
  country: {
    question: "Where would you most like to go?",
    hint: "Pick your first choice. We'll show its visa, costs and intakes.",
  },
  intake: {
    question: "When do you want to start?",
    hint: "We'll work out how much time you have left.",
  },
  background: {
    question: "Tell us about your situation",
    hint: "Gaps, work and family change what universities and visa officers ask for.",
  },
};

/** Advice that depends on the field, matched by major. */
export const FIELD_TIPS: { majors: Major[]; todo: Todo }[] = [
  {
    majors: ["Computer Science", "Data Science", "Artificial Intelligence", "Cybersecurity"],
    todo: {
      title: "Show your work on GitHub",
      detail:
        "Admissions teams in computing look for real projects. Pin 2–3 well-documented repos and link them in your CV. Many US programs have made the GRE optional — check each one.",
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
      title: "Put your lab and thesis work first",
      detail:
        "Engineering programs weigh hands-on work. Describe tools, results and your exact role. Some US programs still ask for the GRE.",
      priority: "medium",
    },
  },
  {
    majors: ["Architecture"],
    todo: {
      title: "Build your design portfolio",
      detail:
        "Almost every architecture program asks for one. Pick 4–6 of your strongest projects and show your process, not only final renders.",
      priority: "high",
    },
  },
  {
    majors: ["Business", "Finance", "Economics", "Supply Chain Management"],
    todo: {
      title: "Check GMAT, GRE and work experience rules",
      detail:
        "Many business master's accept either test, and MBAs usually want 2–3 years of work. Note each program's rule before you shortlist.",
      priority: "medium",
    },
  },
  {
    majors: ["Public Health", "Pharmacy", "Biotechnology"],
    todo: {
      title: "Line up lab or field experience",
      detail:
        "Health and life-science programs look for lab, hospital or field work. Even a short internship or volunteer role helps.",
      priority: "medium",
    },
  },
  {
    majors: ["Physics", "Mathematics", "Chemistry"],
    todo: {
      title: "Contact professors early",
      detail:
        "Science programs are research-led and funding often sits with a professor. Read their recent papers before you email.",
      priority: "medium",
      link: PROFESSORS,
    },
  },
  {
    majors: ["Environmental Science", "Agriculture", "Public Policy"],
    todo: {
      title: "Look at development-focused scholarships",
      detail:
        "Erasmus Mundus, Commonwealth and Australia Awards often fund these fields. Field or NGO experience makes your case stronger.",
      priority: "medium",
      link: SCHOLARSHIPS,
    },
  },
  {
    majors: ["Law"],
    todo: {
      title: "Check LLM entry rules",
      detail:
        "Most LLM programs ask for a law degree and a writing sample. Some countries have extra rules if you plan to practise there.",
      priority: "medium",
    },
  },
];
