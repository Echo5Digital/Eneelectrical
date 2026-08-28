"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface FaqItem {
  question: string;
  answer: string;
}

interface EVChargerClientProps {
  faqData?: FaqItem[];
  showForm?: boolean;
}

export default function EVChargerClient({
  faqData = [],
  showForm = false,
}: EVChargerClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  if (showForm) {
    return (
      <ContactForm
        heading="Book EV Charger Installation"
        subheading="Fill out the form and an ENE Electrical licensed electrician will contact you to schedule your EV charger installation."
        ctaLabel="Request My Quote"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {faqData.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="bg-white rounded-[0.75rem] border border-gray-200 overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
              style={{
                backgroundColor: isOpen ? "#0B1F3A" : "white",
              }}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span
                className="text-sm sm:text-base font-semibold leading-snug"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: isOpen ? "#F5A623" : "#0B1F3A",
                }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: isOpen ? "rgba(245,166,35,0.15)" : "#F7F8FA",
                }}
                aria-hidden="true"
              >
                {isOpen ? (
                  <ChevronUp size={18} strokeWidth={2.5} style={{ color: "#F5A623" }} />
                ) : (
                  <ChevronDown size={18} strokeWidth={2.5} style={{ color: "#0B1F3A" }} />
                )}
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 py-5 border-t border-gray-100">
                <p
                  className="text-sm leading-relaxed text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
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