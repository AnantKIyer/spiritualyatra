"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DestinationCard from "@/components/sections/DestinationCard";
import { toDestinations } from "@/lib/convex/map";
import type { LocationLabel } from "@/types";

type PriceSort = "none" | "low-high" | "high-low";
type AlphaSort = "none" | "asc" | "desc";

const ALL_LABELS: LocationLabel[] = [
  "spiritual",
  "romantic",
  "historic",
  "excursion",
  "adventure",
];

export default function DestinationsClient() {
  const destinationDocs = useQuery(api.destinations.list);
  const destinations = useMemo(
    () => (destinationDocs ? toDestinations(destinationDocs) : []),
    [destinationDocs],
  );

  const [activeLabel, setActiveLabel] = useState<LocationLabel | "all">("all");
  const [priceSort, setPriceSort] = useState<PriceSort>("none");
  const [alphaSort, setAlphaSort] = useState<AlphaSort>("none");

  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    if (activeLabel !== "all") {
      result = result.filter((dest) => dest.labels?.includes(activeLabel));
    }

    result.sort((a, b) => {
      if (priceSort !== "none") {
        const priceA = a.basePrice ?? 0;
        const priceB = b.basePrice ?? 0;
        const priceCompare =
          priceSort === "low-high" ? priceA - priceB : priceB - priceA;
        if (priceCompare !== 0) return priceCompare;
      }
      if (alphaSort !== "none") {
        return alphaSort === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return result;
  }, [destinations, activeLabel, priceSort, alphaSort]);

  if (destinationDocs === undefined) {
    return (
      <div className="text-center py-16 text-ink-500">
        Loading destinations…
      </div>
    );
  }

  return (
    <>
      {/* Pill filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveLabel("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeLabel === "all"
              ? "bg-saffron-500 text-white shadow-indian-lg"
              : "bg-white text-ink-600 border border-ink-200 hover:border-saffron-300"
          }`}
        >
          All
        </button>
        {ALL_LABELS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveLabel(label)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
              activeLabel === label
                ? "bg-saffron-500 text-white shadow-indian-lg"
                : "bg-white text-ink-600 border border-ink-200 hover:border-saffron-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value as PriceSort)}
          className="border border-ink-200 rounded-xl px-4 py-2 text-sm text-ink-700 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300"
        >
          <option value="none">Sort by price</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
        <select
          value={alphaSort}
          onChange={(e) => setAlphaSort(e.target.value as AlphaSort)}
          className="border border-ink-200 rounded-xl px-4 py-2 text-sm text-ink-700 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300"
        >
          <option value="none">Sort alphabetically</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
        <span className="text-ink-500 text-sm self-center ml-auto">
          {filteredDestinations.length} destinations
        </span>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 items-stretch"
      >
        {filteredDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </motion.div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-16 text-ink-500">
          No destinations match this filter.
        </div>
      )}
    </>
  );
}
