import { MAJORS } from "@/data/universities";

export type ToolId = "cv" | "sop" | "lor";
export type ToolTier = "Free" | "Premium";

export type ToolFormField = {
  id: string;
  label: string;
  type: "text" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
};

export type WritingTool = {
  id: ToolId;
  name: string;
  shortName: string;
  description: string;
  tier: ToolTier;
  fields: ToolFormField[];
};

export const TOOLS: WritingTool[] = [
  {
    id: "cv",
    name: "CV / Resume",
    shortName: "CV",
    description:
      "Turn your education, projects and experience into a clean, application-ready resume in minutes.",
    tier: "Free",
    fields: [
      {
        id: "targetProgram",
        label: "Target program / role",
        type: "text",
        placeholder: "e.g. MS in Computer Science",
      },
      {
        id: "university",
        label: "Target university (optional)",
        type: "text",
        placeholder: "e.g. University of Toronto",
      },
      {
        id: "field",
        label: "Field of study",
        type: "select",
        options: [...MAJORS],
      },
      {
        id: "background",
        label: "Education, key projects & skills",
        type: "textarea",
        placeholder:
          "e.g. BSc in CSE from BUET, two backend development internships, published one research paper...",
      },
    ],
  },
  {
    id: "sop",
    name: "Statement of Purpose",
    shortName: "SOP",
    description:
      "Draft a compelling Statement of Purpose that ties your background to your target program.",
    tier: "Premium",
    fields: [
      {
        id: "program",
        label: "Target program",
        type: "text",
        placeholder: "e.g. MS in Data Science",
      },
      {
        id: "university",
        label: "Target university",
        type: "text",
        placeholder: "e.g. Georgia Tech",
      },
      {
        id: "field",
        label: "Field of study",
        type: "select",
        options: [...MAJORS],
      },
      {
        id: "motivation",
        label: "Why this field & program",
        type: "textarea",
        placeholder:
          "e.g. I want to specialize in NLP after building a Bangla speech-recognition project...",
      },
      {
        id: "background",
        label: "Relevant background & achievements",
        type: "textarea",
        placeholder:
          "e.g. BSc in EEE, thesis on signal processing, one year at a fintech startup...",
      },
    ],
  },
  {
    id: "lor",
    name: "Letter of Recommendation",
    shortName: "LOR",
    description:
      "Generate a structured Letter of Recommendation draft your recommender can review and personalize.",
    tier: "Free",
    fields: [
      {
        id: "studentName",
        label: "Student's full name",
        type: "text",
        placeholder: "e.g. Farhana Akter",
      },
      {
        id: "relationship",
        label: "Your relationship to the student",
        type: "select",
        options: [
          "Academic advisor",
          "Course instructor",
          "Research supervisor",
          "Employer / Manager",
        ],
      },
      {
        id: "program",
        label: "Program they're applying to",
        type: "text",
        placeholder: "e.g. PhD in Mechanical Engineering",
      },
      {
        id: "strengths",
        label: "Key strengths & achievements to highlight",
        type: "textarea",
        placeholder:
          "e.g. Top 5% in my thermodynamics course, led a capstone project on renewable energy...",
      },
    ],
  },
];
