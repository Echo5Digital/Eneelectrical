"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface EnergyCorridorClientProps {
  faqItems: FAQItem[];
}

export default function EnergyCorridorClient({ faqItems }: EnergyCorridorClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border overflow-hidden transition-all duration-200"
            style={{
              borderColor: isOpen ? "#F5A623" : "#e5e7eb",
              backgroundColor: isOpen ? "#fff" : "#F7F8FA",
              boxShadow: isOpen ? "0 4px 16px rgba(245,166,35,0.12)" : "none",
            }}
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400 rounded-2xl"
            >
              <span
                className="text-sm sm:text-base font-bold leading-snug"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: isOpen ? "#F5A623" : "#0B1F3A",
                }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: isOpen ? "#F5A623" : "#0B1F3A" }}
                aria-hidden="true"
              >
                {isOpen ? (
                  <ChevronUp size={16} color={isOpen ? "#0B1F3A" : "#ffffff"} strokeWidth={2.5} />
                ) : (
                  <ChevronDown size={16} color="#ffffff" strokeWidth={2.5} />
                )}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
            >
              <div className="px-6 pb-6">
                <div
                  className="w-12 h-0.5 rounded-full mb-3"
                  style={{ backgroundColor: "#F5A623" }}
                  aria-hidden="true"
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}