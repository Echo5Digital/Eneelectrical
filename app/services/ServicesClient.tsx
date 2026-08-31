"use client";

import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Wrench,
  Zap,
  Car,
  Power,
  ShieldCheck,
  Lightbulb,
  HardHat,
  Cable,
  AlertTriangle,
  ClipboardCheck,
  BadgeCheck,
  MapPin,
  ArrowRight,
  CheckCircle,
  Fan,
} from "lucide-react";

const services = [
  {
    title: "Electrical Repair & Installation",
    description:
      "Fast, reliable repairs and new installations for outlets, switches, fixtures, and wiring throughout your home.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "Panel Upgrade",
    description:
      "Upgrade your electrical panel to safely support modern appliances, EVs, and increased power demands.",
    icon: Zap,
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installation by certified electricians for faster charging, safely installed.",
    icon: Car,
    href: "/services/ev-charger-installation-houston",
  },
  {
    title: "Generator Installation",
    description:
      "Whole-home standby and portable generator installation to keep your family safe during power outages.",
    icon: Power,
    href: "/services/generator-installation-houston",
  },
  {
    title: "Security Lighting",
    description:
      "Professionally installed exterior security lighting to deter intruders and illuminate your property.",
    icon: ShieldCheck,
    href: "/services/security-lighting-houston",
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Transform your living spaces with energy-efficient recessed LED lighting, with expert design and installation.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "Ceiling Fan Installation",
    description:
      "Professional ceiling fan installation and replacement, including wiring for rooms without existing fixtures.",
    icon: Fan,
    href: "/services/ceiling-fan-installation-houston",
  },
  {
    title: "New Construction Electrician",
    description:
      "Full-service electrical contractor for new residential construction projects from rough-in to finish.",
    icon: HardHat,
    href: "/services/new-construction-electrician-houston",
  },
  {
    title: "New Construction Wiring",
    description:
      "Complete new construction wiring services ensuring code compliance and long-term electrical safety.",
    icon: Cable,
    href: "/services/new-construction-wiring",
  },
  {
    title: "Emergency Electrician",
    description:
      "24/7 emergency electrical service for outages, sparks, tripped breakers, and urgent electrical hazards.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician-houston",
  },
  {
    title: "Electrical Inspection",
    description:
      "Comprehensive residential electrical inspections for home buyers, sellers, and safety peace of mind.",
    icon: ClipboardCheck,
    href: "/services/electrical-inspection-houston",
  },
];

const credentials = [
  { label: "Licensed", icon: BadgeCheck },
  { label: "Insured", icon: ShieldCheck },
  { label: "Bonded", icon: CheckCircle },
  { label: "Background-Checked Technicians", icon: BadgeCheck },
];

const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear", href: "/service-areas/fulshear-tx" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

export default function ServicesClient() {
  return (
    <main>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="services-hero-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician working on a residential electrical panel"
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Houston &amp; Katy, TX Residential Electrical
            </span>
            <h1
              id="services-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Full-Service{" "}
              <span style={{ color: "#F5A623" }}>Residential</span>{" "}
              Electrical Services
            </h1>
            <p
              className="text-base sm:text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              From panel upgrades and EV chargers to emergency repairs and new
              construction wiring, ENE Electrical delivers expert electrical
              solutions for homeowners across Houston and Katy, TX. Licensed,
              insured, and trusted for 15+ years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.40)",
                }}
              >
                <Zap size={16} strokeWidth={2.5} />
                Book Free Estimate
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Contact Us
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Answer / Services Introduction ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div
          className="rounded-xl border-l-4 p-6 sm:p-8"
          style={{
            borderColor: "#F5A623",
            backgroundColor: "#FFF9EE",
          }}
          role="note"
          aria-label="Quick answer about ENE Electrical services"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Quick Answer
          </p>
          <p
            className="text-base sm:text-lg text-[#1A2530] leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical provides comprehensive residential electrical services
            including electrical repair and installation, panel upgrades, EV
            charger installation, generator installation, security lighting,
            recessed LED lighting, new construction wiring, emergency electrical
            service, and electrical inspections. Services are available to
            homeowners across the Houston and Katy, TX metro area from a
            licensed, insured, and bonded contractor with 15+ years of
            experience.
          </p>
        </div>
      </Section>

      {/* ── Service Cards Grid ── */}
      <Section background="default" spacing="lg" maxWidth="2xl" id="all-services">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Residential Electrical Services"
          subtitle="Every service performed by licensed, background-checked electricians with 15+ years of experience serving Houston and Katy homeowners."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.href}
                className="group bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-grow">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0 transition-colors duration-300 group-hover:scale-105"
                    style={{ backgroundColor: "#F5A623" }}
                    aria-hidden="true"
                  >
                    <Icon size={22} color="#0B1F3A" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg font-bold mb-2 leading-snug"
                    style={{
                      color: "#0B1F3A",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {service.title}
                  </h2>

                  {/* Accent bar */}
                  <div
                    className="w-10 h-0.5 mb-3 rounded-full"
                    style={{ backgroundColor: "#F5A623" }}
                    aria-hidden="true"
                  />

                  {/* Description */}
                  <p
                    className="text-sm text-gray-500 leading-relaxed flex-grow mb-5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide transition-all duration-200 group-hover:gap-2.5"
                    style={{
                      color: "#0B1F3A",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <ArrowRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ── Credentials & Trust Strip ── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Credentials and trust indicators"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Why Homeowners Trust ENE Electrical
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {credentials.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-xl border border-white/10 bg-white/5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F5A623" }}
                  aria-hidden="true"
                >
                  <Icon size={22} color="#0B1F3A" strokeWidth={2} />
                </div>
                <p
                  className="text-white font-bold text-sm leading-tight"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-center text-blue-200 text-sm mt-8 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is a licensed, insured, and bonded residential
            electrical contractor with 15+ years of experience serving Houston
            and Katy, TX homeowners.
          </p>
        </div>
      </section>

      {/* ── Service Area Reference ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Left text */}
          <div className="md:w-1/2">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              Service Area
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
              style={{
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Serving Houston &amp; Katy, TX Homeowners
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-5"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <p
              className="text-[#1A2530] text-base leading-relaxed mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              All residential electrical services are delivered by ENE Electrical
              to homeowners throughout the Houston and Katy, TX metro, including
              Katy, Energy Corridor, Cinco Ranch, Fulshear, Southwest Houston,
              Memorial, Spring Branch, Westchase, Brookshire, and Richmond.
            </p>
            <Link
              href="/service-areas/houston-tx"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#ffffff",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <MapPin size={15} strokeWidth={2.5} />
              View All Service Areas
            </Link>
          </div>

          {/* Right area chips */}
          <div className="md:w-1/2">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              Communities We Serve
            </p>
            <div className="flex flex-wrap gap-2.5" role="list">
              {serviceAreas.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  role="listitem"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 hover:border-amber-400 hover:bg-amber-50"
                  style={{
                    borderColor: "#0B1F3A",
                    color: "#0B1F3A",
                    fontFamily: "Inter, sans-serif",
                    backgroundColor: "#F7F8FA",
                  }}
                >
                  <MapPin size={13} strokeWidth={2} aria-hidden="true" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Answers to the most common questions about ENE Electrical's residential services."
          align="center"
        />

        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {[
            {
              question:
                "What residential electrical services does ENE Electrical offer?",
              answer:
                "ENE Electrical offers electrical repair and installation, panel upgrades, EV charger installation, whole-home generator installation, security lighting, recessed LED lighting, new construction electrical work, emergency electrician service, and electrical inspections.",
            },
            {
              question: "Does ENE Electrical work on new construction homes?",
              answer:
                "Yes. ENE Electrical provides new construction electrician and new construction wiring services for residential projects in the Houston and Katy area.",
            },
            {
              question:
                "Can ENE Electrical handle both small repairs and large installations?",
              answer:
                "Yes. ENE Electrical handles the full spectrum of residential electrical needs, from minor repairs to large-scale installations like generator hookups and panel upgrades.",
            },
          ].map(({ question, answer }) => (
            <div
              key={question}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
            >
              <h3
                className="text-base sm:text-lg font-bold mb-3 leading-snug"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {question}
              </h3>
              <p
                className="text-sm text-gray-600 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Lead Capture Form ── */}
      <Section
        background="primary"
        spacing="lg"
        maxWidth="xl"
        id="get-estimate"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div className="lg:w-1/2 text-white">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              Free Estimates
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Request a Free Electrical Estimate
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <p
              className="text-blue-100 text-base leading-relaxed mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Whether you need a panel upgrade, EV charger, generator
              installation, or emergency electrical service, our team is ready
              to help. Fill out the form and a licensed ENE Electrical technician
              will contact you promptly.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Licensed, insured & bonded electricians",
                "Serving Houston & Katy, TX metro",
                "15+ years of residential electrical experience",
                "Background-checked technicians",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm text-blue-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle
                    size={17}
                    strokeWidth={2}
                    className="flex-shrink-0"
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <div className="lg:w-1/2 w-full">
            <ContactForm
              heading="Get a Free Estimate"
              subheading="Tell us what service you need and we'll get back to you promptly. No spam, ever."
              ctaLabel="Request Free Estimate"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}