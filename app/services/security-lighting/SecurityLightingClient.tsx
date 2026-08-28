"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface FaqItem {
  question: string;
  answer: string;
}

interface SecurityLightingClientProps {
  faqData?: FaqItem[];
  showForm?: boolean;
}

export default function SecurityLightingClient({
  faqData = [],
  showForm = false,
}: SecurityLightingClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  if (showForm) {
    return (
      <ContactForm
        heading="Request a Security Lighting Quote"
        subheading="Tell us about your home and we'll get back to you with a personalized quote within 24 hours."
        ctaLabel="Send My Request"
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {faqData.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="bg-white">
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F5A623]"
            >
              <span
                className="text-sm sm:text-base font-semibold leading-snug"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                style={{
                  backgroundColor: isOpen ? "#F5A623" : "#F7F8FA",
                  color: isOpen ? "#0B1F3A" : "#6B7280",
                }}
                aria-hidden="true"
              >
                <ChevronDown size={18} strokeWidth={2.5} />
              </span>
            </button>

            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-1">
                <p
                  className="text-sm text-gray-500 leading-relaxed"
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