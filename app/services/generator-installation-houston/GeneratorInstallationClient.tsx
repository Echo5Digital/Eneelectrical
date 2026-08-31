"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import {
  Zap,
  ShieldCheck,
  BadgeCheck,
  UserCheck,
  Clock,
  AlertTriangle,
  CloudLightning,
  Thermometer,
  FileText,
  Settings,
  PlugZap,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  ArrowRight,
  Phone,
  Calendar,
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

// ── Testimonials data ──────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "ENE Electrical installed our whole-home generator before hurricane season and it's been a lifesaver. The team handled permits, the transfer switch, everything. Couldn't be happier.",
    authorName: "Maria G.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "After the 2021 freeze left us without power for days, we knew we needed a standby generator. ENE Electrical made the whole process seamless from sizing to final inspection.",
    authorName: "David R.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "Professional, punctual, and thorough. Our automatic transfer switch kicked in flawlessly during the last storm. ENE Electrical truly delivers peace of mind.",
    authorName: "Angela T.",
    authorLocation: "Fulshear, TX",
    rating: 5,
  },
  {
    quote:
      "I was nervous about the permitting process but ENE handled everything. Generator has been running perfectly. Highly recommend for anyone in the Houston area.",
    authorName: "James L.",
    authorLocation: "Energy Corridor, Houston",
    rating: 5,
  },
];

// ── Service areas ──────────────────────────────────────────────────────────
const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

export default function GeneratorInstallationClient({ faqData }: Props) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Testimonial auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for stats
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(15, 1600, statsVisible);
  const homes = useCountUp(500, 2000, statsVisible);
  const miles = useCountUp(50, 1600, statsVisible);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[580px] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero section"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/9875678/pexels-photo-9875678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Whole-home standby generator installed beside a suburban Houston house"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.97) 0%, rgba(11,31,58,0.75) 60%, rgba(11,31,58,0.6) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span
              className="inline-block mb-4 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.18)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Generator Installation in Houston &amp; Katy, TX
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Never Lose Power{" "}
              <span style={{ color: "#F5A623" }}>Again.</span>
            </h1>
            <p
              className="text-lg text-blue-100 leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical installs whole-home standby generators that keep
              your family safe and comfortable through Texas storms, hurricanes,
              and grid outages, fully permitted, fully tested, and fully backed by
              15+ years of licensed expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Calendar size={16} strokeWidth={2.5} />
                Book Installation
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ─────────────────────────────────────────────────── */}
      <section
        aria-label="Quick Answer"
        style={{ backgroundColor: "#FFF8EC", borderTop: "4px solid #F5A623" }}
        className="py-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 items-start">
            <div
              className="flex-shrink-0 mt-1 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            >
              <Zap size={20} color="#0B1F3A" strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical provides whole-home standby generator installation
                for residential homeowners in Houston and Katy, TX. Our licensed
                and insured electricians handle everything from sizing and
                permitting to transfer switch installation and final testing. With
                15+ years of experience, ENE Electrical ensures your home stays
                powered during outages and severe Texas weather. We serve Katy,
                Houston, Cinco Ranch, Fulshear, and surrounding communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGE BAR ──────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        className="py-6"
        aria-label="Trust credentials"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: BadgeCheck, label: "Licensed" },
              { icon: ShieldCheck, label: "Insured" },
              { icon: ShieldCheck, label: "Bonded" },
              { icon: UserCheck, label: "Background-Checked" },
              { icon: Clock, label: "15+ Years Experience" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <Icon
                  size={20}
                  style={{ color: "#F5A623" }}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY YOU NEED A WHOLE-HOME GENERATOR ──────────────────────────── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Texas Power Outages"
          title="Why Houston Homeowners Need a Standby Generator"
          subtitle="Texas's electrical grid and severe weather create real risks for families. A whole-home generator isn't a luxury; it's essential protection."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: CloudLightning,
              title: "Hurricane Season Threats",
              body: "The Gulf Coast regularly faces powerful storms that knock out power for days or weeks. A standby generator automatically restores power the moment the grid fails.",
            },
            {
              icon: Thermometer,
              title: "Extreme Heat & Freeze Events",
              body: "Texas winters like the 2021 freeze and blistering summer heat create life-safety risks. Your generator keeps HVAC, medical equipment, and refrigerators running.",
            },
            {
              icon: AlertTriangle,
              title: "ERCOT Grid Vulnerabilities",
              body: "Texas operates on an isolated power grid that faces growing strain. Outages can strike without warning and last longer than rolling blackout estimates suggest.",
            },
            {
              icon: ShieldCheck,
              title: "Home Security & Safety",
              body: "Power outages disable security systems, smart locks, and garage doors. A whole-home generator keeps your family secure no matter what's happening outside.",
            },
            {
              icon: PlugZap,
              title: "Medical Equipment Dependence",
              body: "Many families rely on powered medical devices, such as CPAP machines, oxygen concentrators, insulin storage, and more. Backup power can be a genuine lifesaver.",
            },
            {
              icon: Zap,
              title: "Seamless, Automatic Backup",
              body: "Unlike portable generators, standby units monitor the grid and switch on automatically within seconds of an outage, with no cords and no manual startup required.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-6 rounded-[0.75rem] border border-gray-100 bg-[#F7F8FA] hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Icon size={22} color="#0B1F3A" strokeWidth={2} />
              </div>
              <h3
                className="text-lg font-bold"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Our Process"
          title="What's Included in Our Generator Installation"
          subtitle="From first visit to final flip of the switch, ENE Electrical manages every step so you don't have to."
          align="center"
        />
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden lg:block absolute left-[calc(50%-1px)] top-8 bottom-8 w-0.5"
            style={{ backgroundColor: "#F5A623", opacity: 0.25 }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-8">
            {[
              {
                step: "01",
                icon: ClipboardCheck,
                title: "Home Assessment & Sizing",
                body: "Our licensed electricians assess your home's electrical load, fuel preferences, and physical space to recommend the right generator size and placement.",
                align: "left",
              },
              {
                step: "02",
                icon: FileText,
                title: "Permitting & Code Compliance",
                body: "ENE Electrical handles all permit applications and ensures installation meets local codes, so you have zero compliance headaches.",
                align: "right",
              },
              {
                step: "03",
                icon: Zap,
                title: "Transfer Switch Installation",
                body: "We install an automatic transfer switch that detects outages and instantly routes backup power to your entire home, with no manual steps required.",
                align: "left",
              },
              {
                step: "04",
                icon: PlugZap,
                title: "Generator Connection & Fuel",
                body: "The generator is connected to your home's electrical system and fuel source (natural gas or propane). All connections are sealed, tested, and code-compliant.",
                align: "right",
              },
              {
                step: "05",
                icon: Settings,
                title: "Full System Testing",
                body: "Before we leave, we run a full load test, verify the automatic transfer switch response time, and walk you through operating your new system.",
                align: "left",
              },
            ].map(({ step, icon: Icon, title, body, align }) => (
              <div
                key={step}
                className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                  align === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 flex flex-col gap-3 p-6 rounded-[0.75rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#F5A623" }}
                      aria-hidden="true"
                    >
                      <Icon size={22} color="#0B1F3A" strokeWidth={2} />
                    </div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {title}
                    </h3>
                  </div>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {body}
                  </p>
                </div>
                {/* Step badge (center) */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10"
                  style={{
                    backgroundColor: "#0B1F3A",
                    color: "#F5A623",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  aria-hidden="true"
                >
                  {step}
                </div>
                {/* Spacer for opposite side */}
                <div className="flex-1 hidden lg:block" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── GENERATOR TYPES ──────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Generator Options"
          title="Generator Types We Install"
          subtitle="ENE Electrical installs the full spectrum of residential standby generators, from compact units for essential circuits to whole-home powerhouses."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Essential Circuit Generators",
              range: "7–14 kW",
              description:
                "Ideal for smaller homes or targeted backup. Powers essential circuits including HVAC, refrigerator, lights, and outlets. Perfect for homes up to ~1,500 sq ft.",
              features: [
                "Automatic transfer switch included",
                "Natural gas or propane fuel",
                "Quieter and more compact",
                "Lower upfront cost",
              ],
            },
            {
              title: "Mid-Range Standby Generators",
              range: "16–22 kW",
              highlight: true,
              description:
                "Our most popular size for Houston-area homes. Powers your entire home including central AC, well pumps, and all appliances. Ideal for 1,500–3,000 sq ft homes.",
              features: [
                "Whole-home coverage",
                "Fully automatic operation",
                "WiFi monitoring available",
                "Natural gas preferred",
              ],
            },
            {
              title: "Large Whole-Home Generators",
              range: "24–48+ kW",
              description:
                "For large custom homes, pools, EV chargers, and heavy electrical loads. Ensures no compromises on power: everything runs at full capacity, all the time.",
              features: [
                "Supports all high-load appliances",
                "Multiple unit paralleling available",
                "Advanced load management",
                "Ideal for 3,000+ sq ft homes",
              ],
            },
          ].map(({ title, range, description, features, highlight }) => (
            <div
              key={title}
              className={`flex flex-col rounded-[0.75rem] overflow-hidden border transition-shadow duration-300 hover:shadow-xl ${
                highlight
                  ? "border-[#F5A623] shadow-lg ring-2 ring-[#F5A623]/30"
                  : "border-gray-100 shadow-md"
              }`}
            >
              {highlight && (
                <div
                  className="py-2 text-center text-xs font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                className={`p-6 flex flex-col gap-4 flex-grow ${
                  highlight ? "bg-[#0B1F3A]" : "bg-white"
                }`}
              >
                <div>
                  <span
                    className="text-3xl font-black"
                    style={{
                      color: "#F5A623",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {range}
                  </span>
                  <h3
                    className={`text-lg font-bold mt-1 ${
                      highlight ? "text-white" : "text-[#0B1F3A]"
                    }`}
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {title}
                  </h3>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    highlight ? "text-blue-200" : "text-gray-500"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {description}
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-sm ${
                        highlight ? "text-blue-100" : "text-gray-600"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#F5A623" }}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          className="w-3 h-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="#0B1F3A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SERVICE AREA CALLOUT ─────────────────────────────────────────── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <div className="text-center mb-10">
          <span
            className="inline-block mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Serving Houston &amp; Katy, TX
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Local Generator Experts Near You
          </h2>
          <div
            className="mx-auto h-1 w-14 rounded-full mb-6"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          />
          <p
            className="text-base text-blue-200 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Houston and Katy, TX homeowners face frequent power outages due to
            hurricane season, severe storms, and grid strain. ENE Electrical
            serves the full Houston and Katy metro, including Cinco Ranch,
            Fulshear, Energy Corridor, Southwest Houston, and Richmond,
            providing whole-home generator installations that keep families safe
            and comfortable during Texas weather events.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "rgba(255,255,255,0.09)",
                color: "#F5A623",
                border: "1px solid rgba(245,166,35,0.3)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p
            className="text-sm text-blue-300"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Don't see your area?{" "}
            <Link
              href="/contact-us"
              className="underline underline-offset-2 hover:text-[#F5A623] transition-colors"
            >
              Contact us
            </Link>{" "}
            and we likely serve your neighborhood too.
          </p>
        </div>
      </Section>

      {/* ── STAT COUNTERS ────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ backgroundColor: "#F5A623" }}
        aria-label="Company statistics"
        ref={statsRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                value: years,
                suffix: "+",
                label: "Years of Experience",
                sublabel: "Serving Houston & Katy since 2009",
              },
              {
                value: homes,
                suffix: "+",
                label: "Homes Served",
                sublabel: "Satisfied Houston-area homeowners",
              },
              {
                value: miles,
                suffix: "+ mi",
                label: "Service Area Radius",
                sublabel: "Across Greater Houston metro",
              },
            ].map(({ value, suffix, label, sublabel }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span
                  className="text-5xl md:text-6xl font-black"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  aria-label={`${value}${suffix} ${label}`}
                >
                  {value}
                  {suffix}
                </span>
                <p
                  className="text-lg font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {label}
                </p>
                <p
                  className="text-sm opacity-70"
                  style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
                >
                  {sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ────────────────────────────────────────── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Houston Homeowners Are Saying"
          subtitle="Real reviews from real customers across the Houston and Katy area."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          {/* Active testimonial */}
          <div
            className="p-8 rounded-[0.75rem] bg-white border border-gray-100 shadow-lg relative min-h-[220px] flex flex-col"
            aria-live="polite"
            aria-atomic="true"
          >
            <div
              className="text-5xl leading-none font-bold mb-3 select-none"
              style={{ color: "#F5A623" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            {/* Stars */}
            <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#F5A623"
                  color="#F5A623"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p
              className="text-gray-600 italic leading-relaxed flex-grow mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {testimonials[activeTestimonial].quote}
            </p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                aria-hidden="true"
              >
                {testimonials[activeTestimonial].authorName.charAt(0)}
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {testimonials[activeTestimonial].authorName}
                </p>
                <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  {testimonials[activeTestimonial].authorLocation}
                </p>
              </div>
            </div>
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-3 mt-6" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                role="tab"
                aria-selected={i === activeTestimonial}
                aria-label={`Go to testimonial ${i + 1}`}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === activeTestimonial ? "#F5A623" : "#CBD5E1",
                  transform:
                    i === activeTestimonial ? "scale(1.25)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() =>
                setActiveTestimonial(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="px-5 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 hover:border-[#F5A623] text-gray-600 hover:text-[#0B1F3A] transition-all duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              aria-label="Previous testimonial"
            >
              ← Prev
            </button>
            <button
              onClick={() =>
                setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
              }
              className="px-5 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 hover:border-[#F5A623] text-gray-600 hover:text-[#0B1F3A] transition-all duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              aria-label="Next testimonial"
            >
              Next →
            </button>
          </div>
        </div>
      </Section>

      {/* ── FAQ ACCORDION ────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" maxWidth="md">
        <SectionHeading
          eyebrow="Common Questions"
          title="Generator Installation FAQs"
          subtitle="Get answers to the most common questions Houston homeowners ask about standby generator installation."
          align="center"
        />
        <div className="flex flex-col gap-3" role="list">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[0.75rem] border overflow-hidden transition-all duration-300"
              style={{
                borderColor:
                  openFaq === idx ? "#F5A623" : "#E5E7EB",
                boxShadow:
                  openFaq === idx
                    ? "0 4px 16px rgba(245,166,35,0.15)"
                    : "none",
              }}
              role="listitem"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                style={{
                  backgroundColor: openFaq === idx ? "#0B1F3A" : "#FFFFFF",
                }}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span
                  className="font-bold text-base"
                  style={{
                    color: openFaq === idx ? "#FFFFFF" : "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {item.question}
                </span>
                <span className="flex-shrink-0" aria-hidden="true">
                  {openFaq === idx ? (
                    <ChevronUp size={20} color="#F5A623" />
                  ) : (
                    <ChevronDown size={20} color="#0B1F3A" />
                  )}
                </span>
              </button>
              {openFaq === idx && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-6 py-5"
                  style={{ backgroundColor: "#F7F8FA" }}
                  role="region"
                  aria-label={item.question}
                >
                  <p
                    className="text-sm text-gray-600 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-label="Call to action">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/27928760/pexels-photo-27928760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician installing a whole-home generator transfer switch"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(11,31,58,0.93)" }}
          />
        </div>
        <div className="relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="inline-block mb-4 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.18)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Ready to Get Started?
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Protect Your Home Before the{" "}
              <span style={{ color: "#F5A623" }}>Next Storm.</span>
            </h2>
            <p
              className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Schedule a free generator consultation with ENE Electrical today.
              Our licensed, insured team serves Katy, Houston, Cinco Ranch,
              Fulshear, and the entire Greater Houston metro. Don't wait until
              the next outage.
            </p>
            {/* Address — real HTML text per NAP rules */}
            <p
              className="text-sm text-blue-300 mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <MapPin
                size={14}
                className="inline-block mr-1 align-middle"
                aria-hidden="true"
              />
              <span>Katy, TX 77494, serving Greater Houston &amp; Surrounding Areas</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Calendar size={16} strokeWidth={2.5} aria-hidden="true" />
                Schedule Consultation
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border-2 text-white transition-all duration-200 hover:bg-white/10"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}