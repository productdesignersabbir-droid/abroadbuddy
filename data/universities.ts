export type Difficulty = "Highly Competitive" | "Competitive" | "Moderate";

export type Major =
  | "Computer Science"
  | "Data Science"
  | "Electrical Engineering"
  | "Mechanical Engineering"
  | "Business"
  | "Economics"
  | "Physics"
  | "Public Health"
  | "Environmental Science";

export const COUNTRIES = [
  "USA",
  "UK",
  "Canada",
  "Germany",
  "Australia",
] as const;

export const MAJORS: Major[] = [
  "Computer Science",
  "Data Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business",
  "Economics",
  "Physics",
  "Public Health",
  "Environmental Science",
];

export type University = {
  id: string;
  name: string;
  country: (typeof COUNTRIES)[number];
  city: string;
  qsRank: number;
  theRank: number;
  minCgpa: number;
  majors: Major[];
  tuitionMin: number;
  tuitionMax: number;
  difficulty: Difficulty;
  imageSrc: string;
  imageAlt: string;
  description: string;
  highlights: string[];
};

export const UNIVERSITIES: University[] = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    country: "USA",
    city: "Cambridge, Massachusetts",
    qsRank: 1,
    theRank: 2,
    minCgpa: 3.9,
    majors: ["Computer Science", "Electrical Engineering", "Physics"],
    tuitionMin: 57000,
    tuitionMax: 62000,
    difficulty: "Highly Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Graduation caps thrown in the air on a university campus",
    description:
      "A global leader in engineering and computer science, with unmatched research funding and a famously hands-on culture.",
    highlights: [
      "Top-ranked for Computer Science and Engineering worldwide",
      "Strong industry ties in Boston's tech and biotech corridor",
      "Generous need-based aid, even for international students",
    ],
  },
  {
    id: "stanford",
    name: "Stanford University",
    country: "USA",
    city: "Stanford, California",
    qsRank: 3,
    theRank: 4,
    minCgpa: 3.85,
    majors: ["Computer Science", "Data Science", "Business"],
    tuitionMin: 56000,
    tuitionMax: 61000,
    difficulty: "Highly Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Students walking across a sunny university campus",
    description:
      "Silicon Valley's home university — deep startup culture, strong alumni network, and interdisciplinary research.",
    highlights: [
      "Direct pipeline into Silicon Valley internships and jobs",
      "Flexible interdisciplinary program structure",
      "One of the largest endowments in the world",
    ],
  },
  {
    id: "u-toronto",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto, Ontario",
    qsRank: 21,
    theRank: 21,
    minCgpa: 3.6,
    majors: ["Computer Science", "Public Health", "Economics"],
    tuitionMin: 45000,
    tuitionMax: 58000,
    difficulty: "Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Interior of a large university library with tall shelves",
    description:
      "Canada's largest research university, known for medicine, public health, and a large, diverse international student body.",
    highlights: [
      "Large, established Bangladeshi and South Asian student community",
      "Strong co-op and post-graduation work permit pathway",
      "Consistently ranked top 25 globally",
    ],
  },
  {
    id: "waterloo",
    name: "University of Waterloo",
    country: "Canada",
    city: "Waterloo, Ontario",
    qsRank: 112,
    theRank: 158,
    minCgpa: 3.5,
    majors: ["Computer Science", "Mechanical Engineering", "Data Science"],
    tuitionMin: 38000,
    tuitionMax: 48000,
    difficulty: "Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Modern university building with glass architecture",
    description:
      "North America's leading co-op program — students alternate semesters of study with paid industry placements.",
    highlights: [
      "Best-in-class co-op placement into top tech companies",
      "Strong engineering and computer science reputation",
      "High acceptance-to-employment conversion rate",
    ],
  },
  {
    id: "oxford",
    name: "University of Oxford",
    country: "UK",
    city: "Oxford, England",
    qsRank: 4,
    theRank: 1,
    minCgpa: 3.8,
    majors: ["Economics", "Physics", "Business"],
    tuitionMin: 42000,
    tuitionMax: 52000,
    difficulty: "Highly Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Historic university building with stone architecture",
    description:
      "The world's oldest English-speaking university, with a tutorial-based teaching model and centuries of academic prestige.",
    highlights: [
      "One-year taught master's options for most programs",
      "World-renowned faculty across nearly every field",
      "Rich college system with built-in community and housing",
    ],
  },
  {
    id: "imperial",
    name: "Imperial College London",
    country: "UK",
    city: "London, England",
    qsRank: 2,
    theRank: 11,
    minCgpa: 3.75,
    majors: ["Electrical Engineering", "Data Science", "Physics"],
    tuitionMin: 40000,
    tuitionMax: 48000,
    difficulty: "Highly Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&q=80&auto=format&fit=crop",
    imageAlt: "University campus building facade in a city setting",
    description:
      "A STEM-focused institution in the heart of London, with tight links to industry, finance, and applied research.",
    highlights: [
      "Ranked top 10 globally for engineering and technology",
      "Central London location with strong recruiter access",
      "One-year specialised master's programs available",
    ],
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich, Bavaria",
    qsRank: 37,
    theRank: 30,
    minCgpa: 3.4,
    majors: ["Mechanical Engineering", "Computer Science", "Electrical Engineering"],
    tuitionMin: 3000,
    tuitionMax: 6000,
    difficulty: "Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80&auto=format&fit=crop",
    imageAlt: "European university campus with modern buildings",
    description:
      "Germany's top technical university — near-free tuition, strong automotive and engineering industry connections.",
    highlights: [
      "Among the lowest tuition of any top-50 global university",
      "Direct pipeline to BMW, Siemens and major German industry",
      "Many English-taught master's programs for internationals",
    ],
  },
  {
    id: "rwth-aachen",
    name: "RWTH Aachen University",
    country: "Germany",
    city: "Aachen, North Rhine-Westphalia",
    qsRank: 99,
    theRank: 127,
    minCgpa: 3.2,
    majors: ["Mechanical Engineering", "Electrical Engineering"],
    tuitionMin: 1000,
    tuitionMax: 3000,
    difficulty: "Moderate",
    imageSrc:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Students collaborating around a table with laptops",
    description:
      "One of Europe's largest technical universities, with an emphasis on applied engineering and industry-funded research.",
    highlights: [
      "Very low tuition even for non-EU students",
      "Strong mechanical and electrical engineering faculties",
      "Large, active international student support office",
    ],
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    country: "Australia",
    city: "Melbourne, Victoria",
    qsRank: 19,
    theRank: 37,
    minCgpa: 3.5,
    majors: ["Business", "Public Health", "Data Science"],
    tuitionMin: 32000,
    tuitionMax: 38000,
    difficulty: "Competitive",
    imageSrc:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Airport terminal with travellers walking past large windows",
    description:
      "Australia's highest-ranked university, with a broad-based undergraduate model and strong postgraduate research output.",
    highlights: [
      "Top-ranked in Australia across most global rankings",
      "Post-study work visa pathway up to 4 years",
      "Large, well-established Bangladeshi student society",
    ],
  },
  {
    id: "anu",
    name: "Australian National University",
    country: "Australia",
    city: "Canberra, ACT",
    qsRank: 34,
    theRank: 62,
    minCgpa: 3.3,
    majors: ["Environmental Science", "Economics", "Public Health"],
    tuitionMin: 28000,
    tuitionMax: 34000,
    difficulty: "Moderate",
    imageSrc:
      "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Student reading in a quiet library study space",
    description:
      "Australia's national research university, especially strong in environmental science, public policy and economics.",
    highlights: [
      "Ranked #1 in Australia for research intensity",
      "Small class sizes relative to other major research universities",
      "Scholarship pool specifically for South Asian applicants",
    ],
  },
];
