// What a funded place pays you: real figures from a funder's or a host
// university's page, checked November 2026. Amounts change each year, so every
// card links to its source.

export type Currency = "USD" | "CAD" | "GBP" | "AUD" | "EUR" | "SEK" | "JPY" | "CNY";

export type Stipend = {
  country: string;
  flag: string;
  level: string;
  /** Who pays it: the award, or the university that sets the minimum. */
  award: string;
  /** As the source states it. */
  amount: string;
  per: "a year" | "a month";
  /** The figure in `amount` (the lower end of a range), for the taka sums. */
  value: number;
  currency: Currency;
  note: string;
  source: string;
};

// Taka per unit at the Bangladesh Bank rate of 18 October 2026, the middle of
// its bid and ask rates (CNY uses the CNH rate the bank publishes).
export const FX_DATE = "18 October 2026";
export const FX_SOURCE = "https://www.bb.org.bd/econdata/exchange_rate/exchange_rate_18_10_2026.pdf";
const FX: Record<Currency, number> = {
  USD: 123.565,
  CAD: 87.39,
  GBP: 164.7,
  AUD: 85.84,
  EUR: 138.881,
  SEK: 12.466,
  JPY: 0.782,
  CNY: 18.481,
};

/** What the stipend comes to in taka each month. */
export function takaPerMonth(s: Stipend): number {
  const monthly = s.per === "a year" ? s.value / 12 : s.value;
  return monthly * FX[s.currency];
}

/** ৳3.9 lakh, or ৳64,684 below a lakh. */
export function formatTaka(n: number): string {
  if (n >= 100_000) return `৳${(n / 100_000).toFixed(1)} lakh`;
  return `৳${Math.round(n).toLocaleString("en-IN")}`;
}

export const STIPENDS: Stipend[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    level: "PhD",
    award: "University of Wisconsin–Madison",
    amount: "$37,417",
    per: "a year",
    value: 37417,
    currency: "USD",
    note: "Minimum research assistantship for 2026–27, with tuition remission.",
    source: "https://hr.wisc.edu/docs/compensation/approved-graduate-assistant-stipend-rates-for-2026-2027-fiscal-year.pdf",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    level: "PhD",
    award: "University of British Columbia",
    amount: "CA$40,000",
    per: "a year",
    value: 40000,
    currency: "CAD",
    note: "UBC's minimum PhD funding in years 1 to 4, from Fall 2026.",
    source: "https://www.postdocs.ubc.ca/node/101526",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    level: "PhD",
    award: "UKRI doctoral studentship",
    amount: "£21,805",
    per: "a year",
    value: 21805,
    currency: "GBP",
    note: "UKRI's tax-free minimum from October 2026; £23,805 in London.",
    source:
      "https://www.ukri.org/apply-for-funding/studentships-and-doctoral-training/get-a-studentship-to-fund-your-doctorate/",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    level: "PhD",
    award: "University of Sydney RTP stipend",
    amount: "A$44,293",
    per: "a year",
    value: 44293,
    currency: "AUD",
    note: "The 2027 rate, with tuition covered. Other universities set their own.",
    source: "https://www.sydney.edu.au/scholarships/australian-government-research-training-program/rtp-international.html",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    level: "Master's",
    award: "DAAD Study Scholarship",
    amount: "€992",
    per: "a month",
    value: 992,
    currency: "EUR",
    note: "Plus insurance payments and a €460 yearly study allowance.",
    source: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200",
  },
  {
    country: "Europe",
    flag: "🇪🇺",
    level: "Master's",
    award: "Erasmus Mundus Joint Master",
    amount: "€1,400",
    per: "a month",
    value: 1400,
    currency: "EUR",
    note: "Tuition is waived; you study in two or more countries.",
    source: "https://www.gla.ac.uk/postgraduate/erasmusmundus/magma/scholarships/",
  },
  {
    country: "Sweden",
    flag: "🇸🇪",
    level: "Master's",
    award: "Swedish Institute Scholarship",
    amount: "SEK 12,000",
    per: "a month",
    value: 12000,
    currency: "SEK",
    note: "Full tuition, plus a one-time SEK 15,000 travel grant.",
    source: "https://kau.se/en/si-scholarship-global-professionals",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    level: "Master's and PhD",
    award: "MEXT Scholarship",
    amount: "¥143,000–145,000",
    per: "a month",
    value: 143000,
    currency: "JPY",
    note: "The amount depends on your level; tuition is exempted.",
    source: "https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/",
  },
  {
    country: "China",
    flag: "🇨🇳",
    level: "PhD",
    award: "Chinese Government Scholarship",
    amount: "RMB 3,500",
    per: "a month",
    value: 3500,
    currency: "CNY",
    note: "Tuition-free with a shared room; RMB 3,000 for master's.",
    source: "https://ic-en.ucas.ac.cn/page/chinese-government-scholarship",
  },
];
