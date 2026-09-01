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
  CheckCircle,
  Wrench,
  BatteryCharging,
  Lightbulb,
  ClipboardCheck,
  AlertTriangle,
  Home,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  MapPin,
  Star,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

// ── Animated Counter ──────────────────────────────────────────────────────────
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
  }, [target, duration, start]);
  return count;
}

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
    <div className="flex flex-col items-center text-center px-4">
      <span
        className="text-4xl sm:text-5xl font-extrabold"
        style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
        aria-live="polite"
      >
        {count}
        {suffix}
      </span>
      <span
        className="mt-2 text-sm font-medium text-white/80 uppercase tracking-widest"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "#E2E8F0" }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
              style={{
                backgroundColor: isOpen ? "#0B1F3A" : "#FFFFFF",
                color: isOpen ? "#FFFFFF" : "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <span className="font-semibold text-sm sm:text-base pr-4">
                {item.question}
              </span>
              {isOpen ? (
                <ChevronUp size={18} className="flex-shrink-0" />
              ) : (
                <ChevronDown size={18} className="flex-shrink-0" style={{ color: "#F5A623" }} />
              )}
            </button>
            {isOpen && (
              <div
                className="px-5 py-4 text-sm leading-relaxed"
                style={{
                  backgroundColor: "#F7F8FA",
                  color: "#1A2530",
                  fontFamily: "Inter, sans-serif",
                }}
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

// ── Main Client Component ─────────────────────────────────────────────────────
export default function FulshearClient({ faqData }: Props) {
  // Stat counter intersection observer
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Wrench,
      title: "Electrical Repairs",
      description:
        "Fast, reliable electrical repairs for outlets, switches, wiring faults, and more, keeping your Fulshear home safe.",
      href: "/services/electrical-repair-installation",
    },
    {
      icon: Zap,
      title: "Panel Upgrades",
      description:
        "Upgrade your electrical panel to handle modern loads. Essential for Fulshear's newer, larger homes.",
      href: "/services/electrical-panel-upgrade-houston",
    },
    {
      icon: BatteryCharging,
      title: "EV Charger Installation",
      description:
        "Level 2 home EV charger installation by certified electricians, perfect for Fulshear's growing EV community.",
      href: "/services/ev-charger-installation-houston",
    },
    {
      icon: Home,
      title: "Generator Installation",
      description:
        "Whole-home standby generator installation so your family stays powered through Texas storms.",
      href: "/services/generator-installation-houston",
    },
    {
      icon: Lightbulb,
      title: "Recessed LED Lighting",
      description:
        "Modern recessed lighting design and installation to brighten any room in your Fulshear home.",
      href: "/services/recessed-led-lighting",
    },
    {
      icon: ShieldCheck,
      title: "Security Lighting",
      description:
        "Exterior and motion-sensor security lighting to keep your property protected day and night.",
      href: "/services/security-lighting-houston",
    },
    {
      icon: ClipboardCheck,
      title: "Electrical Inspections",
      description:
        "Comprehensive home electrical inspections for buyers, sellers, and homeowners in Fulshear.",
      href: "/services/electrical-inspection-houston",
    },
    {
      icon: AlertTriangle,
      title: "Emergency Electrical",
      description:
        "24/7 emergency electrical response for urgent issues across Fulshear and the greater Katy area.",
      href: "/services/emergency-electrician-houston",
    },
    {
      icon: TrendingUp,
      title: "New Construction Wiring",
      description:
        "Expert new construction electrical wiring for Fulshear's booming residential building market.",
      href: "/services/new-construction-wiring",
    },
  ];

  const testimonials = [
    {
      quote:
        "ENE Electrical installed our EV charger and upgraded our panel in the same visit. Professional, on time, and cleaned up perfectly. Highly recommend for any Fulshear homeowner.",
      authorName: "Marcus T.",
      authorLocation: "Fulshear, TX",
      rating: 5,
    },
    {
      quote:
        "Called ENE for an emergency late on a Saturday night. They showed up within two hours and fixed the issue fast. Amazing service.",
      authorName: "Linda R.",
      authorLocation: "Cross Creek Ranch, Fulshear",
      rating: 5,
    },
    {
      quote:
        "Had them install a whole-home generator. The team was knowledgeable, thorough, and explained everything. Worth every penny with Texas weather.",
      authorName: "Derek & Amy W.",
      authorLocation: "Weston Lakes, Fulshear TX",
      rating: 5,
    },
  ];

  const neighborAreas = [
    { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
    { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
    { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
    { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "Licensed" },
    { icon: ShieldCheck, label: "Insured" },
    { icon: ShieldCheck, label: "Bonded" },
    { icon: Award, label: "Background-Checked Technicians" },
    { icon: Clock, label: "15+ Years Experience" },
  ];

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A", minHeight: "520px" }}
        aria-label="Hero: Electrician in Fulshear TX"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician performing a residential electrical panel upgrade in a Fulshear, TX home"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-start gap-6">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <MapPin size={13} />
            Serving Fulshear, TX
          </span>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Trusted Electricians{" "}
            <span style={{ color: "#F5A623" }}>in Fulshear, TX</span>
          </h1>

          <p
            className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical delivers licensed, insured, and bonded residential
            electrical services to Fulshear homeowners, from panel upgrades
            and EV chargers to 24/7 emergency response.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 18px rgba(245,166,35,0.4)",
              }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Book an Appointment
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Contact Us
            </Link>
          </div>

          {/* Quick credential bar */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
            {["Licensed", "Insured", "Bonded", "15+ Yrs Experience"].map(
              (badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-xs font-medium text-white/75"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle size={13} style={{ color: "#F5A623" }} />
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Quick Answer / AEO Block ─────────────────────────────────────── */}
      <section
        aria-label="Quick Answer"
        style={{ backgroundColor: "#FFF8EC", borderTop: "4px solid #F5A623" }}
        className="w-full py-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 items-start">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            >
              <Zap size={20} color="#0B1F3A" strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential
                electrical contractor serving{" "}
                <strong>Fulshear, TX</strong> and the greater Katy-Houston
                metro. With <strong>15+ years of experience</strong>, they
                provide electrical repairs, panel upgrades, EV charger
                installation, generator installation, lighting, and emergency
                electrical services to Fulshear homeowners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badge Bar ──────────────────────────────────────────────── */}
      <section
        aria-label="Trust credentials"
        className="w-full py-6"
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5"
              >
                <Icon size={18} style={{ color: "#F5A623" }} aria-hidden="true" />
                <span
                  className="text-sm font-semibold text-white uppercase tracking-wide"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Available in Fulshear ───────────────────────────────── */}
      <Section background="default" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="What We Offer"
          title="Electrical Services Available in Fulshear, TX"
          subtitle="From routine repairs to major installations, ENE Electrical covers every residential electrical need for Fulshear homeowners."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, title, description, href }) => (
            <Link key={title} href={href} className="group block">
              <Card
                variant="service"
                icon={icon}
                title={title}
                description={description}
                className="h-full group-hover:shadow-xl transition-shadow duration-300"
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Local Relevance / Why Fulshear ───────────────────────────────── */}
      <Section background="primary" spacing="lg" maxWidth="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/4036301/pexels-photo-4036301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Aerial view of Fulshear, TX residential neighborhood with new construction homes"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.85), transparent)",
              }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: "#F5A623" }} />
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Serving Fulshear from Katy, TX 77494
                </span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Local Relevance
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Why Fulshear Homeowners Choose ENE Electrical
            </h2>
            <div
              className="w-12 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <div
              className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <p>
                <strong className="text-white">Fulshear, TX</strong> is one of
                the fastest-growing suburbs west of Katy, with thousands of new
                homes built annually in master-planned communities like Cross
                Creek Ranch, Weston Lakes, and Pecan Ridge. This rapid growth
                creates unique electrical demands that require an experienced
                local contractor.
              </p>
              <p>
                ENE Electrical, based in{" "}
                <strong className="text-white">Katy, TX 77494</strong>, is
                minutes from Fulshear and deeply familiar with the electrical
                systems in the area's newer construction homes, including
                higher-amperage panels, EV-ready garages, and whole-home
                generator hookups.
              </p>
              <p>
                Whether you're upgrading a panel for a growing family, adding a
                Level 2 EV charger, or need 24/7 emergency electrical response
                after a storm, ENE Electrical provides the licensed, insured,
                and bonded service that Fulshear residents trust.
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Familiar with Fulshear's new construction electrical systems",
                "Fast response times, based nearby in Katy, TX 77494",
                "24/7 emergency availability across the Fulshear area",
                "Licensed, insured, bonded & background-checked technicians",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle
                    size={17}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#F5A623" }}
                  />
                  <span
                    className="text-white/85 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Stat Counters ────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        aria-label="Experience statistics"
        className="w-full py-16"
        style={{ backgroundColor: "#1A2530" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatCounter value={15} suffix="+" label="Years of Experience" started={statsStarted} />
            <StatCounter value={10} suffix="+" label="Service Areas Covered" started={statsStarted} />
            <StatCounter value={2500} suffix="+" label="Projects Completed" started={statsStarted} />
            <StatCounter value={98} suffix="%" label="Customer Satisfaction" started={statsStarted} />
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Katy & Fulshear Homeowners Say"
          subtitle="Real reviews from real customers in the greater Katy-Fulshear area."
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
        {/* Google review badge */}
        <div className="flex justify-center mt-10">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border"
            style={{ borderColor: "#E2E8F0", backgroundColor: "#F7F8FA" }}
          >
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#F5A623"
                  stroke="none"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              5-Star Rated: Katy / Fulshear Area
            </span>
          </div>
        </div>
      </Section>

      {/* ── Google Maps Embed ────────────────────────────────────────────── */}
      <Section background="default" spacing="md" maxWidth="2xl">
        <SectionHeading
          eyebrow="Our Location"
          title="Serving Fulshear from Katy, TX"
          subtitle="ENE Electrical is based in Katy, TX 77494, just minutes from Fulshear for fast, reliable service."
          align="center"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: "#E2E8F0" }}>
          <iframe
            title="Map showing Fulshear, TX near ENE Electrical's Katy TX service base"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495496.49418776145!2d-95.465351!3d29.836095000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87edc16e279a22c1%3A0xa79d9e35ba6d5e51!2sE-N-E%20Electrical%2C%20LLC!5e1!3m2!1sen!2sin!4v1788230466922!5m2!1sen!2sin"
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            aria-label="Google map showing Fulshear, TX location"
          />
        </div>
        {/* NAP text — real crawlable text */}
        <p
          className="mt-4 text-center text-sm"
          style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
        >
          <strong>ENE Electrical</strong>, Based in{" "}
          <address className="inline not-italic font-medium">Katy, TX 77494</address>
          {" · "}Serving Fulshear, TX and surrounding communities
        </p>
      </Section>

      {/* ── Service Area Neighbor Links ──────────────────────────────────── */}
      <Section background="white" spacing="md" maxWidth="2xl">
        <SectionHeading
          eyebrow="Also Serving"
          title="Neighboring Service Areas"
          subtitle="ENE Electrical covers Fulshear and all surrounding communities in the Katy-Houston metro."
          align="center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {neighborAreas.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border-2 font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-md"
              style={{
                borderColor: "#0B1F3A",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1F3A";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF";
                (e.currentTarget as HTMLElement).style.color = "#0B1F3A";
              }}
            >
              <MapPin size={14} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>

        {/* Full service area disclosure */}
        <p
          className="mt-6 text-center text-xs text-gray-500 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          ENE Electrical serves: Katy, Energy Corridor, Southwest Houston, Cinco Ranch, Fulshear, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.
        </p>
      </Section>

      {/* ── FAQ Accordion ────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Common Questions"
          title="FAQ: Electrical Services in Fulshear, TX"
          subtitle="Answers to the most common questions Fulshear homeowners ask about ENE Electrical."
          align="center"
        />
        <FaqAccordion items={faqData} />
      </Section>

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <section
        className="w-full py-20 relative overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Book electrical service in Fulshear TX"
      >
        {/* Decorative amber glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: CTA copy */}
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Ready to Get Started?
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Schedule Your Electrical Service in Fulshear, TX Today
              </h2>
              <div
                className="w-12 h-1 rounded-full mb-6"
                style={{ backgroundColor: "#F5A623" }}
              />
              <p
                className="text-white/75 text-sm sm:text-base leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical's licensed, insured, and bonded electricians are
                ready to serve your Fulshear home. From quick repairs to major
                installations, we're just a call or click away.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Licensed, insured & bonded",
                  "Background-checked technicians",
                  "15+ years of residential experience",
                  "24/7 emergency electrical services",
                  "Serving Fulshear from Katy, TX 77494",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      style={{ color: "#F5A623" }}
                      className="flex-shrink-0"
                    />
                    <span
                      className="text-white/85 text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointment-booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                    boxShadow: "0 4px 18px rgba(245,166,35,0.4)",
                  }}
                >
                  <Zap size={16} strokeWidth={2.5} />
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <ContactForm
                heading="Request Service in Fulshear"
                subheading="Fill out the form and an ENE Electrical team member will be in touch promptly."
                ctaLabel="Submit Request"
              />
            </div>
          </div>
        </div>
      </section>

      <VanCta
        heading={
          <>
            Ready to Schedule Your Residential Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Fulshear, TX?</span>
          </>
        }
        description="Whether you're dealing with an electrical issue, planning an upgrade, or ready to move forward on a new installation, ENE Electrical is ready to help. We serve homeowners across Fulshear and the greater Katy area with dependable, licensed electrical service."
      />
    </main>
  );
}