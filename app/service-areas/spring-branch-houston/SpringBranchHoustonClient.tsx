"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import {
  ShieldCheck,
  BadgeCheck,
  Award,
  Clock,
  Zap,
  Wrench,
  BatteryCharging,
  Sun,
  Lightbulb,
  Search,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Home,
  Star,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

// ── Animated counter hook ──────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Stat Counter Item ──────────────────────────────────────────────────────────
function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target, 2000);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 p-6"
    >
      <span
        className="text-5xl font-extrabold"
        style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-sm font-semibold uppercase tracking-widest text-center"
        style={{ fontFamily: "Inter, sans-serif", color: "#CBD8E6" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── FAQ Accordion ──────────────────────────────────────────────────────────────
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden"
            style={{
              borderColor: isOpen ? "#F5A623" : "#E2E8F0",
              backgroundColor: "#FFFFFF",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
              style={{
                backgroundColor: isOpen ? "#F5A62310" : "transparent",
              }}
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-base"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#0B1F3A",
                }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0"
                style={{ color: "#F5A623" }}
                aria-hidden="true"
              >
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {isOpen && (
              <div
                className="px-6 pb-5 text-sm leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#1A2530",
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

// ── Main Client Component ──────────────────────────────────────────────────────
export default function SpringBranchHoustonClient({ faqData }: Props) {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero section"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/17286412/pexels-photo-17286412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Spring Branch Houston residential neighborhood"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.70) 100%)",
            }}
          />
        </div>

        {/* Amber accent bar */}
        <div
          className="absolute top-0 left-0 h-1 w-full z-10"
          style={{ backgroundColor: "#F5A623" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.15)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <MapPin size={13} aria-hidden="true" />
              Spring Branch, Houston TX
            </span>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Licensed Electrician{" "}
              <span style={{ color: "#F5A623" }}>Spring Branch</span>, Houston
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif", color: "#CBD8E6" }}
            >
              ENE Electrical delivers expert residential electrical services to
              Spring Branch homeowners — from panel upgrades and EV chargers to
              24/7 emergency response. Licensed, insured, and bonded with 15+
              years of experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.40)",
                }}
              >
                <Zap size={16} aria-hidden="true" />
                Book Appointment
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:border-amber-400 hover:text-amber-400 active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ────────────────────────────────────────────────────── */}
      <section
        className="w-full py-8"
        style={{ backgroundColor: "#F5A623" }}
        aria-label="Quick Answer"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "#0B1F3A" }}
              aria-hidden="true"
            >
              <Zap size={20} color="#F5A623" />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#0B1F3A",
                }}
              >
                Quick Answer
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed font-medium"
                style={{ fontFamily: "Inter, sans-serif", color: "#0B1F3A" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential
                electrical contractor serving Spring Branch, Houston, TX.
                Operating from Katy, TX 77494 with 15+ years of experience, ENE
                Electrical delivers electrical repairs, panel upgrades, EV
                charger installation, generator installation, lighting
                solutions, and emergency electrical services to Spring Branch
                homeowners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGE BAR ─────────────────────────────────────────────────── */}
      <Section background="white" spacing="sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: BadgeCheck, label: "Licensed" },
            { icon: ShieldCheck, label: "Insured" },
            { icon: Award, label: "Bonded" },
            { icon: Users, label: "Background-Checked Technicians" },
            { icon: Clock, label: "15+ Years Experience" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border text-center"
              style={{ borderColor: "#E2E8F0", backgroundColor: "#F7F8FA" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#0B1F3A" }}
                aria-hidden="true"
              >
                <Icon size={20} color="#F5A623" strokeWidth={2} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wide"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#0B1F3A",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SERVICES GRID ───────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Electrical Services in Spring Branch Houston"
          subtitle="From routine repairs to full panel upgrades and EV charger installations, ENE Electrical handles every residential electrical need for Spring Branch homeowners."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              icon: Wrench,
              title: "Electrical Repairs",
              description:
                "Fast, reliable electrical repair services for Spring Branch homes — outlets, switches, circuits, and more diagnosed and fixed right the first time.",
              href: "/services/electrical-repair-installation",
            },
            {
              icon: Zap,
              title: "Panel Upgrades",
              description:
                "Upgrade your electrical panel to safely support modern energy demands. Ideal for older Spring Branch homes with outdated 60–100A panels.",
              href: "/services/electrical-panel-upgrade",
            },
            {
              icon: BatteryCharging,
              title: "EV Charger Installation",
              description:
                "Level 2 EV charger installation for Spring Branch homeowners — fast, code-compliant, and professionally installed for all major EV brands.",
              href: "/services/ev-charger-installation",
            },
            {
              icon: Building2,
              title: "Generator Installation",
              description:
                "Whole-home standby generator installation to keep your Spring Branch home powered during outages — especially important during Houston storm season.",
              href: "/services/generator-installation",
            },
            {
              icon: Sun,
              title: "Security Lighting",
              description:
                "Enhance your Spring Branch home's safety and curb appeal with professionally installed motion-sensor and security lighting systems.",
              href: "/services/security-lighting",
            },
            {
              icon: Lightbulb,
              title: "Recessed LED Lighting",
              description:
                "Transform your Spring Branch home's interior with energy-efficient recessed LED lighting. Modern, clean, and cost-saving.",
              href: "/services/recessed-led-lighting",
            },
            {
              icon: Search,
              title: "Electrical Inspections",
              description:
                "Pre-purchase and safety electrical inspections for Spring Branch properties. Identify hazards and code issues before they become costly problems.",
              href: "/services/electrical-inspection",
            },
            {
              icon: AlertTriangle,
              title: "Emergency Electrician",
              description:
                "24/7 emergency electrical service for Spring Branch homeowners. When you need immediate help, ENE Electrical responds fast.",
              href: "/services/emergency-electrician",
            },
          ].map(({ icon: Icon, title, description, href }) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-6 flex flex-col"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Icon size={22} color="#0B1F3A" strokeWidth={2} />
              </div>
              <h3
                className="text-lg font-bold mb-2 leading-snug"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {title}
              </h3>
              <div
                className="w-10 h-0.5 mb-3 rounded-full"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              />
              <p
                className="text-sm text-gray-500 leading-relaxed flex-grow mb-5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {description}
              </p>
              <Link
                href={href}
                className="mt-auto self-start px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:brightness-105"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ── LOCAL RELEVANCE / WHY SPRING BRANCH ─────────────────────────────── */}
      <Section background="primary" spacing="lg" id="why-ene">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 md:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="ENE Electrical technician performing a panel upgrade in a Spring Branch Houston home"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.6) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
              >
                <MapPin size={11} aria-hidden="true" />
                Serving Spring Branch, Houston TX
              </span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Serving Spring Branch
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Why Spring Branch Residents Choose ENE Electrical
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <div
              className="space-y-4 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: "#CBD8E6" }}
            >
              <p>
                Spring Branch is one of Houston's most dynamic neighborhoods —
                a diverse community where mid-century ranch homes sit alongside
                newly renovated residences and growing families. This variety
                means electrical needs range widely: from aging 60-amp panels
                and outdated wiring in older homes to modern EV charger
                installations and smart-home lighting in recently remodeled
                properties.
              </p>
              <p>
                ENE Electrical's 15+ years of residential experience makes us
                uniquely equipped to serve this range. Whether your Spring Branch
                home was built in the 1960s or underwent a full renovation last
                year, our licensed technicians assess your property's specific
                needs and deliver code-compliant solutions that keep your
                family safe.
              </p>
              <p>
                Operating from our Katy, TX 77494 base, we reach Spring Branch
                quickly — and our 24/7 emergency response means you're never
                left waiting when an electrical problem strikes.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Zap size={15} aria-hidden="true" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── STAT COUNTERS ───────────────────────────────────────────────────── */}
      <Section background="default" spacing="md">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0B1F3A" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-white/10">
            <StatItem target={15} suffix="+" label="Years of Experience" />
            <StatItem target={500} suffix="+" label="Houston-Area Projects" />
            <StatItem target={100} suffix="%" label="Licensed & Insured" />
            <StatItem target={24} suffix="/7" label="Emergency Response" />
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Houston Homeowners Are Saying"
          subtitle="Real reviews from Houston-area customers who trust ENE Electrical for safe, professional residential electrical work."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            variant="testimonial"
            quote="ENE Electrical upgraded our panel and installed a whole-house generator before hurricane season. They were professional, on time, and the work was immaculate. Highly recommend to any Spring Branch homeowner."
            authorName="Maria R."
            authorLocation="Spring Branch, Houston TX"
            rating={5}
          />
          <Card
            variant="testimonial"
            quote="I called ENE for an electrical inspection when buying my home in the Houston area. They were thorough, explained everything clearly, and helped us avoid a costly surprise. Outstanding service."
            authorName="James T."
            authorLocation="Houston, TX"
            rating={5}
          />
          <Card
            variant="testimonial"
            quote="Fast response for an emergency — a tripped breaker that kept resetting at midnight. Their technician arrived within the hour and solved the problem safely. Licensed, professional, and friendly."
            authorName="Sandra K."
            authorLocation="Spring Branch, Houston TX"
            rating={5}
          />
        </div>
      </Section>

      {/* ── GOOGLE MAPS EMBED ───────────────────────────────────────────────── */}
      <Section background="default" spacing="md" id="map">
        <SectionHeading
          eyebrow="Our Location"
          title="Spring Branch, Houston — Our Service Area"
          subtitle="ENE Electrical serves Spring Branch from our Katy, TX 77494 base, reaching Houston-area neighborhoods quickly."
          align="center"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-80 md:h-[420px]">
          <iframe
            title="Spring Branch Houston TX map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55619.00678906849!2d-95.55!3d29.803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c4d8c3b2a9d5%3A0x123abc!2sSpring%20Branch%2C%20Houston%2C%20TX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Map showing Spring Branch neighborhood in Houston, TX"
          />
        </div>
        {/* NAP as real HTML text */}
        <p
          className="mt-4 text-center text-sm"
          style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
        >
          <strong>ENE Electrical</strong> — Based in{" "}
          <span>Katy, TX 77494</span> · Serving Spring Branch &amp; Greater Houston
        </p>
      </Section>

      {/* ── NEIGHBOR SERVICE AREA LINKS ─────────────────────────────────────── */}
      <Section background="white" spacing="md" id="nearby-areas">
        <SectionHeading
          eyebrow="Nearby Service Areas"
          title="We Also Serve These Houston-Area Communities"
          align="center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Memorial, Houston",
              href: "/service-areas/memorial-houston",
              description:
                "Licensed electrical services for Memorial-area homeowners.",
            },
            {
              label: "Energy Corridor",
              href: "/service-areas/energy-corridor-houston",
              description: "Panel upgrades and EV chargers in the Energy Corridor.",
            },
            {
              label: "Westchase, Houston",
              href: "/service-areas/westchase-houston",
              description: "Full-service residential electrical in Westchase.",
            },
            {
              label: "Houston, TX",
              href: "/service-areas/houston-tx",
              description: "Electrical contractor serving the greater Houston metro.",
            },
          ].map(({ label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-2 p-5 rounded-xl border transition-all duration-200 hover:shadow-md hover:border-amber-400"
              style={{ borderColor: "#E2E8F0", backgroundColor: "#F7F8FA" }}
            >
              <div className="flex items-center gap-2">
                <MapPin
                  size={16}
                  style={{ color: "#F5A623" }}
                  aria-hidden="true"
                />
                <span
                  className="font-bold text-sm group-hover:text-amber-500 transition-colors"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#0B1F3A",
                  }}
                >
                  {label}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: "#64748B" }}
              >
                {description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ───────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="faq">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              FAQs
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              Spring Branch Homeowner Questions
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-5"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
            >
              Have questions about electrical services in Spring Branch? Browse
              our most common homeowner questions below, or{" "}
              <Link
                href="/contact-us"
                className="font-semibold underline"
                style={{ color: "#0B1F3A" }}
              >
                contact us
              </Link>{" "}
              for personalized answers.
            </p>
          </div>
          <div className="lg:col-span-3">
            <FaqAccordion items={faqData} />
          </div>
        </div>
      </Section>

      {/* ── CTA SECTION ─────────────────────────────────────────────────────── */}
      <Section background="primary" spacing="lg" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left copy */}
          <div className="flex flex-col justify-center">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Upgrade Your Spring Branch Home's Electrical System?
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <p
              className="text-sm sm:text-base leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif", color: "#CBD8E6" }}
            >
              Book an appointment or send us a message. ENE Electrical's
              licensed, background-checked technicians serve Spring Branch,
              Houston and the greater Katy metro — with 24/7 emergency response
              when you need it most.
            </p>

            {/* Trust highlights */}
            <ul className="space-y-3 mb-8">
              {[
                "Licensed, Insured & Bonded",
                "Background-Checked Technicians",
                "15+ Years of Residential Experience",
                "24/7 Emergency Electrical Response",
                "Serving Spring Branch & Greater Houston",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", color: "#CBD8E6" }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#F5A623" }}
                    aria-hidden="true"
                  >
                    <BadgeCheck size={12} color="#0B1F3A" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95 self-start"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
              }}
            >
              <Zap size={16} aria-hidden="true" />
              Book an Appointment
            </Link>
          </div>

          {/* Right: contact form */}
          <div>
            <ContactForm
              heading="Request Service in Spring Branch"
              subheading="Tell us about your electrical project and a licensed ENE technician will follow up within 24 hours."
              ctaLabel="Send Request"
            />
          </div>
        </div>
      </Section>
    </>
  );
}