export type Specialist = {
  id: string;
  name: string;
  photoSrc: string;
  photoAlt: string;
  specialty: string;
  bio: string;
  rating: number;
  reviewCount: number;
  price: number;
};

export const SPECIALISTS: Specialist[] = [
  {
    id: "naomi-reyes",
    name: "Naomi Reyes",
    photoSrc:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling woman in a striped blazer",
    specialty: "SOP · STEM Masters & PhD",
    bio: "Former U.S. graduate admissions reader who has helped 200+ international students shape standout Statements of Purpose.",
    rating: 4.9,
    reviewCount: 142,
    price: 65,
  },
  {
    id: "david-ostrowski",
    name: "David Ostrowski",
    photoSrc:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling bald man with a beard",
    specialty: "CV / Resume · Tech & Engineering",
    bio: "Ten years in technical recruiting, now helping engineering and CS applicants turn projects into a resume recruiters notice.",
    rating: 4.8,
    reviewCount: 98,
    price: 40,
  },
  {
    id: "arif-chowdhury",
    name: "Arif Chowdhury",
    photoSrc:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling young man outdoors",
    specialty: "SOP & LOR · MBA / Business",
    bio: "Wharton MBA and admissions consultant who has coached Bangladeshi applicants into top-20 business programs.",
    rating: 5.0,
    reviewCount: 61,
    price: 55,
  },
  {
    id: "elena-cruz",
    name: "Elena Cruz",
    photoSrc:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling young woman with dark hair",
    specialty: "CV · Public Health & Social Sciences",
    bio: "Career coach specializing in public health and social science applications, with a focus on scholarship-ready CVs.",
    rating: 4.7,
    reviewCount: 73,
    price: 35,
  },
];
