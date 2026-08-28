"use client";

import React, { useState } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import {
  Zap,
  ShieldCheck,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Wrench,
  Lightbulb,
  BatteryCharging,
  AlertTriangle,
  ClipboardCheck,
  Home,
  Award,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";

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
      "Fast, reliable repairs and new electrical installations for Cinco Ranch homes — outlets, switches, fixtures, and more.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "Electrical Panel Upgrade",
    description:
      "Upgrade your home's electrical panel to safely handle modern power demands in Cinco Ranch's newer master-planned homes.",
    icon: Zap,
    href: "/services/electrical-panel-upgrade",
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installation for Cinco Ranch residents — future-proof your garage for electric vehicles.",
    icon: BatteryCharging,
    href: "/services/ev-charger-installation",
  },
  {
    title: "Generator Installation",
    description:
      "Whole-home and standby generator installation to keep your Cinco Ranch home powered during outages.",
    icon: AlertTriangle,
    href: "/services/generator-installation",
  },
  {
    title: "Security Lighting",
    description:
      "Enhance your home's safety and curb appeal with professionally installed security and landscape lighting.",
    icon: ShieldCheck,
    href: "/services/security-lighting",
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Modern recessed LED lighting design and installation to brighten every room in your Cinco Ranch home.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "New Construction Wiring",
    description:
      "Complete electrical wiring for new construction homes throughout the Cinco Ranch and Katy area.",
    icon: Home,
    href: "/services/new-construction-wiring",
  },
  {
    title: "Electrical Inspection",
    description:
      "Certified electrical inspections for home buyers, sellers, and homeowners in Cinco Ranch, TX.",
    icon: ClipboardCheck,
    href: "/services/electrical-inspection",
  },
  {
    title: "Emergency Electrician",
    description:
      "24/7 emergency electrical service dispatched from nearby Katy, TX — fast response for Cinco Ranch emergencies.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician",
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical installed a Level 2 EV charger in our Cinco Ranch garage. The technician was on time, professional, and explained everything clearly. Highly recommend!",
    authorName: "Marcus T.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "We had an electrical panel upgrade done by ENE Electrical. The crew was background-checked, clean, and efficient. Our home feels safer now. Great local company.",
    authorName: "Priya S.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "Fast response for an emergency electrical issue in the middle of the week. ENE Electrical was out from Katy within the hour. Trustworthy team and fair pricing.",
    authorName: "Derek L.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
];

const nearbyAreas = [
  { label: "Katy, TX", href: "/service-areas/katy-tx" },
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Energy Corridor", href: "/service-areas/energy-corridor-houston" },
  { label: "Memorial Houston", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-sm sm:text-base leading-snug"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {item.question}
              </span>
              <span className="flex-shrink-0" style={{ color: "#F5A623" }}>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {isOpen && (
              <div
                className="px-6 pb-5 text-sm leading-relaxed text-gray-600 border-t border-gray-100"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <p className="pt-4">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CincoRanchClient({ faqData }: Props) {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/17286412/pexels-photo-17286412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Aerial view of Cinco Ranch master-planned community in Katy, Texas"
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center gap-8">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <MapPin size={14} />
            Serving Cinco Ranch, TX
          </span>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Licensed Electrician{" "}
            <span style={{ color: "#F5A623" }}>Serving Cinco Ranch, TX</span>
          </h1>

          <p
            className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical — based nearby in Katy, TX 77494 — brings 15+ years
            of licensed, insured residential electrical expertise to Cinco Ranch
            homeowners. From EV chargers to panel upgrades, we've got you covered.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {["Licensed", "Insured", "Bonded", "Background-Checked"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <CheckCircle size={14} style={{ color: "#F5A623" }} />
                {badge}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              <Zap size={16} />
              Book Appointment
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ── */}
      <section
        aria-labelledby="quick-answer-heading"
        className="w-full"
        style={{ backgroundColor: "#F5A623" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#0B1F3A" }}
              aria-hidden="true"
            >
              <CheckCircle size={20} color="#F5A623" />
            </div>
            <div>
              <h2
                id="quick-answer-heading"
                className="text-base sm:text-lg font-bold mb-2"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Answer: Does ENE Electrical Serve Cinco Ranch, TX?
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential
                electrical contractor serving Cinco Ranch, TX. Based nearby in
                Katy, TX 77494, ENE Electrical provides Cinco Ranch homeowners
                with electrical repair, panel upgrades, EV charger installation,
                generator installation, security lighting, recessed LED lighting,
                emergency electrical service, and electrical inspections. With 15+
                years of experience and background-checked technicians, ENE
                Electrical is a trusted choice for Cinco Ranch residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENE ELECTRICAL IN CINCO RANCH ── */}
      <Section background="white" spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Your Local Electrician
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              ENE Electrical in Cinco Ranch, TX
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <div
              className="flex flex-col gap-4 text-base leading-relaxed"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              <p>
                Cinco Ranch is one of the most sought-after master-planned
                communities in the greater Katy area — and ENE Electrical is
                proud to be the local residential electrical contractor Cinco
                Ranch homeowners call first.
              </p>
              <p>
                Our base in{" "}
                <strong>Katy, TX 77494</strong> puts us just minutes from Cinco
                Ranch, meaning faster dispatch times and a team that genuinely
                knows the area. With{" "}
                <strong>15+ years of experience</strong> serving Houston and Katy
                metro homeowners, we understand the electrical demands of
                Cinco Ranch's modern homes.
              </p>
              <p>
                Whether you're ready to install an EV charger in your garage,
                upgrade an aging electrical panel to support a home addition, or
                need a same-day emergency electrician, ENE Electrical dispatches
                licensed, background-checked technicians to your door.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Zap size={15} />
                Schedule Service
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-slate-50 active:scale-95"
                style={{
                  borderColor: "#0B1F3A",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                About ENE Electrical
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[320px]">
            <img
              src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Licensed ENE Electrical technician working on a residential electrical panel"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.92) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Based in Katy, TX 77494 — Serving Cinco Ranch & Beyond
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES AVAILABLE IN CINCO RANCH ── */}
      <Section background="default" spacing="lg" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services Available in Cinco Ranch, TX"
          subtitle="ENE Electrical provides a full range of licensed residential electrical services to Cinco Ranch homeowners."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.75rem]"
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

      {/* ── WHY CINCO RANCH RESIDENTS CHOOSE ENE ELECTRICAL ── */}
      <Section background="primary" spacing="lg">
        <SectionHeading
          eyebrow="Why Choose ENE"
          title="Why Cinco Ranch Residents Choose ENE Electrical"
          subtitle="Cinco Ranch homeowners trust ENE Electrical for licensed, professional service that understands the needs of a modern master-planned community."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Licensed, Insured & Bonded",
              body: "ENE Electrical holds all required Texas electrical licenses and carries full insurance and bonding — protecting you and your home on every job.",
            },
            {
              icon: Users,
              title: "Background-Checked Technicians",
              body: "Every technician sent to your Cinco Ranch home has passed a thorough background check. You can feel confident about who you let through your door.",
            },
            {
              icon: Home,
              title: "Master-Planned Community Expertise",
              body: "Cinco Ranch homes have modern electrical needs. ENE Electrical is experienced with the wiring configurations and HOA requirements common in master-planned communities.",
            },
            {
              icon: BatteryCharging,
              title: "EV Charger & Panel Specialists",
              body: "As EV adoption grows in Cinco Ranch, ENE Electrical is the go-to installer for Level 2 home chargers and the panel upgrades often needed to support them.",
            },
            {
              icon: Award,
              title: "15+ Years of Experience",
              body: "More than 15 years serving Houston and Katy area homeowners gives ENE Electrical the expertise to handle any residential electrical challenge.",
            },
            {
              icon: Clock,
              title: "Fast Local Response",
              body: "Based in nearby Katy, TX 77494, ENE Electrical can reach Cinco Ranch homes quickly — especially important for emergency electrical situations.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 p-6 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <item.icon size={22} color="#0B1F3A" strokeWidth={2} />
              </div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── LOCAL RELEVANCE / SERVING CINCO RANCH ── */}
      <Section background="white" spacing="md">
        <div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start"
          style={{ backgroundColor: "#F7F8FA", border: "1px solid #e5e7eb" }}
        >
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          >
            <MapPin size={26} color="#0B1F3A" />
          </div>
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Serving Cinco Ranch, Katy & the Houston Metro
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-4"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              Cinco Ranch is a master-planned community within the Katy, TX area
              and is part of ENE Electrical's verified service territory. The
              community's modern homes and growing adoption of electric vehicles
              make EV charger installation and electrical panel upgrades
              particularly in-demand services. ENE Electrical is based in{" "}
              <strong>Katy, TX 77494</strong>, allowing for prompt service
              throughout Cinco Ranch's neighborhoods.
            </p>
            <address
              className="not-italic text-sm"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              <strong>ENE Electrical</strong>
              <br />
              Based in: Katy, TX 77494
              <br />
              Service Area: Houston and Katy, TX metro including Cinco Ranch,
              Fulshear, Katy, Energy Corridor, Southwest Houston, Memorial,
              Spring Branch, Westchase, Brookshire, and Richmond, TX
            </address>
          </div>
        </div>
      </Section>

      {/* ── TRUST INDICATORS ── */}
      <Section background="default" spacing="md">
        <SectionHeading
          eyebrow="Our Credentials"
          title="Trusted by Cinco Ranch Homeowners"
          align="center"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: "15+", label: "Years of Experience", icon: Award },
            { stat: "Licensed", label: "Texas Electrical Contractor", icon: ShieldCheck },
            { stat: "Insured", label: "& Fully Bonded", icon: CheckCircle },
            { stat: "100%", label: "Background-Checked Technicians", icon: Users },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-white shadow-md border border-gray-100"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <item.icon size={22} color="#0B1F3A" strokeWidth={2} />
              </div>
              <span
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {item.stat}
              </span>
              <span
                className="text-xs sm:text-sm text-gray-500 leading-snug"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Cinco Ranch Homeowners Say"
          subtitle="Real feedback from real customers in Cinco Ranch and the surrounding Katy area."
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
        <div className="mt-10 flex justify-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-slate-50"
            style={{
              borderColor: "#0B1F3A",
              color: "#0B1F3A",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Read More Reviews
            <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* ── NEARBY SERVICE AREAS ── */}
      <Section background="default" spacing="md">
        <SectionHeading
          eyebrow="Coverage Area"
          title="Nearby Service Areas"
          subtitle="ENE Electrical serves Cinco Ranch and the surrounding communities throughout the Houston and Katy metro."
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {nearbyAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm text-sm font-semibold transition-all duration-200 hover:shadow-md hover:border-amber-400 hover:text-amber-600"
              style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
            >
              <MapPin size={15} style={{ color: "#F5A623" }} />
              {area.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="white" spacing="lg" id="faq">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Cinco Ranch Electrical FAQ"
          subtitle="Common questions from Cinco Ranch homeowners about ENE Electrical's services and credentials."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqData} />
        </div>
      </Section>

      {/* ── CTA SECTION ── */}
      <Section background="primary" spacing="lg" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: pitch */}
          <div className="flex flex-col gap-6">
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book an Electrician for Your Cinco Ranch Home
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif" }}
            >
              Ready to schedule service or get a free quote? Fill out the form
              and a member of the ENE Electrical team will get back to you
              promptly. We serve Cinco Ranch and all surrounding Katy and Houston
              metro communities.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Licensed, insured & bonded contractor",
                "Background-checked technicians",
                "Based nearby in Katy, TX 77494",
                "EV charger & panel upgrade specialists",
                "Emergency electrical service available",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle
                    size={18}
                    className="flex-shrink-0"
                    style={{ color: "#F5A623" }}
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                }}
              >
                <Zap size={16} />
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <ContactForm
              heading="Request a Free Quote"
              subheading="Serving Cinco Ranch, TX — we'll respond within 24 hours."
              ctaLabel="Send My Request"
            />
          </div>
        </div>
      </Section>
    </>
  );
}