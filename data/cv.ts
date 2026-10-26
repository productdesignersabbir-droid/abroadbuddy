import type { StudioDegree } from "@/data/application-studio";

// The CV builder in Application Studio: structured details that every
// template renders, plus an example per degree to show how it looks.

export type CvEntry = {
  id: string;
  title: string;
  org: string;
  place: string;
  dates: string;
  /** One bullet per line. */
  details: string;
};

export type CvData = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  links: string;
  summary: string;
  education: CvEntry[];
  experience: CvEntry[];
  projects: CvEntry[];
  /** One per line. */
  publications: string;
  awards: string;
  /** Comma-separated. */
  skills: string;
  languages: string;
};

export type EntryList = "education" | "experience" | "projects";

let nextId = 0;
export const newEntry = (): CvEntry => ({
  id: `e${Date.now()}-${nextId++}`,
  title: "",
  org: "",
  place: "",
  dates: "",
  details: "",
});

export const emptyCv = (): CvData => ({
  name: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  links: "",
  summary: "",
  education: [newEntry()],
  experience: [newEntry()],
  projects: [],
  publications: "",
  awards: "",
  skills: "",
  languages: "",
});

export const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const items = (text: string) =>
  text
    .split(/[,\n]/)
    .map((l) => l.trim())
    .filter(Boolean);

export const filledEntries = (list: CvEntry[]) =>
  list.filter((e) => e.title.trim() || e.org.trim() || e.details.trim());

/** Section names change with the degree: school leavers list activities. */
export function cvLabels(degree: StudioDegree) {
  return {
    experience: degree === "bachelors" ? "Activities and leadership" : degree === "phd" ? "Research experience" : "Experience",
    projects: "Projects",
    publications: "Publications",
    awards: degree === "bachelors" ? "Awards and achievements" : "Awards and certificates",
    showPublications: degree !== "bachelors",
  };
}

export function exampleCv(degree: StudioDegree): CvData {
  const id = () => newEntry().id;
  if (degree === "bachelors") {
    return {
      name: "Nusrat Jahan",
      headline: "Applicant, BSc Computer Science",
      email: "nusrat.jahan@email.com",
      phone: "+880 1700 000000",
      location: "Dhaka, Bangladesh",
      links: "github.com/nusratj",
      summary:
        "HSC Science student with a strong record in mathematics and a habit of building small apps to solve everyday problems. Looking to study computer science and work on tools that make learning easier.",
      education: [
        { id: id(), title: "HSC, Science group", org: "Holy Cross College", place: "Dhaka", dates: "2024 – 2026", details: "GPA 5.00 (expected)\nHigher Mathematics, Physics, Chemistry, ICT" },
        { id: id(), title: "SSC, Science group", org: "Viqarunnisa Noon School", place: "Dhaka", dates: "2022 – 2024", details: "GPA 5.00" },
      ],
      experience: [
        { id: id(), title: "President", org: "College Programming Club", place: "Dhaka", dates: "2025 – 2026", details: "Ran weekly problem-solving sessions for 40 members\nOrganised the club's first inter-college coding contest" },
        { id: id(), title: "Volunteer tutor", org: "JAAGO Foundation", place: "Dhaka", dates: "2024 – 2025", details: "Taught basic maths to Class 6 students every Saturday" },
      ],
      projects: [
        { id: id(), title: "Bus timetable app", org: "Personal project", place: "", dates: "2025", details: "Android app showing local bus times; used by 300+ students" },
      ],
      publications: "",
      awards: "Bangladesh Mathematical Olympiad, regional champion, 2025\nNational Science Fair, finalist, 2024",
      skills: "Python, Java, HTML and CSS, problem solving, public speaking",
      languages: "Bangla (native), English (IELTS 7.5)",
    };
  }
  const phd = degree === "phd";
  return {
    name: "Rafiul Islam",
    headline: phd ? "PhD applicant, Environmental Science" : "MSc applicant, Data Science",
    email: "rafiul.islam@email.com",
    phone: "+880 1800 000000",
    location: "Dhaka, Bangladesh",
    links: phd ? "scholar.google.com/rafiul, linkedin.com/in/rafiul" : "linkedin.com/in/rafiul, github.com/rafiul",
    summary: phd
      ? "Environmental engineer with two years of research on flood risk in north-east Bangladesh. First author of one journal paper. Looking to build low-cost early-warning methods for climate-vulnerable communities."
      : "Computer science graduate with two years of data work in development research. Comfortable taking messy survey data to clear, decision-ready analysis. Looking to deepen skills in machine learning for public policy.",
    education: [
      {
        id: id(),
        title: phd ? "MSc in Water Resources Engineering" : "BSc in Computer Science and Engineering",
        org: phd ? "Bangladesh University of Engineering and Technology" : "BRAC University",
        place: "Dhaka",
        dates: phd ? "2023 – 2025" : "2019 – 2023",
        details: phd ? "CGPA 3.85 / 4.00\nThesis: Flash-flood forecasting with rain-gauge networks in Sylhet" : "CGPA 3.72 / 4.00\nThesis: Predicting school dropout from household survey data",
      },
      ...(phd
        ? [{ id: id(), title: "BSc in Civil Engineering", org: "Shahjalal University of Science and Technology", place: "Sylhet", dates: "2018 – 2022", details: "CGPA 3.70 / 4.00" }]
        : []),
    ],
    experience: [
      {
        id: id(),
        title: phd ? "Research assistant" : "Data analyst",
        org: phd ? "Institute of Water and Flood Management, BUET" : "BRAC Institute of Governance and Development",
        place: "Dhaka",
        dates: "2023 – present",
        details: phd
          ? "Built a rainfall-runoff model for three upazilas using 20 years of gauge data\nLed field surveys with 120 households on early-warning use"
          : "Cleaned and analysed survey data for 3,000 households across 8 districts\nBuilt dashboards used by the programme team in monthly reviews",
      },
      {
        id: id(),
        title: phd ? "Teaching assistant" : "Software engineering intern",
        org: phd ? "Department of Civil Engineering, SUST" : "Brain Station 23",
        place: phd ? "Sylhet" : "Dhaka",
        dates: phd ? "2022 – 2023" : "Summer 2022",
        details: phd ? "Ran lab sessions in hydraulics for 60 undergraduates" : "Wrote API tests that cut release bugs by a third",
      },
    ],
    projects: [
      {
        id: id(),
        title: phd ? "Open flood map of Sunamganj" : "Dropout early-warning model",
        org: phd ? "Personal project" : "Thesis project",
        place: "",
        dates: "2024",
        details: phd ? "Combined satellite and gauge data into an open map used by two NGOs" : "Random-forest model with 0.81 AUC on held-out districts",
      },
    ],
    publications: phd
      ? "Islam, R. and Rahman, M. (2025). Flash-flood forecasting with sparse rain-gauge networks. Regional Water Studies, 12(3), 45–58."
      : "",
    awards: phd ? "Dean's List, BUET, 2024\nBest Paper, National Water Conference, 2024" : "Dean's List, BRAC University, 2021–2023\nGoogle Data Analytics Certificate, 2023",
    skills: phd ? "Python, R, QGIS, HEC-RAS, field surveys, statistics" : "Python, SQL, pandas, scikit-learn, Power BI, survey analysis",
    languages: "Bangla (native), English (IELTS 7.5)",
  };
}
