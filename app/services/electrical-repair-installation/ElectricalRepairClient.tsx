"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

export default function ElectricalRepairClient({ faqData }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="flex flex-col gap-4" role="list">
      {faqData.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            role="listitem"
            className="rounded-2xl overflow-hidden border transition-all duration-200"
            style={{
              borderColor: isOpen ? "#F5A623" : "#E5E7EB",
              backgroundColor: "#ffffff",
              boxShadow: isOpen
                ? "0 4px 20px rgba(245,166,35,0.12)"
                : "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
              style={{ backgroundColor: isOpen ? "#fffbf2" : "#ffffff" }}
            >
              <span
                className="text-base font-semibold leading-snug pr-2"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? "#F5A623" : "#F7F8FA",
                  color: isOpen ? "#0B1F3A" : "#6B7280",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
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
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                className="px-6 pb-6 pt-1 text-sm leading-relaxed border-t"
                style={{
                  color: "#1A2530",
                  fontFamily: "Inter, sans-serif",
                  borderColor: "#F5E6C8",
                }}
              >
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}