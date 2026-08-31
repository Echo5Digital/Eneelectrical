"use client";

import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

interface Testimonial {
  quote: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  testimonials: Testimonial[];
  faqs: FAQ[];
}

export default function NewConstructionWiringClient({ testimonials, faqs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const toggleFaq = (index: number) =>
    setOpenFaq((prev) => (prev === index ? null : index));

  // Show 1 on mobile, 2 on md, 3 on lg
  const getVisible = () => {
    if (typeof window === "undefined") return [activeIndex];
    if (window.innerWidth >= 1024) {
      return [
        activeIndex % testimonials.length,
        (activeIndex + 1) % testimonials.length,
        (activeIndex + 2) % testimonials.length,
      ];
    }
    if (window.innerWidth >= 768) {
      return [
        activeIndex % testimonials.length,
        (activeIndex + 1) % testimonials.length,
      ];
    }
    return [activeIndex % testimonials.length];
  };

  return (
    <>
      {/* ── TESTIMONIALS ── */}
      <Section background="white" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="Client Reviews"
          title="What New Construction Clients Say"
          subtitle="Homebuilders and owners across Katy, Fulshear, and Cinco Ranch trust ENE Electrical to wire their new builds right the first time."
          align="center"
        />

        {/* Desktop: show all 3 */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              variant="testimonial"
              quote={t.quote}
              authorName={t.authorName}
              authorLocation={t.authorLocation}
              rating={t.rating}
            />
          ))}
        </div>

        {/* Mobile/Tablet: carousel */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials
              .slice(activeIndex, activeIndex + (typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1))
              .concat(
                activeIndex + 2 > testimonials.length
                  ? testimonials.slice(0, (activeIndex + 2) % testimonials.length)
                  : []
              )
              .slice(0, 2)
              .map((t, i) => (
                <Card
                  key={i}
                  variant="testimonial"
                  quote={t.quote}
                  authorName={t.authorName}
                  authorLocation={t.authorLocation}
                  rating={t.rating}
                />
              ))}
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 hover:bg-amber-50 hover:border-amber-400"
              style={{ borderColor: "#0B1F3A", color: "#0B1F3A" }}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: i === activeIndex ? "#F5A623" : "#CBD5E1",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 hover:bg-amber-50 hover:border-amber-400"
              style={{ borderColor: "#0B1F3A", color: "#0B1F3A" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="default" spacing="lg" id="faq">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="New Construction Wiring: Common Questions"
            subtitle="Answers to the most frequently asked questions about new construction electrical wiring in Texas."
            align="center"
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: openFaq === index ? "#F5A623" : "#E5E7EB",
                  backgroundColor: "white",
                  boxShadow:
                    openFaq === index
                      ? "0 4px 16px rgba(245,166,35,0.12)"
                      : "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-amber-50/50"
                >
                  <span
                    className="font-bold text-base leading-snug"
                    style={{
                      color: "#0B1F3A",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-200"
                    style={{
                      backgroundColor:
                        openFaq === index ? "#F5A623" : "#F1F5F9",
                      color: openFaq === index ? "#0B1F3A" : "#64748B",
                    }}
                    aria-hidden="true"
                  >
                    {openFaq === index ? (
                      <ChevronUp size={15} strokeWidth={2.5} />
                    ) : (
                      <ChevronDown size={15} strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === index ? "400px" : "0px",
                    opacity: openFaq === index ? 1 : 0,
                  }}
                >
                  <p
                    className="px-6 pb-6 text-sm leading-relaxed text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}