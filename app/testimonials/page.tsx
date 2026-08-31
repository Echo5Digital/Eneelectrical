import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Customer Reviews | ENE Electrical Houston & Katy TX",
  description:
    "Read real customer testimonials for ENE Electrical, a licensed, insured residential electrician serving Houston and Katy, TX with 15+ years of trusted electrical service.",
  alternates: {
    canonical: "/testimonials",
  },
};

const faqData = [
  {
    question: "Are the reviews on ENE Electrical's website from real customers?",
    answer:
      "Yes. ENE Electrical's testimonials are from real residential customers who have used their licensed electrical services in the Houston and Katy, TX metro area.",
  },
  {
    question: "What services do ENE Electrical customers most commonly review?",
    answer:
      "Customers have reviewed ENE Electrical for a range of services including electrical repair and installation, panel upgrades, EV charger installation, generator installation, and emergency electrical response.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Testimonials", href: "/testimonials" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="testimonials-hero-heading"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="ENE Electrical technician performing residential electrical work"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Trusted by Homeowners Across Greater Houston
          </span>
          <h1
            id="testimonials-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            What Our Customers
            <br />
            <span style={{ color: "#F5A623" }}>Are Saying</span>
          </h1>
          <p
            className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is a licensed, insured, and bonded residential electrician
            based in Katy, TX with 15+ years of experience serving the Houston metro area.
            Read real reviews from real homeowners.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map((badge) => (
              <span
                key={badge}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: "rgba(245,166,35,0.15)",
                  color: "#F5A623",
                  border: "1px solid rgba(245,166,35,0.35)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Answer Block */}
      <Section background="white" spacing="sm">
        <div
          className="rounded-2xl border-l-4 p-6 md:p-8"
          style={{
            borderColor: "#F5A623",
            backgroundColor: "#FFFBF2",
          }}
          role="note"
          aria-label="Quick Answer"
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Quick Answer
          </p>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is a licensed, insured, and bonded residential electrician based in Katy, TX
            with 15+ years of experience serving the Houston metro area. Customer testimonials reflect
            satisfaction with services including electrical repairs, panel upgrades, EV charger installation,
            generator installation, and emergency electrical work.
          </p>
        </div>
      </Section>

      {/* Main interactive client section (aggregate rating + filter + review cards) */}
      <TestimonialsClient />

      {/* Local Relevance Section */}
      <Section background="white" spacing="md">
        <div className="text-center max-w-3xl mx-auto">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Serving the Greater Houston Area
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            Reviews From Your Neighbors
          </h2>
          <p
            className="text-base leading-relaxed text-gray-600 mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Reviews on this page come from residential homeowners across the Houston and Katy, TX
            metro area, including communities such as Katy, Cinco Ranch, Fulshear, Energy Corridor,
            and Southwest Houston, reflecting ENE Electrical's local service reputation.
          </p>
          <address
            className="not-italic text-sm text-gray-500"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <strong style={{ color: "#0B1F3A" }}>ENE Electrical</strong>, Katy, TX 77494
          </address>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="default" spacing="md" id="faq">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Review & Testimonial FAQs"
          subtitle="Common questions about ENE Electrical's customer reviews and service history."
          align="center"
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3
                className="text-base font-bold mb-3"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {faq.question}
              </h3>
              <p
                className="text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" spacing="lg" id="book-service">
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Ready to Experience It Yourself?
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Book Your Electrical Service Today
          </h2>
          <p
            className="text-blue-200 text-base sm:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Join hundreds of satisfied Houston and Katy homeowners who trust ENE Electrical
            for reliable, licensed, and affordable residential electrical work.
            Request a free estimate, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              Book Appointment
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-[#0B1F3A] active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Request Free Estimate
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}