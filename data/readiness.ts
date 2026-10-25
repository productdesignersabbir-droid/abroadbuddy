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

export type SingleQuestion = {
  kind: "single";
  area: ReadinessArea;
  areaLabel: string;
  question: string;
  hint: string;
  options: ReadinessOption[];
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
};

export type ReadinessQuestion = SingleQuestion | ChecklistQuestion;

// Every area is worth 20 points, so the total score is out of 100.
export const AREA_MAX = 20;

const UNIVERSITY_FINDER: TodoLink = { href: "/universities", label: "Open University Finder" };
const SCHOLARSHIPS: TodoLink = { href: "/scholarships", label: "Browse scholarships" };
const PROFESSORS: TodoLink = { href: "/lab-kemon", label: "Find your professor" };
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
