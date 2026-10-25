import { MAJORS, type Major } from "@/data/universities";
import { MORE_SCHOLARSHIPS } from "@/data/more-scholarships";

export { MAJORS };
export type { Major };

export type DegreeLevel = "Undergraduate" | "Master's" | "PhD";
export type FundingType = "Fully Funded" | "Partially Funded" | "Tuition Waiver";

export const DEGREE_LEVELS: DegreeLevel[] = ["Undergraduate", "Master's", "PhD"];
export const FUNDING_TYPES: FundingType[] = [
  "Fully Funded",
  "Partially Funded",
  "Tuition Waiver",
];

// Scholarship destinations are kept separate from the University Finder's country
// list so each can grow on its own (India, for example, is only a scholarship host).
export const SCHOLARSHIP_COUNTRIES = [
  "USA",
  "Canada",
  "UK",
  "Ireland",
  "Germany",
  "Netherlands",
  "Belgium",
  "France",
  "Switzerland",
  "Italy",
  "Spain",
  "Sweden",
  "Finland",
  "Denmark",
  "Poland",
  "Hungary",
  "Turkey",
  "Australia",
  "New Zealand",
  "Japan",
  "South Korea",
  "China",
  "Hong Kong",
  "Taiwan",
  "Singapore",
  "Malaysia",
  "India",
  "Saudi Arabia",
  "Multiple Countries",
] as const;
export type ScholarshipCountry = (typeof SCHOLARSHIP_COUNTRIES)[number];

export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  country: ScholarshipCountry;
  degreeLevels: DegreeLevel[];
  /** Empty array means open to all fields of study. */
  fields: Major[];
  fundingType: FundingType;
  /** Minimum CGPA out of 4.00 typically expected of competitive applicants. */
  minCgpa: number;
  amount: string;
  /** ISO date — the application deadline. */
  deadline: string;
  applyUrl: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  howToApply: string[];
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "fulbright-foreign-student-program",
    name: "Fulbright Foreign Student Program",
    provider: "U.S. Department of State",
    country: "USA",
    degreeLevels: ["Master's", "PhD"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.0,
    amount:
      "Full tuition, a monthly living stipend, round-trip airfare and health insurance for the full length of the program.",
    deadline: "2026-08-05",
    applyUrl: "https://foreign.fulbrightonline.org",
    imageSrc:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Audience listening to a speaker at an orientation event",
    summary:
      "The US government's flagship award for graduate study, research or teaching at an American university.",
    description:
      "The Fulbright Foreign Student Program funds one to two years of graduate study or research at a US university or non-profit institution. It's one of the most prestigious and widely available awards for international students, open to almost every field of study.",
    eligibility: [
      "Bangladeshi citizen with a completed bachelor's degree by the program start date",
      "Minimum CGPA of around 3.00 out of 4.00 (higher strengthens your case)",
      "Strong English proficiency — most applicants submit IELTS or TOEFL scores",
      "At least two years of relevant work, research or volunteer experience is preferred",
    ],
    benefits: [
      "Full tuition and mandatory fees at your host university",
      "Monthly stipend to cover living costs",
      "Round-trip international airfare",
      "J-1 visa sponsorship and Fulbright health benefit coverage",
    ],
    howToApply: [
      "Create an account on the Fulbright online application portal",
      "Draft a statement of purpose and a personal statement",
      "Request academic references and transcripts",
      "Submit before the country deadline and prepare for a panel interview",
    ],
  },
  {
    id: "daad-epos-scholarship",
    name: "DAAD EPOS Scholarship",
    provider: "German Academic Exchange Service (DAAD)",
    country: "Germany",
    degreeLevels: ["Master's", "PhD"],
    fields: ["Mechanical Engineering", "Electrical Engineering", "Environmental Science"],
    fundingType: "Fully Funded",
    minCgpa: 3.3,
    amount:
      "Monthly stipend of roughly €934–1,300, plus travel allowance, health insurance and tuition support.",
    deadline: "2026-08-31",
    applyUrl: "https://www.daad.de",
    imageSrc:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Students collaborating around a laptop in a study group",
    summary:
      "DAAD's development-focused award for master's and PhD study in engineering and sustainability fields in Germany.",
    description:
      "EPOS (Development-Related Postgraduate Courses) funds students from developing countries pursuing master's or PhD programs at German universities in fields tied to development — engineering, environment, economics and public policy among them.",
    eligibility: [
      "Bachelor's degree completed with above-average results (roughly 3.3+ CGPA)",
      "At least two years of relevant professional experience for most programs",
      "Proof of German or English proficiency depending on the program language",
      "Applicants typically apply directly to the DAAD-funded program, not DAAD itself",
    ],
    benefits: [
      "Monthly stipend covering living costs in Germany",
      "Travel allowance and health, accident and liability insurance",
      "Tuition and study costs covered for the program length",
      "Optional German language course before program start",
    ],
    howToApply: [
      "Find a DAAD-listed EPOS program that matches your field",
      "Prepare transcripts, CV, motivation letter and reference letters",
      "Apply directly to the host program through the DAAD portal",
      "Attend an interview if shortlisted by the program committee",
    ],
  },
  {
    id: "australia-awards-scholarship",
    name: "Australia Awards Scholarship",
    provider: "Australian Government (DFAT)",
    country: "Australia",
    degreeLevels: ["Master's", "PhD"],
    fields: ["Public Health", "Economics", "Environmental Science"],
    fundingType: "Fully Funded",
    minCgpa: 3.2,
    amount:
      "Full tuition, return airfare, an establishment allowance and a fortnightly living stipend.",
    deadline: "2026-09-30",
    applyUrl: "https://www.dfat.gov.au/people-to-people/australia-awards",
    imageSrc:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Airport terminal with travellers walking past large windows",
    summary:
      "Australia's long-running development scholarship for students from Bangladesh and the wider Indo-Pacific.",
    description:
      "Australia Awards supports future leaders to undertake full-time study in Australia in fields tied to national development priorities, with strong alumni networks back in Bangladesh across government, academia and the private sector.",
    eligibility: [
      "Bangladeshi citizen not already holding Australian or NZ citizenship or residency",
      "Minimum CGPA of around 3.2 out of 4.00",
      "Nominated field must align with a listed development priority area",
      "Minimum IELTS 6.5 overall (no band under 6.0), unless taking a pathway course",
    ],
    benefits: [
      "Full tuition fees for the length of the award",
      "Return economy airfare to and from Australia",
      "One-off establishment allowance on arrival",
      "Fortnightly living stipend and overseas student health cover",
    ],
    howToApply: [
      "Check the current priority fields listed for Bangladesh",
      "Register and apply through the OASIS online application system",
      "Submit certified transcripts, IELTS scores and referee reports",
      "Attend shortlisting interviews conducted in-country",
    ],
  },
  {
    id: "vanier-canada-graduate-scholarship",
    name: "Vanier Canada Graduate Scholarship",
    provider: "Government of Canada",
    country: "Canada",
    degreeLevels: ["PhD"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.7,
    amount: "CAD $50,000 per year for three years, covering tuition and living costs.",
    deadline: "2026-11-04",
    applyUrl: "https://vanier.gc.ca",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Modern university building with glass architecture",
    summary:
      "Canada's most prestigious doctoral award, judged on academic excellence, research potential and leadership.",
    description:
      "The Vanier CGS is Canada's top doctoral scholarship, awarded through nominating universities rather than direct application. It looks for outstanding academic achievement alongside demonstrated research potential and leadership.",
    eligibility: [
      "Nominated by a Canadian institution offering the Vanier CGS (apply for admission first)",
      "First-class average, roughly equivalent to 3.7+ CGPA, in your previous degree",
      "Full-time PhD (or combined MA/PhD) enrolment for the funded period",
      "Strong record of research output, awards or leadership activities",
    ],
    benefits: [
      "CAD $50,000 per year for up to three years",
      "No restrictions on Canadian institution or research field",
      "Recognized as a top-tier credential for future academic careers",
      "Can be combined with limited additional research funding",
    ],
    howToApply: [
      "Secure PhD admission at a Vanier-eligible Canadian university",
      "Ask your department about their internal Vanier nomination process",
      "Prepare a research proposal, leadership statement and reference letters",
      "Submit through your university before their internal deadline",
    ],
  },
  {
    id: "chevening-scholarship",
    name: "Chevening Scholarship",
    provider: "UK Foreign, Commonwealth & Development Office",
    country: "UK",
    degreeLevels: ["Master's"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.0,
    amount:
      "Full tuition, a monthly stipend, airfare and an arrival/departure allowance for a one-year master's.",
    deadline: "2026-11-03",
    applyUrl: "https://www.chevening.org",
    imageSrc:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Historic university building with stone architecture",
    summary:
      "The UK government's global award for a fully funded one-year master's at any UK university.",
    description:
      "Chevening funds a one-year master's degree at any UK university, and is built around future leadership — most recipients go on to influential roles in government, business and civil society back home.",
    eligibility: [
      "Bangladeshi citizen with at least two years of work experience",
      "A completed undergraduate degree equivalent to UK second-class honours or above",
      "Return to Bangladesh for at least two years after the award ends",
      "No more than one UK master's degree already funded by Chevening or similar",
    ],
    benefits: [
      "Full tuition fees for one university-taught master's course",
      "Monthly stipend to cover accommodation and living costs",
      "Economy return airfare to the UK",
      "Arrival and departure allowances plus a thesis grant where applicable",
    ],
    howToApply: [
      "Apply online with up to three eligible master's course choices",
      "Write four short essays on leadership, networking and career plans",
      "Secure two references who can speak to your leadership potential",
      "Submit UK university offers by the Chevening conditional-offer deadline",
    ],
  },
  {
    id: "commonwealth-scholarship",
    name: "Commonwealth Scholarship",
    provider: "Commonwealth Scholarship Commission in the UK",
    country: "UK",
    degreeLevels: ["Master's", "PhD"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.5,
    amount:
      "Full tuition, a living allowance, return airfare and a thesis grant for PhD applicants.",
    deadline: "2026-12-15",
    applyUrl: "https://cscuk.fcdo.gov.uk",
    imageSrc:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Presenter speaking to a seated audience in a meeting room",
    summary:
      "A long-standing UK award for students from Commonwealth countries, prioritising development-relevant subjects.",
    description:
      "The Commonwealth Scholarship supports talented students from Commonwealth countries, including Bangladesh, to pursue master's or PhD study in the UK in subjects linked to development goals such as health, education, science and governance.",
    eligibility: [
      "Bangladeshi citizen with a first-class or strong upper-second bachelor's result",
      "Applying to study a subject aligned with development priorities",
      "Cannot afford to study in the UK without the scholarship (means-tested)",
      "Committed to returning to Bangladesh after completing the award",
    ],
    benefits: [
      "Full tuition and examination fees at your UK university",
      "Monthly living allowance and settling-in allowance",
      "Return economy airfare to the UK and back",
      "Thesis grant and study travel grant for eligible PhD scholars",
    ],
    howToApply: [
      "Choose a UK university course listed as Commonwealth-eligible",
      "Apply through the Commonwealth Scholarship Commission's online system",
      "Submit an endorsed application via a nominating body in Bangladesh",
      "Provide transcripts, references and a detailed personal statement",
    ],
  },
  {
    id: "erasmus-mundus-joint-masters",
    name: "Erasmus Mundus Joint Master Degrees",
    provider: "European Commission",
    country: "Multiple Countries",
    degreeLevels: ["Master's"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.4,
    amount:
      "Full tuition waiver, a monthly stipend of €1,000+, plus travel and installation costs across 2–3 EU countries.",
    deadline: "2027-01-15",
    applyUrl: "https://erasmus-plus.ec.europa.eu",
    imageSrc:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80&auto=format&fit=crop",
    imageAlt: "A sign reading 'love to learn' outside a campus building",
    summary:
      "Study a single master's across two or three top European universities, fully funded by the EU.",
    description:
      "Erasmus Mundus Joint Master Degrees (EMJMD) are highly selective two-year programs delivered jointly by a consortium of universities across at least two European countries — you study across campuses and graduate with a joint or multiple degree.",
    eligibility: [
      "Completed bachelor's degree relevant to the chosen joint program",
      "Competitive CGPA — most funded seats need roughly 3.4+ out of 4.00",
      "English or the program's language of instruction proficiency",
      "Open to applicants worldwide, with quotas for non-EU students",
    ],
    benefits: [
      "Full tuition waiver across all partner universities",
      "Monthly stipend covering living costs in each host country",
      "Travel and installation allowance for relocating between countries",
      "Insurance coverage for the full duration of the program",
    ],
    howToApply: [
      "Browse the EMJMD catalogue and shortlist joint programs in your field",
      "Apply directly through each consortium's own application portal",
      "Submit transcripts, motivation letter, CV and references",
      "Tick the scholarship option in the program's application form",
    ],
  },
  {
    id: "gates-cambridge-scholarship",
    name: "Gates Cambridge Scholarship",
    provider: "Gates Cambridge Trust, University of Cambridge",
    country: "UK",
    degreeLevels: ["Master's", "PhD"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.8,
    amount:
      "Full Cambridge tuition, a generous maintenance allowance, and discretionary funding for travel and research.",
    deadline: "2026-12-03",
    applyUrl: "https://www.gatescambridge.org",
    imageSrc:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&q=80&auto=format&fit=crop",
    imageAlt: "University campus building facade in a city setting",
    summary:
      "One of the world's most competitive awards, funding any full-time graduate course at the University of Cambridge.",
    description:
      "Gates Cambridge funds outstanding applicants from outside the UK to pursue a full-time postgraduate degree in any subject available at Cambridge, selecting for academic excellence, leadership and a commitment to improving others' lives.",
    eligibility: [
      "Non-UK citizen applying for full-time study at the University of Cambridge",
      "Outstanding academic record — typically near the top of your cohort (3.8+ CGPA)",
      "Must apply for, and be accepted onto, a Cambridge course first",
      "Demonstrated leadership and a commitment to improving the lives of others",
    ],
    benefits: [
      "Full tuition and college fees at Cambridge",
      "Generous maintenance allowance for living costs",
      "Discretionary funding for fieldwork, conferences and research costs",
      "Access to the Gates Cambridge scholar community and events",
    ],
    howToApply: [
      "Apply for admission to a Cambridge graduate course via the university portal",
      "Tick the box to be considered for Gates Cambridge funding",
      "Submit references, transcripts and a research proposal (for PhD applicants)",
      "Shortlisted candidates are invited to a Cambridge interview",
    ],
  },
  {
    id: "deutschlandstipendium",
    name: "Deutschlandstipendium",
    provider: "German Federal Ministry of Education & Research",
    country: "Germany",
    degreeLevels: ["Undergraduate", "Master's"],
    fields: ["Mechanical Engineering", "Computer Science", "Electrical Engineering"],
    fundingType: "Partially Funded",
    minCgpa: 3.2,
    amount: "€300 per month for at least two semesters, on top of any public funding you already receive.",
    deadline: "2026-10-01",
    applyUrl: "https://www.deutschlandstipendium.de",
    imageSrc:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Empty university classroom with a chalkboard and rows of desks",
    summary:
      "A merit-based top-up stipend offered directly by German universities to strong-performing students.",
    description:
      "The Deutschlandstipendium is a national program where individual German universities award a modest monthly stipend to talented students, funded jointly by the government and private sponsors — a good complement to a low-cost German tuition plan.",
    eligibility: [
      "Enrolled or admitted to a participating German university",
      "Strong academic record, typically top of your class or cohort",
      "Open to both German and international students, including Bangladeshis",
      "Some universities also weigh social engagement or personal circumstances",
    ],
    benefits: [
      "€300 per month, paid for at least two semesters",
      "Stackable with most other scholarships and part-time income",
      "No repayment required — it's a grant, not a loan",
      "Access to sponsor networking events at many universities",
    ],
    howToApply: [
      "Confirm your German university participates in the program",
      "Check that university's specific application window and criteria",
      "Submit transcripts, a short motivation letter and CV",
      "Apply directly through the university's student affairs office",
    ],
  },
  {
    id: "melbourne-graduate-research-scholarship",
    name: "Melbourne Graduate Research Scholarship",
    provider: "University of Melbourne",
    country: "Australia",
    degreeLevels: ["PhD"],
    fields: ["Business", "Public Health", "Data Science"],
    fundingType: "Tuition Waiver",
    minCgpa: 3.6,
    amount: "Full tuition fee offset plus a living allowance stipend for up to 3.5 years.",
    deadline: "2026-08-20",
    applyUrl: "https://scholarships.unimelb.edu.au",
    imageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Interior of a large university library with tall shelves",
    summary:
      "Melbourne's flagship PhD funding package, covering tuition and living costs for international researchers.",
    description:
      "The Melbourne Graduate Research Scholarship (MGRS) covers tuition and provides a living stipend for high-achieving international students undertaking a PhD, with priority given to research areas aligned with the university's strategic strengths.",
    eligibility: [
      "First-class honours degree or equivalent (roughly 3.6+ CGPA)",
      "A research proposal aligned with an available supervisor's area",
      "English proficiency meeting University of Melbourne's PhD entry requirements",
      "Applicants are assessed alongside their PhD admission application",
    ],
    benefits: [
      "Full tuition fee offset for the duration of candidature",
      "Living allowance stipend, indexed annually",
      "Relocation grant for students moving from overseas",
      "Access to university research training and travel funding schemes",
    ],
    howToApply: [
      "Contact a potential supervisor and confirm project fit before applying",
      "Submit a PhD admission application through the university's portal",
      "Tick the box to be considered for MGRS funding",
      "Provide transcripts, a research proposal and two academic references",
    ],
  },
  {
    id: "waterloo-international-masters-award",
    name: "Waterloo International Master's Award",
    provider: "University of Waterloo",
    country: "Canada",
    degreeLevels: ["Master's"],
    fields: ["Computer Science", "Data Science", "Mechanical Engineering"],
    fundingType: "Tuition Waiver",
    minCgpa: 3.3,
    amount: "CAD $2,500–$10,000 tuition credit, renewable each term based on academic standing.",
    deadline: "2026-09-15",
    applyUrl: "https://uwaterloo.ca/scholarships-awards-financial-aid",
    imageSrc:
      "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Student reading in a quiet library study space",
    summary:
      "An automatic tuition credit for strong incoming international master's students at Waterloo.",
    description:
      "The Waterloo International Master's Award reduces tuition costs for admitted international graduate students with a strong academic record, and is renewed each term as long as you maintain good academic standing — no separate application needed beyond admission.",
    eligibility: [
      "Admitted international student to an eligible Waterloo master's program",
      "Minimum CGPA of roughly 3.3 out of 4.00 in your undergraduate degree",
      "Full-time enrolment in a research-based or course-based master's",
      "Automatically assessed at admission — no extra application form",
    ],
    benefits: [
      "CAD $2,500 to $10,000 credited directly against tuition",
      "Renewable each academic term you remain in good standing",
      "Can be combined with departmental research assistantships",
      "Reduces the net cost of an already research-strong program",
    ],
    howToApply: [
      "Apply for admission to an eligible Waterloo master's program",
      "Submit strong transcripts as part of your regular application",
      "Award eligibility is assessed automatically by the graduate office",
      "Check your offer letter for the award amount once admitted",
    ],
  },
  {
    id: "rhodes-scholarship",
    name: "Rhodes Scholarship",
    provider: "Rhodes Trust, University of Oxford",
    country: "UK",
    degreeLevels: ["Master's", "PhD"],
    fields: [],
    fundingType: "Fully Funded",
    minCgpa: 3.85,
    amount: "Full Oxford tuition, a generous stipend, and travel costs for up to three years of study.",
    deadline: "2026-10-05",
    applyUrl: "https://www.rhodeshouse.ox.ac.uk",
    imageSrc:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80&auto=format&fit=crop",
    imageAlt: "European university campus with modern buildings",
    summary:
      "One of the oldest and most selective international scholarships, funding postgraduate study at Oxford.",
    description:
      "The Rhodes Scholarship funds outstanding students to study at the University of Oxford, selecting for exceptional academic ability alongside character, leadership and a commitment to service — regularly cited as one of the world's most competitive awards.",
    eligibility: [
      "Bangladeshi citizen meeting the age requirements for your constituency",
      "Exceptional academic record, generally near the top of your cohort",
      "Strong evidence of leadership, energy and service to others",
      "Willingness to commit fully to residential study at Oxford",
    ],
    benefits: [
      "Full tuition and college fees at the University of Oxford",
      "A generous living stipend for the length of your course",
      "Return airfare and a settling-in allowance",
      "Lifetime access to the global Rhodes Scholar network",
    ],
    howToApply: [
      "Confirm the Rhodes constituency and process that covers Bangladesh",
      "Prepare a personal statement, CV and academic references",
      "Submit the online application before the constituency deadline",
      "Shortlisted candidates attend interviews with a selection committee",
    ],
  },
  ...MORE_SCHOLARSHIPS,
];
