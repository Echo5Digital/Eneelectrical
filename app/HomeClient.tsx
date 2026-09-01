"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import {
  Zap,
  ShieldCheck,
  Award,
  Clock,
  Users,
  Wrench,
  PanelTop,
  Car,
  Cpu,
  Lightbulb,
  SunMedium,
  Building2,
  AlertTriangle,
  ClipboardCheck,
  MapPin,
  Phone,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface HomeClientProps {
  faqData: FaqItem[];
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function StatCounter({
  target,
  suffix,
  label,
  trigger,
}: {
  target: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const count = useCountUp(target, 1800, trigger);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span
        className="text-4xl sm:text-5xl font-bold"
        style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="mt-1 text-sm font-medium text-white/80"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Services Data ─────────────────────────────────────────────────────────────
const services = [
  {
    title: "Electrical Repair & Installation",
    description:
      "Fast, reliable repairs and professional installations for all residential electrical needs.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "Electrical Panel Upgrade",
    description:
      "Upgrade your outdated panel to handle modern electrical demands safely and efficiently.",
    icon: PanelTop,
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    title: "EV Charger Installation",
    description:
      "Certified Level 2 EV charger installation for all major electric vehicle brands.",
    icon: Car,
    href: "/services/ev-charger-installation-houston",
  },
  {
    title: "Generator Installation",
    description:
      "Whole-home and standby generator installation to keep your family safe during outages.",
    icon: Cpu,
    href: "/services/generator-installation-houston",
  },
  {
    title: "Security Lighting",
    description:
      "Professionally installed outdoor security and motion-activated lighting solutions.",
    icon: SunMedium,
    href: "/services/security-lighting-houston",
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Elegant, energy-efficient recessed LED lighting design and installation for any room.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "New Construction Electrician",
    description:
      "Complete electrical services for new home builds, from rough-in to final inspection.",
    icon: Building2,
    href: "/services/new-construction-electrician-houston",
  },
  {
    title: "Emergency Electrician",
    description:
      "24/7 emergency electrical service for urgent residential electrical problems.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician-houston",
  },
  {
    title: "Electrical Inspection",
    description:
      "Thorough home electrical inspections to ensure safety, code compliance, and peace of mind.",
    icon: ClipboardCheck,
    href: "/services/electrical-inspection-houston",
  },
];

// ── Service Areas ─────────────────────────────────────────────────────────────
const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "ENE Electrical upgraded our entire panel in one day. Professional, clean, and code-compliant. Could not be happier with the service!",
    authorName: "Maria G.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "They installed our EV charger in the garage quickly and for a fair price. Very knowledgeable team that explained everything clearly.",
    authorName: "David R.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "Had an electrical emergency late at night and ENE showed up within the hour. True professionals you can count on 24/7.",
    authorName: "Lisa T.",
    authorLocation: "Energy Corridor, Houston",
    rating: 5,
  },
  {
    quote:
      "Excellent recessed lighting installation throughout our home. The crew was respectful, tidy, and the results look incredible.",
    authorName: "James W.",
    authorLocation: "Memorial, Houston TX",
    rating: 5,
  },
  {
    quote:
      "We hired ENE for a full electrical inspection before buying our home. Their thorough report saved us thousands in potential future repairs.",
    authorName: "Sandra K.",
    authorLocation: "Fulshear, TX",
    rating: 5,
  },
];

// ── Value Props ───────────────────────────────────────────────────────────────
const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Licensed, Insured & Bonded",
    description:
      "Every job is backed by full licensing, insurance, and bonding so you're fully protected from start to finish.",
  },
  {
    icon: Award,
    title: "15+ Years of Experience",
    description:
      "Over a decade and a half of hands-on residential electrical expertise across the greater Houston and Katy metro.",
  },
  {
    icon: Users,
    title: "Background-Checked Technicians",
    description:
      "Every technician on our team passes thorough background checks, because your home and family's safety is our priority.",
  },
  {
    icon: MapPin,
    title: "Local Houston & Katy Experts",
    description:
      "We're based right here in Katy, TX 77494 and proudly serve homeowners throughout the greater Houston metro.",
  },
];

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
          >
            <span
              className="font-semibold text-sm sm:text-base"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              {item.question}
            </span>
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: open === i ? "#F5A623" : "#F7F8FA",
                color: open === i ? "#0B1F3A" : "#6B7280",
              }}
              aria-hidden="true"
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              className="px-6 pb-5 text-sm leading-relaxed text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Testimonials Carousel ─────────────────────────────────────────────────────
function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, []);

  // Show 1 on mobile, 2 on md, 3 on lg
  const visibleCount =
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
        ? 2
        : 1
      : 1;

  const visible = Array.from({ length: Math.min(visibleCount, total) }, (_, i) =>
    testimonials[(current + i) % total]
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(current, current + 3).concat(
          current + 3 > total ? testimonials.slice(0, (current + 3) % total) : []
        ).slice(0, 3).map((t, i) => (
          <Card
            key={i}
            variant="testimonial"
            quote={t.quote}
            authorName={t.authorName}
            authorLocation={t.authorLocation}
            rating={t.rating}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-[#F5A623] hover:border-[#F5A623] transition-colors shadow-sm"
        >
          <ChevronLeft size={18} style={{ color: "#0B1F3A" }} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{
                backgroundColor: i === current ? "#F5A623" : "#D1D5DB",
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-[#F5A623] hover:border-[#F5A623] transition-colors shadow-sm"
        >
          <ChevronRight size={18} style={{ color: "#0B1F3A" }} />
        </button>
      </div>
    </div>
  );
}

// ── Main Client Component ─────────────────────────────────────────────────────
export default function HomeClient({ faqData }: HomeClientProps) {
  // Trust bar counter trigger on scroll
  const trustRef = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const el = trustRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[92vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/ENE-Banner-image-copy.jpg"
            alt="ENE Electrical service van parked outside a Houston-area home at dusk"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.65) 45%, rgba(11,31,58,0.25) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-24 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-4 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.15)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
                border: "1px solid rgba(245,166,35,0.3)",
              }}
            >
              <Zap size={13} strokeWidth={2.5} />
              Katy &amp; Houston's Trusted Electrician
            </span>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Expert Residential
              <br />
              <span style={{ color: "#F5A623" }}>Electrical Services</span>
              <br />
              You Can Trust
            </h1>

            <p
              className="text-lg text-white/75 mb-8 max-w-xl leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical is a licensed, insured, and bonded residential
              electrician serving Katy, TX and greater Houston. Over 15 years of
              experience, covering panels, EV chargers, generators, and emergency service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 8px 24px rgba(245,166,35,0.4)",
                }}
              >
                <CalendarCheck size={17} strokeWidth={2.5} />
                Book Free Estimate
              </Link>
              <a
                href="tel:+18327830303"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <Phone size={17} strokeWidth={2.5} />
                (832) 783-0303
              </a>
            </div>

            {/* Trust badge strip */}
            <div className="flex flex-wrap gap-3">
              {["Licensed", "Insured", "Bonded", "15+ Years Experience"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <CheckCircle size={12} style={{ color: "#F5A623" }} />
                    {badge}
                  </span>
                )
              )}
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <CheckCircle size={12} style={{ color: "#F5A623" }} />
                Background-Checked Technicians
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ────────────────────────────────────────────────────── */}
      <section
        className="w-full py-6"
        style={{ backgroundColor: "#F5A623" }}
        aria-label="Quick Answer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "rgba(11,31,58,0.12)" }}
              aria-hidden="true"
            >
              <Zap size={20} style={{ color: "#0B1F3A" }} strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-sm font-bold uppercase tracking-widest mb-1"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#0B1F3A",
                }}
              >
                About ENE Electrical
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential
                electrical contractor based in Katy, TX 77494 with 15+ years of
                experience. They serve homeowners across the Houston and Katy
                metro area, offering services including electrical repair, panel
                upgrades, EV charger installation, generator installation,
                security lighting, and emergency electrical service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST INDICATOR BAR ─────────────────────────────────────────────── */}
      <section
        ref={trustRef}
        className="w-full py-12 md:py-16"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Trust indicators"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stat counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <StatCounter target={15} suffix="+" label="Years of Experience" trigger={counted} />
            <StatCounter target={2500} suffix="+" label="Homes Served" trigger={counted} />
            <StatCounter target={100} suffix="%" label="Licensed & Insured" trigger={counted} />
            <StatCounter target={24} suffix="/7" label="Emergency Service" trigger={counted} />
          </div>

          {/* Credential badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: ShieldCheck, label: "Licensed" },
              { icon: ShieldCheck, label: "Insured" },
              { icon: ShieldCheck, label: "Bonded" },
              { icon: Users, label: "Background-Checked Technicians" },
              { icon: Award, label: "15+ Years Experience" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
                style={{
                  backgroundColor: "rgba(245,166,35,0.12)",
                  border: "1px solid rgba(245,166,35,0.25)",
                }}
              >
                <Icon size={16} style={{ color: "#F5A623" }} />
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ────────────────────────────────────────────────── */}
      <Section id="services" background="default" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="What We Do"
          title="Residential Electrical Services"
          subtitle="From panel upgrades to emergency calls, ENE Electrical handles every aspect of your home's electrical system."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-xl"
              aria-label={`Learn more about ${svc.title}`}
            >
              <Card
                variant="service"
                title={svc.title}
                description={svc.description}
                icon={svc.icon}
                ctaLabel="Learn More"
                className="h-full group-hover:shadow-xl transition-shadow duration-300"
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* ── WHY CHOOSE ENE ELECTRICAL ────────────────────────────────────────── */}
      <Section id="why-choose-us" background="primary" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Why ENE Electrical"
          title="The Trusted Choice for Houston & Katy Homeowners"
          subtitle="We combine local expertise, verified credentials, and a customer-first approach on every job."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Icon size={26} color="#0B1F3A" strokeWidth={2} />
              </div>
              <h3
                className="text-base font-bold text-white mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-white/65 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── LOCAL RELEVANCE / SERVICE AREAS ─────────────────────────────────── */}
      <Section id="service-areas" background="white" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Serving Greater Houston"
          title="Local Electricians Near You"
          subtitle="ENE Electrical is headquartered in Katy, TX 77494 and proudly serves residential homeowners throughout the greater Houston and Katy metro."
          align="center"
        />

        {/* Address — real crawlable NAP text */}
        <p
          className="text-center text-sm text-gray-500 -mt-6 mb-10"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <MapPin
            size={14}
            className="inline-block mr-1"
            style={{ color: "#F5A623" }}
            aria-hidden="true"
          />
          Based in{" "}
          <strong style={{ color: "#1A2530" }}>Katy, TX 77494</strong>, serving
          residential homeowners throughout the Houston metro.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {serviceAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-[#F5A623] hover:shadow-md transition-all duration-200 group"
            >
              <MapPin
                size={14}
                style={{ color: "#F5A623" }}
                className="flex-shrink-0"
                aria-hidden="true"
              />
              <span
                className="text-sm font-semibold group-hover:text-[#0B1F3A] text-gray-700 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {area.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/service-areas/houston-tx"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:opacity-90 shadow-md"
            style={{
              backgroundColor: "#0B1F3A",
              color: "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            View All Service Areas
          </Link>
        </div>
      </Section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <Section id="testimonials" background="default" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Homeowners Are Saying"
          subtitle="Verified reviews from real customers across the Houston and Katy metro area."
          align="center"
        />
        {/* Star summary */}
        <div className="flex items-center justify-center gap-2 mb-10 -mt-6">
          <div className="flex gap-0.5" aria-label="5 out of 5 stars average rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={20}
                fill="#F5A623"
                style={{ color: "#F5A623" }}
                aria-hidden="true"
              />
            ))}
          </div>
          <span
            className="text-sm font-semibold text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            5.0 average across 50+ verified reviews
          </span>
        </div>
        <TestimonialsCarousel />
        <div className="mt-8 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:opacity-90 shadow-md"
            style={{
              backgroundColor: "#0B1F3A",
              color: "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Read All Reviews
          </Link>
        </div>
      </Section>

      {/* ── EMERGENCY CTA BANNER ─────────────────────────────────────────────── */}
      <section
        className="w-full py-10"
        style={{ backgroundColor: "#B91C1C" }}
        aria-label="Emergency electrical service"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                aria-hidden="true"
              >
                <AlertTriangle size={28} color="#FFFFFF" strokeWidth={2} />
              </div>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Electrical Emergency? We're Here 24/7.
                </h2>
                <p
                  className="text-sm text-red-100 mt-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Don't wait. Electrical emergencies are dangerous. Call a
                  licensed electrician immediately.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+18327830303"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#B91C1C",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Call Now: (832) 783-0303
              </a>
              <Link
                href="/services/emergency-electrician-houston"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE / FREE ESTIMATE FORM ───────────────────────────────── */}
      <Section id="free-estimate" background="default" spacing="lg" maxWidth="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - value copy */}
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              Request Your Free Electrical Estimate
            </h2>
            <p
              className="text-gray-600 mb-8 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ready to get your home's electrical work done right? Fill out the
              form and one of our licensed residential electricians will reach
              out to schedule your free, no-obligation estimate.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Free, no-obligation estimate",
                "Licensed, insured & bonded electricians",
                "Serving Katy, Houston & surrounding areas",
                "Fast response, typically within 24 hours",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
                >
                  <CheckCircle
                    size={18}
                    style={{ color: "#F5A623", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - contact form */}
          <div>
            <ContactForm
              heading="Get Your Free Estimate"
              subheading="Licensed residential electricians serving Katy & Houston, TX. We'll respond within 24 hours."
              ctaLabel="Request Free Estimate"
            />
          </div>
        </div>
      </Section>

      {/* ── GOOGLE MAPS EMBED ────────────────────────────────────────────────── */}
      <Section
        id="location"
        background="white"
        spacing="md"
        maxWidth="2xl"
      >
        <SectionHeading
          eyebrow="Our Location"
          title="Based in Katy, TX, Serving Greater Houston"
          subtitle="ENE Electrical is headquartered in Katy, TX 77494 and serves residential homeowners across the Houston and Katy metro."
          align="center"
        />
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="ENE Electrical service area, Katy, TX 77494"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495496.49418776145!2d-95.465351!3d29.836095000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87edc16e279a22c1%3A0xa79d9e35ba6d5e51!2sE-N-E%20Electrical%2C%20LLC!5e1!3m2!1sen!2sin!4v1788230466922!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Map showing ENE Electrical service area centered on Katy, TX 77494"
          />
        </div>
        <p
          className="text-center text-sm text-gray-500 mt-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <MapPin
            size={14}
            className="inline-block mr-1"
            style={{ color: "#F5A623" }}
            aria-hidden="true"
          />
          ENE Electrical, Katy, TX 77494 | Serving Katy, Energy Corridor,
          Cinco Ranch, Fulshear, Southwest Houston, Memorial, Spring Branch,
          Westchase, Brookshire, Richmond, and all of greater Houston, TX.
        </p>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <Section id="faq" background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Quick answers about ENE Electrical's licensing, service area, experience, and emergency availability."
          align="center"
        />
        <FaqAccordion items={faqData} />
      </Section>

      {/* ── VAN CTA ──────────────────────────────────────────────────────────── */}
      <VanCta
        heading={
          <>
            Ready to Schedule Your Residential Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Houston or Katy?</span>
          </>
        }
        description="Whether you've got an electrical issue that needs fixing, an upgrade you've been putting off, or a new installation you're ready to move forward on, ENE Electrical is ready to help. Licensed, insured, and trusted by homeowners across Houston, Katy, and surrounding communities, our team delivers dependable electrical repair, upgrade, and installation services you can count on."
      />
    </main>
  );
}