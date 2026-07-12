export type RouteInfo = {
  href: string;
  label: string;
  navLabel: string;
  description: string;
};

export const ROUTES: RouteInfo[] = [
  {
    href: "/universities",
    label: "University Search",
    navLabel: "Universities",
    description:
      "Filter by CGPA, country, major and budget to get a ranked shortlist of programs.",
  },
  {
    href: "/tools",
    label: "AI CV · SOP · LOR",
    navLabel: "AI Tools",
    description:
      "Generate strong drafts in minutes, or hire a vetted specialist to write them with you.",
  },
  {
    href: "/mentors",
    label: "Find My Mentor",
    navLabel: "Mentors",
    description:
      "Book 1:1 or group sessions with students and alumni who've walked your exact path.",
  },
  {
    href: "/lab-kemon",
    label: "Lab Kemon",
    navLabel: "Lab Kemon",
    description:
      "Read professor ratings, lab culture and funding reviews before you commit.",
  },
  {
    href: "/stories",
    label: "Journey Stories",
    navLabel: "Stories",
    description:
      "Read real study-abroad journeys, filter by country or field, and share your own.",
  },
  {
    href: "/conferences",
    label: "Conference Calendar",
    navLabel: "Conferences",
    description:
      "Track local and global conferences, research fests and paper deadlines.",
  },
  {
    href: "/resources",
    label: "Housing & Flights",
    navLabel: "Housing & Flights",
    description:
      "Compare abroad housing, flight fares and living costs before you pack your bags.",
  },
  {
    href: "/ielts",
    label: "IELTS Mock Tests",
    navLabel: "IELTS Prep",
    description:
      "Practice free mock tests, then hire expert coaches for IELTS, GRE and beyond.",
  },
];
