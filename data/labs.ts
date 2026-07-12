import { COUNTRIES, MAJORS, type Major } from "@/data/universities";

export { COUNTRIES, MAJORS };
export type { Major };

export type SubScores = {
  mentorship: number;
  funding: number;
  workLifeBalance: number;
  publishing: number;
};

export type LabReview = {
  id: string;
  role: string;
  date: string;
  body: string;
};

export type Lab = {
  id: string;
  professor: string;
  university: string;
  department: string;
  country: (typeof COUNTRIES)[number];
  field: Major;
  subScores: SubScores;
  fundingInfo: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  reviews: LabReview[];
};

export const LABS: Lab[] = [
  {
    id: "vasquez-mit",
    professor: "Prof. Elena Vasquez",
    university: "MIT",
    department: "Computer Science",
    country: "USA",
    field: "Computer Science",
    subScores: { mentorship: 4.6, funding: 4.8, workLifeBalance: 3.2, publishing: 4.9 },
    fundingInfo: "$42k/yr stipend + full tuition waiver, guaranteed for 5 years",
    imageSrc:
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Robotics arm and engineering equipment in a research lab",
    description:
      "A fast-paced robotics and AI lab pushing top-tier publications — expect long hours, but exceptional resources and industry connections.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 3rd year",
        date: "2026-02-14",
        body: "Funding is excellent and Prof. Vasquez is genuinely invested in your career, but the pace is intense — 60+ hour weeks are common before deadlines.",
      },
      {
        id: "r2",
        role: "MS student, 1st year",
        date: "2025-11-03",
        body: "Great onboarding and weekly 1:1s. Wasn't ready for how competitive the internal culture is between labmates.",
      },
      {
        id: "r3",
        role: "Postdoc",
        date: "2026-01-20",
        body: "Best-resourced lab I've worked in. Publishing expectations are high, but so is the support to hit them.",
      },
    ],
  },
  {
    id: "kim-stanford",
    professor: "Prof. David Kim",
    university: "Stanford University",
    department: "Electrical Engineering",
    country: "USA",
    field: "Electrical Engineering",
    subScores: { mentorship: 3.8, funding: 4.5, workLifeBalance: 3.6, publishing: 4.2 },
    fundingInfo: "$38k/yr stipend + tuition waiver, 2 semesters of TA duty required",
    imageSrc:
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Close-up of electronics and circuit boards on a lab bench",
    description:
      "Industry-connected chip design lab with strong ties to Bay Area semiconductor companies — a good balance of research and applied work.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 2nd year",
        date: "2026-03-01",
        body: "Prof. Kim is hands-off but responsive when you need him. Great if you're self-directed.",
      },
      {
        id: "r2",
        role: "MS student, 2nd year",
        date: "2025-09-18",
        body: "Solid funding and reasonable hours most of the year — gets busy around tapeout deadlines.",
      },
    ],
  },
  {
    id: "mitchell-toronto",
    professor: "Prof. Sarah Mitchell",
    university: "University of Toronto",
    department: "Public Health",
    country: "Canada",
    field: "Public Health",
    subScores: { mentorship: 4.7, funding: 3.9, workLifeBalance: 4.5, publishing: 3.8 },
    fundingInfo: "CAD $28k/yr stipend + partial tuition coverage, external scholarships encouraged",
    imageSrc:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Researcher reviewing data in a public health lab setting",
    description:
      "A collaborative, well-mentored lab focused on global health equity — funding requires some scholarship-hunting, but the culture is genuinely supportive.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 1st year",
        date: "2026-01-11",
        body: "Prof. Mitchell checks in constantly and actually reads your drafts the same week. Funding took extra scholarship applications to make comfortable.",
      },
      {
        id: "r2",
        role: "MS student, 2nd year",
        date: "2025-12-05",
        body: "Best work-life balance of any lab I interviewed with. Nobody expects weekend emails answered.",
      },
    ],
  },
  {
    id: "oconnor-waterloo",
    professor: "Prof. James O'Connor",
    university: "University of Waterloo",
    department: "Mechanical Engineering",
    country: "Canada",
    field: "Mechanical Engineering",
    subScores: { mentorship: 4.0, funding: 4.3, workLifeBalance: 4.1, publishing: 3.5 },
    fundingInfo: "CAD $24k/yr stipend, boosted by paid co-op work terms",
    imageSrc:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Mechanical engineering robotics equipment in a university lab",
    description:
      "Applied robotics lab tightly integrated with Waterloo's co-op system — more hands-on engineering than paper output.",
    reviews: [
      {
        id: "r1",
        role: "MS student, 1st year",
        date: "2026-02-08",
        body: "Co-op terms basically double your income. Less publishing pressure than other labs I compared.",
      },
      {
        id: "r2",
        role: "PhD student, 2nd year",
        date: "2025-10-22",
        body: "Prof. O'Connor is easygoing and practical. Great if you want industry experience alongside research.",
      },
    ],
  },
  {
    id: "osei-oxford",
    professor: "Prof. Amara Osei",
    university: "University of Oxford",
    department: "Economics",
    country: "UK",
    field: "Economics",
    subScores: { mentorship: 4.4, funding: 3.5, workLifeBalance: 3.9, publishing: 4.6 },
    fundingInfo: "£18k/yr stipend if Clarendon-funded — many students self-fund or find external scholarships",
    imageSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Researchers discussing data charts around a table",
    description:
      "Rigorous, policy-driven economics lab with a strong publication record — funding is the main hurdle, so apply early for Clarendon or external awards.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 2nd year",
        date: "2025-10-30",
        body: "Incredible mentorship once you're in, but funding isn't guaranteed — sort your scholarship before committing.",
      },
      {
        id: "r2",
        role: "PhD student, 4th year",
        date: "2026-01-16",
        body: "Publication record here opens doors. Prof. Osei pushes you hard, but fairly.",
      },
    ],
  },
  {
    id: "hale-imperial",
    professor: "Prof. Richard Hale",
    university: "Imperial College London",
    department: "Physics",
    country: "UK",
    field: "Physics",
    subScores: { mentorship: 3.6, funding: 4.2, workLifeBalance: 3.0, publishing: 4.7 },
    fundingInfo: "£20k/yr stipend + tuition waiver for funded EPSRC projects",
    imageSrc:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Physics lab equipment with lasers and optical instruments",
    description:
      "Cutting-edge quantum computing research with heavy publishing expectations — funding is solid, but the schedule is demanding.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 3rd year",
        date: "2026-03-05",
        body: "Funding is never an issue. Mentorship is inconsistent — depends heavily on which postdoc you're paired with.",
      },
      {
        id: "r2",
        role: "MS student, 1st year",
        date: "2025-08-27",
        body: "Fascinating work, but be ready for late nights before conference deadlines.",
      },
    ],
  },
  {
    id: "richter-tum",
    professor: "Prof. Klaus Richter",
    university: "Technical University of Munich",
    department: "Environmental Science",
    country: "Germany",
    field: "Environmental Science",
    subScores: { mentorship: 4.3, funding: 4.6, workLifeBalance: 4.4, publishing: 3.9 },
    fundingInfo: "€1,468/month public-sector stipend, no tuition (already free at TUM)",
    imageSrc:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Researcher conducting environmental fieldwork outdoors",
    description:
      "Well-funded climate research group with a refreshingly sane pace — Germany's public funding scale means stipends are stable and predictable.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 2nd year",
        date: "2026-02-19",
        body: "Genuinely healthy work-life balance, and the stipend is enough to live comfortably in Munich.",
      },
      {
        id: "r2",
        role: "MS student, 2nd year",
        date: "2025-11-14",
        body: "Prof. Richter is supportive and low-drama. Publishing pace is slower than US labs, but nobody's stressed about it.",
      },
    ],
  },
  {
    id: "chen-melbourne",
    professor: "Prof. Lisa Chen",
    university: "University of Melbourne",
    department: "Data Science",
    country: "Australia",
    field: "Data Science",
    subScores: { mentorship: 4.1, funding: 4.0, workLifeBalance: 4.2, publishing: 4.3 },
    fundingInfo: "AUD $34k/yr stipend + tuition scholarship (RTP), renewable annually",
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Data visualizations displayed across multiple computer screens",
    description:
      "Applied ML lab working on real clinical datasets with hospital partners — a good balance of research depth and reasonable hours.",
    reviews: [
      {
        id: "r1",
        role: "PhD student, 1st year",
        date: "2026-01-09",
        body: "Great first-year experience, clear expectations and regular feedback.",
      },
      {
        id: "r2",
        role: "MS student, 1st year",
        date: "2025-12-02",
        body: "Funding is dependable and renews automatically if you're making progress. Solid balance overall.",
      },
    ],
  },
];
