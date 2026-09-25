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
  ChevronDown,
  ChevronUp,
  Star,
  Lightbulb,
  BatteryCharging,
  Cpu,
  Wrench,
  Search,
  Home,
  AlertTriangle,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FAQItem[];
}

// ─── Animated Counter ───────────────────────────────────────────────────────
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
  target,
  suffix,
  label,
  start,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const count = useCountUp(target, 1800, start);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span
        className="text-5xl md:text-6xl font-bold"
        style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-sm uppercase tracking-widest font-semibold text-white/80"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Services Data ───────────────────────────────────────────────────────────
const services = [
  {
    icon: Cpu,
    title: "Electrical Panel Upgrades",
    description:
      "Many Memorial Houston homes have aging panels that need upgrading for safety and capacity. We handle full panel replacements and upgrades to modern standards.",
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    icon: BatteryCharging,
    title: "EV Charger Installation",
    description:
      "Install a Level 2 home EV charger in your Memorial garage for fast, convenient overnight charging of your electric vehicle.",
    href: "/services/ev-charger-installation-houston",
  },
  {
    icon: Zap,
    title: "Generator Installation",
    description:
      "Whole-home and standby generator installation to keep your Memorial Houston home powered during Texas storms and outages.",
    href: "/services/generator-installation-houston",
  },
  {
    icon: Lightbulb,
    title: "Security & Outdoor Lighting",
    description:
      "Enhance your home's curb appeal and safety with professionally installed security lighting and landscape lighting systems.",
    href: "/services/security-lighting-houston",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Electrical Service",
    description:
      "24/7 emergency electrical response for Memorial Houston homeowners. Sparks, outages, or tripped breakers, we're on call.",
    href: "/services/emergency-electrician-houston",
  },
  {
    icon: Search,
    title: "Electrical Inspection",
    description:
      "Full residential electrical inspections ideal for Memorial home buyers, sellers, or anyone concerned about aging wiring.",
    href: "/services/electrical-inspection-houston",
  },
  {
    icon: Home,
    title: "Recessed LED Lighting",
    description:
      "Modernize your Memorial home's interior with energy-efficient recessed LED lighting installed by our certified electricians.",
    href: "/services/recessed-led-lighting",
  },
  {
    icon: Wrench,
    title: "Electrical Repair & Installation",
    description:
      "From outlet repairs to full circuit installations, ENE Electrical handles all residential electrical repair and installation needs in Memorial Houston.",
    href: "/services/electrical-repair-installation",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "ENE Electrical upgraded our panel and installed an EV charger in our Memorial home. The team was professional, on time, and left everything spotless. Highly recommend for any Houston homeowner!",
    authorName: "Sandra M.",
    authorLocation: "Memorial, Houston, TX",
    rating: 5,
  },
  {
    quote:
      "Our older home needed serious electrical work: rewiring and a full panel upgrade. ENE handled everything perfectly. They clearly know how to work with established neighborhood homes.",
    authorName: "Robert K.",
    authorLocation: "Memorial, Houston, TX",
    rating: 5,
  },
  {
    quote:
      "Called ENE Electrical for emergency service after a storm tripped our main breaker. They responded fast and had us back up and running same day. Absolute lifesavers!",
    authorName: "Patricia L.",
    authorLocation: "Houston, TX",
    rating: 5,
  },
];

// ─── Neighbor Links ──────────────────────────────────────────────────────────
const neighborAreas = [
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
];

// ─── Trust Badges ────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: ShieldCheck, label: "Licensed" },
  { icon: ShieldCheck, label: "Insured" },
  { icon: Award, label: "Bonded" },
  { icon: CheckCircle, label: "Background-Checked Technicians" },
  { icon: Clock, label: "15+ Years Experience" },
];

// ─── Main Client Component ───────────────────────────────────────────────────
export default function MemorialHoustonClient({ faqData }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/8278494/pexels-photo-8278494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Upscale residential homes in the Memorial area of Houston, Texas"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.92) 50%, rgba(11,31,58,0.7) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {/* Eyebrow */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              border: "1px solid rgba(245,166,35,0.35)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Serving Memorial Houston, TX
          </span>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Licensed Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Memorial Houston</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Panel upgrades, EV chargers, generators, security lighting &amp;
            24/7 emergency electrical service, from your trusted Katy, TX
            electrical contractor with 15+ years of experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wide shadow-xl transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              <Zap size={18} strokeWidth={2.5} />
              Schedule Service
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wide border-2 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Get a Free Estimate
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

          {/* Quick trust row */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {["Licensed & Insured", "Bonded", "15+ Years Experience", "24/7 Emergency"].map(
              (badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-sm text-white/75"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle size={14} style={{ color: "#F5A623" }} />
                  {badge}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER / AEO BLOCK ─────────────────────────────────────── */}
      <section
        aria-label="Quick Answer"
        style={{ backgroundColor: "#FFF8EC", borderTop: "4px solid #F5A623" }}
        className="py-8"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential
                electrical contractor serving the Memorial area of Houston, TX.
                Based in{" "}
                <strong>Katy, TX 77494</strong> with{" "}
                <strong>15+ years of experience</strong>, ENE Electrical
                provides Memorial homeowners with panel upgrades, EV charger
                installation, generator installation, lighting, electrical
                repairs, and 24/7 emergency service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGE BAR ──────────────────────────────────────────────── */}
      <Section background="white" spacing="sm">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#0B1F3A" }}
                aria-hidden="true"
              >
                <Icon size={18} color="#F5A623" strokeWidth={2} />
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Electrical Services in Memorial Houston"
          subtitle="ENE Electrical brings a full suite of residential electrical solutions to Memorial-area homeowners, from essential repairs to modern upgrades."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.title}
              href={svc.href}
              className="group block focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.75rem]"
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

      {/* ── LOCAL RELEVANCE / WHY MEMORIAL ──────────────────────────────── */}
      <Section background="white" spacing="lg" id="why-memorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Local Expertise"
              title="Why Memorial Homeowners Trust ENE Electrical"
              align="left"
            />
            <div
              className="space-y-5 text-base leading-relaxed"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              <p>
                Memorial Houston is one of the city's most established and
                prestigious residential communities, home to elegant estates and
                mature tree-lined streets. Many of these homes were built
                decades ago, making them prime candidates for modern electrical
                upgrades.
              </p>
              <p>
                Older properties in Memorial often feature outdated wiring,
                undersized electrical panels, and systems that weren't designed
                for today's high-demand appliances, EV chargers, or smart-home
                technology. ENE Electrical specializes in safely modernizing
                these systems while respecting the character of your home.
              </p>
              <p>
                Based in{" "}
                <strong>Katy, TX 77494</strong>, ENE Electrical is close to
                Memorial and delivers licensed and insured residential
                electrical services across the Houston and Katy metro, without
                the long wait times or big-company impersonal service.
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Panel upgrades for homes with aging fuse boxes or undersized service",
                  "Rewiring services for properties with knob-and-tube or aluminum wiring",
                  "EV charger installation for today's electric vehicles",
                  "Generator standby systems for Houston storm season",
                  "Security & landscape lighting for upscale curb appeal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#F5A623" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative rounded-[0.75rem] overflow-hidden shadow-xl aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/xlk.jpeg"
              alt="ENE Electrical technician upgrading an electrical panel in a Memorial Houston home"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.9), transparent)",
              }}
            >
              <p
                className="text-white font-semibold text-sm"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Serving Memorial Houston from Katy, TX 77494
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── LOCAL RELEVANCE SECTION ──────────────────────────────────────── */}
      <Section
        background="primary"
        spacing="md"
        id="serving-memorial"
        aria-label="Serving Memorial Houston"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <MapPin size={36} style={{ color: "#F5A623" }} aria-hidden="true" />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Serving Memorial Houston
          </h2>
          <p
            className="text-white/80 text-base leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Memorial Houston is one of the city's most established residential
            communities, featuring older homes that often require panel
            upgrades, rewiring, and modern electrical additions like EV
            chargers. ENE Electrical serves Memorial Houston from its{" "}
            <strong className="text-white">Katy, TX 77494</strong> base,
            delivering licensed and insured residential electrical services
            across the Houston and Katy metro including the Memorial area.
          </p>
        </div>
      </Section>

      {/* ── STAT COUNTERS ────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        style={{ backgroundColor: "#0B1F3A" }}
        className="py-16"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            <StatCounter target={15} suffix="+" label="Years Experience" start={statsVisible} />
            <StatCounter target={500} suffix="+" label="Panels Upgraded" start={statsVisible} />
            <StatCounter target={20} suffix="+" label="Cities Served" start={statsVisible} />
            <StatCounter target={98} suffix="%" label="Customer Satisfaction" start={statsVisible} />
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="What Customers Say"
          title="Trusted by Houston-Area Homeowners"
          subtitle="Real reviews from real customers in Memorial Houston and surrounding neighborhoods."
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

      {/* ── GOOGLE MAPS EMBED ────────────────────────────────────────────── */}
      <Section background="white" spacing="md" id="service-map">
        <SectionHeading
          eyebrow="Our Location"
          title="Memorial Houston Service Area"
          subtitle="ENE Electrical is based in Katy, TX 77494, just minutes from Memorial Houston and serving the entire Houston metro."
          align="center"
        />
        <div className="rounded-[0.75rem] overflow-hidden shadow-lg border border-gray-200 aspect-[16/7]">
          <iframe
            title="Memorial Houston, TX map relative to ENE Electrical base in Katy, TX"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495496.49418776145!2d-95.465351!3d29.836095000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87edc16e279a22c1%3A0xa79d9e35ba6d5e51!2sE-N-E%20Electrical%2C%20LLC!5e1!3m2!1sen!2sin!4v1788230466922!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      {/* ── NEIGHBOR SERVICE AREA LINKS ───────────────────────────────────── */}
      <Section background="default" spacing="md" id="nearby-areas">
        <SectionHeading
          eyebrow="Also Serving Nearby"
          title="Neighboring Service Areas"
          subtitle="ENE Electrical covers communities surrounding Memorial Houston, including:"
          align="center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {neighborAreas.map((area) => (
            <Link
              key={area.label}
              href={area.href}
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-[0.75rem] border-2 text-center font-semibold text-sm uppercase tracking-wide transition-all duration-200 group"
              style={{
                borderColor: "#0B1F3A",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1F3A";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                (e.currentTarget as HTMLElement).style.color = "#0B1F3A";
              }}
            >
              <MapPin size={14} aria-hidden="true" />
              {area.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="FAQ: Memorial Houston Electrical Services"
          align="center"
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[0.75rem] border overflow-hidden"
              style={{ borderColor: "#e5e7eb" }}
            >
              <button
                type="button"
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
                style={{
                  backgroundColor: openFaq === idx ? "#0B1F3A" : "#F7F8FA",
                  color: openFaq === idx ? "#fff" : "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <span className="font-semibold text-sm sm:text-base pr-4">
                  {item.question}
                </span>
                {openFaq === idx ? (
                  <ChevronUp
                    size={20}
                    className="flex-shrink-0"
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="flex-shrink-0"
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                )}
              </button>
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                hidden={openFaq !== idx}
                className="px-6 py-5 border-t"
                style={{
                  borderColor: "#e5e7eb",
                  backgroundColor: "#fff",
                  fontFamily: "Inter, sans-serif",
                  color: "#1A2530",
                  fontSize: "0.95rem",
                  lineHeight: "1.75",
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        className="py-20"
        aria-label="Call to Action"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(245,166,35,0.15)",
                  color: "#F5A623",
                  border: "1px solid rgba(245,166,35,0.3)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Ready to Get Started?
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Schedule Electrical Service in{" "}
                <span style={{ color: "#F5A623" }}>Memorial Houston</span>
              </h2>
              <p
                className="text-white/75 text-base leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Whether you need a panel inspection, a new EV charger, or
                24/7 emergency electrical help, ENE Electrical is your
                trusted licensed contractor serving Memorial Houston from
                our Katy, TX 77494 base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointment-booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wide shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                    boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                  }}
                >
                  <Zap size={16} strokeWidth={2.5} />
                  Book an Appointment
                </Link>
                <Link
                  href="/services/electrical-inspection-houston"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wide border-2 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Request an Inspection
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  "Licensed & Insured",
                  "Bonded",
                  "Background-Checked Technicians",
                  "15+ Years Experience",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-1.5 text-sm text-white/70"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Star
                      size={13}
                      style={{ color: "#F5A623" }}
                      aria-hidden="true"
                    />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div>
              <ContactForm
                heading="Request Service in Memorial Houston"
                subheading="Tell us about your electrical needs and we'll get back to you promptly."
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
            <span style={{ color: "#F5A623" }}>Memorial Houston?</span>
          </>
        }
        description="From panel upgrades to EV charger installs, ENE Electrical delivers dependable, licensed electrical service to homeowners throughout Memorial Houston. Book an appointment today or give us a call and a background-checked technician will take care of the rest."
      />
    </main>
  );
}