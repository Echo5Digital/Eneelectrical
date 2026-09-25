"use client";

import React, { useState } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import {
  ShieldCheck,
  BadgeCheck,
  Zap,
  HardHat,
  ClipboardList,
  Lightbulb,
  PanelTop,
  Car,
  Search,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  ArrowRight,
  Users,
  Building2,
  Home,
  Clock,
  Award,
  Hammer,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

const trustBadges = [
  { icon: BadgeCheck, label: "Licensed" },
  { icon: ShieldCheck, label: "Insured" },
  { icon: ShieldCheck, label: "Bonded" },
  { icon: Users, label: "Background-Checked" },
  { icon: Award, label: "15+ Years Experience" },
];

const serviceCards = [
  {
    icon: Zap,
    title: "New Construction Wiring",
    description:
      "Complete rough-in and finish wiring for new home builds, installed to Texas code standards from the foundation up.",
    href: "/services/new-construction-wiring",
  },
  {
    icon: PanelTop,
    title: "Panel Installation",
    description:
      "Main electrical panel sizing, installation, and load calculation for new homes, built for today and tomorrow's power demands.",
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    icon: Car,
    title: "EV Charger Rough-In",
    description:
      "Future-proof your new build with a dedicated EV charger circuit and conduit rough-in during construction for cost-effective installation.",
    href: "/services/ev-charger-installation-houston",
  },
  {
    icon: Lightbulb,
    title: "Lighting Installation",
    description:
      "Recessed LED, pendant, and specialty lighting rough-in and trim-out coordinated seamlessly with your builder's schedule.",
    href: "/services/recessed-led-lighting",
  },
  {
    icon: ClipboardList,
    title: "Inspection Coordination",
    description:
      "We coordinate directly with city and county inspectors to ensure your new construction electrical passes every phase of inspection.",
    href: "/services/electrical-inspection-houston",
  },
];

const processSteps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Pre-Wire Rough-In",
    description:
      "Before drywall goes up, our team installs all wiring, conduit, junction boxes, and rough-in components per the approved electrical plan.",
  },
  {
    number: "02",
    icon: PanelTop,
    title: "Panel Installation",
    description:
      "We install the main electrical panel and subpanels during framing, sized correctly for your home's load requirements.",
  },
  {
    number: "03",
    icon: Search,
    title: "Inspection Coordination",
    description:
      "We schedule and coordinate rough-in inspections with your local authority having jurisdiction (AHJ) to keep your build on timeline.",
  },
  {
    number: "04",
    icon: Hammer,
    title: "Trim-Out",
    description:
      "After drywall and painting, we return to install outlets, switches, fixtures, panels covers, and all finish electrical components.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Final Commissioning",
    description:
      "We test every circuit, confirm all connections, coordinate the final inspection, and ensure your home is ready for occupancy.",
  },
];

const whyChoosePoints = [
  {
    icon: Award,
    title: "15+ Years of New Construction Experience",
    description:
      "Our team has completed hundreds of new construction electrical projects across the Houston metro, from custom estates to production homes.",
  },
  {
    icon: BadgeCheck,
    title: "Code Compliance Expertise",
    description:
      "We stay current on the NEC and Texas state electrical code requirements so your build passes inspections the first time.",
  },
  {
    icon: Users,
    title: "Trade Coordination",
    description:
      "We work hand-in-hand with your HVAC, plumbing, and framing crews to sequence work efficiently and avoid costly rework.",
  },
  {
    icon: Clock,
    title: "On-Time, On-Budget",
    description:
      "Builders count on us to hit phase milestones. We show up on schedule and communicate proactively so your project stays on track.",
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical was an absolute pleasure to work with on our custom build in Fulshear. They hit every phase milestone, coordinated with our other trades seamlessly, and the rough-in passed inspection first try. Highly recommended.",
    authorName: "Marcus T.",
    authorLocation: "Custom Home Builder, Fulshear, TX",
    rating: 5,
  },
  {
    quote:
      "We built our forever home in Cinco Ranch and ENE handled all the electrical from rough-in through final commissioning. Professional, knowledgeable, and always on time. Our panel setup and EV charger rough-in were done perfectly.",
    authorName: "Jennifer & David R.",
    authorLocation: "Homeowners, Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "As a production builder in Katy, I need electrical contractors I can trust to keep pace with our build schedule. ENE Electrical delivers every time. Their code knowledge saves us from rework and delays.",
    authorName: "Robert K.",
    authorLocation: "Residential Builder, Katy, TX",
    rating: 5,
  },
];

const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

export default function NewConstructionClient({ faqData }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[580px] md:min-h-[680px] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero section"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7937305/pexels-photo-7937305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician running wiring through new construction home framing"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.7) 60%, rgba(11,31,58,0.4) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="max-w-3xl">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-4 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(245,166,35,0.18)",
                  color: "#F5A623",
                  fontFamily: "Inter, sans-serif",
                  border: "1px solid rgba(245,166,35,0.35)",
                }}
              >
                Houston &amp; Katy, TX, New Construction
              </span>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Trusted{" "}
                <span style={{ color: "#F5A623" }}>New Construction</span>{" "}
                Electrician
              </h1>

              <p
                className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical partners with builders and homeowners in Houston
                and Katy, TX to deliver fully code-compliant electrical from
                rough-in through final inspection, on schedule, every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
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
                  <Zap size={16} strokeWidth={2.5} />
                  Get a Project Quote
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-white hover:text-[#0B1F3A] active:scale-95"
                  style={{
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "#ffffff",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Contact Us
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            <div className="lg:max-w-lg lg:justify-self-end w-full">
              <ContactForm
                compact
                dark
                showServiceField
                heading="Request a Free Estimate"
                subheading="Fill out the form and we'll get back to you quickly."
                ctaLabel="Submit Request"
                locationLabel="Serving Houston & Katy, TX"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER / INTRO ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div
          className="rounded-2xl p-6 md:p-10 border-l-4"
          style={{
            backgroundColor: "#F7F8FA",
            borderColor: "#F5A623",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Quick Answer
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is a licensed residential electrician specializing in
            new construction projects for homeowners and builders in Houston and
            Katy, TX. Services include electrical rough-in, panel installation,
            trim-out, EV charger pre-wiring, lighting installation, and
            inspection coordination. With 15+ years of experience, ENE
            Electrical is a trusted electrical partner for new home builds
            throughout the Houston and Katy metro area.
          </p>
          <p
            className="text-base leading-relaxed mt-4"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            Electrical installation for new construction involves designing and installing the entire electrical system for a new home or commercial building. This includes wiring, breaker panels, circuits, outlets, lighting systems, and safety devices. The purpose of hiring a licensed new construction electrician in Houston is to ensure the system meets Texas electrical codes, supports modern electrical demand, and passes all required inspections.
          </p>
        </div>
      </Section>

      {/* ── TRUST BADGE BAR ── */}
      <Section background="default" spacing="sm" maxWidth="2xl">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB" }}
            >
              <Icon
                size={18}
                strokeWidth={2}
                style={{ color: "#F5A623" }}
                aria-hidden="true"
              />
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

      {/* ── WHO WE WORK WITH ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Our Clients"
          title="Who We Work With"
          subtitle="ENE Electrical serves two distinct groups in new construction, and we tailor our approach to fit each one's needs."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Custom Home Builders */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-5"
            style={{
              backgroundColor: "#0B1F3A",
              border: "1px solid rgba(245,166,35,0.2)",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
            >
              <Building2 size={26} style={{ color: "#F5A623" }} aria-hidden="true" />
            </div>
            <div>
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Custom Home Builders
              </h3>
              <p
                className="text-blue-200 text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                We understand that builders need a reliable electrical
                subcontractor who shows up on time, hits phase milestones, and
                communicates clearly. ENE Electrical becomes a seamless part of
                your construction team, coordinating with your other trades,
                pulling permits, and scheduling inspections so your project
                never stalls waiting on electrical.
              </p>
            </div>
            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Phase milestone scheduling",
                "Permit pulling & coordination",
                "Multi-phase inspection management",
                "Scalable for production builds",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-blue-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle
                    size={14}
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Residential Homeowners */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-5"
            style={{
              backgroundColor: "#F7F8FA",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#F5A623" }}
            >
              <Home size={26} style={{ color: "#0B1F3A" }} aria-hidden="true" />
            </div>
            <div>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Residential Homeowners
              </h3>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Building your dream home is one of the biggest investments
                you'll make. ENE Electrical guides homeowners through every
                electrical decision, from panel sizing and circuit planning to
                smart home pre-wiring and EV charger rough-in, ensuring your
                new home is wired exactly the way you want it. New home wiring in Katy TX and Houston requires careful planning to support modern electrical needs such as EV chargers, whole home generators, smart home devices, and high-efficiency HVAC systems. We design systems with future expansion in mind, including 200 amp panel options and additional circuit capacity.
              </p>
            </div>
            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Personalized circuit planning",
                "Smart home pre-wiring",
                "EV charger rough-in",
                "Full inspection coordination",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-700"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle
                    size={14}
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* When to Hire a New Construction Electrician */}
        <div className="max-w-4xl mx-auto mt-12">
          <p
            className="text-base leading-relaxed mb-5 text-center"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            Electrical installation should be completed early in the construction process to ensure safe integration with plumbing, HVAC, and structural systems. You may need new home wiring in Houston or Katy if you:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {[
              "Are building a new home",
              "Are developing residential or commercial property",
              "Need electrical installation for an addition",
              "Are remodeling and require full rewiring",
              "Want to install smart home systems",
              "Require code-compliant inspection approvals",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
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

      {/* ── SERVICES OVERVIEW ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="What We Do"
          title="New Construction Electrical Services"
          subtitle="From the first nail to the final walkthrough, ENE Electrical covers every phase of your new home's electrical system."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map(({ icon, title, description, href }) => (
            <Link
              key={title}
              href={href}
              className="group block"
              aria-label={`Learn more about ${title}`}
            >
              <Card
                variant="service"
                icon={icon}
                title={title}
                description={description}
                ctaLabel="Learn More"
                className="h-full group-hover:shadow-xl transition-shadow duration-300"
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* ── OUR PROCESS ── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="How We Work"
          title="Our New Construction Process"
          subtitle="A structured, phase-by-phase approach keeps your build on schedule and your electrical system code-compliant from day one."
          align="center"
          inverted
        />
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 z-0"
            style={{ backgroundColor: "rgba(245,166,35,0.3)" }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(245,166,35,0.2)",
                }}
              >
                <div className="relative mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#F5A623" }}
                  >
                    <Icon
                      size={24}
                      style={{ color: "#0B1F3A" }}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className="absolute -top-1 -right-2 text-xs font-black rounded-full w-6 h-6 flex items-center justify-center"
                    style={{
                      backgroundColor: "#0B1F3A",
                      color: "#F5A623",
                      border: "2px solid #F5A623",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {number.replace("0", "")}
                  </span>
                </div>
                <h3
                  className="text-sm font-bold text-white mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs text-blue-200 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens After Installation */}
        <div
          className="mt-12 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center max-w-4xl mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,166,35,0.2)" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#F5A623" }}
          >
            <CheckCircle size={26} style={{ color: "#0B1F3A" }} strokeWidth={2} />
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-2 text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              What Happens After Installation
            </h3>
            <p
              className="text-sm leading-relaxed text-blue-200"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              After completing the electrical installation, we conduct full system testing to ensure safe operation and inspection compliance. We coordinate with local inspectors to ensure all work meets Houston and Katy code requirements. Our goal is to deliver a fully operational, safe, and future-ready electrical system.
            </p>
          </div>
        </div>
      </Section>

      {/* ── WHY CHOOSE ENE ELECTRICAL ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Why ENE Electrical
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              The Electrical Partner Builders &amp; Homeowners Trust
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-8"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-6">
              {whyChoosePoints.map(
                ({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#F7F8FA" }}
                    >
                      <Icon
                        size={20}
                        style={{ color: "#F5A623" }}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold mb-1"
                        style={{
                          color: "#0B1F3A",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        className="text-sm text-gray-600 leading-relaxed"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="/xlk.jpeg"
              alt="Licensed ENE Electrical technician installing an electrical panel in a new construction home"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.95) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Serving Houston &amp; Katy, TX
              </p>
              <p
                className="text-blue-200 text-xs mt-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Licensed · Insured · Background-Checked Technicians
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICE AREA CALLOUT ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, #0B1F3A 0%, #122b52 100%)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} style={{ color: "#F5A623" }} aria-hidden="true" />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                >
                  Serving the Fastest-Growing Communities
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                New Construction Electrical in Katy, Fulshear, Cinco Ranch &amp;
                Beyond
              </h2>
              <p
                className="text-blue-200 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                The Houston and Katy, TX metro, particularly Fulshear, Cinco
                Ranch, and surrounding west Houston suburbs, is one of Texas's
                fastest-growing residential development zones. ENE Electrical
                partners with builders and homeowners across this region to
                deliver code-compliant new construction electrical services from
                rough-in through final inspection.
              </p>
              <address
                className="not-italic"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <p className="text-blue-300 text-sm">
                  Based in{" "}
                  <strong className="text-white">Katy, TX 77494</strong>
                </p>
              </address>
            </div>
            <div className="flex-1 w-full">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Areas We Serve
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:text-[#0B1F3A]"
                    style={{
                      backgroundColor: "rgba(245,166,35,0.12)",
                      color: "#F5A623",
                      border: "1px solid rgba(245,166,35,0.25)",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "#F5A623";
                      (e.currentTarget as HTMLElement).style.color = "#0B1F3A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(245,166,35,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "#F5A623";
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by Builders &amp; Homeowners"
          subtitle="Real feedback from builders and homeowners who chose ENE Electrical for their new construction projects."
          align="center"
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Card */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: "#F7F8FA",
              border: "1px solid #E5E7EB",
            }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="#F5A623"
                  stroke="none"
                  aria-hidden="true"
                />
              ))}
            </div>
            {/* Quote */}
            <blockquote>
              <p
                className="text-base md:text-lg leading-relaxed italic mb-8"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: "#0B1F3A" }}
                  aria-hidden="true"
                >
                  {testimonials[testimonialIndex].authorName.charAt(0)}
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{
                      color: "#0B1F3A",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {testimonials[testimonialIndex].authorName}
                  </p>
                  <p
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {testimonials[testimonialIndex].authorLocation}
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#ffffff",
              }}
            >
              <ChevronUp size={20} className="rotate-[-90deg]" aria-hidden="true" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor:
                      i === testimonialIndex ? "#F5A623" : "#D1D5DB",
                  }}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#ffffff",
              }}
            >
              <ChevronDown size={20} className="rotate-[-90deg]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="default" spacing="lg" maxWidth="lg">
        <SectionHeading
          eyebrow="Common Questions"
          title="New Construction Electrical FAQ"
          subtitle="Answers to the most common questions about our new construction electrical services."
          align="center"
        />
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid",
                borderColor:
                  openFaq === index ? "#F5A623" : "#E5E7EB",
                backgroundColor: "#ffffff",
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
                style={{
                  backgroundColor:
                    openFaq === index
                      ? "rgba(245,166,35,0.06)"
                      : "transparent",
                }}
              >
                <span
                  className="text-sm font-semibold pr-4"
                  style={{
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {item.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp
                    size={18}
                    style={{ color: "#F5A623", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    style={{ color: "#0B1F3A", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                )}
              </button>
              {openFaq === index && (
                <div
                  className="px-6 pb-6"
                  style={{
                    backgroundColor: "rgba(245,166,35,0.04)",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed text-gray-600"
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

      {/* ── CTA SECTION ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <div
          className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          style={{ boxShadow: "0 8px 40px rgba(11,31,58,0.15)" }}
        >
          {/* Left — image + overlay text */}
          <div className="relative min-h-[300px] lg:min-h-[400px]">
            <img
              src="https://images.pexels.com/photos/33404353/pexels-photo-33404353.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="New home construction framing at sunset in the Houston, TX area"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-8"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.4) 100%)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Ready to Build?
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get Your New Construction Electrical Quote Today
              </h2>
              <p
                className="text-blue-200 text-sm mt-3 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Serving Katy, Fulshear, Cinco Ranch, Houston, and surrounding
                communities.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/appointment-booking"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                    boxShadow: "0 4px 16px rgba(245,166,35,0.4)",
                  }}
                >
                  <Zap size={15} strokeWidth={2.5} />
                  Book Online
                </Link>
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div
            className="p-8 md:p-10"
            style={{ backgroundColor: "#F7F8FA" }}
          >
            <ContactForm
              heading="Request a Project Quote"
              subheading="Tell us about your new construction project and we'll get back to you promptly."
              ctaLabel="Send My Quote Request"
            />
          </div>
        </div>
      </Section>

      <VanCta
        heading={
          <>
            Ready to Build in{" "}
            <span style={{ color: "#F5A623" }}>Houston or Katy?</span>
          </>
        }
        description="Whether you're breaking ground on a custom home or managing a multi-lot development, ENE Electrical delivers reliable, code-compliant new construction electrical work from rough-in through final inspection. We partner with builders and homeowners across Katy, Fulshear, Cinco Ranch, Houston, and surrounding communities."
      />
    </main>
  );
}