'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Destination, TripPlanDay } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';

interface DestinationDetailsProps {
  destination: Destination;
}

export default function DestinationDetails({ destination }: DestinationDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-10">
          <div className="max-w-[1760px] mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3">
              {destination.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl">
              {destination.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        {/* Location & Duration */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-airbnb-gray">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-base">{destination.location}</span>
          </div>
          {destination.duration && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-base">{destination.duration}</span>
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-airbnb-black mb-4">
            Highlights
          </h2>
          <div className="flex flex-wrap gap-3">
            {destination.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-airbnb-surface text-airbnb-black text-sm font-medium rounded-lg"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Trip Plan Button */}
        {destination.tripPlan && destination.tripPlan.length > 0 && (
          <div className="mb-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              View Detailed Trip Plan
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-airbnb-surface rounded-xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-airbnb-black mb-3">
            Ready to visit {destination.name}?
          </h2>
          <p className="text-airbnb-gray mb-6 max-w-2xl mx-auto">
            Contact us to plan your perfect spiritual journey to {destination.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Contact us
              </Button>
            </Link>
            <Link href="/packages">
              <Button variant="outline" size="md">
                View packages
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Trip Plan Modal */}
      {destination.tripPlan && destination.tripPlan.length > 0 && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${destination.name} - Detailed Trip Plan`}
        >
          <div className="space-y-8">
            {destination.tripPlan.map((day: TripPlanDay, index: number) => (
              <div
                key={index}
                className="border-l-4 border-airbnb-red pl-6 pb-6 last:pb-0"
              >
                <div className="mb-3">
                  <span className="text-sm font-semibold text-airbnb-red uppercase tracking-wide">
                    {day.day}
                  </span>
                  <h3 className="text-xl font-semibold text-airbnb-black mt-1">
                    {day.title}
                  </h3>
                </div>
                <p className="text-airbnb-gray mb-4 leading-relaxed">
                  {day.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-airbnb-black uppercase tracking-wide">
                    Activities:
                  </h4>
                  <ul className="space-y-2">
                    {day.activities.map((activity, activityIndex) => (
                      <li
                        key={activityIndex}
                        className="flex items-start gap-3 text-airbnb-gray"
                      >
                        <svg
                          className="w-5 h-5 text-airbnb-red mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

