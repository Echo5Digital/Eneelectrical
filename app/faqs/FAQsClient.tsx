"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { SectionHeading } from "@/components/Section";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsClientProps {
  faqs: FAQ[];
}

export default function FAQsClient({ faqs }: FAQsClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section background="default" spacing="lg" id="faq-accordion">
      <SectionHeading
        eyebrow="Common Questions"
        title="Electrical FAQs"
        subtitle="Browse the most common questions homeowners in Houston and Katy, TX ask ENE Electrical."
        align="center"
      />

      <div className="max-w-3xl mx-auto space-y-3" role="list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const itemId = `faq-item-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div
              key={index}
              className="rounded-2xl border overflow-hidden bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
              style={{ borderColor: isOpen ? "#F5A623" : "#E2E8F0" }}
              role="listitem"
            >
              <button
                id={itemId}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                style={{
                  backgroundColor: isOpen ? "#FFF8EC" : "transparent",
                }}
              >
                <span
                  className="text-sm sm:text-base font-semibold leading-snug flex-1"
                  style={{
                    color: isOpen ? "#0B1F3A" : "#1A2530",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300"
                  style={{
                    backgroundColor: isOpen ? "#F5A623" : "#F1F5F9",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    style={{ color: isOpen ? "#0B1F3A" : "#64748B" }}
                  />
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={itemId}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen ? "600px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div
                  className="px-6 pb-5 pt-1 border-t"
                  style={{ borderColor: "#FDE9B8" }}
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#1A2530",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p
          className="text-sm text-gray-500"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Don't see your question?{" "}
          <a
            href="/contact-us"
            className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "#F5A623" }}
          >
            Contact ENE Electrical
          </a>{" "}
          and our team will be happy to help.
        </p>
      </div>
    </Section>
  );
}