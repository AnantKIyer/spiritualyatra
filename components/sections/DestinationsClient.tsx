'use client';

import { useMemo, useState } from 'react';
import { locations } from '@/lib/data/locations';
import { destinations } from '@/lib/data/destinations';
import DestinationCard from '@/components/sections/DestinationCard';
import type { Destination, Location } from '@/types';

// Convert Location to Destination format for display
function locationToDestination(location: Location): Destination {
  // Try to find existing destination data for this location
  const existingDest = destinations.find((d) => d.id === location.id);
  
  // If we have existing destination data, use it (it has description, location, tripPlan)
  if (existingDest) {
    return {
      ...existingDest,
      labels: location.labels,
      basePrice: location.basePrice,
    };
  }
  
  // Otherwise, create a basic destination from location
  const labelDescriptions: Record<string, string> = {
    spiritual: 'A sacred destination offering spiritual experiences and divine connection.',
    romantic: 'A romantic getaway perfect for couples seeking memorable moments.',
    historic: 'A destination rich in historical significance and cultural heritage.',
    excursion: 'An ideal destination for short trips and family outings.',
    adventure: 'An adventure-filled destination for thrill-seekers and outdoor enthusiasts.',
  };
  
  const description = location.labels.length > 0
    ? labelDescriptions[location.labels[0]] || `Explore ${location.name}, a beautiful destination with unique experiences.`
    : `Explore ${location.name}, a beautiful destination with unique experiences.`;
  
  return {
    id: location.id,
    name: location.name,
    description,
    image: location.image,
    location: 'India', // Default location, can be enhanced later
    highlights: location.highlights,
    labels: location.labels,
    basePrice: location.basePrice,
    duration: '2-5 days', // Default duration
    tripPlan: [], // Empty trip plan for locations without detailed data
  };
}

export default function DestinationsClient() {
  const [labelFilter, setLabelFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'none' | 'low-high' | 'high-low'>('none');
  const [alphaSort, setAlphaSort] = useState<'none' | 'asc' | 'desc'>('none');

  // Convert all locations to destinations
  const allDestinations = useMemo(() => {
    return locations.map(locationToDestination);
  }, []);

  const availableLabels = useMemo(() => {
    const labelSet = new Set<string>();
    allDestinations.forEach((dest) => {
      dest.labels?.forEach((label) => labelSet.add(label));
    });
    return Array.from(labelSet).sort();
  }, [allDestinations]);

  const filteredDestinations = useMemo(() => {
    let result = [...allDestinations];

    if (labelFilter !== 'all') {
      result = result.filter((dest) => dest.labels?.includes(labelFilter as any));
    }

    if (alphaSort !== 'none') {
      result.sort((a, b) =>
        alphaSort === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    }

    if (priceSort !== 'none') {
      result.sort((a, b) => {
        const priceA = a.basePrice ?? 0;
        const priceB = b.basePrice ?? 0;
        return priceSort === 'low-high' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [allDestinations, labelFilter, priceSort, alphaSort]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="block text-xs font-medium text-airbnb-gray mb-1">
              Filter by label
            </label>
            <select
              className="border border-airbnb-border rounded-lg px-3 py-2 text-sm text-airbnb-black bg-white"
              value={labelFilter}
              onChange={(e) => setLabelFilter(e.target.value)}
            >
              <option value="all">All labels</option>
              {availableLabels.map((label) => (
                <option key={label} value={label}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-airbnb-gray mb-1">
              Sort by price
            </label>
            <select
              className="border border-airbnb-border rounded-lg px-3 py-2 text-sm text-airbnb-black bg-white"
              value={priceSort}
              onChange={(e) =>
                setPriceSort(e.target.value as 'none' | 'low-high' | 'high-low')
              }
            >
              <option value="none">No price sort</option>
              <option value="low-high">Low to high</option>
              <option value="high-low">High to low</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-airbnb-gray mb-1">
              Sort alphabetically
            </label>
            <select
              className="border border-airbnb-border rounded-lg px-3 py-2 text-sm text-airbnb-black bg-white"
              value={alphaSort}
              onChange={(e) =>
                setAlphaSort(e.target.value as 'none' | 'asc' | 'desc')
              }
            >
              <option value="none">Default order</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {filteredDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </>
  );
}


