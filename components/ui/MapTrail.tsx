"use client";

import { useEffect, useRef, useState } from "react";

interface Milestone {
  id: string;
  top: number; // percentage from top
  left: number; // percentage from left
  label?: string;
}

export default function MapTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState("");

  const milestones: Milestone[] = [
    { id: "1", top: 12, left: 15, label: "Start" },
    { id: "2", top: 28, left: 40 },
    { id: "3", top: 45, left: 65 },
    { id: "4", top: 62, left: 35 },
    { id: "5", top: 78, left: 55 },
    { id: "6", top: 92, left: 25, label: "End" },
  ];

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = document.documentElement.scrollHeight;

      if (milestones.length < 2) return;

      let d = `M ${(milestones[0].left / 100) * width} ${
        (milestones[0].top / 100) * height
      }`;

      for (let i = 1; i < milestones.length; i++) {
        const x = (milestones[i].left / 100) * width;
        const y = (milestones[i].top / 100) * height;
        d += ` L ${x} ${y}`;
      }

      setPathData(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ height: "100%", minHeight: "100vh" }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full"
        style={{ height: "100%", minHeight: "100vh", overflow: "visible" }}
        preserveAspectRatio="none"
      >
        <path
          d={pathData}
          fill="none"
          stroke="#FF9800"
          strokeWidth="2"
          strokeDasharray="6 4"
          opacity="0.3"
        />
        {milestones.map((milestone) => (
          <g key={milestone.id}>
            <circle
              cx={`${milestone.left}%`}
              cy={`${milestone.top}%`}
              r="5"
              fill="#FF9800"
              opacity="0.5"
            />
            {milestone.label && (
              <text
                x={`${milestone.left}%`}
                y={`${milestone.top}%`}
                dx="12"
                dy="-8"
                fontSize="11"
                fill="#FF9800"
                className="font-medium"
                opacity="0.7"
              >
                {milestone.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
