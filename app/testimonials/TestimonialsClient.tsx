"use client";

import React, { useState } from "react";
import { Star, Filter } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";

const SERVICE_TAGS = [
  "All",
  "Panel Upgrade",
  "EV Charger",
  "Emergency",
  "Electrical Repair",
  "Generator",
  "Lighting",
  "New Construction",
  "Inspection",
];

interface Review {
  id: number;
  authorName: string;
  authorLocation: string;
  rating: number;
  date: string;
  serviceType: string;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    authorName: "Marcus T.",
    authorLocation: "Katy, TX",
    rating: 5,
    date: "March 2024",
    serviceType: "Panel Upgrade",
    quote:
      "ENE Electrical upgraded our entire electrical panel in one day. The team was professional, arrived on time, and left our home cleaner than they found it. Absolutely top-tier service; I wouldn't call anyone else.",
  },
  {
    id: 2,
    authorName: "Sandra L.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
    date: "February 2024",
    serviceType: "EV Charger",
    quote:
      "Had a Level 2 EV charger installed in my garage. The technician walked me through the whole process, handled the permit, and was done within a few hours. Charging my car overnight has never been easier. Highly recommended!",
  },
  {
    id: 3,
    authorName: "David R.",
    authorLocation: "Energy Corridor, Houston, TX",
    rating: 5,
    date: "January 2024",
    serviceType: "Emergency",
    quote:
      "We had a power outage at 9 PM on a Sunday. ENE Electrical answered immediately and had a technician at our house within an hour. Fast, efficient, and fair pricing even for an emergency call. Lifesavers!",
  },
  {
    id: 4,
    authorName: "Patricia M.",
    authorLocation: "Fulshear, TX",
    rating: 5,
    date: "December 2023",
    serviceType: "Generator",
    quote:
      "After last year's storms, we decided to get a whole-home generator installed. ENE Electrical handled everything from permits to hookup. The installation was clean and professional. Peace of mind is priceless.",
  },
  {
    id: 5,
    authorName: "James H.",
    authorLocation: "Southwest Houston, TX",
    rating: 5,
    date: "November 2023",
    serviceType: "Lighting",
    quote:
      "Had recessed LED lighting installed throughout our main floor. The team was meticulous, with no drywall damage and perfect placement. The finished result looks like something out of a magazine. Incredible work.",
  },
  {
    id: 6,
    authorName: "Maria G.",
    authorLocation: "Katy, TX",
    rating: 5,
    date: "October 2023",
    serviceType: "Electrical Repair",
    quote:
      "A circuit in our kitchen kept tripping and we couldn't figure out why. ENE diagnosed the problem quickly and had it repaired the same day. Very knowledgeable technicians who explained everything clearly.",
  },
  {
    id: 7,
    authorName: "Kevin B.",
    authorLocation: "Memorial, Houston, TX",
    rating: 5,
    date: "September 2023",
    serviceType: "Panel Upgrade",
    quote:
      "Our old panel was from the 1980s and definitely needed replacing. ENE handled the full upgrade, coordinated with the utility company, and passed inspection the first time. Worth every penny for the safety upgrade.",
  },
  {
    id: 8,
    authorName: "Angela S.",
    authorLocation: "Spring Branch, Houston, TX",
    rating: 5,
    date: "August 2023",
    serviceType: "Inspection",
    quote:
      "We used ENE Electrical for a pre-purchase electrical inspection on our new home. The detailed report they provided helped us negotiate repairs with the seller. Thorough, honest, and professional.",
  },
  {
    id: 9,
    authorName: "Robert C.",
    authorLocation: "Westchase, Houston, TX",
    rating: 5,
    date: "July 2023",
    serviceType: "EV Charger",
    quote:
      "ENE Electrical installed a Tesla wall connector for us. They ran the conduit neatly along the garage wall, everything looks factory-clean. Our neighbors have already asked for their contact info!",
  },
  {
    id: 10,
    authorName: "Linda P.",
    authorLocation: "Richmond, TX",
    rating: 5,
    date: "June 2023",
    serviceType: "New Construction",
    quote:
      "ENE Electrical handled all the electrical work for our new home build. They worked seamlessly with the builder and passed every inspection on the first attempt. Would choose them again without hesitation.",
  },
  {
    id: 11,
    authorName: "Thomas W.",
    authorLocation: "Brookshire, TX",
    rating: 5,
    date: "May 2023",
    serviceType: "Emergency",
    quote:
      "Had a burning smell from an outlet late at night, which was very scary. ENE came out within 45 minutes, identified a dangerous wiring issue, and fixed it safely. Couldn't be more grateful for their quick response.",
  },
  {
    id: 12,
    authorName: "Carmen V.",
    authorLocation: "Katy, TX",
    rating: 5,
    date: "April 2023",
    serviceType: "Generator",
    quote:
      "Finally got a standby generator after years of thinking about it. ENE made the whole process simple. They sized the unit correctly, handled permits, and the installation looks great. Excellent value.",
  },
];

// Aggregate stats
const TOTAL_REVIEWS = REVIEWS.length;
const AVERAGE_RATING = (
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / TOTAL_REVIEWS
).toFixed(1);

function AggregateStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={28}
          fill={i < Math.round(rating) ? "#F5A623" : "transparent"}
          stroke={i < Math.round(rating) ? "#F5A623" : "#D1D5DB"}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// JSON-LD for aggregate rating (rendered in client component as a script tag)
const aggregateRatingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ENE Electrical",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Katy",
    addressRegion: "TX",
    postalCode: "77494",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: AVERAGE_RATING,
    reviewCount: TOTAL_REVIEWS,
    bestRating: "5",
    worstRating: "1",
  },
};

export default function TestimonialsClient() {
  const [activeTag, setActiveTag] = useState("All");

  const filteredReviews =
    activeTag === "All"
      ? REVIEWS
      : REVIEWS.filter((r) => r.serviceType === activeTag);

  return (
    <>
      {/* Aggregate Rating JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingJsonLd),
        }}
      />

      {/* Aggregate Rating Summary */}
      <Section background="white" spacing="md" id="rating-summary">
        <div className="flex flex-col items-center text-center">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Overall Rating
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* Big number */}
            <div className="flex flex-col items-center">
              <span
                className="text-7xl font-extrabold leading-none"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                aria-label={`Average rating: ${AVERAGE_RATING} out of 5`}
              >
                {AVERAGE_RATING}
              </span>
              <span
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                out of 5
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-20 bg-gray-200" aria-hidden="true" />

            {/* Stars + count */}
            <div className="flex flex-col items-center gap-2">
              <AggregateStars rating={parseFloat(AVERAGE_RATING)} />
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Based on{" "}
                <strong style={{ color: "#0B1F3A" }}>{TOTAL_REVIEWS} verified reviews</strong>
              </p>
              <p
                className="text-xs text-gray-400"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                From residential customers across Houston &amp; Katy, TX
              </p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-20 bg-gray-200" aria-hidden="true" />

            {/* Credential badges */}
            <div className="flex flex-col gap-2">
              {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  <span
                    className="inline-flex w-5 h-5 rounded-full items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F5A623" }}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4"
                        stroke="#0B1F3A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Service Tag Filter + Reviews Grid */}
      <Section background="default" spacing="lg" id="reviews">
        <SectionHeading
          eyebrow="Customer Testimonials"
          title="Real Reviews from Real Customers"
          subtitle="Browse by service type to find testimonials most relevant to your electrical needs."
          align="center"
        />

        {/* Filter Tags */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="group"
          aria-label="Filter reviews by service type"
        >
          <span
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 self-center mr-1"
            style={{ fontFamily: "Inter, sans-serif" }}
            aria-hidden="true"
          >
            <Filter size={14} />
            Filter:
          </span>
          {SERVICE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F5A623]"
              style={
                activeTag === tag
                  ? {
                      backgroundColor: "#F5A623",
                      color: "#0B1F3A",
                      borderColor: "#F5A623",
                      fontFamily: "Montserrat, sans-serif",
                    }
                  : {
                      backgroundColor: "white",
                      color: "#1A2530",
                      borderColor: "#E5E7EB",
                      fontFamily: "Montserrat, sans-serif",
                    }
              }
            >
              {tag}
              {tag !== "All" && (
                <span
                  className="ml-1.5 text-[10px] opacity-70"
                >
                  ({REVIEWS.filter((r) => r.serviceType === tag).length})
                </span>
              )}
              {tag === "All" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({REVIEWS.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        {filteredReviews.length === 0 ? (
          <p className="text-center text-gray-500 py-12" style={{ fontFamily: "Inter, sans-serif" }}>
            No reviews found for this service type.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <article key={review.id} aria-label={`Review by ${review.authorName}`}>
                {/* Individual Review JSON-LD */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Review",
                      author: {
                        "@type": "Person",
                        name: review.authorName,
                      },
                      reviewBody: review.quote,
                      reviewRating: {
                        "@type": "Rating",
                        ratingValue: review.rating,
                        bestRating: "5",
                        worstRating: "1",
                      },
                      datePublished: review.date,
                      itemReviewed: {
                        "@type": "LocalBusiness",
                        name: "ENE Electrical",
                      },
                    }),
                  }}
                />
                <div className="h-full">
                  {/* Service tag chip above the card */}
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(11,31,58,0.08)",
                        color: "#0B1F3A",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {review.serviceType}
                    </span>
                    <span
                      className="text-[10px] text-gray-400"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {review.date}
                    </span>
                  </div>
                  <Card
                    variant="testimonial"
                    quote={review.quote}
                    authorName={review.authorName}
                    authorLocation={review.authorLocation}
                    rating={review.rating}
                    className="h-full"
                  />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Result count */}
        <p
          className="text-center text-sm text-gray-400 mt-8"
          style={{ fontFamily: "Inter, sans-serif" }}
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {filteredReviews.length} of {REVIEWS.length} reviews
          {activeTag !== "All" ? ` for "${activeTag}"` : ""}
        </p>
      </Section>
    </>
  );
}