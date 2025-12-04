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
  },
  {
    id: 'historic-importance-yatra',
    name: 'Historic Importance Yatra',
    label: 'historic',
    description:
      'Walk through the chapters of Indian history with forts, palaces, and heritage cities.',
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
  },
  {
    id: 'adventure-yatra',
    name: 'Adventure Yatra',
    label: 'adventure',
    description:
      'For thrill seekers, combining the best of Himalayan adventures with scenic hill stations.',
  },
];

function buildPackage(def: YatraDefinition): Package | null {
  const matchedLocations = locations.filter(location =>
    location.labels.includes(def.label)
  );

  if (matchedLocations.length === 0) return null;

  const totalBasePrice = matchedLocations.reduce(
    (sum, loc) => sum + loc.basePrice,
    0
  );

  const highlights = Array.from(
    new Set(matchedLocations.flatMap(loc => loc.highlights))
  ).slice(0, 8);

  const itinerary =
    matchedLocations.length > 0
      ? matchedLocations.map((loc, index) => {
        const dayRangeStart = index * 2 + 1;
        const dayRangeEnd = index * 2 + 2;
        return `Day ${dayRangeStart}-${dayRangeEnd}: ${loc.name} - Key experiences and local exploration`;
      })
      : undefined;

  return {
    id: def.id,
    name: def.name,
    description: def.description,
    image: matchedLocations[0].image,
    destinations: matchedLocations.map(loc => loc.name),
    duration: `${matchedLocations.length * 2 + 1} days / ${matchedLocations.length * 2
      } nights`,
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

