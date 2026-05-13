export type CampusCategory =
  | "all"
  | "department"
  | "hostel"
  | "facility"
  | "admin";

export type CampusLocation = {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  category: Exclude<CampusCategory, "all">;
  keywords: string[];
};

export const CAMPUS_CENTER = { lat: 26.765650994526283, lng: 80.92793072854477 };

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: "main-gate",
    title: "Main Gate",
    description: "Primary entry to Vidya Vihar campus.",
    lat: 26.764180825451522,
    lng: 80.9295892067164,
    category: "admin",
    keywords: ["gate", "entry", "security", "visitor"],
  },
  {
    id: "uiet",
    title: "UIET (Engineering Block)",
    description: "University Institute of Engineering & Technology.",
    lat: 26.765650994526283,
    lng: 80.92793072854477,
    category: "department",
    keywords: ["cse", "computer", "engineering", "uiet", "tech"],
  },
  {
    id: "ashoka-hostel",
    title: "Ashoka Boys Hostel",
    description: "Boys hostel block near academic zone.",
    lat: 26.770764169389963,
    lng: 80.91936675787423,
    category: "hostel",
    keywords: ["hostel", "boys", "stay", "residence"],
  },
  {
    id: "library",
    title: "Central Library",
    description: "Main library with reading halls and digital access.",
    lat: 26.769733884320484,
    lng: 80.9262099160073,
    category: "facility",
    keywords: ["library", "books", "study", "reading"],
  },
  {
    id: "science-block",
    title: "Science Block",
    description: "Physics, Chemistry, Mathematics and allied sciences.",
    lat: 26.7684,
    lng: 80.9245,
    category: "department",
    keywords: ["science", "physics", "chemistry", "math"],
  },
  {
    id: "admin-block",
    title: "Administration Block",
    description: "Registrar, accounts and university offices.",
    lat: 26.7668,
    lng: 80.9288,
    category: "admin",
    keywords: ["admin", "office", "registrar", "vc"],
  },
];

export function getLocationById(id: string): CampusLocation | undefined {
  return CAMPUS_LOCATIONS.find((l) => l.id === id);
}

export function filterLocations(
  locations: CampusLocation[],
  category: CampusCategory,
  query: string
): CampusLocation[] {
  const q = query.trim().toLowerCase();
  return locations.filter((loc) => {
    if (category !== "all" && loc.category !== category) return false;
    if (!q) return true;
    const blob = `${loc.title} ${loc.description} ${loc.keywords.join(" ")}`.toLowerCase();
    return blob.includes(q);
  });
}
