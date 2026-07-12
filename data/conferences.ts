import { MAJORS, type Major } from "@/data/universities";

export { MAJORS };
export type { Major };

export type ConferenceType = "Conference" | "Research Fest" | "Paper Deadline";
export type LocationType = "Local" | "International";
export type EventFormat = "In-person" | "Virtual" | "Hybrid";

export const CONFERENCE_TYPES: ConferenceType[] = [
  "Conference",
  "Research Fest",
  "Paper Deadline",
];

export type Conference = {
  id: string;
  name: string;
  host: string;
  type: ConferenceType;
  fields: Major[];
  locationType: LocationType;
  city: string;
  format: EventFormat;
  /** ISO date. For "Paper Deadline" listings with no physical event, this is
   * the expected notification / publication date instead of an event date. */
  eventDate: string;
  eventEndDate?: string;
  deadline: string;
  url: string;
  description: string;
};

export const CONFERENCES: Conference[] = [
  {
    id: "national-physics-research-fest",
    name: "National Physics Research Fest 2026",
    host: "Bangladesh Physical Society & Dept. of Physics, DU",
    type: "Research Fest",
    fields: ["Physics"],
    locationType: "Local",
    city: "Dhaka University, Dhaka, Bangladesh",
    format: "In-person",
    eventDate: "2026-09-05",
    deadline: "2026-07-18",
    url: "https://www.du.ac.bd",
    description:
      "Undergrad and grad students present original research posters and talks judged by university faculty.",
  },
  {
    id: "ieom-dhaka-2026",
    name: "IEOM Dhaka International Conference",
    host: "Industrial Engineering & Operations Management Society",
    type: "Conference",
    fields: ["Mechanical Engineering", "Business"],
    locationType: "Local",
    city: "Dhaka, Bangladesh",
    format: "Hybrid",
    eventDate: "2026-08-24",
    eventEndDate: "2026-08-26",
    deadline: "2026-07-25",
    url: "https://www.ieomsociety.org",
    description:
      "Regional gathering for industrial engineering, operations and supply-chain researchers and practitioners.",
  },
  {
    id: "acl-2026",
    name: "ACL 2026 — Association for Computational Linguistics",
    host: "Association for Computational Linguistics",
    type: "Conference",
    fields: ["Computer Science"],
    locationType: "International",
    city: "Singapore",
    format: "In-person",
    eventDate: "2026-11-16",
    eventEndDate: "2026-11-20",
    deadline: "2026-07-30",
    url: "https://www.aclweb.org",
    description:
      "Top-tier venue for natural language processing research, from core NLP theory to applied systems.",
  },
  {
    id: "ieee-access-renewable-energy",
    name: "IEEE Access — Special Issue on Renewable Energy Systems",
    host: "IEEE Access (Journal)",
    type: "Paper Deadline",
    fields: ["Electrical Engineering", "Environmental Science"],
    locationType: "International",
    city: "Worldwide (online submission)",
    format: "Virtual",
    eventDate: "2026-11-15",
    deadline: "2026-07-31",
    url: "https://ieeeaccess.ieee.org",
    description:
      "Open-access special issue on grid-scale renewable energy and storage — no travel required to submit.",
  },
  {
    id: "bd-robotics-ai-fest",
    name: "Bangladesh Robotics & AI Fest",
    host: "BUET Robotics & AI Club, with IEEE Bangladesh Section",
    type: "Research Fest",
    fields: ["Computer Science", "Electrical Engineering"],
    locationType: "Local",
    city: "BUET, Dhaka, Bangladesh",
    format: "In-person",
    eventDate: "2026-10-03",
    deadline: "2026-08-10",
    url: "https://www.buet.ac.bd",
    description:
      "Student robotics demos, AI project showcases and a poster track open to undergrads nationwide.",
  },
  {
    id: "jde-call-for-papers",
    name: "Journal of Development Economics — Call for Papers",
    host: "Journal of Development Economics (Elsevier)",
    type: "Paper Deadline",
    fields: ["Economics"],
    locationType: "International",
    city: "Worldwide (online submission)",
    format: "Virtual",
    eventDate: "2026-12-01",
    deadline: "2026-08-15",
    url: "https://www.journals.elsevier.com/journal-of-development-economics",
    description:
      "Special issue on education access and labor markets in South Asia — open to graduate researchers.",
  },
  {
    id: "neurips-2026",
    name: "NeurIPS 2026",
    host: "Neural Information Processing Systems Foundation",
    type: "Conference",
    fields: ["Computer Science", "Data Science"],
    locationType: "International",
    city: "San Diego, USA",
    format: "In-person",
    eventDate: "2026-12-08",
    eventEndDate: "2026-12-13",
    deadline: "2026-09-05",
    url: "https://neurips.cc",
    description:
      "The largest global machine learning research conference, spanning theory, systems and applications.",
  },
  {
    id: "iccit-2026",
    name: "ICCIT 2026 — Intl. Conference on Computer & Information Technology",
    host: "IEEE Bangladesh Section & BUET CSE Dept.",
    type: "Conference",
    fields: ["Computer Science", "Data Science"],
    locationType: "Local",
    city: "Dhaka, Bangladesh",
    format: "Hybrid",
    eventDate: "2026-12-19",
    eventEndDate: "2026-12-21",
    deadline: "2026-09-10",
    url: "https://www.ieee.org",
    description:
      "Bangladesh's flagship peer-reviewed CS conference, bringing together academia and industry.",
  },
  {
    id: "global-health-research-symposium",
    name: "Global Health Research Symposium",
    host: "Global Health Council",
    type: "Research Fest",
    fields: ["Public Health"],
    locationType: "International",
    city: "Geneva, Switzerland",
    format: "Hybrid",
    eventDate: "2026-11-02",
    eventEndDate: "2026-11-04",
    deadline: "2026-09-20",
    url: "https://www.who.int",
    description:
      "Early-career researcher symposium on public health systems, funding panels and poster sessions.",
  },
  {
    id: "ieee-globecom-2026",
    name: "IEEE GLOBECOM 2026",
    host: "IEEE Communications Society",
    type: "Conference",
    fields: ["Electrical Engineering"],
    locationType: "International",
    city: "Taipei, Taiwan",
    format: "In-person",
    eventDate: "2026-12-07",
    eventEndDate: "2026-12-11",
    deadline: "2026-10-01",
    url: "https://www.comsoc.org",
    description:
      "Flagship global communications and networking conference covering 5G/6G, IoT and signal processing.",
  },
];
