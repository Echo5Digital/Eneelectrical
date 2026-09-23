"use client";

import React, { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import ScheduleWizard from "./ScheduleWizard";
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  PhoneCall,
  ClipboardList,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface AppointmentBookingClientProps {
  faqData: FaqItem[];
}

function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F5A623]"
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-sm sm:text-base leading-snug"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isOpen ? "#F5A623" : "#F7F8FA" }}
                aria-hidden="true"
              >
                {isOpen ? (
                  <ChevronUp size={15} style={{ color: "#0B1F3A" }} />
                ) : (
                  <ChevronDown size={15} style={{ color: "#0B1F3A" }} />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <div className="h-px bg-gray-100 mb-4" aria-hidden="true" />
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AppointmentBookingClient({ faqData }: AppointmentBookingClientProps) {
  const processSteps = [
    {
      step: "01",
      icon: ClipboardList,
      title: "Submit Your Request",
      description:
        "Fill out the booking form with your service type, preferred date/time, and contact details. Takes under 2 minutes.",
    },
    {
      step: "02",
      icon: CheckCircle,
      title: "Appointment Confirmed",
      description:
        "ENE Electrical reviews your request and sends a confirmation within 1 business day via phone or email.",
    },
    {
      step: "03",
      icon: Truck,
      title: "Technician Dispatched",
      description:
        "A licensed, background-checked electrician is assigned and heads to your home at the scheduled time.",
    },
    {
      step: "04",
      icon: Star,
      title: "Service Completed",
      description:
        "Your electrical work is completed to code, with a full walkthrough so you know exactly what was done.",
    },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "Licensed" },
    { icon: ShieldCheck, label: "Insured" },
    { icon: ShieldCheck, label: "Bonded" },
    { icon: ShieldCheck, label: "Background-Checked Technicians" },
  ];

  return (
    <main id="main-content">
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="booking-hero-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed ENE Electrical technician performing residential electrical work"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.97) 0%, rgba(11,31,58,0.80) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
              border: "1px solid rgba(245,166,35,0.3)",
            }}
          >
            <Zap size={12} />
            Houston &amp; Katy, TX: Residential Electricians
          </span>

          <h1
            id="booking-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Book a Licensed{" "}
            <span style={{ color: "#F5A623" }}>Electrician</span>
            <br className="hidden sm:block" /> in Minutes
          </h1>

          <p
            className="text-base sm:text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical schedules residential electrical appointments for
            homeowners across Houston and Katy, TX. Panel upgrades, EV chargers,
            repairs, lighting, and more, all with licensed, insured professionals.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { value: "15+ Years", label: "Experience" },
              { value: "Licensed", label: "& Insured" },
              { value: "Same-Week", label: "Availability" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-5 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-blue-200" style={{ fontFamily: "Inter, sans-serif" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY ALTERNATIVE CTA ── */}
      <div
        className="w-full py-4 px-4"
        style={{ backgroundColor: "#F5A623" }}
        role="alert"
        aria-label="Emergency electrical service notice"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <PhoneCall size={22} className="text-[#0B1F3A] flex-shrink-0" aria-hidden="true" />
            <p
              className="font-bold text-sm sm:text-base uppercase tracking-wide text-[#0B1F3A]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Electrical Emergency? Don't wait. Call us directly for the fastest response.
            </p>
          </div>
          <a
            href="tel:+18327830303"
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white font-bold uppercase tracking-wide text-sm px-5 py-2.5 rounded-xl shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Phone size={15} />
            Call Now: (832) 783-0303
          </a>
        </div>
      </div>

      {/* ── SCHEDULE WIZARD ── */}
      <Section background="white" spacing="lg" maxWidth="2xl" id="schedule-appointment">
        <div className="mb-8">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Schedule an Appointment
          </h2>
          <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-red-500">&quot;*&quot;</span> indicates required fields.
          </p>
        </div>
        <ScheduleWizard />
      </Section>

      {/* ── WHAT TO EXPECT ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="what-to-expect">
        <SectionHeading
          eyebrow="The Process"
          title="What to Expect"
          subtitle="We've made booking a residential electrician simple and transparent. Here's exactly what happens after you submit your request."
          align="center"
          inverted={true}
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li
                key={step.step}
                className="relative flex flex-col items-center text-center p-7 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Connector line (hidden on last) */}
                {idx < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-[calc(100%-1rem)] w-8 h-px"
                    style={{ backgroundColor: "rgba(245,166,35,0.35)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
                  aria-label={`Step ${step.step}`}
                >
                  STEP {step.step}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.25)" }}
                  aria-hidden="true"
                >
                  <Icon size={26} style={{ color: "#F5A623" }} strokeWidth={1.75} />
                </div>

                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }}
                >
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* ── TRUST BADGES ── */}
      <Section background="white" spacing="sm" maxWidth="xl" id="trust-badges">
        <div
          className="rounded-2xl px-6 py-8 md:py-10 border border-gray-100 shadow-sm"
          style={{ backgroundColor: "#F7F8FA" }}
        >
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            You're In Good Hands: ENE Electrical Is Fully Credentialed
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <li
                  key={badge.label}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white shadow-sm border border-gray-100"
                >
                  <Icon
                    size={18}
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
                  >
                    {badge.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section background="default" spacing="lg" maxWidth="lg" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Booking FAQs"
          subtitle="Quick answers to help you schedule your appointment with confidence."
          align="center"
        />
        <FAQAccordion items={faqData} />
      </Section>

      {/* ── SECOND EMERGENCY CTA ── */}
      <Section background="primary" spacing="md" maxWidth="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl p-8 md:p-10"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,166,35,0.25)" }}
        >
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <PhoneCall size={20} style={{ color: "#F5A623" }} aria-hidden="true" />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
              >
                Electrical Emergency?
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Don't Wait, Call ENE Electrical Directly
            </h2>
            <p
              className="text-blue-200 text-sm max-w-lg leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              For urgent electrical issues, such as sparking outlets, breaker failures, or power outages, skip the form and call us now. We dispatch quickly across the Houston and Katy area.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="tel:+18327830303"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 6px 24px rgba(245,166,35,0.4)",
              }}
            >
              <Phone size={18} strokeWidth={2.5} />
              Call (832) 783-0303
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}