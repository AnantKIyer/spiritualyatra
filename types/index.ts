export interface TripPlanDay {
  day: string;
  title: string;
  description: string;
  activities: string[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  highlights: string[];
  labels?: LocationLabel[];
  basePrice?: number;
  duration?: string;
  tripPlan: TripPlanDay[];
}

export type LocationLabel =
  | 'spiritual'
  | 'romantic'
  | 'historic'
  | 'excursion'
  | 'adventure';

export interface Location {
  id: string;
  name: string;
  image: string;
  labels: LocationLabel[];
  highlights: string[];
  basePrice: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  image: string;
  destinations: string[];
  duration: string;
  price: number;
  highlights: string[];
  itinerary?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  package?: string;
}

