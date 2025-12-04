import { Destination } from '@/types';

export const destinations: Destination[] = [
  {
    id: 'varanasi',
    name: 'Varanasi',
    description: 'The spiritual capital of India, where the Ganges flows and ancient traditions come alive.',
    image: '/images/varanasi_dest.webp',
    location: 'Uttar Pradesh, India',
    highlights: ['Ganga Aarti', 'Ancient Temples', 'Spiritual Ghats', 'Yoga & Meditation'],
    labels: ['spiritual', 'historic'],
    basePrice: 12000,
    duration: '3-5 days',
    tripPlan: [
      {
        day: 'Day 1',
        title: 'Ghats & Sunrise Rituals',
        description:
          'Arrive at Assi Ghat before dawn, witness the mesmerizing Subah-e-Banaras ceremony, and take a boat ride along the Ganges.',
        activities: [
          'Sunrise boat ride with local guide',
          'Manikarnika & Dashashwamedh Ghat walk',
          'Evening Ganga Aarti participation',
        ],
      },
      {
        day: 'Day 2',
        title: 'Temple & Heritage Circuit',
        description:
          'Explore Kashi Vishwanath and other sacred temples, followed by a stroll through Varanasi’s ancient alleys.',
        activities: [
          'Kashi Vishwanath Darshan with priority access',
          'Kala Bhairav & Annapurna Devi visits',
          'Sarnath museum and stupas excursion',
        ],
      },
      {
        day: 'Day 3',
        title: 'Cultural Immersion',
        description:
          'Engage with local artisans, attend a classical music baithak, and enjoy a traditional Banarasi thali.',
        activities: [
          'Silk weaving workshop',
          'Private classical music session',
          'Ayurvedic wellness consultation',
        ],
      },
    ],
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    description: 'The yoga capital of the world, nestled in the foothills of the Himalayas.',
    image: '/images/rishikesh_dest.jpeg',
    location: 'Uttarakhand, India',
    highlights: ['Yoga Retreats', 'Ganga River', 'Adventure Sports', 'Ashrams'],
    labels: ['spiritual', 'adventure', 'excursion'],
    basePrice: 10000,
    duration: '4-7 days',
    tripPlan: [
      {
        day: 'Day 1',
        title: 'Arrival & Ganga Blessings',
        description:
          'Check into a riverside ashram, unwind with herbal tea, and attend the Parmarth Niketan Ganga Aarti.',
        activities: [
          'Welcome orientation with yoga guru',
          'Sunset walk on the ghats',
          'Sound healing session',
        ],
      },
      {
        day: 'Day 2-3',
        title: 'Yoga & Meditation Immersion',
        description:
          'Deepen your practice with sunrise yoga, guided meditation, and satsangs with resident monks.',
        activities: [
          'Twice-daily yoga classes',
          'Pranayama and yoga nidra workshops',
          'Ayurvedic meals & nutrition talk',
        ],
      },
      {
        day: 'Day 4',
        title: 'Nature & Adventure',
        description:
          'Experience the Himalayas through gentle treks or white-water rafting capped with a spa treatment.',
        activities: [
          'Neer Garh waterfall hike',
          'Optional rafting on the Ganges',
          'Himalayan herbal spa therapy',
        ],
      },
    ],
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    description: 'Gateway to the Gods, where the Ganges enters the plains from the mountains.',
    image: '/images/haridwar_dest.jpg',
    location: 'Uttarakhand, India',
    highlights: ['Har Ki Pauri', 'Kumbh Mela', 'Temples', 'Ganga Aarti'],
    labels: ['spiritual', 'excursion'],
    basePrice: 8000,
    duration: '2-3 days',
    tripPlan: [
      {
        day: 'Day 1',
        title: 'Temple Trail',
        description:
          'Visit Mansa Devi and Chandi Devi temples via ropeway for panoramic views of the sacred city.',
        activities: [
          'Cable-car ride to Mansa Devi',
          'Chandi Devi darshan',
          'Local bazaar walk for prasad & crafts',
        ],
      },
      {
        day: 'Day 2',
        title: 'Ganga Immersion',
        description:
          'Take a holy dip at Har Ki Pauri, learn Vedic chanting, and join priests for the grand evening aarti.',
        activities: [
          'Guided snan (ritual bath)',
          'Vedic mantra learning circle',
          'VIP seating for evening aarti',
        ],
      },
      {
        day: 'Day 3',
        title: 'Wellness & Ashram Life',
        description:
          'Spend time at Shantikunj ashram, practice mindfulness, and enjoy sattvic meals before departure.',
        activities: [
          'Mindfulness workshop',
          'Community service hour',
          'Sattvic lunch experience',
        ],
      },
    ],
  },
  {
    id: 'bodhgaya',
    name: 'Bodhgaya',
    description: 'Where Buddha attained enlightenment, a sacred pilgrimage site for Buddhists worldwide.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80',
    location: 'Bihar, India',
    highlights: ['Mahabodhi Temple', 'Buddha Statue', 'Meditation Centers', 'Peace Pagoda'],
    labels: ['spiritual', 'historic'],
    basePrice: 9000,
    duration: '2-4 days',
    tripPlan: [
      {
        day: 'Day 1',
        title: 'Mahabodhi Temple',
        description:
          'Offer prayers under the Bodhi tree, meditate near the Vajrasana, and explore the temple complex.',
        activities: [
          'Guided walking meditation',
          'Pali chanting with monks',
          'Visit to royal Bhutan monastery',
        ],
      },
      {
        day: 'Day 2',
        title: 'Footsteps of Buddha',
        description:
          'Discover sites like Sujata Garh and Dungeshwari caves that marked pivotal moments in Buddha’s life.',
        activities: [
          'Cycling tour to Sujata village',
          'Dungeshwari cave meditation',
          'Community lunch with monks',
        ],
      },
      {
        day: 'Day 3',
        title: 'Mindfulness Retreat',
        description:
          'Spend a silent retreat at a local meditation center and close with a metta (loving-kindness) session.',
        activities: [
          'Silent retreat orientation',
          'Vipassana practice block',
          'Closing metta ceremony',
        ],
      },
    ],
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    description: 'Home to the Golden Temple, the holiest shrine of Sikhism.',
    image: 'https://images.unsplash.com/photo-1582979512210-de1c28e4c4ff?auto=format&fit=crop&w=900&q=80',
    location: 'Punjab, India',
    highlights: ['Golden Temple', 'Langar', 'Jallianwala Bagh', 'Wagah Border'],
    labels: ['spiritual', 'historic', 'excursion'],
    basePrice: 11000,
    duration: '2-3 days',
    tripPlan: [
      {
        day: 'Day 1',
        title: 'Golden Temple Immersion',
        description:
          'Participate in the palki ceremony, volunteer at the langar, and learn about Sikh history.',
        activities: [
          'Guided walkthrough of Harmandir Sahib',
          'Seva (service) in the community kitchen',
          'Museum visit inside the complex',
        ],
      },
      {
        day: 'Day 2',
        title: 'Heritage & Culture',
        description:
          'Pay respects at Jallianwala Bagh, stroll through the heritage lane, and savor Amritsari cuisine.',
        activities: [
          'Jallianwala Bagh memorial tour',
          'Heritage Street food trail',
          'Hands-on phulkari embroidery demo',
        ],
      },
      {
        day: 'Day 3',
        title: 'Wagah Border & Farm Stay',
        description:
          'Witness the iconic Wagah ceremony and unwind at a Punjabi farmhouse with folk music.',
        activities: [
          'VIP seating at Wagah Border',
          'Visit to Partition Museum',
          'Evening bonfire with folk artists',
        ],
      },
    ],
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    description: 'Famous for the Venkateswara Temple, one of the richest and most visited temples in the world.',
    image: 'https://images.unsplash.com/photo-1548013146-c23c86e2c5d4?auto=format&fit=crop&w=900&q=80',
    location: 'Andhra Pradesh, India',
    highlights: ['Venkateswara Temple', 'Tirumala Hills', 'Pilgrimage', 'Spiritual Heritage'],
    labels: ['spiritual'],
    basePrice: 9500,
    duration: '2-3 days',
    tripPlan: [
      {
        day: 'Day 1',
        title: 'Temple Darshan',
        description:
          'Ascend Tirumala Hills, complete seva rituals, and enjoy panoramic views from the sacred complex.',
        activities: [
          'Special entry darshan arrangements',
          'Laddu prasadam making experience',
          'Visit to Varaha swamy temple',
        ],
      },
      {
        day: 'Day 2',
        title: 'Sacred Trails',
        description:
          'Explore the serene water bodies and lesser-known shrines around Tirupati with a heritage expert.',
        activities: [
          'Kapila Theertham waterfall visit',
          'Sri Kalyana Venkateswara Temple tour',
          'Local bhajan evening',
        ],
      },
      {
        day: 'Day 3',
        title: 'Wellness & Departure',
        description:
          'Unwind with Ayurvedic therapies, shop for local crafts, and enjoy a traditional Andhra feast.',
        activities: [
          'Ayurvedic abhyanga session',
          'Wood-carving artisan meet',
          'Farewell Andhra sadhya meal',
        ],
      },
    ],
  },
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(dest => dest.id === id);
}

