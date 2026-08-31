"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  ClipboardList,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  Award,
  Clock,
  Home,
  FileText,
  Search,
  PhoneCall,
  Calendar,
  ArrowRight,
  Activity,
  Cpu,
  Plug,
  Flame,
  Wifi,
  BarChart3,
  BatteryCharging,
  Layers,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";

// ─── Breadcrumb items ───────────────────────────────────────────────────────
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Electrical Inspection", href: "/services/electrical-inspection-houston" },
];

// ─── Trust badge data ────────────────────────────────────────────────────────
const trustBadges = [
  { label: "Licensed", icon: Award },
  { label: "Insured", icon: ShieldCheck },
  { label: "Bonded", icon: Layers },
  { label: "Background-Checked", icon: CheckCircle },
  { label: "15+ Years Experience", icon: Clock },
];

// ─── What we inspect cards ───────────────────────────────────────────────────
const inspectItems = [
  {
    icon: Cpu,
    title: "Electrical Panels",
    description:
      "We examine your main panel and sub-panels for overloading, corrosion, double-tapping, and outdated breaker types that pose fire hazards.",
  },
  {
    icon: Activity,
    title: "Wiring & Connections",
    description:
      "We identify aluminum wiring, knob-and-tube wiring, deteriorated insulation, and improper connections throughout the home.",
  },
  {
    icon: Plug,
    title: "Outlets & Switches",
    description:
      "All outlets and switches are tested for proper grounding, polarity, and function, including two-prong ungrounded outlets.",
  },
  {
    icon: ShieldCheck,
    title: "GFCI & AFCI Protection",
    description:
      "We verify ground-fault and arc-fault circuit interrupters are present and functioning in kitchens, bathrooms, garages, and bedrooms.",
  },
  {
    icon: BatteryCharging,
    title: "Grounding Systems",
    description:
      "Proper grounding is essential for surge protection and personal safety. We inspect grounding electrodes and bonding throughout the system.",
  },
  {
    icon: Flame,
    title: "Smoke Detectors",
    description:
      "We assess smoke and carbon monoxide detector placement, wiring, and functionality against current life-safety codes.",
  },
  {
    icon: BarChart3,
    title: "Load Capacity",
    description:
      "We evaluate whether your electrical system can safely support your home's current and future energy demands without overloading circuits.",
  },
  {
    icon: ClipboardList,
    title: "Code Compliance",
    description:
      "We compare your entire electrical system against the National Electrical Code (NEC) and Texas-specific requirements to identify deficiencies.",
  },
];

// ─── Process steps ───────────────────────────────────────────────────────────
const processSteps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Book Your Inspection",
    description:
      "Schedule online or call us. We'll confirm your appointment time and answer any initial questions about what to expect.",
  },
  {
    number: "02",
    icon: Home,
    title: "On-Site Arrival",
    description:
      "Our licensed, background-checked technician arrives on time, introduces themselves, and walks through the inspection plan with you.",
  },
  {
    number: "03",
    icon: Search,
    title: "Thorough Evaluation",
    description:
      "We systematically inspect your panel, wiring, outlets, GFCI/AFCI devices, grounding, smoke detectors, and overall code compliance.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Written Report Delivered",
    description:
      "You receive a clear, detailed written report documenting findings, safety concerns, code deficiencies, and recommended next steps.",
  },
];

// ─── When-you-need scenarios ─────────────────────────────────────────────────
const scenarios = [
  {
    icon: Home,
    title: "Buying or Selling a Home",
    description:
      "Protect your investment and negotiate confidently. An inspection reveals hidden electrical issues before closing.",
  },
  {
    icon: Zap,
    title: "Frequent Tripped Breakers",
    description:
      "Breakers that trip repeatedly signal overloaded circuits or failing components. A licensed inspection identifies the root cause.",
  },
  {
    icon: Wifi,
    title: "Flickering or Dimming Lights",
    description:
      "Inconsistent lighting can indicate loose connections, overloaded circuits, or failing wiring that poses a fire risk.",
  },
  {
    icon: AlertTriangle,
    title: "After a Storm or Flooding",
    description:
      "Water and lightning can compromise wiring integrity. An inspection confirms your system is safe to continue using.",
  },
  {
    icon: Calendar,
    title: "Older Home (20+ Years)",
    description:
      "Aging wiring, panels, and devices may not meet modern safety codes. An inspection provides a current-state assessment.",
  },
  {
    icon: ClipboardList,
    title: "Planning a Renovation",
    description:
      "Know your system's capacity and code compliance before adding new circuits, appliances, or square footage.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "ENE Electrical gave us tremendous peace of mind before we purchased our home in Katy. The technician was thorough, professional, and explained every finding clearly. Worth every penny.",
    authorName: "Marcus T.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "We had flickering lights for months and finally called ENE Electrical. Their inspection uncovered a loose main connection that was a serious fire hazard. They fixed it the same day. Exceptional service.",
    authorName: "Sandra M.",
    authorLocation: "Energy Corridor, Houston",
    rating: 5,
  },
  {
    quote:
      "Very impressed with ENE Electrical's inspection process. They were on time, respectful of our home, and the written report was clear and detailed. I'd recommend them to anyone in the Houston area.",
    authorName: "David R.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "Selling our home required an electrical inspection and ENE Electrical delivered a comprehensive report quickly. The buyer's agent was satisfied and the deal closed without issues.",
    authorName: "Priya L.",
    authorLocation: "Memorial, Houston",
    rating: 5,
  },
];

// ─── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How long does a residential electrical inspection take?",
    answer:
      "The duration depends on the size and age of the home, but most standard residential electrical inspections are completed within one to three hours. ENE Electrical's licensed technicians are thorough and efficient.",
  },
  {
    question: "Do I need a licensed electrician to perform a home electrical inspection?",
    answer:
      "Yes. In Texas, electrical inspections should be performed by a licensed electrician to ensure the assessment is accurate, code-referenced, and legally credible, especially for real estate transactions or insurance purposes. ENE Electrical is licensed, insured, and bonded.",
  },
  {
    question: "What does an ENE Electrical inspection cover?",
    answer:
      "ENE Electrical inspects your electrical panel, wiring, outlets, GFCI and AFCI protection, grounding, load capacity, and overall code compliance to give you a clear picture of your home's electrical safety.",
  },
  {
    question: "When should I schedule an electrical inspection?",
    answer:
      "Common reasons include buying or selling a home, planning a renovation, experiencing frequent tripped breakers or flickering lights, living in an older home, or following a major storm or flooding event.",
  },
  {
    question: "Is ENE Electrical licensed and insured to perform inspections in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded, and employs background-checked technicians throughout the Houston and Katy, TX metro area.",
  },
];

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 2000, startOnMount: boolean = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);

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

  return { count, start: () => setStarted(true) };
}

// ─── Stats section with intersection observer ────────────────────────────────
function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  const years = useCountUp(15, 1800);
  const inspections = useCountUp(500, 2000);
  const cities = useCountUp(11, 1500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          years.start();
          inspections.start();
          cities.start();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  const stats = [
    { value: years.count, suffix: "+", label: "Years of Experience" },
    { value: inspections.count, suffix: "+", label: "Inspections Completed" },
    { value: cities.count, suffix: "", label: "Cities Served" },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-2">
          <span
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
          >
            {stat.value}
            {stat.suffix}
          </span>
          <span
            className="text-base font-medium text-white/80"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Testimonial carousel ────────────────────────────────────────────────────
function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 px-2">
              <Card
                variant="testimonial"
                quote={t.quote}
                authorName={t.authorName}
                authorLocation={t.authorLocation}
                rating={t.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === active ? "#F5A623" : "#CBD8E6",
              transform: i === active ? "scale(1.25)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Desktop: show 2 at a time */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 mt-0">
        {/* Overridden by the mobile carousel above on small screens */}
      </div>
    </div>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────
function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden transition-all duration-200"
            style={{
              borderColor: isOpen ? "#F5A623" : "#E2E8F0",
              backgroundColor: "#FFFFFF",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-sm sm:text-base"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#0B1F3A",
                }}
              >
                {faq.question}
              </span>
              <span
                className="flex-shrink-0 transition-transform duration-200"
                style={{ color: "#F5A623" }}
              >
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {isOpen && (
              <div
                className="px-5 pb-5 text-sm leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#1A2530",
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main client component ───────────────────────────────────────────────────
export default function ElectricalInspectionClient() {
  return (
    <main>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician inspecting a home electrical panel"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.15)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
              }}
            >
              ENE Electrical: Houston &amp; Katy, TX
            </span>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Electrical Inspections{" "}
              <span style={{ color: "#F5A623" }}>You Can Trust</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Protect your family and your home with a thorough, licensed residential
              electrical inspection. ENE Electrical identifies hidden hazards, verifies
              code compliance, and delivers a clear written report, giving you
              complete peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Zap size={18} strokeWidth={2.5} />
                Book an Inspection
              </Link>
              <Link
                href="#what-we-inspect"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                What We Inspect
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust badge bar */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#FFFFFF",
                    fontFamily: "Inter, sans-serif",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Icon size={14} style={{ color: "#F5A623" }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ────────────────────────────────────────────── */}
      <section
        aria-label="Quick Answer"
        style={{ backgroundColor: "#F5A623" }}
        className="py-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
            <div
              className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: "#0B1F3A" }}
            >
              <Zap size={22} style={{ color: "#F5A623" }} strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(11,31,58,0.7)",
                }}
              >
                Quick Answer: What Is a Residential Electrical Inspection?
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed font-medium"
                style={{ fontFamily: "Inter, sans-serif", color: "#0B1F3A" }}
              >
                A residential electrical inspection is a thorough safety and code-compliance
                evaluation of a home's wiring, panel, outlets, and electrical systems. ENE
                Electrical provides licensed electrical inspections for homeowners in the
                Houston and Katy, TX metro area. Inspections help identify hidden hazards,
                support home sales, and ensure your electrical system meets current standards.
                With 15+ years of experience, ENE Electrical's background-checked technicians
                deliver detailed, reliable assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INSPECTIONS MATTER ────────────────────────────────────────── */}
      <Section background="white" spacing="lg" id="why-inspections">
        <SectionHeading
          eyebrow="Safety First"
          title="Why Electrical Inspections Matter"
          subtitle="Outdated or faulty wiring is one of the leading causes of residential fires. An inspection is your first line of defense."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Flame,
              title: "Fire & Safety Risks",
              body: "Deteriorated insulation, overloaded circuits, and faulty connections cause thousands of house fires each year. An inspection identifies these hazards before they become emergencies.",
            },
            {
              icon: ClipboardList,
              title: "Code Compliance",
              body: "Electrical codes are updated regularly. Older homes may have systems that were legal when installed but no longer meet current National Electrical Code (NEC) or Texas-specific requirements.",
            },
            {
              icon: ShieldCheck,
              title: "Insurance Requirements",
              body: "Some insurers require an electrical inspection for older homes or following a claim. A licensed inspection report can help you meet policy requirements and potentially lower premiums.",
            },
            {
              icon: Home,
              title: "Home Sales & Purchases",
              body: "Buyers and real estate agents increasingly request electrical inspections. Sellers benefit from knowing their system's status before listing; buyers gain confidence before closing.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-5 p-6 rounded-xl border"
              style={{
                borderColor: "#E2E8F0",
                backgroundColor: "#F7F8FA",
              }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#0B1F3A" }}
              >
                <item.icon size={22} style={{ color: "#F5A623" }} strokeWidth={2} />
              </div>
              <div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#0B1F3A",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHAT WE INSPECT ───────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="what-we-inspect">
        <SectionHeading
          eyebrow="Comprehensive Coverage"
          title="What We Inspect"
          subtitle="ENE Electrical's licensed technicians evaluate every critical component of your home's electrical system."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspectItems.map((item) => (
            <Card
              key={item.title}
              variant="service"
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      {/* ── INSPECTION PROCESS STEPS ──────────────────────────────────────── */}
      <Section background="primary" spacing="lg" id="inspection-process">
        <SectionHeading
          eyebrow="How It Works"
          title="Our Inspection Process"
          subtitle="From scheduling to your final written report, here's what to expect when you work with ENE Electrical."
          align="center"
          inverted
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Connector line (desktop) */}
              {i < processSteps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-12 left-full w-full h-px z-0"
                  style={{
                    backgroundColor: "rgba(245,166,35,0.3)",
                    width: "calc(100% - 3rem)",
                    left: "calc(50% + 2rem)",
                  }}
                />
              )}

              {/* Step number */}
              <span
                className="text-xs font-bold tracking-widest mb-3"
                style={{ fontFamily: "Inter, sans-serif", color: "#F5A623" }}
              >
                STEP {step.number}
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F5A623" }}
              >
                <step.icon size={24} style={{ color: "#0B1F3A" }} strokeWidth={2} />
              </div>

              <h3
                className="font-bold text-base mb-2 text-white"
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
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/appointment-booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
            style={{
              backgroundColor: "#F5A623",
              color: "#0B1F3A",
              fontFamily: "Montserrat, sans-serif",
              boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
            }}
          >
            <Calendar size={18} strokeWidth={2.5} />
            Schedule My Inspection
          </Link>
        </div>
      </Section>

      {/* ── WHEN YOU NEED AN INSPECTION ───────────────────────────────────── */}
      <Section background="white" spacing="lg" id="when-you-need">
        <SectionHeading
          eyebrow="Common Scenarios"
          title="When You Need an Electrical Inspection"
          subtitle="Electrical inspections aren't just for older homes. Many everyday situations call for a professional assessment."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 p-6 rounded-xl border hover:shadow-md transition-shadow duration-200"
              style={{
                borderColor: "#E2E8F0",
                backgroundColor: "#F7F8FA",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
              >
                <s.icon size={20} style={{ color: "#0B1F3A" }} strokeWidth={2} />
              </div>
              <h3
                className="font-bold text-base"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TRUST INDICATORS ─────────────────────────────────────────────── */}
      <Section background="primary" spacing="lg" id="trust-indicators">
        <SectionHeading
          eyebrow="Why ENE Electrical"
          title="Trusted by Houston Homeowners"
          align="center"
          inverted
        />

        <AnimatedStats />

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {trustBadges.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
              style={{
                backgroundColor: "rgba(245,166,35,0.12)",
                border: "1px solid rgba(245,166,35,0.3)",
              }}
            >
              <Icon size={18} style={{ color: "#F5A623" }} />
              <span
                className="text-sm font-semibold text-white"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-6 text-sm"
          style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)" }}
        >
          Serving Houston, Katy, Cinco Ranch, Fulshear, Energy Corridor, Memorial,
          Spring Branch, Westchase, Brookshire, Richmond, TX and surrounding areas.
        </p>
      </Section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Section background="default" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Our Customers Say"
          subtitle="Homeowners across the Houston metro trust ENE Electrical for thorough, professional electrical inspections."
          align="center"
        />

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <TestimonialCarousel />
        </div>

        {/* Desktop: 2-up grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
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
      </Section>

      {/* ── FAQ ACCORDION ────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" id="faq">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Common Questions"
            title="Electrical Inspection FAQs"
            subtitle="Have questions about our inspection service? We've got answers."
            align="center"
          />
          <FaqAccordion />
        </div>
      </Section>

      {/* ── SERVICE AREA CALLOUT ─────────────────────────────────────────── */}
      <Section background="default" spacing="md" id="service-area">
        <div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center"
          style={{
            backgroundColor: "#0B1F3A",
          }}
        >
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl" style={{ backgroundColor: "#F5A623" }}>
            <MapPin size={26} style={{ color: "#0B1F3A" }} strokeWidth={2} />
          </div>

          <div className="flex-1">
            <h2
              className="text-xl sm:text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Serving Houston &amp; Katy, TX Metro
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-4"
              style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.75)" }}
            >
              ENE Electrical serves homeowners across Houston and Katy, TX, including Cinco
              Ranch, Fulshear, Energy Corridor, Memorial, Spring Branch, Westchase,
              Brookshire, and Richmond, TX. Older homes throughout these Houston-area suburbs
              often benefit from professional electrical inspections to identify code
              deficiencies and aging wiring before problems arise.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
                { label: "Houston, TX", href: "/service-areas/houston-tx" },
                { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
                { label: "Fulshear", href: "/service-areas/fulshear-tx" },
                { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
                { label: "Memorial", href: "/service-areas/memorial-houston" },
                { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
                { label: "Westchase", href: "/service-areas/westchase-houston" },
                { label: "Brookshire", href: "/service-areas/brookshire-tx" },
                { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
              ].map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: "rgba(245,166,35,0.15)",
                    color: "#F5A623",
                    border: "1px solid rgba(245,166,35,0.3)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
      <Section background="white" spacing="xl" id="book-inspection">
        <SectionHeading
          eyebrow="Ready to Get Started?"
          title="Book Your Electrical Inspection Today"
          subtitle="Don't wait for a problem to become a crisis. Schedule your licensed electrical inspection with ENE Electrical and get the peace of mind you deserve."
          align="center"
        />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Contact form */}
          <div className="w-full lg:max-w-xl">
            <ContactForm
              heading="Request an Inspection"
              subheading="Fill out the form and our licensed technicians will contact you to confirm your appointment within 24 hours."
              ctaLabel="Book My Inspection"
            />
          </div>

          {/* Value props aside */}
          <div className="w-full lg:max-w-sm flex flex-col gap-6">
            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "#F7F8FA", border: "1px solid #E2E8F0" }}
            >
              <h3
                className="font-bold text-lg mb-4"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                Why Choose ENE Electrical?
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "Licensed, insured & bonded in Texas",
                  "Background-checked technicians",
                  "15+ years of experience",
                  "Detailed written inspection report",
                  "Serving Houston & Katy, TX metro",
                  "Honest, transparent findings",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
                  >
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#F5A623" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Address block — only verified facts */}
            <div
              className="p-5 rounded-2xl flex gap-4 items-start"
              style={{
                backgroundColor: "#0B1F3A",
                borderRadius: "0.75rem",
              }}
            >
              <MapPin size={20} style={{ color: "#F5A623" }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p
                  className="font-bold text-white text-sm mb-0.5"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  ENE Electrical
                </p>
                <address
                  className="not-italic text-sm"
                  style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.75)" }}
                >
                  Katy, TX 77494
                </address>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
                >
                  Serving Houston &amp; Katy, TX Metro Area
                </p>
              </div>
            </div>

            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
              }}
            >
              <Calendar size={18} strokeWidth={2.5} />
              Book Appointment Online
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}