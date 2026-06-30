import type { Package, PackageItineraryDay } from "@/types";
import { locations } from "@/lib/data/locations";
import { getDestinationById } from "@/lib/data/destinations";

type YatraId =
  | "spiritual-yatra"
  | "romance-yatra"
  | "historic-importance-yatra"
  | "geographical-significance-yatra"
  | "excursion-yatra"
  | "adventure-yatra";

interface YatraDefinition {
  id: YatraId;
  name: string;
  label: "spiritual" | "romantic" | "historic" | "excursion" | "adventure";
  description: string;
  maxLocations?: number;
  inclusions: string[];
}

const yatraDefinitions: YatraDefinition[] = [
  {
    id: "spiritual-yatra",
    name: "Spiritual Yatra",
    label: "spiritual",
    description:
      "An immersive spiritual journey across India's most sacred riverside towns and pilgrimage hubs.",
    inclusions: [
      "Accommodation in heritage hotels & ashrams",
      "Daily vegetarian meals",
      "Expert spiritual guide",
      "Temple priority darshan arrangements",
      "All local transfers",
    ],
  },
  {
    id: "romance-yatra",
    name: "Romance Yatra",
    label: "romantic",
    description:
      "A dreamy escape through palaces, lakes, and the timeless symbol of love.",
    maxLocations: 2,
    inclusions: [
      "Boutique heritage stays",
      "Couples spa session",
      "Private boat rides",
      "Candle-light dinners",
      "Photography assistance",
    ],
  },
  {
    id: "historic-importance-yatra",
    name: "Historic Importance Yatra",
    label: "historic",
    description:
      "Walk through the chapters of Indian history with forts, palaces, and heritage cities.",
    maxLocations: 3,
    inclusions: [
      "Heritage hotel accommodation",
      "Licensed history guide",
      "Monument entry fees",
      "Cultural performances",
      "All inter-city transfers",
    ],
  },
  {
    id: "geographical-significance-yatra",
    name: "Geographical Significance Yatra",
    label: "adventure",
    description:
      "Discover India's diverse geography from rivers and hills to deserts and salt flats.",
    inclusions: [
      "Eco-lodge & camp stays",
      "Nature guide",
      "All adventure activities",
      "Meals included",
      "Safety equipment provided",
    ],
  },
  {
    id: "excursion-yatra",
    name: "Excursion Yatra",
    label: "excursion",
    description:
      "Perfect for short getaways blending nature, light adventure, and culture.",
    maxLocations: 2,
    inclusions: [
      "Comfortable resort stays",
      "Breakfast & dinner",
      "Local guide",
      "Activity fees",
      "Airport/railway transfers",
    ],
  },
  {
    id: "adventure-yatra",
    name: "Adventure Yatra",
    label: "adventure",
    description:
      "For thrill seekers combining Himalayan adventures with scenic hill stations.",
    maxLocations: 4,
    inclusions: [
      "Adventure camp accommodation",
      "Certified adventure instructors",
      "All equipment & safety gear",
      "Meals & refreshments",
      "Medical support on treks",
    ],
  },
];

function buildItinerary(
  locationIds: string[],
  nights: number,
): PackageItineraryDay[] {
  const days: PackageItineraryDay[] = [];
  let dayCounter = 1;

  for (const locId of locationIds) {
    const dest = getDestinationById(locId);
    const loc = locations.find((l) => l.id === locId);
    const locationName = dest?.name ?? loc?.name ?? locId;

    if (dest?.tripPlan && dest.tripPlan.length > 0) {
      for (const planDay of dest.tripPlan) {
        days.push({
          day: `Day ${dayCounter}`,
          title: planDay.title,
          location: locationName,
          description: planDay.description,
          activities: planDay.activities,
        });
        dayCounter++;
      }
    } else {
      days.push({
        day: `Day ${dayCounter}`,
        title: `Explore ${locationName}`,
        location: locationName,
        description: `Discover the highlights and hidden gems of ${locationName} with our expert local guide.`,
        activities: loc?.highlights ?? [
          "Guided orientation walk",
          "Local cuisine experience",
          "Sunset viewpoint",
        ],
      });
      dayCounter++;
    }
  }

  if (days.length === 0) {
    for (let i = 1; i <= nights + 1; i++) {
      days.push({
        day: `Day ${i}`,
        title: "Journey Day",
        location: "India",
        description: "Experience the best of India with curated activities.",
        activities: ["Guided tour", "Local experiences", "Cultural immersion"],
      });
    }
  }

  return days;
}

function buildPackage(def: YatraDefinition): Package | null {
  let matchedLocations = locations.filter((location) =>
    location.labels.includes(def.label),
  );

  if (matchedLocations.length === 0) return null;

  const maxLoc = def.maxLocations ?? 2;
  matchedLocations = matchedLocations.slice(0, maxLoc);

  const nights =
    matchedLocations.length === 2
      ? 3
      : matchedLocations.length === 3
        ? 4
        : matchedLocations.length === 4
          ? 6
          : 3;
  const days = nights + 1;

  const totalBasePrice = matchedLocations.reduce(
    (sum, loc) => sum + loc.basePrice,
    0,
  );

  const highlights = Array.from(
    new Set(matchedLocations.flatMap((loc) => loc.highlights)),
  ).slice(0, 8);

  const locationIds = matchedLocations.map((loc) => loc.id);
  const itinerary = buildItinerary(locationIds, nights);

  return {
    id: def.id,
    name: def.name,
    description: def.description,
    image: matchedLocations[0].image,
    destinations: matchedLocations.map((loc) => loc.name),
    destinationIds: locationIds,
    duration: `${days} days / ${nights} nights`,
    price: totalBasePrice,
    highlights,
    itinerary,
    inclusions: def.inclusions,
  };
}

export const packages: Package[] = yatraDefinitions
  .map(buildPackage)
  .filter((pkg): pkg is Package => pkg !== null);

export function getPackageById(id: string): Package | undefined {
  return packages.find((pkg) => pkg.id === id);
}
