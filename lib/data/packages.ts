import { Package } from '@/types';

export const packages: Package[] = [
  {
    id: 'spiritual-north',
    name: 'Spiritual North India',
    description: 'A comprehensive journey through the spiritual heartland of North India, visiting sacred cities and experiencing ancient traditions.',
    image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2024/4/places-to-visit-in-varanasi_0_1200.jpg.webp',
    destinations: ['Varanasi', 'Rishikesh', 'Haridwar'],
    duration: '10 days / 9 nights',
    price: 45000,
    highlights: [
      'Ganga Aarti in Varanasi',
      'Yoga sessions in Rishikesh',
      'Temple visits',
      'Meditation retreat',
      'Cultural experiences',
    ],
    itinerary: [
      'Day 1: Arrival in Delhi',
      'Day 2-3: Varanasi - Ghats and Temples',
      'Day 4-5: Rishikesh - Yoga & Adventure',
      'Day 6-7: Haridwar - Spiritual Practices',
      'Day 8-9: Return journey with stops',
      'Day 10: Departure',
    ],
  },
  {
    id: 'buddhist-pilgrimage',
    name: 'Buddhist Pilgrimage Tour',
    description: 'Follow in the footsteps of Buddha, visiting sacred sites where he lived, taught, and attained enlightenment.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80',
    destinations: ['Bodhgaya', 'Varanasi', 'Sarnath'],
    duration: '8 days / 7 nights',
    price: 38000,
    highlights: [
      'Mahabodhi Temple',
      'Buddha\'s Enlightenment Site',
      'Ancient Stupas',
      'Meditation sessions',
      'Buddhist monasteries',
    ],
    itinerary: [
      'Day 1: Arrival in Patna',
      'Day 2-4: Bodhgaya - Enlightenment Site',
      'Day 5-6: Varanasi & Sarnath',
      'Day 7: Return journey',
      'Day 8: Departure',
    ],
  },
  {
    id: 'yoga-wellness',
    name: 'Yoga & Wellness Retreat',
    description: 'A rejuvenating retreat combining yoga, meditation, and wellness practices in the serene Himalayas.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80',
    destinations: ['Rishikesh', 'Haridwar'],
    duration: '7 days / 6 nights',
    price: 32000,
    highlights: [
      'Daily yoga sessions',
      'Meditation classes',
      'Ayurvedic treatments',
      'Nature walks',
      'Healthy meals',
    ],
    itinerary: [
      'Day 1: Arrival in Rishikesh',
      'Day 2-6: Daily yoga, meditation, and wellness',
      'Day 7: Departure',
    ],
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple & Punjab Heritage',
    description: 'Experience the rich Sikh heritage and visit the magnificent Golden Temple in Amritsar.',
    image: 'https://images.unsplash.com/photo-1508449029101-45b2cf43dba0?auto=format&fit=crop&w=900&q=80',
    destinations: ['Amritsar', 'Chandigarh'],
    duration: '5 days / 4 nights',
    price: 25000,
    highlights: [
      'Golden Temple visit',
      'Langar experience',
      'Wagah Border ceremony',
      'Punjabi culture',
      'Heritage sites',
    ],
    itinerary: [
      'Day 1: Arrival in Amritsar',
      'Day 2-3: Golden Temple & city tour',
      'Day 4: Wagah Border & Chandigarh',
      'Day 5: Departure',
    ],
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

