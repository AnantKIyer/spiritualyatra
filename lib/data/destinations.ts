import type { Destination, LocationLabel, TripPlanDay } from "@/types";
import { locations } from "@/lib/data/locations";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

type DestinationSeed = {
  id: string;
  state: string;
  description: string;
  longDescription: string;
  duration: string;
  bestTime: string;
  experiences: string[];
  tripPlan: TripPlanDay[];
  gallery?: string[];
};

function buildDestination(seed: DestinationSeed): Destination {
  const location = locations.find((l) => l.id === seed.id);
  if (!location) {
    throw new Error(`No location found for destination id: ${seed.id}`);
  }

  return {
    id: seed.id,
    name: location.name,
    description: seed.description,
    longDescription: seed.longDescription,
    image: location.image,
    gallery: seed.gallery ?? [location.image, location.image],
    location: `${seed.state}, India`,
    highlights: location.highlights,
    labels: location.labels,
    basePrice: location.basePrice,
    duration: seed.duration,
    bestTime: seed.bestTime,
    experiences: seed.experiences,
    tripPlan: seed.tripPlan,
  };
}

const defaultTripPlan = (name: string, activities: string[]): TripPlanDay[] => [
  {
    day: "Day 1",
    title: `Arrival & First Impressions of ${name}`,
    description: `Settle in and begin exploring the essence of ${name} with a guided orientation walk and local welcome experience.`,
    activities: activities.slice(0, 3),
  },
  {
    day: "Day 2",
    title: `Deep Dive into ${name}`,
    description: `Spend a full day immersed in the landmarks, culture, and stories that make ${name} unforgettable.`,
    activities:
      activities.length > 3
        ? activities.slice(3, 6)
        : [
            `Guided heritage walk`,
            `Local cuisine experience`,
            `Sunset viewpoint visit`,
          ],
  },
  {
    day: "Day 3",
    title: `Farewell & Reflection`,
    description: `Conclude your journey with meaningful moments, souvenir shopping, and a final panoramic view before departure.`,
    activities: [
      `Morning ritual or nature walk`,
      `Local artisan visit`,
      `Departure with curated memories`,
    ],
  },
];

const seeds: DestinationSeed[] = [
  {
    id: "varanasi",
    state: "Uttar Pradesh",
    description:
      "The spiritual capital of India, where the Ganges flows and ancient traditions come alive.",
    longDescription:
      "Varanasi is one of the world's oldest living cities — a labyrinth of ghats, temples, and timeless rituals where pilgrims have sought liberation for millennia. Dawn boat rides on the Ganges, the thunderous Ganga Aarti at Dashashwamedh Ghat, and walks through narrow alleys lined with silk weavers create an experience that transforms every visitor.",
    duration: "3-5 days",
    bestTime: "October – March",
    experiences: [
      "Ganga Aarti",
      "Boat rides",
      "Temple darshan",
      "Silk weaving",
    ],
    gallery: [
      "/images/varanasi_dest.webp",
      UNSPLASH("photo-1561361518240-790aab8f0a08"),
      UNSPLASH("photo-1582510004614-8a1e0b0b0b0b"),
    ],
    tripPlan: [
      {
        day: "Day 1",
        title: "Ghats & Sunrise Rituals",
        description:
          "Arrive at Assi Ghat before dawn, witness Subah-e-Banaras, and take a boat ride along the Ganges.",
        activities: [
          "Sunrise boat ride with local guide",
          "Manikarnika & Dashashwamedh Ghat walk",
          "Evening Ganga Aarti participation",
        ],
      },
      {
        day: "Day 2",
        title: "Temple & Heritage Circuit",
        description:
          "Explore Kashi Vishwanath and sacred temples, followed by a stroll through ancient alleys.",
        activities: [
          "Kashi Vishwanath Darshan",
          "Sarnath museum and stupas excursion",
          "Classical music baithak",
        ],
      },
      {
        day: "Day 3",
        title: "Cultural Immersion",
        description:
          "Engage with local artisans and enjoy a traditional Banarasi thali.",
        activities: [
          "Silk weaving workshop",
          "Ayurvedic wellness consultation",
          "Farewell Ganga ceremony",
        ],
      },
    ],
  },
  {
    id: "rishikesh",
    state: "Uttarakhand",
    description:
      "The yoga capital of the world, nestled in the foothills of the Himalayas.",
    longDescription:
      "Rishikesh sits where the Ganges exits the Himalayas — a town of ashrams, suspension bridges, and seekers from every corner of the globe. Whether you come for yoga, meditation, white-water rafting, or simply the mountain air, Rishikesh offers a perfect blend of adventure and inner peace.",
    duration: "4-7 days",
    bestTime: "September – April",
    experiences: [
      "Yoga retreats",
      "Rafting",
      "Ashram stays",
      "Himalayan treks",
    ],
    gallery: [
      "/images/rishikesh_dest.jpeg",
      UNSPLASH("photo-1506905925346-21bda4d32df4"),
    ],
    tripPlan: defaultTripPlan("Rishikesh", [
      "Parmarth Niketan Ganga Aarti",
      "Sunrise yoga by the river",
      "Lakshman Jhula walk",
      "White-water rafting",
      "Neer Garh waterfall hike",
      "Sound healing session",
    ]),
  },
  {
    id: "haridwar",
    state: "Uttarakhand",
    description: "Gateway to the Gods, where the Ganges enters the plains.",
    longDescription:
      "Haridwar is where the sacred Ganges leaves the mountains and flows into the heart of India. Pilgrims gather at Har Ki Pauri for the evening aarti, temples crown the hills, and the air carries centuries of devotion.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Ganga Aarti", "Temple visits", "Ashram life"],
    gallery: ["/images/haridwar_dest.jpg"],
    tripPlan: defaultTripPlan("Haridwar", [
      "Mansa Devi ropeway",
      "Har Ki Pauri snan",
      "Evening aarti VIP seating",
      "Shantikunj ashram visit",
      "Sattvic lunch experience",
    ]),
  },
  {
    id: "prayagraj",
    state: "Uttar Pradesh",
    description:
      "Sacred confluence of the Ganga, Yamuna, and mythical Saraswati.",
    longDescription:
      "Prayagraj (Allahabad) is home to the Triveni Sangam — one of Hinduism's holiest sites. Every twelve years the Kumbh Mela transforms this city into the largest gathering on Earth.",
    duration: "2-4 days",
    bestTime: "October – March (Kumbh: per schedule)",
    experiences: ["Sangam boat ride", "Kumbh grounds", "Fort heritage"],
    gallery: ["/images/prayagraj_dest.jpg"],
    tripPlan: defaultTripPlan("Prayagraj", [
      "Triveni Sangam holy dip",
      "Allahabad Fort tour",
      "Anand Bhavan museum",
      "Evening aarti at Sangam",
    ]),
  },
  {
    id: "udaipur",
    state: "Rajasthan",
    description: "The City of Lakes — palaces, romance, and royal heritage.",
    longDescription:
      "Udaipur's shimmering lakes, marble palaces, and rooftop dining create India's most romantic destination. Every sunset over Lake Pichola feels like a scene from a fairy tale.",
    duration: "3-4 days",
    bestTime: "October – March",
    experiences: ["Palace tours", "Boat rides", "Rooftop dining"],
    gallery: ["/images/udaipur_dest.jpg"],
    tripPlan: defaultTripPlan("Udaipur", [
      "City Palace guided tour",
      "Lake Pichola boat ride",
      "Jagdish Temple visit",
      "Rooftop candle-light dinner",
      "Folk dance performance",
    ]),
  },
  {
    id: "jaipur",
    state: "Rajasthan",
    description:
      "The Pink City — forts, bazaars, and royal Rajasthani culture.",
    longDescription:
      "Jaipur dazzles with Amer Fort's hilltop grandeur, the intricate Hawa Mahal, and bustling bazaars selling textiles, jewelry, and handicrafts. It's the gateway to Rajasthan's royal heart.",
    duration: "3-4 days",
    bestTime: "October – March",
    experiences: ["Fort tours", "Bazaar walks", "Rajasthani cuisine"],
    gallery: ["/images/jaipur_dest.jpg"],
    tripPlan: defaultTripPlan("Jaipur", [
      "Amer Fort elephant ride",
      "Hawa Mahal photo stop",
      "Pink City heritage walk",
      "Traditional Rajasthani thali",
      "Nahargarh sunset views",
    ]),
  },
  {
    id: "agra",
    state: "Uttar Pradesh",
    description: "Home to the Taj Mahal — the ultimate symbol of eternal love.",
    longDescription:
      "Agra needs no introduction. The Taj Mahal at sunrise is a moment that stays with you forever. Combined with Agra Fort and local marble craftsmanship, it's an essential Indian pilgrimage.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Taj sunrise", "Mughal architecture", "Marble inlay"],
    gallery: ["/images/agra_dest.jpg"],
    tripPlan: defaultTripPlan("Agra", [
      "Taj Mahal sunrise visit",
      "Agra Fort exploration",
      "Mehtab Bagh sunset view",
      "Marble inlay workshop",
    ]),
  },
  {
    id: "fatehpur-sikri",
    state: "Uttar Pradesh",
    description:
      "Akbar's abandoned Mughal capital — a UNESCO World Heritage site.",
    longDescription:
      "Fatehpur Sikri is a ghost city of red sandstone palaces, mosques, and courtyards frozen in the 16th century. Walking its empty halls feels like stepping into history.",
    duration: "1-2 days",
    bestTime: "October – March",
    experiences: ["Mughal architecture", "Buland Darwaza", "Heritage walks"],
    gallery: ["/images/Fatehpur-Sikri_dest.jpg"],
    tripPlan: defaultTripPlan("Fatehpur Sikri", [
      "Buland Darwaza visit",
      "Jama Masjid tour",
      "Panch Mahal exploration",
      "Diwan-i-Khas heritage walk",
    ]),
  },
  {
    id: "jaisalmer",
    state: "Rajasthan",
    description: "The Golden City rising from the Thar Desert.",
    longDescription:
      "Jaisalmer's honey-colored fort rises from the desert like a mirage. Camel safaris, folk music under the stars, and intricately carved havelis make this a bucket-list destination.",
    duration: "3-4 days",
    bestTime: "October – February",
    experiences: ["Desert safari", "Golden Fort", "Folk culture"],
    gallery: ["/images/jaisalmer_dest.webp"],
    tripPlan: defaultTripPlan("Jaisalmer", [
      "Golden Fort walk",
      "Sam sand dunes camel safari",
      "Folk music under stars",
      "Patwon Ki Haveli tour",
      "Desert camp dinner",
    ]),
  },
  {
    id: "rann-of-kutch",
    state: "Gujarat",
    description:
      "The white salt desert — surreal landscapes under infinite skies.",
    longDescription:
      "The Rann of Kutch transforms into a mirror of moonlight during the full moon. Gujarat's handicrafts, folk music, and the Rann Utsav festival create an otherworldly experience.",
    duration: "3-4 days",
    bestTime: "November – February",
    experiences: ["White desert", "Rann Utsav", "Handicrafts"],
    gallery: ["/images/Rann-of-Kutch_dest.jpg"],
    tripPlan: defaultTripPlan("Rann of Kutch", [
      "White desert sunset",
      "Full moon Rann walk",
      "Kutch handicraft village",
      "Folk dance performance",
      "Traditional Gujarati feast",
    ]),
  },
  {
    id: "auli",
    state: "Uttarakhand",
    description: "Himalayan ski paradise with Nanda Devi views.",
    longDescription:
      "Auli offers India's finest skiing with panoramic views of Nanda Devi. Cable car rides, snow-covered slopes, and crisp mountain air make it an adventure lover's dream.",
    duration: "3-5 days",
    bestTime: "December – March (ski); May – June (trek)",
    experiences: ["Skiing", "Cable car", "Mountain views"],
    gallery: ["/images/auli_dest.jpg"],
    tripPlan: defaultTripPlan("Auli", [
      "Cable car to Joshimath",
      "Ski lesson on gentle slopes",
      "Nanda Devi viewpoint trek",
      "Bonfire under stars",
    ]),
  },
  {
    id: "mussoorie",
    state: "Uttarakhand",
    description:
      "Queen of the Hills — colonial charm and misty mountain views.",
    longDescription:
      "Mussoorie's Mall Road, cascading waterfalls, and colonial-era architecture offer a classic hill-station escape with views of the Doon Valley below.",
    duration: "2-4 days",
    bestTime: "March – June, September – November",
    experiences: ["Mall Road", "Waterfalls", "Mountain views"],
    gallery: [UNSPLASH("photo-1521292270410-a8c53642e9d0")],
    tripPlan: defaultTripPlan("Mussoorie", [
      "Kempty Falls visit",
      "Mall Road stroll",
      "Gun Hill cable car",
      "Lal Tibba sunrise",
    ]),
  },
  {
    id: "vindhya-parvat",
    state: "Madhya Pradesh",
    description: "Sacred hills and forested temples of the Vindhya range.",
    longDescription:
      "The Vindhya mountains hold ancient temples, meditation caves, and panoramic forest views — a lesser-known spiritual retreat away from crowds.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Hilltop temples", "Forest walks", "Meditation"],
    gallery: [UNSPLASH("photo-1516300523007-3b26d3814a00")],
    tripPlan: defaultTripPlan("Vindhya Parvat", [
      "Hilltop temple darshan",
      "Forest meditation walk",
      "Sunrise viewpoint trek",
    ]),
  },
  {
    id: "ayodhya",
    state: "Uttar Pradesh",
    description: "Birthplace of Lord Rama — a city reborn in devotion.",
    longDescription:
      "Ayodhya on the banks of the Sarayu is one of Hinduism's seven sacred cities. New temples, ghats, and evening aartis draw millions of pilgrims seeking Rama's blessings.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Ram Janmabhoomi", "Sarayu aarti", "Temple circuit"],
    gallery: [UNSPLASH("photo-1593696140821-1ffadde1bc97")],
    tripPlan: defaultTripPlan("Ayodhya", [
      "Ram Janmabhoomi darshan",
      "Sarayu ghat evening aarti",
      "Hanuman Garhi visit",
      "Heritage lane walk",
    ]),
  },
  {
    id: "chitrakoot",
    state: "Uttar Pradesh",
    description:
      "Where Rama spent exile — forests, rivers, and Ramayana sites.",
    longDescription:
      "Chitrakoot's Mandakini river, forested hills, and mythological sites from the Ramayana offer a peaceful pilgrimage far from urban bustle.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Ramghat", "Ramayana sites", "Forest trails"],
    gallery: [UNSPLASH("photo-1599558267722-90a3f8e2fdc5")],
    tripPlan: defaultTripPlan("Chitrakoot", [
      "Ramghat morning aarti",
      "Kamadgiri parikrama",
      "Gupt Godavari caves",
      "Forest nature walk",
    ]),
  },
  {
    id: "mathura",
    state: "Uttar Pradesh",
    description: "Birthplace of Lord Krishna — colors, temples, and devotion.",
    longDescription:
      "Mathura bursts with color during Holi and Janmashtami. Ancient ghats on the Yamuna, Krishna temples, and the energy of bhajan-filled streets create pure joy.",
    duration: "2-3 days",
    bestTime: "October – March; Holi (Feb/Mar)",
    experiences: ["Janmabhoomi", "Yamuna ghats", "Holi celebrations"],
    gallery: [UNSPLASH("photo-1582719478250-c89cae4dc85b")],
    tripPlan: defaultTripPlan("Mathura", [
      "Krishna Janmabhoomi darshan",
      "Yamuna ghat visit",
      "Vishram Ghat evening aarti",
      "Local peda tasting",
    ]),
  },
  {
    id: "vrindavan",
    state: "Uttar Pradesh",
    description: "Krishna's playground — temples, kirtans, and sacred groves.",
    longDescription:
      "Vrindavan's thousands of temples, Banke Bihari darshan queues, and ISKCON's grandeur make it the heart of Krishna bhakti. Flower-laden streets and constant kirtan create an atmosphere unlike anywhere on Earth.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Banke Bihari", "ISKCON", "Kirtans"],
    gallery: [UNSPLASH("photo-1582719478250-c89cae4dc85b")],
    tripPlan: defaultTripPlan("Vrindavan", [
      "Banke Bihari Temple darshan",
      "ISKCON temple visit",
      "Prem Mandir light show",
      "Evening kirtan session",
    ]),
  },
  {
    id: "shimla",
    state: "Himachal Pradesh",
    description: "Colonial hill station with Mall Road charm and snowy vistas.",
    longDescription:
      "Shimla's Ridge, Christ Church, and toy train evoke British Raj nostalgia. Snow in winter and pleasant summers make it a year-round escape.",
    duration: "3-4 days",
    bestTime: "March – June; December – February (snow)",
    experiences: ["Mall Road", "Toy train", "Snow views"],
    gallery: [UNSPLASH("photo-1603264046856-95c9a827bcff")],
    tripPlan: defaultTripPlan("Shimla", [
      "The Ridge and Mall Road",
      "Jakhu Temple trek",
      "Toy train ride (Kalka-Shimla)",
      "Kufri snow activities",
    ]),
  },
  {
    id: "kullu-manali",
    state: "Himachal Pradesh",
    description: "Himalayan adventure hub — rivers, peaks, and paragliding.",
    longDescription:
      "Kullu-Manali combines apple orchards, Beas river adventures, and snow-capped peaks. Paragliding, trekking, and cozy cafes with mountain views attract travelers year-round.",
    duration: "4-6 days",
    bestTime: "March – June; December – February",
    experiences: ["Paragliding", "Rafting", "Solang Valley"],
    gallery: [UNSPLASH("photo-1512453979798-5ea266f8880c")],
    tripPlan: defaultTripPlan("Kullu-Manali", [
      "Solang Valley adventure sports",
      "Rohtang Pass excursion",
      "Old Manali cafe crawl",
      "Beas river rafting",
      "Hadimba Temple visit",
    ]),
  },
  {
    id: "bangalore",
    state: "Karnataka",
    description: "Garden City gateway to South India's hill stations.",
    longDescription:
      "Bangalore (Bengaluru) balances tech-hub energy with lush gardens, craft breweries, and access to Coorg, Mysore, and the Western Ghats.",
    duration: "2-3 days",
    bestTime: "October – February",
    experiences: ["Lalbagh gardens", "Cafes", "Day trips"],
    gallery: [UNSPLASH("photo-1548013146-72479768bada")],
    tripPlan: defaultTripPlan("Bangalore", [
      "Lalbagh Botanical Garden",
      "Cubbon Park morning walk",
      "Local craft brewery tour",
      "KR Market spice walk",
    ]),
  },
  {
    id: "mysore",
    state: "Karnataka",
    description: "City of palaces — illuminated grandeur and sandalwood.",
    longDescription:
      "Mysore Palace lit up on Sunday nights is one of India's most magical sights. Chamundi Hills, silk markets, and yoga traditions complete the experience.",
    duration: "2-3 days",
    bestTime: "October – March; Dasara (Sep/Oct)",
    experiences: ["Mysore Palace", "Chamundi Hills", "Silk markets"],
    gallery: [UNSPLASH("photo-1593696140821-1ffadde1bc97")],
    tripPlan: defaultTripPlan("Mysore", [
      "Mysore Palace tour",
      "Sunday night illumination",
      "Chamundi Hills climb",
      "Devaraja Market silk shopping",
    ]),
  },
  {
    id: "ooty",
    state: "Tamil Nadu",
    description: "Nilgiri hill station — tea gardens and misty lakes.",
    longDescription:
      "Ooty's tea estates, Nilgiri Mountain Railway, and Ooty Lake create a classic colonial hill retreat in the Western Ghats.",
    duration: "3-4 days",
    bestTime: "March – June",
    experiences: ["Tea gardens", "Toy train", "Boat rides"],
    gallery: [UNSPLASH("photo-1512453979798-5ea266f8880c")],
    tripPlan: defaultTripPlan("Ooty", [
      "Nilgiri Mountain Railway",
      "Tea estate tour and tasting",
      "Ooty Lake boat ride",
      "Doddabetta Peak viewpoint",
    ]),
  },
  {
    id: "kodaikanal",
    state: "Tamil Nadu",
    description:
      "Princess of Hill Stations — lakes, pine forests, and cool air.",
    longDescription:
      "Kodaikanal's star-shaped lake, Coaker's Walk, and pine-scented trails offer a quieter alternative to Ooty with equally stunning Nilgiri views.",
    duration: "3-4 days",
    bestTime: "April – June; September – November",
    experiences: ["Kodaikanal Lake", "Pine forests", "Waterfalls"],
    gallery: [UNSPLASH("photo-1521292270410-a8c53642e9d0")],
    tripPlan: defaultTripPlan("Kodaikanal", [
      "Kodaikanal Lake cycling",
      "Coaker's Walk sunrise",
      "Pillar Rocks viewpoint",
      "Bryant Park botanical tour",
    ]),
  },
  {
    id: "jodhpur",
    state: "Rajasthan",
    description: "The Blue City — Mehrangarh Fort and desert-edge culture.",
    longDescription:
      "Jodhpur's blue-painted old city climbs toward the imposing Mehrangarh Fort. Stepwells, spice markets, and desert excursions define this royal destination.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Mehrangarh Fort", "Blue City walk", "Desert camps"],
    gallery: [UNSPLASH("photo-1512453979798-5ea266f8880c")],
    tripPlan: defaultTripPlan("Jodhpur", [
      "Mehrangarh Fort audio tour",
      "Blue City heritage walk",
      "Toorji Ka Jhalra stepwell",
      "Desert camp dinner",
    ]),
  },
  {
    id: "mt-abu",
    state: "Rajasthan",
    description: "Rajasthan's only hill station — lakes and Jain temples.",
    longDescription:
      "Mount Abu offers cool respite in the desert state. Nakki Lake, Dilwara Jain temples with marble carvings, and sunset points draw couples and pilgrims alike.",
    duration: "2-3 days",
    bestTime: "March – June; September – November",
    experiences: ["Nakki Lake", "Dilwara temples", "Sunset Point"],
    gallery: [UNSPLASH("photo-1516300523007-3b26d3814a00")],
    tripPlan: defaultTripPlan("Mount Abu", [
      "Dilwara Jain Temple tour",
      "Nakki Lake boat ride",
      "Sunset Point visit",
      "Guru Shikhar peak trek",
    ]),
  },
  {
    id: "khajuraho",
    state: "Madhya Pradesh",
    description: "UNESCO temples with exquisite stone carvings.",
    longDescription:
      "Khajuraho's temple complexes showcase India's finest medieval sculpture. The sound and light show brings centuries of history to life under the stars.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Temple art", "Sound & light show", "Panna Tiger Reserve"],
    gallery: [UNSPLASH("photo-1516300523007-3b26d3814a00")],
    tripPlan: defaultTripPlan("Khajuraho", [
      "Western Group temples tour",
      "Sound and light show",
      "Eastern Group temples",
      "Local dance performance",
    ]),
  },
  {
    id: "jabalpur",
    state: "Madhya Pradesh",
    description: "Marble Rocks and Dhuandhar Falls on the Narmada.",
    longDescription:
      "Jabalpur's Bhedaghat gorge features white marble cliffs reflected in emerald Narmada waters. Boat rides through the canyon are unforgettable.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Marble Rocks", "Dhuandhar Falls", "Boat rides"],
    gallery: [UNSPLASH("photo-1549887534-3db1bd59dcca")],
    tripPlan: defaultTripPlan("Jabalpur", [
      "Bhedaghat Marble Rocks boat ride",
      "Dhuandhar Falls visit",
      "Narmada aarti",
      "Madala art village",
    ]),
  },
  {
    id: "pachmarhi",
    state: "Madhya Pradesh",
    description: "Satpura hill retreat — forests, waterfalls, and caves.",
    longDescription:
      "Pachmarhi, Madhya Pradesh's only hill station, hides waterfalls, ancient caves, and dense Satpura forests perfect for nature lovers.",
    duration: "3-4 days",
    bestTime: "October – June",
    experiences: ["Waterfalls", "Caves", "Forest treks"],
    gallery: [UNSPLASH("photo-1517824806704-9040b037703b")],
    tripPlan: defaultTripPlan("Pachmarhi", [
      "Bee Falls trek",
      "Jata Shankar cave",
      "Dhoopgarh sunset peak",
      "Satpura forest safari",
    ]),
  },
  {
    id: "jog-falls",
    state: "Karnataka",
    description: "One of India's highest waterfalls — monsoon spectacle.",
    longDescription:
      "Jog Falls plunges 830 feet in four distinct cascades. During monsoon the roar and mist create one of nature's most dramatic shows in South India.",
    duration: "1-2 days",
    bestTime: "July – October (monsoon peak)",
    experiences: ["Waterfall views", "Monsoon treks", "Western Ghats"],
    gallery: [UNSPLASH("photo-1516300523007-3b26d3814a00")],
    tripPlan: defaultTripPlan("Jog Falls", [
      "Main viewpoint sunrise",
      "Govt seat viewpoint trek",
      "Linganamakki Dam visit",
      "Local Malnad cuisine",
    ]),
  },
  {
    id: "fossil-park",
    state: "Gujarat",
    description: "Ancient fossil beds and unique geological formations.",
    longDescription:
      "India's fossil parks preserve prehistoric life in stone. Educational trails and unique rock formations make this a fascinating offbeat destination.",
    duration: "1-2 days",
    bestTime: "October – March",
    experiences: ["Fossil trails", "Geology", "Offbeat travel"],
    gallery: [UNSPLASH("photo-1516300523007-3b26d3814a00")],
    tripPlan: defaultTripPlan("Fossil Park", [
      "Guided fossil trail",
      "Interpretation center visit",
      "Geological formation walk",
    ]),
  },
  {
    id: "murudeshwar-beach",
    state: "Karnataka",
    description: "Giant Shiva statue meets Arabian Sea beaches.",
    longDescription:
      "Murudeshwar's 123-foot Shiva statue towers over the temple and beach. Coastal walks, boat rides, and sunset views combine spirituality with seaside relaxation.",
    duration: "2-3 days",
    bestTime: "October – March",
    experiences: ["Shiva statue", "Beach walks", "Coastal temples"],
    gallery: [UNSPLASH("photo-1507525428034-b723cf961d3e")],
    tripPlan: defaultTripPlan("Murudeshwar", [
      "Murudeshwar Temple darshan",
      "Shiva statue viewpoint",
      "Beach sunset walk",
      "Netrani Island boat trip",
    ]),
  },
];

export const destinations: Destination[] = seeds.map(buildDestination);

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((dest) => dest.id === id);
}

export function getDestinationsByLabel(label: LocationLabel): Destination[] {
  return destinations.filter((dest) => dest.labels?.includes(label));
}
