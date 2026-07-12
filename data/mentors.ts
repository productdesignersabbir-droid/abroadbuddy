import { COUNTRIES, MAJORS, type Major } from "@/data/universities";

export { COUNTRIES, MAJORS };
export type { Major };

export type SessionType = "1:1" | "Group";

export const SESSION_TYPES: SessionType[] = ["1:1", "Group"];

export type Mentor = {
  id: string;
  name: string;
  photoSrc: string;
  photoAlt: string;
  university: string;
  program: string;
  country: (typeof COUNTRIES)[number];
  field: Major;
  sessionTypes: SessionType[];
  bio: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  price: number;
};

export const MENTORS: Mentor[] = [
  {
    id: "tanvir-ahmed",
    name: "Tanvir Ahmed",
    photoSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling young man in a casual sweater",
    university: "MIT",
    program: "PhD Candidate, Computer Science",
    country: "USA",
    field: "Computer Science",
    sessionTypes: ["1:1", "Group"],
    bio: "PhD student in AI/ML and ex-Google intern who has helped 40+ Bangladeshi students land CS offers.",
    tags: ["PhD apps", "AI/ML", "SOP review"],
    rating: 4.9,
    reviewCount: 128,
    price: 35,
  },
  {
    id: "nusrat-jahan",
    name: "Nusrat Jahan",
    photoSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling young woman with long dark hair",
    university: "Stanford University",
    program: "MBA Candidate '25",
    country: "USA",
    field: "Business",
    sessionTypes: ["1:1"],
    bio: "Second-year MBA and former BRAC Bank analyst who specializes in b-school essays and interviews.",
    tags: ["MBA essays", "Case interviews", "Scholarships"],
    rating: 4.8,
    reviewCount: 76,
    price: 45,
  },
  {
    id: "rafiul-islam",
    name: "Rafiul Islam",
    photoSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a young man smiling outdoors",
    university: "University of Toronto",
    program: "MSc Data Science '24",
    country: "Canada",
    field: "Data Science",
    sessionTypes: ["1:1", "Group"],
    bio: "Data science grad student on co-op at Shopify, focused on Canadian visa strategy and CVs.",
    tags: ["Study permits", "CV review", "Co-op"],
    rating: 5.0,
    reviewCount: 54,
    price: 25,
  },
  {
    id: "farhana-rahman",
    name: "Farhana Rahman",
    photoSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a young woman smiling in a bright setting",
    university: "University of Waterloo",
    program: "BASc Mechanical Engineering",
    country: "Canada",
    field: "Mechanical Engineering",
    sessionTypes: ["Group"],
    bio: "Final-year engineering co-op student who walks you through Waterloo's application and co-op system.",
    tags: ["Co-op", "Engineering", "Waterloo specialist"],
    rating: 4.7,
    reviewCount: 39,
    price: 20,
  },
  {
    id: "ishtiaque-chowdhury",
    name: "Ishtiaque Chowdhury",
    photoSrc:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a young man with a beard smiling",
    university: "University of Oxford",
    program: "MSc Economics for Development",
    country: "UK",
    field: "Economics",
    sessionTypes: ["1:1", "Group"],
    bio: "Oxford economics grad and Chevening scholar who mentors on UK scholarships and personal statements.",
    tags: ["Chevening", "Personal statement", "UK unis"],
    rating: 4.9,
    reviewCount: 91,
    price: 40,
  },
  {
    id: "mahin-sarker",
    name: "Mahin Sarker",
    photoSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a young man in a collared shirt",
    university: "Imperial College London",
    program: "MEng Electrical Engineering",
    country: "UK",
    field: "Electrical Engineering",
    sessionTypes: ["1:1"],
    bio: "Imperial EEE graduate now at ARM, guiding students on technical SOPs and UK student visas.",
    tags: ["UK visas", "Technical SOP", "Interviews"],
    rating: 4.8,
    reviewCount: 63,
    price: 30,
  },
  {
    id: "priyanka-das",
    name: "Priyanka Das",
    photoSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a young woman smiling with glasses",
    university: "Technical University of Munich",
    program: "MSc Physics",
    country: "Germany",
    field: "Physics",
    sessionTypes: ["1:1", "Group"],
    bio: "TUM physics researcher who explains Germany's tuition-free system and DAAD scholarships.",
    tags: ["DAAD", "Germany visas", "Zero tuition"],
    rating: 4.9,
    reviewCount: 47,
    price: 15,
  },
  {
    id: "adib-hasan",
    name: "Adib Hasan",
    photoSrc:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a young man smiling in a city setting",
    university: "University of Melbourne",
    program: "MPH Public Health",
    country: "Australia",
    field: "Public Health",
    sessionTypes: ["Group"],
    bio: "Public health master's grad on a post-study work visa, covering Australia PR pathways.",
    tags: ["PR pathway", "Public health", "Budgeting"],
    rating: 4.6,
    reviewCount: 58,
    price: 22,
  },
];
