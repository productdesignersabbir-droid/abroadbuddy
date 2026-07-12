export type DestinationId =
  | "boston"
  | "toronto"
  | "london"
  | "melbourne"
  | "berlin"
  | "kuala-lumpur";

export type Destination = {
  id: DestinationId;
  city: string;
  country: string;
  label: string;
};

export const DESTINATIONS: Destination[] = [
  { id: "boston", city: "Boston", country: "USA", label: "Boston, USA" },
  { id: "toronto", city: "Toronto", country: "Canada", label: "Toronto, Canada" },
  { id: "london", city: "London", country: "UK", label: "London, UK" },
  { id: "melbourne", city: "Melbourne", country: "Australia", label: "Melbourne, Australia" },
  { id: "berlin", city: "Berlin", country: "Germany", label: "Berlin, Germany" },
  {
    id: "kuala-lumpur",
    city: "Kuala Lumpur",
    country: "Malaysia",
    label: "Kuala Lumpur, Malaysia",
  },
];

export type HousingType = "Dorm" | "Shared apartment" | "Studio";

export type HousingListing = {
  id: string;
  destinationId: DestinationId;
  title: string;
  type: HousingType;
  area: string;
  rentMin: number;
  rentMax: number;
  perks: string[];
  imageSrc: string;
  imageAlt: string;
};

export const HOUSING_LISTINGS: HousingListing[] = [
  {
    id: "fenway-student-studio",
    destinationId: "boston",
    title: "Fenway Student Studio",
    type: "Studio",
    area: "Fenway-Kenmore",
    rentMin: 1450,
    rentMax: 1750,
    perks: [
      "5 min walk to Northeastern University",
      "Utilities included",
      "Furnished with study desk",
      "Laundry in building",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Compact modern studio apartment with kitchen and living area",
  },
  {
    id: "annex-shared-house",
    destinationId: "toronto",
    title: "The Annex Shared House",
    type: "Shared apartment",
    area: "The Annex",
    rentMin: 750,
    rentMax: 950,
    perks: [
      "10 min to University of Toronto",
      "Wifi included",
      "Furnished private room",
      "Shared kitchen & living room",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Shared house living room with blue sofa and wooden floors",
  },
  {
    id: "bloomsbury-halls",
    destinationId: "london",
    title: "Bloomsbury Halls of Residence",
    type: "Dorm",
    area: "Bloomsbury",
    rentMin: 850,
    rentMax: 1050,
    perks: [
      "Walk to UCL & LSE",
      "Catered meal plan available",
      "24/7 on-site security",
      "Ensuite bathroom",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Cozy single dorm bedroom with plants and warm lighting",
  },
  {
    id: "carlton-studio",
    destinationId: "melbourne",
    title: "Carlton Studio Apartments",
    type: "Studio",
    area: "Carlton",
    rentMin: 950,
    rentMax: 1200,
    perks: [
      "Tram to University of Melbourne",
      "Fully furnished",
      "Study desk & fast wifi",
      "Rooftop common area",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Bright, elegant studio apartment living room",
  },
  {
    id: "kreuzberg-wg",
    destinationId: "berlin",
    title: "Kreuzberg WG (Flatshare)",
    type: "Shared apartment",
    area: "Kreuzberg",
    rentMin: 600,
    rentMax: 800,
    perks: [
      "Classic Berlin WG flatshare",
      "Bike ride to TU Berlin",
      "Nebenkosten (utilities) included",
      "Shared kitchen & balcony",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Bohemian shared apartment living room with plants and bookshelf",
  },
  {
    id: "bangsar-south-residence",
    destinationId: "kuala-lumpur",
    title: "Bangsar South Residence",
    type: "Dorm",
    area: "Bangsar South",
    rentMin: 350,
    rentMax: 500,
    perks: [
      "Near Monash Malaysia & Sunway",
      "Air-conditioned single room",
      "Pool & gym access",
      "Walking distance to LRT",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Modern single bedroom with large window and warm lighting",
  },
];

export type FlightRoute = {
  id: string;
  destinationId: DestinationId;
  from: string;
  to: string;
  fareMin: number;
  fareMax: number;
  typicalStops: string;
  airlines: string[];
};

export const FLIGHT_ROUTES: FlightRoute[] = [
  {
    id: "dac-bos",
    destinationId: "boston",
    from: "Dhaka (DAC)",
    to: "Boston (BOS)",
    fareMin: 950,
    fareMax: 1400,
    typicalStops: "1-2 stops",
    airlines: ["Qatar Airways", "Turkish Airlines", "Emirates"],
  },
  {
    id: "dac-yyz",
    destinationId: "toronto",
    from: "Dhaka (DAC)",
    to: "Toronto (YYZ)",
    fareMin: 1000,
    fareMax: 1450,
    typicalStops: "1 stop",
    airlines: ["Turkish Airlines", "Qatar Airways", "Etihad Airways"],
  },
  {
    id: "dac-lhr",
    destinationId: "london",
    from: "Dhaka (DAC)",
    to: "London (LHR)",
    fareMin: 650,
    fareMax: 950,
    typicalStops: "Direct or 1 stop",
    airlines: ["Biman Bangladesh", "Qatar Airways", "Turkish Airlines", "Emirates"],
  },
  {
    id: "dac-mel",
    destinationId: "melbourne",
    from: "Dhaka (DAC)",
    to: "Melbourne (MEL)",
    fareMin: 750,
    fareMax: 1100,
    typicalStops: "1 stop",
    airlines: ["Malaysia Airlines", "Singapore Airlines", "Thai Airways"],
  },
  {
    id: "dac-txl",
    destinationId: "berlin",
    from: "Dhaka (DAC)",
    to: "Berlin (BER)",
    fareMin: 700,
    fareMax: 1000,
    typicalStops: "1 stop",
    airlines: ["Turkish Airlines", "Qatar Airways", "Emirates"],
  },
  {
    id: "dac-kul",
    destinationId: "kuala-lumpur",
    from: "Dhaka (DAC)",
    to: "Kuala Lumpur (KUL)",
    fareMin: 280,
    fareMax: 420,
    typicalStops: "Direct",
    airlines: ["Malaysia Airlines", "AirAsia", "Biman Bangladesh"],
  },
];

export type CostOfLiving = {
  destinationId: DestinationId;
  city: string;
  rent: number;
  food: number;
  transport: number;
  utilities: number;
};

export const COST_OF_LIVING: CostOfLiving[] = [
  { destinationId: "boston", city: "Boston", rent: 1600, food: 450, transport: 90, utilities: 120 },
  { destinationId: "toronto", city: "Toronto", rent: 850, food: 380, transport: 100, utilities: 90 },
  { destinationId: "london", city: "London", rent: 950, food: 420, transport: 130, utilities: 110 },
  { destinationId: "melbourne", city: "Melbourne", rent: 1075, food: 400, transport: 110, utilities: 100 },
  { destinationId: "berlin", city: "Berlin", rent: 700, food: 300, transport: 75, utilities: 80 },
  {
    destinationId: "kuala-lumpur",
    city: "Kuala Lumpur",
    rent: 425,
    food: 220,
    transport: 40,
    utilities: 60,
  },
];
