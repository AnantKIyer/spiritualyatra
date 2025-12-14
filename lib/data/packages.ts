import { Package } from '@/types';
import { locations } from '@/lib/data/locations';

type YatraId =
  | 'spiritual-yatra'
  | 'romance-yatra'
  | 'historic-importance-yatra'
  | 'geographical-significance-yatra'
  | 'excursion-yatra'
  | 'adventure-yatra';

interface YatraDefinition {
  id: YatraId;
  name: string;
  label: 'spiritual' | 'romantic' | 'historic' | 'excursion' | 'adventure';
  description: string;
  maxLocations?: number; // Optional: limit number of locations
  nights?: number; // Optional: specific number of nights
}

const yatraDefinitions: YatraDefinition[] = [
  {
    id: 'spiritual-yatra',
    name: 'Spiritual Yatra',
    label: 'spiritual',
    description:
      'An immersive spiritual journey across India’s most sacred riverside towns and pilgrimage hubs.',
  },
  {
    id: 'romance-yatra',
    name: 'Romance Yatra',
    label: 'romantic',
    description:
      'A dreamy escape through palaces, lakes, and the timeless symbol of love.',
    maxLocations: 2, // 3 nights / 4 days
  },
  {
    id: 'historic-importance-yatra',
    name: 'Historic Importance Yatra',
    label: 'historic',
    description:
      'Walk through the chapters of Indian history with forts, palaces, and heritage cities.',
    maxLocations: 3, // 4 nights / 5 days
  },
  {
    id: 'geographical-significance-yatra',
    name: 'Geographical Significance Yatra',
    label: 'adventure',
    description:
      'Discover India’s diverse geography from rivers and hills to deserts and salt flats.',
  },
  {
    id: 'excursion-yatra',
    name: 'Excursion Yatra',
    label: 'excursion',
    description:
      'Perfect for short getaways, this journey blends nature, light adventure, and culture.',
    maxLocations: 2, // 3 nights / 4 days
  },
  {
    id: 'adventure-yatra',
    name: 'Adventure Yatra',
    label: 'adventure',
    description:
      'For thrill seekers, combining the best of Himalayan adventures with scenic hill stations.',
    maxLocations: 4, // 6 nights / 7 days (maximum)
  },
];

function buildPackage(def: YatraDefinition): Package | null {
  let matchedLocations = locations.filter(location =>
    location.labels.includes(def.label)
  );

  if (matchedLocations.length === 0) return null;

  // Limit locations based on maxLocations (default to 2 for 3 nights / 4 days)
  const maxLoc = def.maxLocations || 2;
  matchedLocations = matchedLocations.slice(0, maxLoc);

  // Calculate duration based on number of locations
  // Most packages: 2 locations = 3 nights / 4 days
  // Longer packages: 3 locations = 4 nights / 5 days, 4 locations = 6 nights / 7 days
  const nights = matchedLocations.length === 2 ? 3 :
    matchedLocations.length === 3 ? 4 :
      matchedLocations.length === 4 ? 6 : 3;
  const days = nights + 1;

  const totalBasePrice = matchedLocations.reduce(
    (sum, loc) => sum + loc.basePrice,
    0
  );

  const highlights = Array.from(
    new Set(matchedLocations.flatMap(loc => loc.highlights))
  ).slice(0, 8);

  // Build itinerary based on actual duration
  const itinerary = matchedLocations.map((loc, index) => {
    if (matchedLocations.length === 2) {
      // 3 nights / 4 days: Day 1-2 for first location, Day 3-4 for second
      if (index === 0) {
        return `Day 1-2: ${loc.name} - Key experiences and local exploration`;
      } else {
        return `Day 3-4: ${loc.name} - Key experiences and local exploration`;
      }
    } else if (matchedLocations.length === 3) {
      // 4 nights / 5 days: Day 1-2, Day 2-3, Day 4-5
      if (index === 0) {
        return `Day 1-2: ${loc.name} - Key experiences and local exploration`;
      } else if (index === 1) {
        return `Day 2-3: ${loc.name} - Key experiences and local exploration`;
      } else {
        return `Day 4-5: ${loc.name} - Key experiences and local exploration`;
      }
    } else if (matchedLocations.length === 4) {
      // 6 nights / 7 days: Day 1-2, Day 2-3, Day 4-5, Day 6-7
      if (index === 0) {
        return `Day 1-2: ${loc.name} - Key experiences and local exploration`;
      } else if (index === 1) {
        return `Day 2-3: ${loc.name} - Key experiences and local exploration`;
      } else if (index === 2) {
        return `Day 4-5: ${loc.name} - Key experiences and local exploration`;
      } else {
        return `Day 6-7: ${loc.name} - Key experiences and local exploration`;
      }
    }
    return `Day ${index + 1}: ${loc.name} - Key experiences and local exploration`;
  });

  return {
    id: def.id,
    name: def.name,
    description: def.description,
    image: matchedLocations[0].image,
    destinations: matchedLocations.map(loc => loc.name),
    duration: `${days} days / ${nights} nights`,
    price: totalBasePrice,
    highlights,
    itinerary,
  };
}

export const packages: Package[] = yatraDefinitions
  .map(buildPackage)
  .filter((pkg): pkg is Package => pkg !== null);

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}
