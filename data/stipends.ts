// What a funded place pays you: real, named awards with the figure from the
// funder's or a host university's page. Checked November 2026. Amounts change
// each year, so every card links to its source.

export type Stipend = {
  country: string;
  flag: string;
  award: string;
  level: string;
  amount: string;
  per: "a year" | "a month";
  note: string;
  source: string;
};

export const STIPENDS: Stipend[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    award: "NSF Graduate Research Fellowship",
    level: "PhD",
    amount: "$37,000",
    per: "a year",
    note: "Plus $16,000 a year to your university for tuition and fees.",
    source: "https://www.nsf.gov/funding/initiatives/grfp",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    award: "UKRI doctoral studentship",
    level: "PhD",
    amount: "£21,805",
    per: "a year",
    note: "UKRI's minimum from October 2026; £23,805 in London.",
    source:
      "https://www.ukri.org/apply-for-funding/studentships-and-doctoral-training/get-a-studentship-to-fund-your-doctorate/",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    award: "DAAD Study Scholarship",
    level: "Master's",
    amount: "€992",
    per: "a month",
    note: "Plus insurance payments and a €460 yearly study allowance.",
    source: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200",
  },
  {
    country: "Europe",
    flag: "🇪🇺",
    award: "Erasmus Mundus Joint Master",
    level: "Master's",
    amount: "€1,400",
    per: "a month",
    note: "Tuition is waived; you study in two or more countries.",
    source: "https://www.gla.ac.uk/postgraduate/erasmusmundus/magma/scholarships/",
  },
  {
    country: "Sweden",
    flag: "🇸🇪",
    award: "Swedish Institute Scholarship",
    level: "Master's",
    amount: "SEK 12,000",
    per: "a month",
    note: "Full tuition, plus a one-time SEK 15,000 travel grant.",
    source: "https://kau.se/en/si-scholarship-global-professionals",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    award: "MEXT Scholarship",
    level: "Master's and PhD",
    amount: "¥143,000–145,000",
    per: "a month",
    note: "The amount depends on your level; tuition is exempted.",
    source: "https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/",
  },
  {
    country: "China",
    flag: "🇨🇳",
    award: "Chinese Government Scholarship",
    level: "PhD",
    amount: "RMB 3,500",
    per: "a month",
    note: "Tuition-free with a shared room; RMB 3,000 for master's.",
    source: "https://ic-en.ucas.ac.cn/page/chinese-government-scholarship",
  },
];
