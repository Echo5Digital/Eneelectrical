"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Shield,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Zap,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import ContactForm from "@/components/ContactForm";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const credentials = [
  "Licensed",
  "Insured",
  "Bonded",
  "Background-Checked Technicians",
];

export default function ContactUsClient({ faqData }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Contact page hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="ENE Electrical technician working on a residential electrical panel"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          {/* Left copy */}
          <div className="flex-1 text-center md:text-left">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Katy &amp; Houston, TX
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Contact{" "}
              <span style={{ color: "#F5A623" }}>ENE Electrical</span>
            </h1>
            <p
              className="text-blue-200 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Have an electrical question, need a free estimate, or ready to
              schedule service? Reach out to our licensed, insured, and bonded
              team serving Katy, Houston, and surrounding communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="tel:+18327830303"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 18px rgba(245,166,35,0.4)",
                }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Call Us Now
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border-2 border-white/30 text-white transition-all duration-200 hover:border-[#F5A623] hover:text-[#F5A623] active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <Zap size={16} strokeWidth={2.5} />
                Request Estimate
              </a>
            </div>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(245,166,35,0.12)",
                    color: "#F5A623",
                    border: "1px solid rgba(245,166,35,0.3)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <CheckCircle size={12} strokeWidth={2.5} />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right decorative card */}
          <div
            className="hidden md:flex flex-col items-center justify-center rounded-2xl p-8 gap-5 flex-shrink-0"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              minWidth: "260px",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#F5A623" }}
            >
              <MapPin size={28} color="#0B1F3A" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <p
                className="text-white font-bold text-lg"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ENE Electrical
              </p>
              <address className="not-italic text-blue-200 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                Katy, TX 77494
              </address>
            </div>
            <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
            <p
              className="text-blue-200 text-xs text-center leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Serving Katy, Houston &amp; surrounding communities for{" "}
              <strong className="text-[#F5A623]">15+ years</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── Emergency Notice ── */}
      <div
        className="w-full py-5 px-4"
        role="alert"
        aria-label="Emergency electrical service notice"
        style={{ backgroundColor: "#DC2626" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <AlertTriangle
            size={24}
            className="flex-shrink-0 text-white animate-pulse"
            strokeWidth={2.5}
          />
          <p
            className="text-white font-bold text-sm sm:text-base"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Electrical Emergency?{" "}
            <span className="font-normal">
              Do NOT submit the form. Call us immediately for same-day emergency service.
            </span>
          </p>
          <a
            href="tel:+18327830303"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs whitespace-nowrap shadow transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "white",
              color: "#DC2626",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <Phone size={14} strokeWidth={2.5} />
            Emergency Line
          </a>
        </div>
      </div>

      {/* ── Contact Details + Form ── */}
      <Section background="white" spacing="lg" maxWidth="2xl" id="contact-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Details */}
          <div>
            <SectionHeading
              eyebrow="Get in Touch"
              title="We're Here to Help"
              subtitle="Reach ENE Electrical through any of the channels below, or use the contact form to send your inquiry directly."
              align="left"
            />

            {/* Address */}
            <div className="space-y-5">
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "#F7F8FA", border: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <MapPin size={20} color="#F5A623" strokeWidth={2} />
                </div>
                <div>
                  <p
                    className="font-bold text-sm uppercase tracking-wide mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Our Location
                  </p>
                  <address className="not-italic text-sm leading-relaxed" style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}>
                    Katy, TX 77494
                  </address>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    Serving the greater Houston &amp; Katy metro area
                  </p>
                </div>
              </div>

              {/* Phone placeholder */}
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "#F7F8FA", border: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <Phone size={20} color="#F5A623" strokeWidth={2} />
                </div>
                <div>
                  <p
                    className="font-bold text-sm uppercase tracking-wide mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Phone
                  </p>
                  <a
                    href="tel:+18327830303"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                  >
                    (832) 783-0303
                  </a>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    Available for estimates &amp; emergency calls
                  </p>
                </div>
              </div>

              {/* Credentials */}
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "#F7F8FA", border: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <Shield size={20} color="#F5A623" strokeWidth={2} />
                </div>
                <div>
                  <p
                    className="font-bold text-sm uppercase tracking-wide mb-2"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Credentials
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {credentials.map((c) => (
                      <li
                        key={c}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: "rgba(11,31,58,0.08)",
                          color: "#0B1F3A",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Experience */}
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "#F7F8FA", border: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <Clock size={20} color="#F5A623" strokeWidth={2} />
                </div>
                <div>
                  <p
                    className="font-bold text-sm uppercase tracking-wide mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Experience
                  </p>
                  <p className="text-sm" style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}>
                    <strong style={{ color: "#F5A623" }}>15+ years</strong> serving residential homeowners throughout Houston &amp; Katy, TX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <ContactForm
              heading="Request a Free Estimate"
              subheading="Fill out the form and our licensed electricians will respond promptly to schedule your service."
              ctaLabel="Send My Request"
            />
          </div>
        </div>
      </Section>

      {/* ── Local Relevance / Service Area ── */}
      <Section background="default" spacing="md" maxWidth="2xl" id="service-area">
        <div
          className="rounded-2xl p-6 sm:p-8 mb-10"
          style={{ backgroundColor: "#0B1F3A" }}
        >
          <p
            className="text-white text-sm sm:text-base leading-relaxed text-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <strong style={{ color: "#F5A623" }}>ENE Electrical</strong> is based in{" "}
            <strong className="text-white">Katy, TX 77494</strong> and accepts service requests from residential homeowners throughout the Houston and Katy metro, including Katy, Energy Corridor, Cinco Ranch, Fulshear, Southwest Houston, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.
          </p>
        </div>

        <SectionHeading
          eyebrow="Coverage"
          title="Communities We Serve"
          subtitle="ENE Electrical provides licensed residential electrical services throughout these greater Houston and Katy communities."
          align="center"
        />

        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          aria-label="Service area communities"
        >
          {serviceAreas.map((area) => (
            <li key={area.href}>
              <Link
                href={area.href}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group border"
                style={{
                  backgroundColor: "white",
                  borderColor: "#E5E7EB",
                  color: "#1A2530",
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#F5A623";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFBF0";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                }}
              >
                <MapPin
                  size={14}
                  strokeWidth={2}
                  style={{ color: "#F5A623", flexShrink: 0 }}
                />
                {area.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Google Maps Embed ── */}
      <Section background="white" spacing="md" maxWidth="2xl" id="map">
        <SectionHeading
          eyebrow="Find Us"
          title="Serving Katy & Houston, TX"
          subtitle="ENE Electrical is centrally located in Katy, TX 77494, making it easy to reach residential clients across the Houston metro."
          align="center"
        />
        <div
          className="w-full rounded-2xl overflow-hidden shadow-lg"
          style={{ border: "2px solid #E5E7EB", height: "420px" }}
          aria-label="Map showing ENE Electrical service area centered on Katy, TX 77494"
        >
          <iframe
            title="ENE Electrical location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495496.49418776145!2d-95.465351!3d29.836095000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87edc16e279a22c1%3A0xa79d9e35ba6d5e51!2sE-N-E%20Electrical%2C%20LLC!5e1!3m2!1sen!2sin!4v1788230466922!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section background="default" spacing="lg" maxWidth="md" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers about contacting ENE Electrical and requesting service."
          align="center"
        />
        <div className="space-y-4" role="list">
          {faqData.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "white",
              }}
              role="listitem"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-bold text-sm sm:text-base leading-snug">
                  {faq.question}
                </span>
                <span className="flex-shrink-0" style={{ color: "#F5A623" }}>
                  {openFaq === i ? (
                    <ChevronUp size={20} strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={20} strokeWidth={2.5} />
                  )}
                </span>
              </button>
              {openFaq === i && (
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="px-6 pb-5"
                >
                  <div
                    className="h-px mb-4"
                    style={{ backgroundColor: "#E5E7EB" }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}