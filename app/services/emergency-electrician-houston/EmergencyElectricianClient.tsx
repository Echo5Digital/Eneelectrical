"use client";

import React, { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import {
  Phone,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Flame,
  Droplets,
  PlugZap,
  CircuitBoard,
  Wind,
  Power,
  ThumbsUp,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  Eye,
  OctagonAlert,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FAQItem[];
}

const PHONE_DISPLAY = "(832) 783-0303";
const PHONE_HREF = "+18327830303";

const trustBadges = [
  { icon: BadgeCheck, label: "Licensed in Texas" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: ShieldCheck, label: "Bonded" },
  { icon: Eye, label: "Background-Checked Technicians" },
  { icon: Star, label: "15+ Years Experience" },
];

const emergencySignals = [
  {
    icon: Flame,
    title: "Burning Smell",
    desc: "Any burning odor from outlets, panels, or walls is an immediate emergency, as it may indicate wiring overheating or a smoldering fire inside walls.",
  },
  {
    icon: Zap,
    title: "Visible Sparks",
    desc: "Sparks from outlets, switches, or the breaker panel require immediate professional attention. Do not use the affected circuit.",
  },
  {
    icon: CircuitBoard,
    title: "Breakers That Won't Reset",
    desc: "A breaker that repeatedly trips or refuses to reset may signal a dangerous short circuit, ground fault, or overloaded panel.",
  },
  {
    icon: Power,
    title: "Sudden Power Loss",
    desc: "Complete or partial loss of power to critical areas (HVAC, refrigerators, medical equipment) may require emergency diagnosis and repair.",
  },
  {
    icon: PlugZap,
    title: "Exposed or Damaged Wiring",
    desc: "Frayed, chewed, or exposed wiring poses serious shock and fire risks. Avoid the area and call an electrician immediately.",
  },
  {
    icon: Droplets,
    title: "Flooding Near Panels",
    desc: "Water and electricity are a life-threatening combination. If flooding has reached your electrical panel or outlets, evacuate and call immediately.",
  },
];

const emergencyServices = [
  {
    icon: CircuitBoard,
    title: "Panel Failures",
    desc: "Tripped main breakers, burnt panels, or failed panels restored or replaced safely and quickly.",
  },
  {
    icon: PlugZap,
    title: "Outlet & Switch Failures",
    desc: "Dead outlets, sparking receptacles, or failed GFCI outlets diagnosed and repaired on the spot.",
  },
  {
    icon: Zap,
    title: "Wiring Faults",
    desc: "Short circuits, ground faults, and damaged wiring isolated and repaired to restore safe power.",
  },
  {
    icon: Wind,
    title: "Storm Damage",
    desc: "Post-storm electrical inspections and urgent repairs after lightning strikes, flooding, or downed lines.",
  },
  {
    icon: CircuitBoard,
    title: "Breaker Failures",
    desc: "Individual breaker replacements and panel inspections to ensure your home's overcurrent protection is working.",
  },
  {
    icon: Power,
    title: "Loss of Power",
    desc: "Systematic diagnosis of total or partial power loss, from the meter to individual circuits, with fast restoration.",
  },
];

const safetyTips = [
  {
    icon: OctagonAlert,
    tip: "Do not use outlets or appliances on affected circuits while waiting for help.",
  },
  {
    icon: Droplets,
    tip: "Never use outlets, switches, or appliances near standing water or flood damage.",
  },
  {
    icon: CircuitBoard,
    tip: "If you can safely reach your main breaker panel and it's not in flood water, consider shutting off the main breaker.",
  },
  {
    icon: Flame,
    tip: "If a burning smell persists or intensifies, evacuate the home immediately and call 911 before calling an electrician.",
  },
  {
    icon: Eye,
    tip: "Do not attempt to open your electrical panel or touch any wiring yourself, even if power appears to be off.",
  },
];

const whyChoose = [
  {
    icon: BadgeCheck,
    title: "Licensed & Bonded in Texas",
    desc: "ENE Electrical operates with full Texas licensing and bonding, so you're protected on every job.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "Every technician is covered by comprehensive liability insurance for your peace of mind.",
  },
  {
    icon: Eye,
    title: "Background-Checked Technicians",
    desc: "Every ENE Electrical technician is thoroughly background-checked before entering your home.",
  },
  {
    icon: Star,
    title: "15+ Years of Experience",
    desc: "Over 15 years of residential electrical experience across Houston and Katy metro homes.",
  },
  {
    icon: Clock,
    title: "Fast Emergency Response",
    desc: "We prioritize emergency calls to get a licensed electrician to your door as quickly as possible.",
  },
  {
    icon: ThumbsUp,
    title: "Transparent, Upfront Service",
    desc: "We explain the problem, the fix, and the cost before we start, with no surprises.",
  },
];

const serviceAreas = [
  "Katy",
  "Cinco Ranch",
  "Fulshear",
  "Energy Corridor",
  "Memorial",
  "Spring Branch",
  "Westchase",
  "Southwest Houston",
  "Brookshire",
  "Richmond",
];

const testimonials = [
  {
    quote:
      "Called ENE Electrical at 9 PM after I smelled burning from my outlet. They were at my door fast, found a wiring fault, and fixed it the same night. Absolutely saved us from a house fire.",
    authorName: "Maria T.",
    authorLocation: "Katy, TX",
    rating: 5 as const,
  },
  {
    quote:
      "After the storm knocked out power to half my house, ENE Electrical responded quickly, diagnosed a panel issue, and had us back up and running the same evening. Professional and thorough.",
    authorName: "James R.",
    authorLocation: "Energy Corridor, Houston TX",
    rating: 5 as const,
  },
  {
    quote:
      "My breaker kept tripping all night. ENE came out quickly, identified an overloaded circuit, and handled everything efficiently. Very impressed with their knowledge and professionalism.",
    authorName: "Sandra K.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5 as const,
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span
                className="font-semibold text-sm sm:text-base"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {item.question}
              </span>
              <span className="flex-shrink-0" style={{ color: "#F5A623" }}>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {isOpen && (
              <div
                className="px-6 pb-5 text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function EmergencyElectricianClient({ faqData }: Props) {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Emergency Electrician Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/17842832/pexels-photo-17842832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician responding to a residential electrical emergency"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.95) 60%, rgba(180,20,20,0.35) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-start gap-6">
          {/* Emergency badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ backgroundColor: "#dc2626", color: "#fff", fontFamily: "Montserrat, sans-serif" }}
          >
            <AlertTriangle size={14} strokeWidth={2.5} />
            Emergency Service Available
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-3xl"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Emergency Electrician{" "}
            <span style={{ color: "#F5A623" }}>Houston & Katy, TX</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Electrical emergency? ENE Electrical dispatches licensed, insured,
            and background-checked electricians across the Houston and Katy metro,
            fast. Don't wait. Call now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
            {/* Click-to-call CTA — phone number is a placeholder */}
            <a
              href={`tel:${PHONE_HREF}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-base shadow-xl transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#dc2626",
                color: "#fff",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 6px 24px rgba(220,38,38,0.45)",
              }}
            >
              <Phone size={20} strokeWidth={2.5} />
              Call Now: {PHONE_DISPLAY}
            </a>
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-base border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <Zap size={18} strokeWidth={2.5} />
              Book Online
            </a>
          </div>

          <div
            className="flex items-center gap-2 mt-1 text-sm font-medium"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            <Clock size={16} strokeWidth={2} />
            <span>Licensed · Insured · Bonded · Background-Checked · 15+ Years Experience</span>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER / INTRO ── */}
      <section
        className="w-full border-l-4 border-amber-400"
        style={{ backgroundColor: "#fffbeb" }}
        aria-label="Quick Answer"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Quick Answer
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical provides emergency electrician services for residential homeowners
            in Houston and Katy, TX, handling urgent electrical problems including panel
            failures, breaker issues, burning smells, storm damage, and sudden power loss.
            Our licensed, insured, and bonded electricians are available for emergency calls
            throughout the Houston and Katy metro area. With 15+ years of experience, ENE
            Electrical responds quickly to protect your home and family.
          </p>
        </div>
      </section>

      {/* ── TRUST BADGE BAR ── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        className="w-full py-5"
        aria-label="Trust credentials"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={18} style={{ color: "#F5A623" }} strokeWidth={2} />
                <span
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHEN TO CALL ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="when-to-call">
        <SectionHeading
          eyebrow="Electrical Emergencies"
          title="When to Call an Emergency Electrician"
          subtitle="Some electrical problems can't wait until morning. If you notice any of the following, call ENE Electrical immediately."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencySignals.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-6 rounded-xl border border-red-100 bg-red-50 shadow-sm"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#dc2626" }}
                aria-hidden="true"
              >
                <Icon size={20} color="#fff" strokeWidth={2} />
              </div>
              <h3
                className="font-bold text-base"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHAT WE HANDLE ── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="what-we-handle">
        <SectionHeading
          eyebrow="Emergency Services"
          title="What We Handle in Emergencies"
          subtitle="ENE Electrical's licensed electricians are equipped to diagnose and resolve a wide range of urgent electrical situations in Houston and Katy homes."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyServices.map(({ icon, title, desc }) => (
            <Card
              key={title}
              variant="service"
              icon={icon}
              title={title}
              description={desc}
            />
          ))}
        </div>
      </Section>

      {/* ── SAFETY GUIDANCE ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="safety-guidance">
        <SectionHeading
          eyebrow="Stay Safe"
          title="Safety Guidance While You Wait"
          subtitle="Before our electrician arrives, take these steps to protect yourself and your family."
          align="center"
          inverted
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {safetyTips.map(({ icon: Icon, tip }, idx) => (
            <li
              key={idx}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            >
              <span
                className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Icon size={18} style={{ color: "#0B1F3A" }} strokeWidth={2} />
              </span>
              <p
                className="text-sm leading-relaxed text-blue-100"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {tip}
              </p>
            </li>
          ))}
        </ul>
        <p
          className="text-center mt-8 text-xs text-blue-200"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <strong className="text-white">Important:</strong> If you believe your
          home is at immediate risk of fire or electrocution, evacuate and dial{" "}
          <strong className="text-white">911</strong> first.
        </p>
      </Section>

      {/* ── PROMINENT CLICK-TO-CALL CTA BLOCK ── */}
      <section
        className="w-full py-14"
        style={{
          background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #0B1F3A 100%)",
        }}
        aria-label="Call to action"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff", fontFamily: "Montserrat, sans-serif" }}
          >
            <AlertTriangle size={13} />
            Don't Wait, Act Now
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Electrical Emergency?{" "}
            <span style={{ color: "#F5A623" }}>Call ENE Electrical Now</span>
          </h2>
          <p
            className="text-blue-100 text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our licensed, insured, and bonded electricians serve Houston and Katy,
            TX homeowners. Fast response. Professional service. Every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            {/* Phone number placeholder */}
            <a
              href={`tel:${PHONE_HREF}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-lg shadow-2xl transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 8px 30px rgba(245,166,35,0.5)",
              }}
            >
              <Phone size={22} strokeWidth={2.5} />
              {PHONE_DISPLAY}
            </a>
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-bold uppercase tracking-widest text-base border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <Zap size={18} strokeWidth={2.5} />
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ENE ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="why-ene-electrical">
        <SectionHeading
          eyebrow="Why ENE Electrical"
          title="Why Choose ENE Electrical for Emergencies"
          subtitle="In an emergency, you need a contractor you can trust immediately. Here's why Houston and Katy homeowners call ENE Electrical first."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map(({ icon, title, desc }) => (
            <Card
              key={title}
              variant="service"
              icon={icon}
              title={title}
              description={desc}
            />
          ))}
        </div>
      </Section>

      {/* ── SERVICE AREA CALLOUT ── */}
      <Section background="default" spacing="md" maxWidth="xl" id="service-area">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              Serving Greater Houston
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              We Cover Houston & Katy Metro
            </h2>
            <p
              className="text-sm leading-relaxed text-gray-600 max-w-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Houston and Katy, TX homeowners face electrical emergencies year-round,
              from storm-related outages and panel failures to flooding near electrical
              panels during hurricane season. ENE Electrical provides emergency electrician
              services across the full Houston and Katy metro area.
            </p>
            <address className="not-italic mt-3 text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: "#F5A623" }} />
                Katy, TX 77494, Serving Greater Houston &amp; Surrounding Areas
              </span>
            </address>
          </div>
          <div className="flex-1">
            <ul className="grid grid-cols-2 gap-2">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    backgroundColor: "#fff",
                    color: "#0B1F3A",
                    fontFamily: "Inter, sans-serif",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#F5A623" }}
                    aria-hidden="true"
                  />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Homeowners Say"
          subtitle="Hear from Houston and Katy homeowners who called ENE Electrical during real electrical emergencies."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              variant="testimonial"
              quote={t.quote}
              authorName={t.authorName}
              authorLocation={t.authorLocation}
              rating={t.rating}
            />
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="white" spacing="lg" maxWidth="md" id="faq">
        <SectionHeading
          eyebrow="FAQs"
          title="Emergency Electrician FAQs"
          subtitle="Common questions from Houston and Katy homeowners facing urgent electrical situations."
          align="center"
        />
        <FAQAccordion items={faqData} />
      </Section>

      {/* ── FINAL STICKY CTA ── */}
      <div
        className="sticky bottom-0 z-40 w-full shadow-2xl"
        style={{ backgroundColor: "#0B1F3A" }}
        role="complementary"
        aria-label="Emergency call to action"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} style={{ color: "#dc2626" }} strokeWidth={2.5} />
            <span
              className="text-white text-sm font-semibold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Electrical Emergency? Call ENE Electrical Now
            </span>
          </div>
          {/* Phone number placeholder */}
          <a
            href={`tel:${PHONE_HREF}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95 whitespace-nowrap"
            style={{
              backgroundColor: "#dc2626",
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              boxShadow: "0 4px 16px rgba(220,38,38,0.45)",
            }}
          >
            <Phone size={16} strokeWidth={2.5} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}