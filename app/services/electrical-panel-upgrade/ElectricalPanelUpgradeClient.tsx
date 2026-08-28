"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

export default function ElectricalPanelUpgradeClient({ faqData }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3" role="list">
      {faqData.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-[0.75rem] border overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md"
            style={{ borderColor: isOpen ? "#F5A623" : "rgba(11,31,58,0.1)" }}
            role="listitem"
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${idx}`}
              id={`faq-question-${idx}`}
              className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
              style={{
                backgroundColor: isOpen ? "#0B1F3A" : "#FFFFFF",
              }}
            >
              <span
                className="text-sm sm:text-base font-bold leading-snug pr-4"
                style={{
                  color: isOpen ? "#FFFFFF" : "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: isOpen
                    ? "rgba(245,166,35,0.2)"
                    : "rgba(11,31,58,0.07)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                <ChevronDown
                  size={18}
                  strokeWidth={2.5}
                  style={{ color: isOpen ? "#F5A623" : "#0B1F3A" }}
                />
              </span>
            </button>

            <div
              id={`faq-answer-${idx}`}
              role="region"
              aria-labelledby={`faq-question-${idx}`}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                className="px-6 py-5 border-t"
                style={{
                  backgroundColor: "#F7F8FA",
                  borderColor: "rgba(245,166,35,0.3)",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "#1A2530",
                    fontFamily: "Inter, sans-serif",
                  }}
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