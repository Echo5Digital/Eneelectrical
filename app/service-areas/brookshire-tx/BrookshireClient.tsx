"use client";

import { useEffect, useRef, useState } from "react";
import Section, { SectionHeading } from "@/components/Section";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    description: "Serving the Houston-Katy metro with licensed residential electrical expertise",
  },
  {
    value: 500,
    suffix: "+",
    label: "Homes Served",
    description: "Residential electrical projects completed across the greater Houston area",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Emergency Response",
    description: "Around-the-clock emergency electrical service for Brookshire and nearby areas",
  },
  {
    value: 100,
    suffix: "%",
    label: "Licensed & Insured",
    description: "Every technician is licensed, insured, bonded, and background-checked",
  },
];

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return count;
}

function StatCounter({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const count = useCountUp(stat.value, 1800, animate);

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-8 rounded-[0.75rem] bg-white/10 border border-white/10 hover:bg-white/15 transition-colors duration-300"
      role="figure"
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
    >
      <div
        className="text-4xl sm:text-5xl font-bold mb-2 tabular-nums"
        style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
        aria-live="polite"
      >
        {count}
        <span>{stat.suffix}</span>
      </div>
      <p
        className="text-white font-bold text-base uppercase tracking-wide mb-2"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {stat.label}
      </p>
      <p
        className="text-blue-200 text-sm leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {stat.description}
      </p>
    </div>
  );
}

export default function BrookshireClient() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: "#0B1F3A" }}
      id="stats"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            By the Numbers
          </span>
          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            ENE Electrical at a Glance
          </h2>
          <p
            className="text-blue-200 text-base max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Trusted numbers that reflect our commitment to Brookshire and the greater Houston-Katy metro area.
          </p>
          <div
            className="mt-4 h-1 w-14 rounded-full mx-auto"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} animate={hasAnimated} />
          ))}
        </div>
      </div>
    </section>
  );
}