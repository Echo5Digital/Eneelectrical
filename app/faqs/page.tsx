import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQsClient from "./FAQsClient";

export const metadata: Metadata = {
  title: "Electrician FAQs | ENE Electrical Houston & Katy",
  description:
    "Get answers to common electrical questions from ENE Electrical's licensed team. Learn about panel upgrades, EV chargers, emergency service, and more in Houston & Katy, TX.",
  alternates: {
    canonical: "/faqs",
  },
};

const faqs = [
  {
    question: "Is ENE Electrical licensed, insured, and bonded?",
    answer:
      "Yes. ENE Electrical is fully licensed, insured, and bonded in Texas, and all technicians are background-checked for your peace of mind.",
  },
  {
    question: "What areas does ENE Electrical serve?",
    answer:
      "ENE Electrical serves Houston and Katy, TX and the surrounding metro, including Katy, Energy Corridor, Southwest Houston, Cinco Ranch, Fulshear, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.",
  },
  {
    question: "How many years of experience does ENE Electrical have?",
    answer:
      "ENE Electrical has 15+ years of experience providing residential electrical services throughout the Houston and Katy, TX metro area.",
  },
  {
    question: "Does ENE Electrical offer emergency electrical services?",
    answer:
      "Yes. ENE Electrical provides emergency electrician services to residential customers in Houston and Katy, TX and the surrounding metro area.",
  },
  {
    question: "What residential electrical services does ENE Electrical provide?",
    answer:
      "ENE Electrical provides a full range of residential electrical services including electrical repair and installation, panel upgrades, EV charger installation, generator installation, security lighting, recessed LED lighting, new construction wiring, electrical inspections, and emergency electrician services.",
  },
  {
    question: "Can ENE Electrical install an EV charger at my home?",
    answer:
      "Yes. ENE Electrical installs home EV charging stations for residential customers throughout the Houston and Katy, TX metro area.",
  },
  {
    question: "Does ENE Electrical handle electrical panel upgrades?",
    answer:
      "Yes. ENE Electrical performs electrical panel upgrades, including 200-amp panel upgrades, for homeowners in Houston, Katy, and surrounding TX suburbs.",
  },
  {
    question: "Do I need a permit for electrical work in Katy or Houston, TX?",
    answer:
      "Most significant electrical work — such as panel upgrades, new construction wiring, and generator installation — requires a permit in Texas. ENE Electrical's licensed team is familiar with local requirements and can guide you through the process.",
  },
  {
    question: "Does ENE Electrical work on new construction homes?",
    answer:
      "Yes. ENE Electrical provides new construction electrical services, including full wiring for newly built residential properties in the Houston and Katy, TX metro.",
  },
  {
    question: "How do I book an appointment with ENE Electrical?",
    answer:
      "You can schedule an appointment with ENE Electrical directly through the online appointment booking form on this website, or by contacting the team through the contact page.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "FAQs", href: "/faqs" },
        ]}
      />

      {/* Page Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="faq-hero-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Licensed Residential Electricians
          </span>
          <h1
            id="faq-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Frequently Asked{" "}
            <span style={{ color: "#F5A623" }}>Electrical Questions</span>
          </h1>
          <p
            className="text-base sm:text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Have questions about residential electrical services in Houston or Katy, TX? Find clear, honest answers from ENE Electrical's licensed team — covering everything from panel upgrades and EV chargers to permits and emergency service.
          </p>
          {/* Accent bar */}
          <div
            className="mx-auto mt-8 h-1 w-16 rounded-full"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Quick Answer Block */}
      <div
        className="w-full border-b"
        style={{ backgroundColor: "#FFF8EC", borderColor: "#F5A623" }}
        role="note"
        aria-label="Quick Answer"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-4 items-start">
          <div
            className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0B1F3A"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              Quick Answer
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical's FAQ page answers common questions about residential electrical services in Houston and Katy, TX. Topics include panel upgrades, EV charger installation, emergency electrician availability, inspection processes, and contractor credentials. ENE Electrical is licensed, insured, bonded, and has 15+ years of experience serving the Houston metro area.
            </p>
          </div>
        </div>
      </div>

      {/* Local Relevance Section */}
      <Section background="white" spacing="sm">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-8 border"
            style={{ backgroundColor: "#F7F8FA", borderColor: "#E2E8F0" }}
          >
            <div className="flex gap-3 items-start">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#0B1F3A" }}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h2
                  className="text-base font-bold mb-2"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  Serving Katy, TX 77494 &amp; the Greater Houston Metro
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  Homeowners across Katy, TX 77494 and the broader Houston metro — including Cinco Ranch, Fulshear, Energy Corridor, and surrounding suburbs — frequently ask about local electrical requirements, permit processes, and service availability. This FAQ page addresses those specific concerns for residents in ENE Electrical's verified service area.
                </p>
                <p
                  className="text-sm mt-2"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  <strong>Service Area:</strong> Katy, TX 77494 — Houston and Katy, TX metro including Katy, Energy Corridor, Southwest Houston, Cinco Ranch, Fulshear, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Accordion (interactive client component) */}
      <FAQsClient faqs={faqs} />

      {/* Still Have Questions CTA */}
      <Section background="primary" spacing="lg">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            We're Here to Help
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Still Have Questions?
          </h2>
          <p
            className="text-blue-200 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            If you didn't find the answer you were looking for, ENE Electrical's licensed team is ready to help. Contact us directly or book your appointment online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Book an Appointment
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 hover:bg-white hover:text-[#0B1F3A] active:scale-95 transition-all duration-200"
              style={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "#ffffff",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </Section>

      {/* Trust Badge Bar */}
      <section
        className="w-full py-10 md:py-12 border-t"
        style={{ backgroundColor: "#F7F8FA", borderColor: "#E2E8F0" }}
        aria-label="ENE Electrical credentials"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Why Homeowners Trust ENE Electrical
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
                label: "Licensed",
                desc: "Licensed in Texas",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                ),
                label: "Insured",
                desc: "Fully Insured",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                ),
                label: "Bonded",
                desc: "Fully Bonded",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ),
                label: "Background-Checked",
                desc: "All Technicians",
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border bg-white shadow-sm"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  {badge.icon}
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {badge.label}
                  </p>
                  <p
                    className="text-xs text-gray-500 mt-0.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-center text-sm text-gray-500 mt-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical — 15+ years serving residential customers in{" "}
            <strong style={{ color: "#0B1F3A" }}>Houston &amp; Katy, TX</strong> and the surrounding metro.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}