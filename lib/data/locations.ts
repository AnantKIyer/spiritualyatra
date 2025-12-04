import type { Location } from '@/types';

export const locations: Location[] = [
    {
        id: 'varanasi',
        name: 'Varanasi',
        image:
            'https://img.staticmb.com/mbcontent/images/crop/uploads/2024/4/places-to-visit-in-varanasi_0_1200.jpg.webp',
        labels: ['spiritual', 'historic'],
        highlights: [
            'Ganga Aarti at Dashashwamedh Ghat',
            'Sunrise boat ride on the Ganges',
            'Ancient Kashi Vishwanath Temple',
        ],
        basePrice: 12000,
    },
    {
        id: 'rishikesh',
        name: 'Rishikesh',
        image:
            'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80',
        labels: ['spiritual', 'adventure', 'excursion'],
        highlights: [
            'Yoga and meditation by the Ganga',
            'Lakshman Jhula and Ram Jhula',
            'White-water rafting and camping',
        ],
        basePrice: 10000,
    },
    {
        id: 'haridwar',
        name: 'Haridwar',
        image:
            'https://images.unsplash.com/photo-1563897539633-7374c276c212?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual', 'excursion'],
        highlights: [
            'Har Ki Pauri Ganga Aarti',
            'Sacred ghats and ashrams',
            'Traditional vegetarian food streets',
        ],
        basePrice: 8000,
    },
    {
        id: 'prayagraj',
        name: 'Prayagraj',
        image:
            'https://images.unsplash.com/photo-1607863720035-4b8306a3e1af?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual', 'historic'],
        highlights: [
            'Triveni Sangam holy confluence',
            'Kumbh Mela grounds',
            'Historic forts and ghats',
        ],
        basePrice: 9000,
    },
    {
        id: 'udaipur',
        name: 'Udaipur',
        image:
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'historic'],
        highlights: [
            'City Palace and Lake Pichola',
            'Sunset boat ride',
            'Rooftop candle-light dining',
        ],
        basePrice: 14000,
    },
    {
        id: 'jaipur',
        name: 'Jaipur',
        image:
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'historic', 'excursion'],
        highlights: [
            'Amer Fort and Nahargarh views',
            'Pink City heritage walk',
            'Local bazaars and handicrafts',
        ],
        basePrice: 13000,
    },
    {
        id: 'agra',
        name: 'Agra',
        image:
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'historic'],
        highlights: [
            'Taj Mahal sunrise view',
            'Agra Fort exploration',
            'Local marble and craft markets',
        ],
        basePrice: 11000,
    },
    {
        id: 'fatehpur-sikri',
        name: 'Fatehpur Sikri',
        image:
            'https://images.unsplash.com/photo-1603264041343-9a5a14b0a0e1?auto=format&fit=crop&w=900&q=80',
        labels: ['historic'],
        highlights: [
            'Mughal architectural complex',
            'Buland Darwaza',
            'Ancient palaces and courtyards',
        ],
        basePrice: 6000,
    },
    {
        id: 'jaisalmer',
        name: 'Jaisalmer',
        image:
            'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=900&q=80',
        labels: ['adventure', 'excursion', 'historic'],
        highlights: [
            'Desert safari and camel rides',
            'Golden Fort and havelis',
            'Cultural folk performances',
        ],
        basePrice: 15000,
    },
    {
        id: 'rann-of-kutch',
        name: 'Rann of Kutch',
        image:
            'https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&fit=crop&w=900&q=80',
        labels: ['adventure', 'excursion'],
        highlights: [
            'White salt desert landscapes',
            'Sunrise and sunset over the Rann',
            'Local handicrafts and culture',
        ],
        basePrice: 16000,
    },
    {
        id: 'auli',
        name: 'Auli',
        image:
            'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80',
        labels: ['adventure'],
        highlights: [
            'Ski slopes and snow views (seasonal)',
            'Cable car rides',
            'High-altitude trekking',
        ],
        basePrice: 17000,
    },
    {
        id: 'mussoorie',
        name: 'Mussoorie',
        image:
            'https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?auto=format&fit=crop&w=900&q=80',
        labels: ['adventure', 'excursion'],
        highlights: [
            'Hill station views and nature walks',
            'Mall Road and local cafes',
            'Short treks and waterfalls',
        ],
        basePrice: 9000,
    },
    // Additional spiritual locations
    {
        id: 'vindhya-parvat',
        name: 'Vindhya Parvat',
        image:
            'https://images.unsplash.com/photo-1516300523007-3b26d3814a00?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual'],
        highlights: [
            'Hilltop temples and sacred caves',
            'Panoramic views of the Vindhya range',
            'Peaceful forest surroundings',
        ],
        basePrice: 9000,
    },
    {
        id: 'ayodhya',
        name: 'Ayodhya',
        image:
            'https://images.unsplash.com/photo-1593696140821-1ffadde1bc97?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual', 'historic'],
        highlights: [
            'Sacred temples and ghats on the Sarayu',
            'Ram Janmabhoomi and associated sites',
            'Evening aarti and cultural programs',
        ],
        basePrice: 11000,
    },
    {
        id: 'chitrakoot',
        name: 'Chitrakoot',
        image:
            'https://images.unsplash.com/photo-1599558267722-90a3f8e2fdc5?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual'],
        highlights: [
            'Ramghat and Mandakini river banks',
            'Mythological sites from the Ramayana',
            'Quiet forested hills and caves',
        ],
        basePrice: 8500,
    },
    {
        id: 'mathura',
        name: 'Mathura',
        image:
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual', 'historic'],
        highlights: [
            'Shri Krishna Janmabhoomi temple',
            'Ancient ghats on the Yamuna',
            'Festive Holi and Janmashtami celebrations',
        ],
        basePrice: 10500,
    },
    {
        id: 'vrindavan',
        name: 'Vrindavan',
        image:
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        labels: ['spiritual'],
        highlights: [
            'Iconic temples like Banke Bihari and ISKCON',
            'Devotional kirtans and bhajans',
            'Flower-laden streets and sacred groves',
        ],
        basePrice: 10000,
    },
    // Additional romantic locations
    {
        id: 'shimla',
        name: 'Shimla',
        image:
            'https://images.unsplash.com/photo-1603264046856-95c9a827bcff?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'excursion'],
        highlights: [
            'Colonial-era architecture and Mall Road',
            'Snowy vistas (seasonal)',
            'Scenic toy train ride (nearby)',
        ],
        basePrice: 12000,
    },
    {
        id: 'kullu-manali',
        name: 'Kullu-Manali',
        image:
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'adventure'],
        highlights: [
            'Snowy peaks and riverside walks',
            'Paragliding and adventure sports',
            'Cafes with mountain views',
        ],
        basePrice: 15000,
    },
    {
        id: 'bangalore',
        name: 'Bangalore',
        image:
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'excursion'],
        highlights: [
            'Lush gardens and lakes',
            'Vibrant cafes and nightlife',
            'Gateway to nearby hill stations',
        ],
        basePrice: 9500,
    },
    {
        id: 'mysore',
        name: 'Mysore',
        image:
            'https://images.unsplash.com/photo-1593696140821-1ffadde1bc97?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'historic'],
        highlights: [
            'Illuminated Mysore Palace',
            'Chamundi Hills viewpoints',
            'Silk, sandalwood, and local markets',
        ],
        basePrice: 10000,
    },
    {
        id: 'ooty',
        name: 'Ooty',
        image:
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'excursion'],
        highlights: [
            'Tea gardens and misty hills',
            'Boat rides on Ooty Lake',
            'Toy train through the Nilgiris',
        ],
        basePrice: 11500,
    },
    {
        id: 'kodaikanal',
        name: 'Kodaikanal',
        image:
            'https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'excursion'],
        highlights: [
            'Star-shaped lake and pine forests',
            'Waterfalls and walking trails',
            'Cool climate and serene viewpoints',
        ],
        basePrice: 11000,
    },
    {
        id: 'jodhpur',
        name: 'Jodhpur',
        image:
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'historic', 'excursion'],
        highlights: [
            'Mehrangarh Fort and blue city views',
            'Old city lanes and stepwells',
            'Desert-edge cultural experiences',
        ],
        basePrice: 12500,
    },
    {
        id: 'mt-abu',
        name: 'Mount Abu',
        image:
            'https://images.unsplash.com/photo-1516300523007-3b26d3814a00?auto=format&fit=crop&w=900&q=80',
        labels: ['romantic', 'historic', 'excursion'],
        highlights: [
            'Nakki Lake and sunset point',
            'Dilwara Jain temples',
            'Cool hill-station climate in Rajasthan',
        ],
        basePrice: 11500,
    },

    {
        id: 'khajuraho',
        name: 'Khajuraho',
        image:
            'https://images.unsplash.com/photo-1516300523007-3b26d3814a00?auto=format&fit=crop&w=900&q=80',
        labels: ['historic'],
        highlights: [
            'UNESCO-listed temple complexes',
            'Intricate stone carvings',
            'Sound and light shows on temple history',
        ],
        basePrice: 13000,
    },
    // Additional geographical-significance locations
    {
        id: 'jabalpur',
        name: 'Jabalpur',
        image:
            'https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&fit=crop&w=900&q=80',
        labels: ['excursion', 'adventure'],
        highlights: [
            'Marble Rocks at Bhedaghat',
            'Dhuandhar Falls',
            'Boat rides through river gorges',
        ],
        basePrice: 10500,
    },
    {
        id: 'pachmarhi',
        name: 'Pachmarhi',
        image:
            'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80',
        labels: ['excursion', 'adventure'],
        highlights: [
            'Satpura hill views and forests',
            'Waterfalls and caves',
            'Trekking and nature walks',
        ],
        basePrice: 11500,
    },
    {
        id: 'jog-falls',
        name: 'Jog Falls',
        image:
            'https://images.unsplash.com/photo-1516300523007-3b26d3814a00?auto=format&fit=crop&w=900&q=80',
        labels: ['excursion', 'adventure'],
        highlights: [
            'One of India’s highest waterfalls',
            'Lush green surroundings',
            'Monsoon-season scenic vistas',
        ],
        basePrice: 9000,
    },
    {
        id: 'fossil-park',
        name: 'Fossils Park',
        image:
            'https://images.unsplash.com/photo-1516300523007-3b26d3814a00?auto=format&fit=crop&w=900&q=80',
        labels: ['excursion'],
        highlights: [
            'Ancient fossil remains',
            'Educational trails',
            'Unique geological formations',
        ],
        basePrice: 8000,
    },
    {
        id: 'murudeshwar-beach',
        name: 'Murdeshwar Sea Beach',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
        labels: ['excursion', 'spiritual'],
        highlights: [
            'Massive Shiva statue and temple complex',
            'Arabian Sea views and beach walks',
            'Coastal boat rides (seasonal)',
        ],
        basePrice: 11000,
    },
];
