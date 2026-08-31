"use client";

import React, { useState } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import {
  Zap,
  Shield,
  Clock,
  Star,
  CheckCircle,
  MapPin,
  Users,
  Award,
  Wrench,
  BatteryCharging,
  Flashlight,
  Search,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Car,
  Lightbulb,
  Home,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

const services = [
  {
    title: "Electrical Repair & Installation",
    description:
      "Fast, reliable electrical repairs and new installations for Katy homeowners, from outlets and switches to complete rewiring projects.",
    icon: Zap,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "Panel Upgrades",
    description:
      "Upgrade your electrical panel to handle modern energy demands safely. Essential for Katy's growing homes and new appliances.",
    icon: Home,
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installations for Katy's expanding community of electric vehicle owners. Fast and code-compliant.",
    icon: Car,
    href: "/services/ev-charger-installation-houston",
  },
  {
    title: "Generator Installation",
    description:
      "Stay powered during Texas storms and outages. We install whole-home and standby generators for Katy residents.",
    icon: Zap,
    href: "/services/generator-installation-houston",
  },
  {
    title: "Security Lighting",
    description:
      "Enhance your home's safety and curb appeal with professionally installed security and landscape lighting systems.",
    icon: Shield,
    href: "/services/security-lighting-houston",
  },
  {
    title: "Recessed Lighting",
    description:
      "Modern recessed LED lighting installations that transform your living spaces while cutting energy costs.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "Emergency Electrician",
    description:
      "Electrical emergencies don't wait. ENE Electrical provides urgent electrical services for Katy homeowners around the clock.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician-houston",
  },
  {
    title: "Electrical Inspection",
    description:
      "Comprehensive home electrical inspections to ensure your Katy property meets Texas safety codes and standards.",
    icon: Search,
    href: "/services/electrical-inspection-houston",
  },
];

const trustReasons = [
  {
    icon: MapPin,
    title: "Locally Headquartered",
    description:
      "ENE Electrical is based right here in Katy, TX 77494, not a distant company dispatching from elsewhere. We know the neighborhoods, codes, and needs of Katy homeowners.",
  },
  {
    icon: Award,
    title: "Licensed, Insured & Bonded",
    description:
      "All work is performed by licensed electricians. ENE Electrical is fully insured and bonded, protecting you and your home on every job.",
  },
  {
    icon: Users,
    title: "Background-Checked Technicians",
    description:
      "Every technician on our team undergoes thorough background checks so you can feel confident inviting us into your home.",
  },
  {
    icon: Star,
    title: "15+ Years of Experience",
    description:
      "With over 15 years serving the Houston metro, ENE Electrical brings deep expertise to every residential electrical project in Katy.",
  },
  {
    icon: Clock,
    title: "Responsive & Reliable",
    description:
      "We respect your time. ENE Electrical provides prompt scheduling, clear communication, and shows up when promised, every time.",
  },
  {
    icon: CheckCircle,
    title: "Quality Workmanship Guaranteed",
    description:
      "We stand behind every installation and repair. Our work meets or exceeds Texas electrical code, ensuring lasting results.",
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical installed a Level 2 EV charger in my garage and upgraded my panel the same day. Professional, fast, and priced fairly. Highly recommend to any Katy homeowner.",
    authorName: "Marcus T.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "Had an electrical emergency on a Sunday evening, and ENE showed up within two hours. The technician was courteous, knowledgeable, and fixed the issue quickly. Absolute lifesavers.",
    authorName: "Jennifer R.",
    authorLocation: "Cinco Ranch, Katy TX",
    rating: 5,
  },
  {
    quote:
      "They installed recessed LED lighting throughout our living room and kitchen. The results are stunning and the crew was clean, respectful, and on time. ENE Electrical is our go-to electrician.",
    authorName: "David L.",
    authorLocation: "Katy, TX 77494",
    rating: 5,
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "1,000+", label: "Homes Served" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5★", label: "Customer Rating" },
];

const nearbyAreas = [
  { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Memorial, Houston", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase, Houston", href: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${idx}`}
            >
              <span
                className="font-semibold text-sm sm:text-base"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: isOpen ? "#F5A623" : "#F7F8FA",
                  color: isOpen ? "#0B1F3A" : "#6b7280",
                }}
                aria-hidden="true"
              >
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            <div
              id={`faq-answer-${idx}`}
              role="region"
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p
                className="px-6 pb-5 text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function KatyClient({ faqData }: Props) {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero: Licensed Electrician Serving Katy, TX"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician performing residential electrical work in Katy, TX"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              <MapPin size={14} aria-hidden="true" />
              Katy, TX 77494
            </span>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Licensed Electrician{" "}
              <span style={{ color: "#F5A623" }}>Serving Katy, TX</span>
            </h1>

            <p
              className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical is headquartered in Katy, TX 77494, your
              neighborhood licensed, insured, and bonded residential electrician
              with 15+ years of experience serving the greater Katy community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Zap size={16} aria-hidden="true" />
                Book an Appointment
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Trust Badge Bar */}
            <div className="flex flex-wrap gap-4">
              {["Licensed", "Insured", "Bonded", "Background-Checked Techs", "15+ Years Experience"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(245,166,35,0.15)",
                      color: "#F5A623",
                      border: "1px solid rgba(245,166,35,0.3)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <CheckCircle size={12} aria-hidden="true" />
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ── */}
      <section
        className="w-full border-b border-amber-200"
        style={{ backgroundColor: "#FFFBF2" }}
        aria-label="Quick Answer"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                <strong>ENE Electrical</strong> is a licensed, insured, and
                bonded residential electrical contractor{" "}
                <strong>headquartered in Katy, TX 77494</strong>. The company
                provides a full range of home electrical services, including
                panel upgrades, EV charger installation, emergency electrical
                repair, and electrical inspections, to homeowners throughout
                Katy and the surrounding Houston metro area. With{" "}
                <strong>15+ years of experience</strong> and
                background-checked technicians, ENE Electrical is Katy's
                trusted local electrician.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ENE ELECTRICAL IN KATY ── */}
      <Section background="white" spacing="lg">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              About ENE Electrical in Katy
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              Katy's Locally Based Electrical Contractor
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <p
              className="text-base text-gray-600 leading-relaxed mb-5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical is not just a company that services Katy, we are
              based here. Our headquarters is located in{" "}
              <strong style={{ color: "#0B1F3A" }}>Katy, TX 77494</strong>,
              which means faster response times, local knowledge of the
              community, and a genuine commitment to the neighborhoods we call
              home.
            </p>
            <p
              className="text-base text-gray-600 leading-relaxed mb-5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              With over <strong style={{ color: "#0B1F3A" }}>15 years of experience</strong>{" "}
              in residential electrical work, our team has supported the rapid
              growth of Katy and its master-planned communities, from new
              construction wiring to panel upgrades that keep pace with modern
              power demands.
            </p>
            <p
              className="text-base text-gray-600 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Katy's expanding homeowner base demands reliable, licensed
              electrical contractors for new homes, EV charger installations,
              and electrical safety inspections. ENE Electrical is proud to be
              that trusted partner for our community.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Zap size={15} aria-hidden="true" />
                Schedule Service
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest border-2 hover:bg-[#0B1F3A] hover:text-white active:scale-95 transition-all duration-200"
                style={{
                  borderColor: "#0B1F3A",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Learn About Us
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/17286412/pexels-photo-17286412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Residential neighborhood in Katy, TX showing the community ENE Electrical serves"
              className="w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-4 flex items-center gap-3"
              style={{ backgroundColor: "rgba(11,31,58,0.90)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <MapPin size={20} color="#0B1F3A" />
              </div>
              <div>
                <p
                  className="text-white text-sm font-bold"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Headquartered in Katy, TX 77494
                </p>
                <p
                  className="text-blue-200 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Serving the greater Houston metro area
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES AVAILABLE IN KATY ── */}
      <Section background="default" spacing="lg" id="services">
        <SectionHeading
          eyebrow="Services in Katy, TX"
          title="Electrical Services Available in Katy"
          subtitle="From panel upgrades to EV chargers, ENE Electrical provides the full spectrum of residential electrical services to Katy homeowners."
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.75rem]"
              aria-label={`Learn more about ${service.title}`}
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

      {/* ── WHY KATY HOMEOWNERS CHOOSE ENE ELECTRICAL ── */}
      <Section background="primary" spacing="lg">
        <SectionHeading
          eyebrow="Why Choose ENE Electrical"
          title="Why Katy Homeowners Trust ENE Electrical"
          subtitle="Local expertise, industry credentials, and a genuine commitment to Katy's community set us apart."
          align="center"
          inverted
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustReasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="rounded-xl p-6 border border-white/10 hover:border-amber-400/40 transition-colors duration-300"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#F5A623" }}
                  aria-hidden="true"
                >
                  <Icon size={22} color="#0B1F3A" strokeWidth={2} />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-sm text-blue-200 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── TRUST INDICATORS ── */}
      <Section background="white" spacing="md">
        {/* Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl sm:text-5xl font-extrabold mb-1"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm text-gray-500 font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Credential Badges */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{ backgroundColor: "#F7F8FA" }}
        >
          <p
            className="text-center text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Our Credentials &amp; Service Coverage
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map(
              (credential) => (
                <div
                  key={credential}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                  style={{ backgroundColor: "#0B1F3A" }}
                >
                  <CheckCircle
                    size={16}
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {credential}
                  </span>
                </div>
              )
            )}
          </div>
          <p
            className="text-center text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <strong style={{ color: "#0B1F3A" }}>Service Radius:</strong> ENE
            Electrical serves Katy, Cinco Ranch, Fulshear, Energy Corridor,
            Southwest Houston, Memorial, Spring Branch, Westchase, Brookshire,
            Richmond, and the greater Houston metro area.
          </p>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="default" spacing="lg">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Katy Homeowners Are Saying"
          subtitle="Real feedback from ENE Electrical customers in the Katy and greater Houston area."
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ── GOOGLE MAPS EMBED ── */}
      <Section background="white" spacing="md" id="map">
        <SectionHeading
          eyebrow="Our Location"
          title="Find ENE Electrical in Katy, TX"
          subtitle="We're based in Katy, TX 77494 and provide on-site electrical services throughout the area."
          align="center"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="ENE Electrical location in Katy, TX 77494"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55545.70843099745!2d-95.84413!3d29.78531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86413f33af1e7c53%3A0x8dbf2e9a5f3d1b7c!2sKaty%2C%20TX%2077494!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Maps showing ENE Electrical's location in Katy, TX 77494"
          />
        </div>
        <p
          className="text-center text-sm text-gray-500 mt-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <strong style={{ color: "#0B1F3A" }}>ENE Electrical</strong>,
          Headquartered in Katy, TX 77494. Serving Katy and the greater Houston
          metro area.
        </p>
      </Section>

      {/* ── LOCAL RELEVANCE / SERVING KATY ── */}
      <Section background="default" spacing="md">
        <div
          className="rounded-2xl p-8 md:p-10 border-l-4"
          style={{ backgroundColor: "white", borderLeftColor: "#F5A623" }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Serving Katy, TX
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Your Trusted Local Electrician in Katy
          </h2>
          <p
            className="text-base text-gray-600 leading-relaxed max-w-3xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is based in Katy, TX 77494 and serves the Katy community directly,
            including nearby neighborhoods and master-planned communities throughout the greater Katy
            area. Katy's rapid residential growth makes reliable, licensed electrical contractors
            essential for new construction wiring, panel upgrades to meet modern loads, and EV
            charger installations for the area's expanding homeowner base. When you work with ENE
            Electrical, you're working with a team that is genuinely part of the Katy community.
          </p>
        </div>
      </Section>

      {/* ── NEARBY SERVICE AREAS ── */}
      <Section background="white" spacing="md">
        <SectionHeading
          eyebrow="Nearby Service Areas"
          title="Also Serving Communities Near Katy"
          subtitle="In addition to Katy, ENE Electrical provides residential electrical services throughout the surrounding Houston metro area."
          align="center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {nearbyAreas.map((area) => (
            <Link
              key={area.label}
              href={area.href}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:border-amber-400 hover:bg-amber-50 hover:text-[#0B1F3A] transition-all duration-200 group"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              <MapPin
                size={14}
                style={{ color: "#F5A623" }}
                className="flex-shrink-0"
                aria-hidden="true"
              />
              {area.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="default" spacing="lg" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions About Electrical Services in Katy, TX"
          subtitle="Answers to common questions from Katy homeowners about ENE Electrical and our services."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqData} />
        </div>
      </Section>

      {/* ── CTA SECTION ── */}
      <section
        id="contact"
        className="w-full py-16 md:py-24"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Book an Appointment or Request a Quote"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Get Started Today
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Book Your Katy, TX Electrician Today
              </h2>
              <p
                className="text-blue-200 text-base leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Ready to schedule electrical service in Katy, TX? Fill out the
                form and a member of our team will reach out promptly. Whether
                it's an emergency repair, a panel upgrade, or a new EV charger,
                ENE Electrical is your local, licensed choice.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Licensed, Insured & Bonded",
                  "Background-Checked Technicians",
                  "15+ Years of Experience",
                  "Headquartered in Katy, TX 77494",
                  "Emergency Services Available",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-blue-100"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: "#F5A623" }}
                      className="flex-shrink-0"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href="/appointment-booking"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
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

            {/* Right: Contact Form */}
            <div>
              <ContactForm
                heading="Request a Free Quote"
                subheading="Tell us about your electrical project in Katy, TX. We'll get back to you within 24 hours."
                ctaLabel="Send My Request"
              />
            </div>
          </div>
        </div>
      </section>

      <VanCta
        heading={
          <>
            Ready to Schedule Your Residential Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Katy, TX?</span>
          </>
        }
        description="Whether you've got an electrical issue that needs fixing, an upgrade you've been putting off, or a new installation you're ready to move forward on, ENE Electrical is ready to help. Headquartered right here in Katy, TX 77494, we serve local homeowners with fast, dependable, licensed electrical service."
      />
    </main>
  );
}