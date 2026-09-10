"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Star,
  PhoneCall,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Wrench,
  BatteryCharging,
  Lightbulb,
  AlertTriangle,
  ClipboardCheck,
  Home,
  Plug,
  FlaskConical,
  MapPin,
  Award,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import VanCta from "@/components/VanCta";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FAQItem[];
}

const services = [
  {
    title: "Electrical Repair & Installation",
    description:
      "Fast, reliable repair and installation services for all residential electrical systems in Southwest Houston homes.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "Panel Upgrades",
    description:
      "Upgrade your electrical panel to safely handle modern power demands, including whole-home surge protection, essential for many Southwest Houston homes.",
    icon: Zap,
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installation by licensed electricians. Charge your electric vehicle faster and safer.",
    icon: BatteryCharging,
    href: "/services/ev-charger-installation-houston",
  },
  {
    title: "Generator Installation",
    description:
      "Protect your family during outages with a professionally installed standby or portable generator system.",
    icon: Plug,
    href: "/services/generator-installation-houston",
  },
  {
    title: "Security Lighting",
    description:
      "Enhance your home's safety with motion-activated and strategic security lighting solutions.",
    icon: Lightbulb,
    href: "/services/security-lighting-houston",
  },
  {
    title: "Recessed Lighting",
    description:
      "Transform your interiors with clean, energy-efficient recessed LED lighting installed by our expert team.",
    icon: FlaskConical,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "New Construction Wiring",
    description:
      "Complete electrical wiring solutions for new builds and major renovations, including commercial electrical services, across Southwest Houston.",
    icon: Home,
    href: "/services/new-construction-wiring",
  },
  {
    title: "Ceiling Fan Installation",
    description:
      "Professional ceiling fan installation and replacement for Southwest Houston homes, improving comfort and energy efficiency.",
    icon: Wrench,
    href: "/services/ceiling-fan-installation-houston",
  },
  {
    title: "Emergency Electrician",
    description:
      "24/7 emergency electrical service: when you need help fast, ENE Electrical responds quickly.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician-houston",
  },
  {
    title: "Electrical Inspection",
    description:
      "Comprehensive electrical inspections to keep your Southwest Houston home safe and code-compliant.",
    icon: ClipboardCheck,
    href: "/services/electrical-inspection-houston",
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical did an amazing job upgrading our panel. The technician was professional, on time, and left everything spotless. Highly recommend to any Southwest Houston homeowner.",
    authorName: "Maria G.",
    authorLocation: "Southwest Houston, TX",
    rating: 5,
  },
  {
    quote:
      "We had an electrical emergency late at night and ENE Electrical showed up quickly. Knowledgeable team and very fairly priced. Will definitely use again.",
    authorName: "James T.",
    authorLocation: "Southwest Houston, TX",
    rating: 5,
  },
  {
    quote:
      "From the EV charger installation to recessed lighting, ENE Electrical handled everything perfectly. Their technicians are background-checked and it really shows, complete peace of mind.",
    authorName: "Sandra R.",
    authorLocation: "Southwest Houston, TX",
    rating: 5,
  },
];

const trustReasons = [
  {
    icon: ShieldCheck,
    title: "Licensed, Insured & Bonded",
    description:
      "ENE Electrical holds full licensing, insurance, and bonding in Texas, giving Southwest Houston homeowners complete peace of mind.",
  },
  {
    icon: Users,
    title: "Background-Checked Technicians",
    description:
      "Every technician on our team undergoes thorough background checks before entering your Southwest Houston home.",
  },
  {
    icon: Award,
    title: "15+ Years of Experience",
    description:
      "With more than 15 years serving the Houston metro, we understand the unique electrical needs of Southwest Houston residences.",
  },
  {
    icon: Clock,
    title: "Prompt, Reliable Service",
    description:
      "We respect your time. Our technicians arrive on schedule and complete the job efficiently with no hidden surprises.",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "5,000+", label: "Homes Served" },
  { value: "9", label: "Services Offered" },
  { value: "100%", label: "Licensed & Insured" },
];

const nearbyAreas = [
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
];


const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Service Areas", href: "/service-areas/houston-tx" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
];

export default function SouthwestHoustonClient({ faqData }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main style={{ backgroundColor: "#F7F8FA", fontFamily: "Inter, sans-serif" }}>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician serving Southwest Houston homeowners"
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          {/* Eyebrow */}
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Southwest Houston Electrician
          </span>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Licensed Electrician{" "}
            <span style={{ color: "#F5A623" }}>Serving Southwest Houston</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical brings 15+ years of licensed residential electrical expertise
            to Southwest Houston homeowners. Panel upgrades, EV chargers, emergency repairs,
            and more, done right the first time.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              <CalendarCheck size={18} strokeWidth={2.5} />
              Book an Appointment
            </Link>
            <a
              href="tel:+18327830303"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 hover:bg-white/10 active:scale-95 transition-all duration-200"
              style={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <PhoneCall size={18} strokeWidth={2.5} />
              (832) 783-0303
            </a>
          </div>

          {/* Trust badge bar */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle size={16} style={{ color: "#F5A623" }} />
                <span
                  className="text-sm font-medium text-white/90"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ── */}
      <Section background="white" spacing="md">
        <div
          className="rounded-2xl border-l-4 p-6 sm:p-8"
          style={{
            borderLeftColor: "#F5A623",
            backgroundColor: "#FFFBF2",
          }}
          role="note"
          aria-label="Quick Answer"
        >
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "#F5A623" }}
            >
              <Zap size={20} color="#0B1F3A" strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential electrical
                contractor serving homeowners in Southwest Houston, TX. The company offers
                electrical repair, panel upgrades, EV charger installation, generator
                installation, security lighting, and emergency electrical services throughout
                Southwest Houston. Based in{" "}
                <strong>Katy, TX 77494</strong>, ENE Electrical brings{" "}
                <strong>15+ years of experience</strong> and background-checked technicians
                to every Southwest Houston job.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── ENE ELECTRICAL IN SOUTHWEST HOUSTON ── */}
      <Section background="default" spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              About ENE Electrical
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              ENE Electrical in Southwest Houston
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <div className="space-y-4" style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}>
              <p className="text-base leading-relaxed">
                Southwest Houston is home to a diverse and growing residential community, and
                ENE Electrical is proud to serve its homeowners with reliable, licensed
                electrical services. From established neighborhoods to new developments, our
                team understands the electrical demands of properties across the region.
              </p>
              <p className="text-base leading-relaxed">
                With <strong>15+ years of experience</strong> serving the Houston and Katy
                metro areas, ENE Electrical brings a full credential suite (licensed, insured,
                bonded, and staffed by background-checked technicians) to every job site in
                Southwest Houston.
              </p>
              <p className="text-base leading-relaxed">
                Whether you need an urgent panel capacity upgrade, a new EV charger for your
                garage, or a full electrical inspection before purchasing a home, our team
                dispatches efficiently from our{" "}
                <strong>Katy, TX 77494</strong> base to meet you when you need us most.
              </p>
              <p className="text-base leading-relaxed">
                As a local electrician serving Southwest Houston, we provide complete electrical solutions designed to improve safety, increase electrical capacity, and ensure compliance with Texas electrical codes. From minor electrical repairs to full panel replacements, our goal is to protect your property while strengthening overall system performance.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/17286412/pexels-photo-17286412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Southwest Houston residential neighborhood served by ENE Electrical"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{
                background: "linear-gradient(to top, rgba(11,31,58,0.9) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-white font-semibold text-sm"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Proudly Serving Southwest Houston
              </p>
              <p className="text-blue-200 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Dispatching from Katy, TX 77494
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES OFFERED ── */}
      <Section background="white" spacing="lg" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services in Southwest Houston"
          subtitle="ENE Electrical provides a full range of residential electrical services to Southwest Houston homeowners, from routine repairs to complex installations."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group block">
              <Card
                variant="service"
                title={service.title}
                description={service.description}
                icon={service.icon}
                ctaLabel="Learn More"
              />
            </Link>
          ))}
        </div>

        {/* When Should You Upgrade Your Electrical Panel? */}
        <div
          className="mt-10 rounded-2xl p-6 md:p-8 border-l-4 max-w-4xl mx-auto"
          style={{ backgroundColor: "#F7F8FA", borderLeftColor: "#F5A623" }}
        >
          <h3
            className="text-lg font-bold mb-3"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            When Should You Upgrade Your Electrical Panel?
          </h3>
          <p
            className="text-sm text-gray-600 leading-relaxed mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            You should consider upgrading your electrical panel when your current system is outdated, overburdened, or no longer compliant with safety standards. Signs that it's time for an upgrade include frequent circuit breaker trips, flickering lights, the presence of a fuse box, or if your panel feels warm or emits a buzzing noise.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {[
              "Your home or business is over 25 years old",
              "You're dealing with frequent breaker trips or flickering lights",
              "You've added new appliances or equipment",
              "You plan to install an EV charger, a hot tub, or solar panels",
              "Your panel is hot to the touch or produces buzzing sounds",
              "You still use a fuse box or Federal Pacific/Eaton panel (known for safety issues)",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <CheckCircle
                  size={16}
                  style={{ color: "#F5A623", flexShrink: 0, marginTop: 2 }}
                  strokeWidth={2.5}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── HOW IT WORKS ── */}
      <Section background="primary" spacing="lg">
        <SectionHeading
          eyebrow="Our Process"
          title="How It Works: Our Easy 3-Step Process"
          align="center"
          inverted
        />
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Tell Us What You Need",
              description:
                "Reach out online or by phone to describe your situation, whether your breakers are tripping, you're adding new appliances, or you need an overall system upgrade.",
            },
            {
              title: "Receive Expert Advice & Clear Options",
              description:
                "Our experienced team evaluates your needs, walks you through the process, and provides a transparent quote with no hidden fees.",
            },
            {
              title: "Complete Your Project With Confidence",
              description:
                "We complete the upgrade with code-compliant installation, thorough testing, and a satisfaction follow-up. We're not done until you're 100% confident in your system.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl p-6 border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-bold"
                style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {i + 1}
              </div>
              <h3
                className="text-base font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHY CHOOSE ENE ELECTRICAL ── */}
      <Section background="default" spacing="lg" id="why-ene">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Southwest Houston Homeowners Choose ENE Electrical"
          subtitle="Trust, credentials, and local expertise set us apart. Here's what Southwest Houston residents can expect when they call ENE Electrical."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustReasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <Icon size={26} color="#F5A623" strokeWidth={2} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif", opacity: 0.75 }}
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── TRUST INDICATORS / STATS ── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        className="py-16 md:py-20"
        aria-label="Trust indicators and statistics"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              By The Numbers
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Trusted Across Greater Houston
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <p
                  className="text-4xl sm:text-5xl font-bold mb-2"
                  style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-sm text-blue-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Credential badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map((cred) => (
              <div
                key={cred}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border"
                style={{
                  borderColor: "rgba(245,166,35,0.4)",
                  backgroundColor: "rgba(245,166,35,0.08)",
                }}
              >
                <ShieldCheck size={16} style={{ color: "#F5A623" }} />
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {cred}
                </span>
              </div>
            ))}
          </div>

          {/* When to Call an Electrician in Southwest Houston */}
          <div className="max-w-4xl mx-auto mt-12">
            <p
              className="text-base leading-relaxed mb-5 text-center text-blue-100"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              You may need an electrician in 77074, 77031, or 77083 if you:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                "Experience frequent breaker trips",
                "Notice flickering lights",
                "Have outdated wiring",
                "Are remodeling or upgrading appliances",
                "Need EV charger installation",
                "Own a rental property requiring electrical repairs",
                "Have storm-related electrical damage",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-blue-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle
                    size={16}
                    style={{ color: "#F5A623", flexShrink: 0, marginTop: 2 }}
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Section background="white" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Southwest Houston Homeowners Are Saying"
          subtitle="Don't just take our word for it. Hear from real customers in Southwest Houston and the surrounding area."
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

      {/* ── LOCAL RELEVANCE / SERVING SOUTHWEST HOUSTON ── */}
      <Section background="default" spacing="md" id="serving-southwest-houston">
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: "#0B1F3A" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} style={{ color: "#F5A623" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                >
                  Serving Southwest Houston
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Your Local Southwest Houston Electricians
              </h2>
              <div className="space-y-3 text-blue-100 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                <p>
                  Southwest Houston is a diverse, densely populated residential region within
                  ENE Electrical's verified service area. Homeowners in this part of Houston
                  often need panel capacity upgrades, security lighting, and EV charger
                  installations as the area continues to grow.
                </p>
                <p>
                  ENE Electrical dispatches licensed, background-checked technicians from its{" "}
                  <strong className="text-white">Katy, TX 77494</strong> base to serve Southwest
                  Houston residents promptly and professionally.
                </p>
                <p>
                  After completing your electrical service, we provide a summary of work performed and recommendations for future improvements. Many properties in Southwest Houston benefit from electrical capacity upgrades, especially older homes and commercial buildings. Our focus is long-term safety, performance, and compliance with Houston electrical codes.
                </p>
              </div>
            </div>
            <div className="relative min-h-[240px] lg:min-h-0">
              <img
                src="https://images.pexels.com/photos/8278494/pexels-photo-8278494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Southwest Houston residential area served by ENE Electrical"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── NEARBY SERVICE AREAS ── */}
      <Section background="white" spacing="md" id="nearby-areas">
        <SectionHeading
          eyebrow="Also Serving"
          title="Nearby Service Areas"
          subtitle="ENE Electrical serves communities throughout the Houston and Katy metro. Find your area below."
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {nearbyAreas.map((area) => (
            <Link
              key={area.label}
              href={area.href}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-md hover:scale-105"
              style={{
                borderColor: "#0B1F3A",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: "#F7F8FA",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1F3A";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#F7F8FA";
                (e.currentTarget as HTMLElement).style.color = "#0B1F3A";
              }}
            >
              <MapPin size={15} />
              {area.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="default" spacing="lg" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Common questions from Southwest Houston homeowners about ENE Electrical's services."
          align="center"
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span
                  className="text-base font-semibold pr-4"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: openFaq === index ? "#F5A623" : "#F7F8FA",
                    color: openFaq === index ? "#0B1F3A" : "#6B7280",
                  }}
                  aria-hidden="true"
                >
                  {openFaq === index ? (
                    <ChevronUp size={18} strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={18} strokeWidth={2.5} />
                  )}
                </span>
              </button>
              {openFaq === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-5"
                  role="region"
                  aria-label={item.question}
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#1A2530", fontFamily: "Inter, sans-serif", opacity: 0.8 }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA SECTION ── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        className="py-16 md:py-24"
        id="contact"
        aria-label="Book an appointment"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Get Started Today
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Book Your Southwest Houston Electrical Service
              </h2>
              <p
                className="text-blue-100 text-base leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Ready to schedule service? Fill out the form and one of our licensed
                Southwest Houston electricians will reach out promptly. Emergency services
                available around the clock.
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-8">
                {[
                  "Licensed, Insured & Bonded",
                  "Background-Checked Technicians",
                  "15+ Years of Experience",
                  "Serving Southwest Houston from Katy, TX 77494",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} style={{ color: "#F5A623", flexShrink: 0 }} />
                    <span
                      className="text-sm text-blue-100"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Direct call CTA */}
              <a
                href="tel:+18327830303"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                }}
              >
                <PhoneCall size={18} strokeWidth={2.5} />
                Call (832) 783-0303
              </a>
            </div>

            {/* Right column — Contact Form */}
            <div>
              <ContactForm
                heading="Request Service in Southwest Houston"
                subheading="Fill out the form below and a licensed ENE Electrical technician will contact you soon."
                ctaLabel="Request Appointment"
              />
            </div>
          </div>
        </div>
      </section>

      <VanCta
        heading={
          <>
            Ready to Schedule Your Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Southwest Houston?</span>
          </>
        }
        description="From Sharpstown to Meyerland and the surrounding Southwest Houston neighborhoods, ENE Electrical delivers dependable panel upgrades, rewiring, and repair work homeowners can count on. Our licensed technicians dispatch quickly to keep your home's electrical system safe and up to code."
      />
    </main>
  );
}