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
  label: "University Search",
  navLabel: "Universities",
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
  navLabel: "Mentors",
  description:
    "Book 1:1 or group sessions with students and alumni who've walked your exact path.",
};

export const LAB_KEMON_ROUTE: RouteInfo = {
  href: "/lab-kemon",
  label: "Lab Kemon",
  navLabel: "Lab Kemon",
  description:
    "Read professor ratings, lab culture and funding reviews before you commit.",
};

export const RESEARCH_MENTORING_ROUTE: RouteInfo = {
  href: "/research-mentoring",
  label: "1:1 Research Mentoring",
  navLabel: "Research Mentoring",
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
  navLabel: "Conferences",
  description:
    "Track local and global conferences, research fests and paper deadlines.",
};

export const SCHOLARSHIPS_ROUTE: RouteInfo = {
  href: "/scholarships",
  label: "Scholarship Calendar",
  navLabel: "Scholarships",
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

export const STORIES_AND_INFO_GROUP: NavGroup = {
  label: "Stories & Information",
  items: [STORIES_ROUTE, VISA_STORIES_ROUTE, RESOURCES_ROUTE],
};

export const PREPARATION_GROUP: NavGroup = {
  label: "Preparation",
  items: [IELTS_ROUTE, GRE_ROUTE, GMAT_ROUTE],
};

// Every real page, flat — used for the footer and any full-site listing.
export const ROUTES: RouteInfo[] = [
  UNIVERSITIES_ROUTE,
  TOOLS_ROUTE,
  MENTORS_ROUTE,
  LAB_KEMON_ROUTE,
  RESEARCH_MENTORING_ROUTE,
  STORIES_ROUTE,
  VISA_STORIES_ROUTE,
  RESOURCES_ROUTE,
  CONFERENCES_ROUTE,
  SCHOLARSHIPS_ROUTE,
  IELTS_ROUTE,
  GRE_ROUTE,
  GMAT_ROUTE,
];

// Nav structure — some entries are single links, some are dropdown groups.
export const NAV_ENTRIES: NavEntry[] = [
  UNIVERSITIES_ROUTE,
  TOOLS_ROUTE,
  MENTORS_ROUTE,
  LAB_KEMON_ROUTE,
  RESEARCH_MENTORING_ROUTE,
  STORIES_AND_INFO_GROUP,
  CONFERENCES_ROUTE,
  SCHOLARSHIPS_ROUTE,
  PREPARATION_GROUP,
];
