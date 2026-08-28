"use client";

import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "ENE Electrical installed recessed lighting throughout our entire kitchen and living room. The difference is night and day — it looks like a completely different home. Clean, modern, and so much brighter.",
    authorName: "Maria G.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "They added 12 recessed LED lights in our open floor plan and installed dimmer switches in every room. The crew was professional, on time, and left everything spotless. Highly recommend!",
    authorName: "James T.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "I was worried about the installation process, but ENE Electrical made it so easy. Minimal disruption to our ceilings and the finished product looks incredible. Our hallway is finally well-lit.",
    authorName: "Sandra M.",
    authorLocation: "Energy Corridor, TX",
    rating: 5,
  },
  {
    quote:
      "Outstanding work on our kitchen recessed lighting. They planned the layout perfectly — no dark spots over the counters. The dimmers work flawlessly with the LED fixtures too.",
    authorName: "Robert K.",
    authorLocation: "Memorial, Houston TX",
    rating: 5,
  },
  {
    quote:
      "We had recessed lighting added to three bedrooms and a home office. ENE Electrical was fast, professional, and the price was fair. The LED lights are energy-efficient and look fantastic.",
    authorName: "Lisa P.",
    authorLocation: "Fulshear, TX",
    rating: 5,
  },
  {
    quote:
      "Chose ENE Electrical based on a neighbor's recommendation and couldn't be happier. They retrofitted wafer lights into our low-ceiling basement without any major work. Perfect result.",
    authorName: "David H.",
    authorLocation: "Southwest Houston, TX",
    rating: 5,
  },
];

const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/katy-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear", href: "/service-areas/fulshear-tx" },
  { label: "Energy Corridor", href: "/service-areas/energy-corridor-houston" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Southwest Houston", href: "/service-areas/southwest-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const VISIBLE_COUNT_MOBILE = 1;
const VISIBLE_COUNT_DESKTOP = 3;

function ServiceAreaLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="flex items-center justify-center text-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md border-2"
      style={{
        backgroundColor: "white",
        color: hovered ? "#F5A623" : "#0B1F3A",
        borderColor: hovered ? "#F5A623" : "#E5E7EB",
        fontFamily: "Inter, sans-serif",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}

export function ServiceAreaGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {serviceAreas.map((area) => (
        <ServiceAreaLink key={area.label} label={area.label} href={area.href} />
      ))}
    </div>
  );
}

export default function RecessedLEDLightingClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const next = () => setCurrentIndex((i) => (i + 1) % total);

  const getVisible = (count: number) => {
    return Array.from({ length: count }, (_, i) => testimonials[(currentIndex + i) % total]);
  };

  return (
    <Section background="default" spacing="lg">
      <SectionHeading
        eyebrow="Customer Reviews"
        title="What Homeowners Are Saying"
        subtitle="Real reviews from Houston-area homeowners who upgraded their lighting with ENE Electrical."
        align="center"
      />

      {/* Mobile: single card */}
      <div className="block md:hidden">
        <Card
          variant="testimonial"
          quote={testimonials[currentIndex].quote}
          authorName={testimonials[currentIndex].authorName}
          authorLocation={testimonials[currentIndex].authorLocation}
          rating={testimonials[currentIndex].rating}
        />
      </div>

      {/* Desktop: 3 cards */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {getVisible(VISIBLE_COUNT_DESKTOP).map((t, i) => (
          <Card
            key={`${currentIndex}-${i}`}
            variant="testimonial"
            quote={t.quote}
            authorName={t.authorName}
            authorLocation={t.authorLocation}
            rating={t.rating}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-200 hover:shadow-md active:scale-95"
          style={{ borderColor: "#0B1F3A", color: "#0B1F3A", backgroundColor: "white" }}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentIndex ? "#F5A623" : "#D1D5DB",
                transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-200 hover:shadow-md active:scale-95"
          style={{ borderColor: "#0B1F3A", color: "#0B1F3A", backgroundColor: "white" }}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
        {currentIndex + 1} of {total} reviews
      </p>
    </Section>
  );
}