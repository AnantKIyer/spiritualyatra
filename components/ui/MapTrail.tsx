"use client";

import React from "react";

export default function MapTrail() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <svg
        className="w-full h-full opacity-10"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Decorative path lines */}
        <path
          d="M0,200 Q360,100 720,200 T1440,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        <path
          d="M0,400 Q360,300 720,400 T1440,400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
          opacity="0.7"
        />
        <path
          d="M0,600 Q360,500 720,600 T1440,600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
