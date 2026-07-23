export type MockTestSectionId = "listening" | "reading" | "writing" | "speaking";

export type MockTestSection = {
  id: MockTestSectionId;
  title: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
};

export const MOCK_TEST_SECTIONS: MockTestSection[] = [
  {
    id: "listening",
    title: "Listening",
    description:
      "Four recorded audio sections, from everyday conversations to academic lectures.",
    durationMinutes: 30,
    questionCount: 40,
  },
  {
    id: "reading",
    title: "Reading",
    description:
      "Three passages with multiple-choice and short-answer questions. Try our free demo below.",
    durationMinutes: 60,
    questionCount: 40,
  },
  {
    id: "writing",
    title: "Writing",
    description: "Describe a chart or graph, then write a persuasive essay on a given topic.",
    durationMinutes: 60,
    questionCount: 2,
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "A face-to-face style interview covering introductions, a topic card and discussion.",
    durationMinutes: 14,
    questionCount: 3,
  },
];

export type ReadingQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type ReadingPassage = {
  id: string;
  title: string;
  text: string;
  questions: ReadingQuestion[];
};

export const SAMPLE_READING_PASSAGE: ReadingPassage = {
  id: "urban-beekeeping",
  title: "The Rise of Urban Beekeeping",
  text: `Over the past decade, cities from Paris to Toronto have seen a quiet boom in rooftop beehives. Municipal governments, eager to support pollinator populations after years of alarming colony losses, have simplified permit rules and even installed hives atop city halls and public libraries. Advocates argue that urban beekeeping raises awareness of pollinator decline and gives residents a direct stake in protecting local ecosystems.

But some ecologists warn the trend has a downside. Managed honeybee colonies can hold tens of thousands of workers, and when hives are packed too densely into a small area, they may out-compete wild, native bee species for the same limited flowers. Since wild bees are frequently more effective pollinators for certain plants, and many are already under pressure from habitat loss, an oversupply of honeybees could quietly undermine the very biodiversity that city programs claim to protect.

Researchers who study the issue tend not to call for banning urban hives outright. Instead, most recommend that cities cap the number of hives permitted per neighborhood and pair any beekeeping initiative with plantings of diverse, bee-friendly flowers, so that food supply keeps pace with the growing population of pollinators competing for it.`,
  questions: [
    {
      id: "q1",
      prompt: "Why are some ecologists concerned about the growth of urban beekeeping?",
      options: [
        "It requires too much government funding",
        "Managed honeybee colonies may out-compete wild bees for limited flowers",
        "City halls are not designed to support rooftop structures",
        "Honeybee honey production has declined in cities",
      ],
      correctIndex: 1,
    },
    {
      id: "q2",
      prompt: "Which two cities does the passage mention as having rooftop beehive programs?",
      options: ["New York and Berlin", "Tokyo and Sydney", "Paris and Toronto", "Dhaka and Lagos"],
      correctIndex: 2,
    },
    {
      id: "q3",
      prompt: "What do most researchers recommend to address the problem?",
      options: [
        "Capping hive numbers per neighborhood and planting more bee-friendly flowers",
        "Banning urban beekeeping entirely",
        "Moving all hives to rural areas",
        "Replacing honeybees with wild bee species",
      ],
      correctIndex: 0,
    },
    {
      id: "q4",
      prompt: "How does the passage frame the overall topic of urban beekeeping?",
      options: [
        "As an unqualified success story with no drawbacks",
        "As a failed policy that cities are now abandoning",
        "As a purely economic issue unrelated to ecology",
        "As a case study balancing ecological benefits against potential trade-offs",
      ],
      correctIndex: 3,
    },
  ],
};

export type BandScoreSample = {
  section: string;
  band: number;
};

export const SAMPLE_BAND_SCORES: BandScoreSample[] = [
  { section: "Listening", band: 7.5 },
  { section: "Reading", band: 7.0 },
  { section: "Writing", band: 6.5 },
  { section: "Speaking", band: 7.0 },
];

export type ExamType = "IELTS" | "GRE" | "TOEFL" | "GMAT";
export const EXAM_TYPES: ExamType[] = ["IELTS", "GRE", "TOEFL", "GMAT"];

export type ExamFormatSection = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
};

export const GRE_SECTIONS: ExamFormatSection[] = [
  {
    id: "gre-verbal",
    title: "Verbal Reasoning",
    description:
      "Two scored sections testing reading comprehension, text completion and sentence equivalence.",
    durationMinutes: 41,
    questionCount: 27,
  },
  {
    id: "gre-quant",
    title: "Quantitative Reasoning",
    description:
      "Two scored sections covering algebra, geometry, data analysis and arithmetic word problems.",
    durationMinutes: 47,
    questionCount: 27,
  },
  {
    id: "gre-awa",
    title: "Analytical Writing",
    description:
      "One \"Analyze an Issue\" essay task, scored separately on a 0-6 scale.",
    durationMinutes: 30,
    questionCount: 1,
  },
];

export const GRE_TIPS: string[] = [
  "Learn root words and prefixes instead of memorizing isolated vocabulary lists — it transfers better to unfamiliar words on test day.",
  "For Quant, practice mental math and estimation so you can eliminate answer choices quickly instead of computing every option in full.",
  "Time-box the Analytical Writing task: five minutes to outline, twenty to write, five to review. A clear structure scores higher than a clever one.",
  "Take at least two full-length timed practice tests before your real exam so section-switching fatigue doesn't catch you off guard.",
];

export const GMAT_SECTIONS: ExamFormatSection[] = [
  {
    id: "gmat-quant",
    title: "Quantitative Reasoning",
    description:
      "Problem solving questions across algebra, arithmetic and word problems, all multiple-choice.",
    durationMinutes: 45,
    questionCount: 21,
  },
  {
    id: "gmat-verbal",
    title: "Verbal Reasoning",
    description:
      "Reading comprehension and critical reasoning questions. Sentence correction was removed in the Focus Edition.",
    durationMinutes: 45,
    questionCount: 23,
  },
  {
    id: "gmat-data-insights",
    title: "Data Insights",
    description:
      "Multi-source reasoning, table analysis, graphics interpretation and two-part analysis in one integrated section.",
    durationMinutes: 45,
    questionCount: 20,
  },
];

export const GMAT_TIPS: string[] = [
  "The GMAT Focus Edition lets you bookmark and edit up to three answers per section — plan which questions you're likely to want to revisit.",
  "Data Insights rewards reading the question stem before the data table or graphic, so you scan for what actually matters instead of everything.",
  "Unlike the old GMAT, there's no separate essay section — put that saved prep time into more Quant and Data Insights practice sets instead.",
  "Schools superscore the GMAT Focus less often than the old format, so treat every sitting as the one that counts and avoid an early, unprepared attempt.",
];

export type CoachSessionType = "1:1" | "Group";
export const COACH_SESSION_TYPES: CoachSessionType[] = ["1:1", "Group"];

export type Coach = {
  id: string;
  name: string;
  photoSrc: string;
  photoAlt: string;
  examTypes: ExamType[];
  specialty: string;
  sessionTypes: CoachSessionType[];
  bio: string;
  rating: number;
  reviewCount: number;
  price: number;
};

export const COACHES: Coach[] = [
  {
    id: "rezwan-kabir",
    name: "Rezwan Kabir",
    photoSrc:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Rezwan Kabir, IELTS Writing coach",
    examTypes: ["IELTS"],
    specialty: "Writing Task 2",
    sessionTypes: ["1:1", "Group"],
    bio: "Former IELTS examiner turned coach. Rezwan breaks Task 2 essays into repeatable structures so you stop losing marks on coherence and cohesion.",
    rating: 4.9,
    reviewCount: 62,
    price: 18,
  },
  {
    id: "sabrina-elahi",
    name: "Sabrina Elahi",
    photoSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Sabrina Elahi, IELTS Speaking coach",
    examTypes: ["IELTS"],
    specialty: "Speaking fluency",
    sessionTypes: ["1:1"],
    bio: "Sabrina coaches natural, confident spoken English for Speaking Parts 1–3, with weekly mock interviews and instant feedback.",
    rating: 4.8,
    reviewCount: 47,
    price: 20,
  },
  {
    id: "imran-chowdhury",
    name: "Imran Chowdhury",
    photoSrc:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Imran Chowdhury, GRE Quant coach",
    examTypes: ["GRE"],
    specialty: "Quant strategy",
    sessionTypes: ["1:1", "Group"],
    bio: "A former 168Q scorer, Imran teaches shortcut techniques for quant word problems and data interpretation so you finish with time to spare.",
    rating: 4.7,
    reviewCount: 39,
    price: 22,
  },
  {
    id: "farzana-yasmin",
    name: "Farzana Yasmin",
    photoSrc:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Farzana Yasmin, IELTS Reading coach",
    examTypes: ["IELTS"],
    specialty: "Reading technique",
    sessionTypes: ["1:1"],
    bio: "Farzana specializes in skimming and scanning techniques for IELTS Reading, helping students consistently hit band 7.5+ under real time pressure.",
    rating: 4.9,
    reviewCount: 71,
    price: 16,
  },
  {
    id: "tahsin-rahman",
    name: "Tahsin Rahman",
    photoSrc:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Tahsin Rahman, GRE and TOEFL Verbal coach",
    examTypes: ["GRE", "TOEFL"],
    specialty: "Verbal & vocabulary",
    sessionTypes: ["1:1", "Group"],
    bio: "Tahsin builds high-frequency vocabulary systems and sentence-equivalence drills that work across both GRE Verbal and TOEFL Reading sections.",
    rating: 4.6,
    reviewCount: 33,
    price: 24,
  },
  {
    id: "nabil-ahsan",
    name: "Nabil Ahsan",
    photoSrc:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Nabil Ahsan, full mock exam coach",
    examTypes: ["IELTS", "GRE", "TOEFL", "GMAT"],
    specialty: "Full mock exams",
    sessionTypes: ["1:1", "Group"],
    bio: "Nabil runs full-length timed mock exams across IELTS, GRE, TOEFL and GMAT, then reviews every section with you to build a targeted study plan.",
    rating: 5.0,
    reviewCount: 54,
    price: 28,
  },
  {
    id: "adiba-rahman",
    name: "Adiba Rahman",
    photoSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Adiba Rahman, GMAT Data Insights coach",
    examTypes: ["GMAT"],
    specialty: "Data Insights",
    sessionTypes: ["1:1", "Group"],
    bio: "An MBA admit with a 685 GMAT Focus score, Adiba coaches the Data Insights section specifically — multi-source reasoning, table analysis and two-part analysis under time pressure.",
    rating: 4.8,
    reviewCount: 28,
    price: 26,
  },
  {
    id: "shafin-islam",
    name: "Shafin Islam",
    photoSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80&auto=format&fit=facearea&facepad=2&h=300",
    photoAlt: "Portrait of Shafin Islam, GMAT Quant coach",
    examTypes: ["GMAT"],
    specialty: "Quant & data sufficiency",
    sessionTypes: ["1:1"],
    bio: "Shafin specializes in data sufficiency traps and quant pacing for the GMAT Focus Edition, helping working professionals prep efficiently around a job.",
    rating: 4.7,
    reviewCount: 21,
    price: 25,
  },
];
