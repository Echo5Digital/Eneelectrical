"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import {
  ShieldCheck,
  Award,
  UserCheck,
  Zap,
  BatteryCharging,
  Lightbulb,
  Power,
  Wrench,
  AlertTriangle,
  ClipboardList,
  Home,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Stat Counter Component ─────────────────────────────────────────────────
function StatCounter({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <span
        className="text-5xl font-extrabold leading-none"
        style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="mt-3 text-base font-medium text-white/80"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Services data ──────────────────────────────────────────────────────────
const services = [
  {
    title: "Electrical Panel Upgrade",
    description:
      "Modernize your Westchase home's electrical panel to safely handle today's power demands, from heavy appliances to EV charging.",
    icon: Power,
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installation for Westchase homeowners. Fast, licensed, and code-compliant.",
    icon: BatteryCharging,
    href: "/services/ev-charger-installation-houston",
  },
  {
    title: "Generator Installation",
    description:
      "Whole-home and standby generator installation to keep your Westchase home powered through Texas storms.",
    icon: Zap,
    href: "/services/generator-installation-houston",
  },
  {
    title: "Security Lighting",
    description:
      "Professionally installed security and outdoor lighting solutions tailored to Westchase residential properties.",
    icon: Lightbulb,
    href: "/services/security-lighting-houston",
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Transform your interior spaces with energy-efficient recessed LED lighting installed by licensed electricians.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "Electrical Repair & Installation",
    description:
      "From outlets and switches to wiring and fixtures, we provide comprehensive electrical repair and installation for Westchase homes.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "24/7 Emergency Electrician",
    description:
      "Electrical emergencies don't wait. ENE Electrical offers round-the-clock emergency response throughout Westchase and Houston.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician-houston",
  },
  {
    title: "Electrical Inspection",
    description:
      "Pre-purchase, safety, and code-compliance electrical inspections for Westchase residential properties.",
    icon: ClipboardList,
    href: "/services/electrical-inspection-houston",
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "ENE Electrical upgraded our panel and installed an EV charger in one visit. The technician was professional, on-time, and cleaned up everything. Highly recommended for Westchase homeowners!",
    authorName: "Marcus T.",
    authorLocation: "Westchase, Houston TX",
    rating: 5,
  },
  {
    quote:
      "Called them for an emergency at 10 PM and they had a technician at my door within the hour. Truly 24/7 service. I won't use anyone else.",
    authorName: "Priya S.",
    authorLocation: "Westchase District, Houston TX",
    rating: 5,
  },
  {
    quote:
      "Very knowledgeable team. They diagnosed our flickering lights issue quickly, explained the problem in plain English, and fixed it same day. Fair pricing too.",
    authorName: "James R.",
    authorLocation: "Houston, TX",
    rating: 5,
  },
];

// ── Neighbor area links ────────────────────────────────────────────────────
const neighborAreas = [
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial Houston", href: "/service-areas/memorial-houston" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
];

// ── Trust badges ───────────────────────────────────────────────────────────
const trustBadges = [
  { label: "Licensed", icon: ShieldCheck },
  { label: "Insured", icon: ShieldCheck },
  { label: "Bonded", icon: Award },
  { label: "Background-Checked Technicians", icon: UserCheck },
  { label: "15+ Years Experience", icon: Star },
];

// ── Main client component ──────────────────────────────────────────────────
export default function WestchaseHoustonClient({ faqData }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        <div className="absolute inset-0 z-0">
          {/* Hero background image */}
          <img
            src="https://images.pexels.com/photos/17995530/pexels-photo-17995530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Westchase Houston residential neighborhood"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.78) 60%, rgba(11,31,58,0.55) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: "rgba(245,166,35,0.18)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
                border: "1px solid rgba(245,166,35,0.35)",
              }}
            >
              Serving Westchase, Houston TX
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Licensed Electrician in{" "}
              <span style={{ color: "#F5A623" }}>Westchase</span>, Houston TX
            </h1>
            <p
              className="text-lg text-white/80 mb-8 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical is your trusted, licensed residential electrician in
              Westchase, offering panel upgrades, EV charger installation,
              generators, lighting, and 24/7 emergency service. Katy-based.
              Houston-wide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 6px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Zap size={18} strokeWidth={2.5} />
                Book an Appointment
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Answer ──────────────────────────────────────────────────── */}
      <Section background="white" spacing="md">
        <div
          className="rounded-2xl p-6 sm:p-8 border-l-4"
          style={{
            backgroundColor: "#F7F8FA",
            borderLeftColor: "#F5A623",
          }}
          role="note"
          aria-label="Quick Answer"
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Quick Answer
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is a licensed, insured, and bonded residential
            electrical contractor serving the Westchase district of Houston, TX.
            With 15+ years of experience and a base in{" "}
            <strong>Katy, TX 77494</strong>, ENE Electrical offers Westchase
            homeowners panel upgrades, EV charger installation, generator
            installation, security and recessed lighting, electrical repairs, and
            24/7 emergency electrical services.
          </p>
        </div>
      </Section>

      {/* ── Trust Badge Bar ───────────────────────────────────────────────── */}
      <section
        className="py-6 border-y"
        style={{ backgroundColor: "#0B1F3A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustBadges.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2.5"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                >
                  <Icon size={16} style={{ color: "#F5A623" }} strokeWidth={2} />
                </span>
                <span
                  className="text-sm font-semibold text-white whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Electrical Services in Westchase Houston"
          subtitle="ENE Electrical provides a full menu of licensed residential electrical services to Westchase homeowners, from routine repairs to major upgrades."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-[0.75rem]"
              aria-label={`Learn more about ${service.title}`}
            >
              <Card
                variant="service"
                title={service.title}
                description={service.description}
                icon={service.icon}
                ctaLabel="Learn More"
                className="h-full group-hover:shadow-xl transition-shadow duration-300"
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Why Westchase Homeowners Choose ENE ───────────────────────────── */}
      <Section background="white" spacing="lg" id="why-ene">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Local Expertise"
              title="Why Westchase Homeowners Choose ENE Electrical"
              align="left"
            />
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              Westchase is one of Houston's most dynamic communities, a vibrant
              mix of established residential neighborhoods and a booming
              commercial corridor along Westheimer and Beltway 8. This unique
              blend means homes in Westchase often face higher-than-average
              electrical demands: aging panels from the area's original
              construction, increased power needs from home offices and smart
              home upgrades, and the growing popularity of EV ownership among
              residents who commute across the Energy Corridor.
            </p>
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical understands these local realities. Operating from
              our Katy, TX base, we respond quickly to Westchase service calls
              and bring 15+ years of licensed residential electrical experience to
              every job. From panel upgrades that future-proof your home to same-
              night emergency repairs, we deliver the dependable, code-compliant
              work Westchase homeowners deserve.
            </p>
            <ul className="space-y-3">
              {[
                "Fast response times from our Katy base to Westchase",
                "Licensed, insured, and bonded for your protection",
                "Background-checked technicians you can trust in your home",
                "Transparent flat-rate pricing with no surprises",
                "Familiar with Westchase-era homes and local code requirements",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#F5A623" }}
                    strokeWidth={2}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[380px]">
            <img
              src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="ENE Electrical licensed technician performing a panel upgrade in a Westchase Houston home"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(11,31,58,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <span
                className="inline-block px-4 py-2 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Katy, TX 77494 · Serving All of Houston
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Stat Counters ─────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        style={{ backgroundColor: "#0B1F3A" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/10">
            <StatCounter
              value={15}
              suffix="+"
              label="Years of Experience"
              started={statsStarted}
            />
            <StatCounter
              value={10}
              suffix="+"
              label="Houston Metro Communities Served"
              started={statsStarted}
            />
            <StatCounter
              value={2000}
              suffix="+"
              label="Residential Projects Completed"
              started={statsStarted}
            />
            <StatCounter
              value={100}
              suffix="%"
              label="Licensed, Insured & Bonded"
              started={statsStarted}
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Houston Homeowners Say"
          subtitle="Real reviews from homeowners across the Houston and Katy metro, including Westchase residents who rely on ENE Electrical."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.authorName}
              variant="testimonial"
              quote={t.quote}
              authorName={t.authorName}
              authorLocation={t.authorLocation}
              rating={t.rating}
            />
          ))}
        </div>
      </Section>

      {/* ── Local Relevance / Serving Westchase ───────────────────────────── */}
      <Section background="white" spacing="md" id="serving-westchase">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: "#F7F8FA", border: "1px solid #e5e7eb" }}
        >
          <div className="flex items-start gap-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
              style={{ backgroundColor: "#0B1F3A" }}
            >
              <MapPin size={22} style={{ color: "#F5A623" }} strokeWidth={2} />
            </span>
            <div>
              <h2
                className="text-xl font-bold mb-2"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Serving Westchase, Houston TX
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                Westchase is a high-density Houston community with substantial
                residential development alongside commercial corridors, creating
                demand for reliable residential electrical services. ENE
                Electrical covers Westchase as part of its Houston and Katy metro
                service area, operating from{" "}
                <strong>Katy, TX 77494</strong> and offering licensed electrical
                work including panel upgrades, EV charger installation, and
                emergency response to homeowners in this district.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Google Maps Embed ─────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="map">
        <SectionHeading
          eyebrow="Our Coverage"
          title="Westchase District in the Houston Metro"
          subtitle="Located west of downtown Houston and adjacent to the Energy Corridor, Westchase is well within ENE Electrical's service area from our Katy, TX base."
          align="center"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Westchase Houston TX map: ENE Electrical service area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495496.49418776145!2d-95.465351!3d29.836095000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87edc16e279a22c1%3A0xa79d9e35ba6d5e51!2sE-N-E%20Electrical%2C%20LLC!5e1!3m2!1sen!2sin!4v1788230466922!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Map showing Westchase district within Houston TX metro area"
          />
        </div>
        <p
          className="text-center text-sm mt-4"
          style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
        >
          ENE Electrical operates from <strong>Katy, TX 77494</strong> and
          serves Westchase and the entire Houston metro.
        </p>
      </Section>

      {/* ── Service Area Neighbor Links ────────────────────────────────────── */}
      <Section background="white" spacing="md" id="neighboring-areas">
        <SectionHeading
          eyebrow="Also Serving Nearby Areas"
          title="Neighboring Service Areas"
          subtitle="ENE Electrical serves communities throughout the Houston and Katy metro. Explore other nearby service areas."
          align="center"
        />
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {neighborAreas.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#F5A623] hover:shadow-md transition-all duration-200 group text-center"
                style={{ backgroundColor: "#F7F8FA" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-xl group-hover:bg-[#F5A623] transition-colors duration-200"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <Home
                    size={18}
                    style={{ color: "#F5A623" }}
                    className="group-hover:text-[#0B1F3A]"
                    strokeWidth={2}
                  />
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── FAQ Accordion ─────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="faq">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Westchase Homeowner FAQs"
          subtitle="Common questions from Westchase Houston homeowners about ENE Electrical's services, response times, and credentials."
          align="center"
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border overflow-hidden transition-shadow duration-200"
                style={{
                  borderColor: isOpen ? "#F5A623" : "#e5e7eb",
                  backgroundColor: "#fff",
                  boxShadow: isOpen
                    ? "0 4px 16px rgba(245,166,35,0.12)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span
                    className="text-base font-semibold leading-snug"
                    style={{
                      color: "#0B1F3A",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: isOpen
                        ? "#F5A623"
                        : "rgba(11,31,58,0.07)",
                    }}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <ChevronUp
                        size={16}
                        style={{ color: "#0B1F3A" }}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        style={{ color: "#0B1F3A" }}
                        strokeWidth={2.5}
                      />
                    )}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{
                      color: "#1A2530",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "#0B1F3A" }}
        id="contact"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <span
                className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: "rgba(245,166,35,0.15)",
                  color: "#F5A623",
                  fontFamily: "Inter, sans-serif",
                  border: "1px solid rgba(245,166,35,0.3)",
                }}
              >
                Schedule Service in Westchase
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Ready to Schedule Your{" "}
                <span style={{ color: "#F5A623" }}>Westchase</span> Electrical
                Service?
              </h2>
              <p
                className="text-white/75 text-base leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Whether you need a panel upgrade, EV charger, generator
                installation, or emergency electrical repair, ENE Electrical is
                ready to serve your Westchase home. Contact us today to schedule
                an appointment or get a free estimate.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  {
                    icon: ShieldCheck,
                    text: "Licensed, Insured & Bonded",
                  },
                  {
                    icon: Clock,
                    text: "24/7 Emergency Service Available",
                  },
                  {
                    icon: MapPin,
                    text: "Based in Katy, TX 77494, Serving Westchase & Houston Metro",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 text-white/80 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                    >
                      <Icon
                        size={16}
                        style={{ color: "#F5A623" }}
                        strokeWidth={2}
                      />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointment-booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                    boxShadow: "0 6px 20px rgba(245,166,35,0.35)",
                  }}
                >
                  <Zap size={18} strokeWidth={2.5} />
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest border-2 border-white/25 text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              <ContactForm
                heading="Request Service in Westchase"
                subheading="Fill out the form and a licensed ENE Electrical technician will reach out within 24 hours."
                ctaLabel="Send Request"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Van CTA ── */}
      <VanCta
        heading={
          <>
            Ready to Schedule Your{" "}
            <span style={{ color: "#F5A623" }}>Westchase</span> Electrician?
          </>
        }
        description="From panel upgrades to emergency repairs, ENE Electrical's licensed technicians proudly serve Westchase homeowners. Book an appointment online or give us a call to get started today."
      />
    </>
  );
}