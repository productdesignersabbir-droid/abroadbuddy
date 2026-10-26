export type RouteInfo = {
  href: string;
  label: string;
  navLabel: string;
  description: string;
};

export type NavGroup = {
  label: string;
  items: RouteInfo[];
};

export type NavEntry = RouteInfo | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

export const UNIVERSITIES_ROUTE: RouteInfo = {
  href: "/universities",
  label: "University Finder",
  navLabel: "University Finder",
  description:
    "Filter by CGPA, country, major and budget to get a ranked shortlist of programs.",
};

export const TOOLS_ROUTE: RouteInfo = {
  href: "/tools",
  label: "AI CV · SOP · LOR",
  navLabel: "AI Tools",
  description:
    "Generate strong drafts in minutes, or hire a vetted specialist to write them with you.",
};

export const MENTORS_ROUTE: RouteInfo = {
  href: "/mentors",
  label: "Find My Mentor",
  navLabel: "Higher Study Mentoring",
  description:
    "Book 1:1 or group sessions with students and alumni who've walked your exact path.",
};

export const LAB_KEMON_ROUTE: RouteInfo = {
  href: "/lab-kemon",
  label: "Find your Professor",
  navLabel: "Find your Professor",
  description:
    "Read professor ratings, lab culture and funding reviews before you commit.",
};

export const RESEARCH_MENTORING_ROUTE: RouteInfo = {
  href: "/research-mentoring",
  label: "1:1 Research Mentoring",
  navLabel: "1:1 Research Mentorship",
  description:
    "Book a paid 1:1 session with a research mentor, from topic selection to publication.",
};

export const STORIES_ROUTE: RouteInfo = {
  href: "/stories",
  label: "Journey Stories",
  navLabel: "Success Stories",
  description:
    "Read real study-abroad journeys, filter by country or field, and share your own.",
};

export const VISA_STORIES_ROUTE: RouteInfo = {
  href: "/visa-stories",
  label: "Visa Information Hub",
  navLabel: "Visa Stories",
  description:
    "Read real visa interview experiences and outcomes, and share your own once it's approved.",
};

export const RESOURCES_ROUTE: RouteInfo = {
  href: "/resources",
  label: "Housing & Flights",
  navLabel: "Housing & Flights",
  description:
    "Compare abroad housing, flight fares and living costs before you pack your bags.",
};

export const CONFERENCES_ROUTE: RouteInfo = {
  href: "/conferences",
  label: "Conference Calendar",
  navLabel: "Conference Calendar",
  description:
    "Track local and global conferences, research fests and paper deadlines.",
};

export const SCHOLARSHIPS_ROUTE: RouteInfo = {
  href: "/scholarships",
  label: "Scholarship Calendar",
  navLabel: "Scholarship Calendar",
  description:
    "Browse upcoming scholarships month by month, filter by country and CGPA, and never miss a deadline.",
};

export const IELTS_ROUTE: RouteInfo = {
  href: "/ielts",
  label: "IELTS Mock Tests",
  navLabel: "IELTS",
  description:
    "Practice free mock tests, then hire expert coaches for IELTS, GRE and beyond.",
};

export const GRE_ROUTE: RouteInfo = {
  href: "/gre",
  label: "GRE Prep",
  navLabel: "GRE",
  description:
    "Understand the GRE format, get study tips, and book a specialist coach.",
};

export const GMAT_ROUTE: RouteInfo = {
  href: "/gmat",
  label: "GMAT Prep",
  navLabel: "GMAT",
  description:
    "Understand the GMAT Focus Edition format, get study tips, and book a specialist coach.",
};

export const MENTORSHIP_GROUP: NavGroup = {
  label: "Mentorship",
  items: [MENTORS_ROUTE, RESEARCH_MENTORING_ROUTE],
};

export const STORIES_AND_INFO_GROUP: NavGroup = {
  label: "Stories & Information",
  items: [STORIES_ROUTE, VISA_STORIES_ROUTE, RESOURCES_ROUTE],
};

export const PREPARATION_GROUP: NavGroup = {
  label: "Preparation",
  items: [IELTS_ROUTE, GRE_ROUTE, GMAT_ROUTE],
};

export const READINESS_ROUTE: RouteInfo = {
  href: "/readiness",
  label: "Study Abroad Readiness",
  navLabel: "Study Abroad Readiness",
  description:
    "Check how ready you are to apply abroad, and see exactly what to work on next.",
};

export const RESEARCH_DIRECTION_ROUTE: RouteInfo = {
  href: "/research-direction",
  label: "Find my research direction",
  navLabel: "Find my research direction",
  description: "Turn your subject and interests into three research directions you can start this month.",
};

export const APPLICATION_STUDIO_ROUTE: RouteInfo = {
  href: "/application-studio",
  label: "Application Studio",
  navLabel: "Application Studio",
  description: "Draft your CV, statement, research proposal or reference request in a clear order.",
};

export const MENTORING_ROUTE: RouteInfo = {
  href: "/mentoring",
  label: "Mentoring",
  navLabel: "Mentoring",
  description: "Book a session with students, alumni and researchers abroad.",
};

export const PREPARE_GROUP: NavGroup = {
  label: "Prepare",
  items: [RESEARCH_DIRECTION_ROUTE, APPLICATION_STUDIO_ROUTE, MENTORING_ROUTE],
};

// The five features live on the site right now. Every other route above is
// hidden from the nav, footer and home page but its page still exists — add it
// back to these lists to bring it back.
export const ROUTES: RouteInfo[] = [
  READINESS_ROUTE,
  UNIVERSITIES_ROUTE,
  LAB_KEMON_ROUTE,
  SCHOLARSHIPS_ROUTE,
  CONFERENCES_ROUTE,
  ...PREPARE_GROUP.items,
];

export const NAV_ENTRIES: NavEntry[] = [
  READINESS_ROUTE,
  UNIVERSITIES_ROUTE,
  LAB_KEMON_ROUTE,
  SCHOLARSHIPS_ROUTE,
  CONFERENCES_ROUTE,
  PREPARE_GROUP,
];
