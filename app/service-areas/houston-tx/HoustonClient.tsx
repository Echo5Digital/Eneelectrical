"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Zap,
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Wrench,
  Bolt,
  Car,
  Home,
  Lightbulb,
  AlertTriangle,
  ClipboardCheck,
  Building2,
  Sun,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FaqItem[];
}

// Animated counter hook
function useCounter(target: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);

  return count;
}

const services = [
  {
    title: "Electrical Repair & Installation",
    description:
      "Fast, reliable repair and installation services for outlets, switches, fixtures, and wiring throughout your Houston home.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "Electrical Panel Upgrade",
    description:
      "Upgrade your home's electrical panel to handle modern power demands safely. Ideal for older Houston homes.",
    icon: Zap,
    href: "/services/electrical-panel-upgrade",
  },
  {
    title: "EV Charger Installation",
    description:
      "Professional Level 2 EV charger installation for Houston homeowners. Charge smarter at home.",
    icon: Car,
    href: "/services/ev-charger-installation",
  },
  {
    title: "Generator Installation",
    description:
      "Stay powered during Houston storms. Whole-home and standby generator installation by licensed professionals.",
    icon: AlertTriangle,
    href: "/services/generator-installation",
  },
  {
    title: "Security Lighting",
    description:
      "Enhance your home's safety with professionally installed exterior and security lighting solutions.",
    icon: Sun,
    href: "/services/security-lighting",
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Transform your living spaces with beautiful, energy-efficient recessed LED lighting installations.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "New Construction Wiring",
    description:
      "Complete electrical wiring for new construction and additions throughout the Houston metro area.",
    icon: Building2,
    href: "/services/new-construction-wiring",
  },
  {
    title: "Emergency Electrician",
    description:
      "Urgent electrical problems need immediate attention. ENE Electrical is available for Houston emergency calls.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician",
  },
  {
    title: "Electrical Inspection",
    description:
      "Pre-purchase, safety, or permit inspections performed by licensed Houston-area electricians.",
    icon: ClipboardCheck,
    href: "/services/electrical-inspection",
  },
];

const neighborhoods = [
  { name: "Energy Corridor", href: "/service-areas/energy-corridor-houston" },
  { name: "Southwest Houston", href: "/service-areas/southwest-houston" },
  { name: "Memorial", href: "/service-areas/memorial-houston" },
  { name: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { name: "Westchase", href: "/service-areas/westchase-houston" },
  { name: "Katy, TX", href: "/service-areas/katy-tx" },
  { name: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { name: "Fulshear", href: "/service-areas/fulshear-tx" },
  { name: "Brookshire", href: "/service-areas/brookshire-tx" },
  { name: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const testimonials = [
  {
    quote:
      "ENE Electrical upgraded our panel in the Energy Corridor — professional, on time, and explained everything clearly. Highly recommend to any Houston homeowner!",
    authorName: "Marcus T.",
    authorLocation: "Energy Corridor, Houston, TX",
    rating: 5,
  },
  {
    quote:
      "Had an electrical emergency late in the evening and ENE Electrical came out to our home in Katy within the hour. Couldn't be more grateful for their responsiveness.",
    authorName: "Lisa R.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "Installed our EV charger quickly and cleanly. The technician was background-checked, knowledgeable, and left the workspace spotless. Will use again.",
    authorName: "David K.",
    authorLocation: "Westchase, Houston, TX",
    rating: 5,
  },
  {
    quote:
      "We bought an older home in Spring Branch and needed a full inspection before closing. ENE Electrical was thorough and honest. Great company.",
    authorName: "Angela M.",
    authorLocation: "Spring Branch, Houston, TX",
    rating: 5,
  },
];

const trustReasons = [
  {
    icon: ShieldCheck,
    title: "Licensed, Insured & Bonded",
    description:
      "Every job is performed by fully licensed, insured, and bonded electricians — protecting you, your home, and our team.",
  },
  {
    icon: Award,
    title: "15+ Years of Experience",
    description:
      "Over a decade and a half serving Houston and Katy, TX homeowners with expert residential electrical work.",
  },
  {
    icon: CheckCircle,
    title: "Background-Checked Technicians",
    description:
      "All ENE Electrical technicians undergo thorough background checks before entering your home.",
  },
  {
    icon: Clock,
    title: "Responsive & Reliable",
    description:
      "From scheduled appointments to emergency calls, ENE Electrical shows up on time and gets the job done right.",
  },
  {
    icon: MapPin,
    title: "Houston Metro Coverage",
    description:
      "Based in Katy, TX 77494, we cover the full Houston metro including city neighborhoods and outer suburbs.",
  },
  {
    icon: Home,
    title: "Residential Specialists",
    description:
      "We focus exclusively on residential electrical services — from older mid-century homes to new Houston-area construction.",
  },
];

const stats = [
  { label: "Years of Experience", value: 15, suffix: "+" },
  { label: "Houston-Area Homes Served", value: 2500, suffix: "+" },
  { label: "Services Offered", value: 9, suffix: "" },
  { label: "Satisfaction Rate", value: 99, suffix: "%" },
];

function StatCounter({
  value,
  suffix,
  label,
  startCounting,
}: {
  value: number;
  suffix: string;
  label: string;
  startCounting: boolean;
}) {
  const count = useCounter(value, 2000, startCounting);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span
        className="text-4xl sm:text-5xl font-extrabold"
        style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="mt-2 text-sm font-medium text-white/80"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm"
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span
              className="font-semibold text-sm sm:text-base pr-4"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {item.question}
            </span>
            {openIndex === i ? (
              <ChevronUp size={20} style={{ color: "#F5A623" }} className="flex-shrink-0" />
            ) : (
              <ChevronDown size={20} style={{ color: "#F5A623" }} className="flex-shrink-0" />
            )}
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p
              className="px-5 pb-5 text-sm leading-relaxed text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HoustonClient({ faqData }: Props) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [startCounting, setStartCounting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Service Areas", href: "/service-areas/houston-tx" },
              { label: "Houston, TX", href: "/service-areas/houston-tx" },
            ]}
          />
        </div>
      </div>

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "560px" }}
        aria-label="Hero section"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/17995530/pexels-photo-17995530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Houston, TX skyline and residential neighborhood"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.75) 60%, rgba(11,31,58,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-start">
          {/* Eyebrow */}
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(245,166,35,0.18)",
              color: "#F5A623",
              border: "1px solid rgba(245,166,35,0.4)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Serving Houston, TX &amp; Surrounding Areas
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white max-w-3xl mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Houston's Licensed{" "}
            <span style={{ color: "#F5A623" }}>Residential Electrician</span>
          </h1>

          <p
            className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is licensed, insured, and bonded — serving Houston
            homeowners with expert electrical repair, panel upgrades, EV charger
            installation, generators, and more. Based in Katy, TX with 15+ years
            of experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 18px rgba(245,166,35,0.4)",
              }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            {["Licensed", "Insured", "Bonded", "Background-Checked"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.10)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <ShieldCheck size={13} style={{ color: "#F5A623" }} />
                {badge}
              </span>
            ))}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Award size={13} style={{ color: "#F5A623" }} />
              15+ Years Experience
            </span>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ── */}
      <section
        aria-label="Quick Answer"
        className="w-full"
        style={{ backgroundColor: "#F5A623" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-shrink-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#0B1F3A" }}
              >
                <Zap size={24} color="#F5A623" />
              </div>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif", opacity: 0.7 }}
              >
                Quick Answer
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed font-medium"
                style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical is a licensed, insured, bonded, and
                background-checked residential electrical contractor serving the
                Houston, TX metro area. Based in Katy, TX 77494, the company has
                15+ years of experience providing electrical repair, panel
                upgrades, EV charger installation, generator installation,
                security lighting, recessed lighting, new construction wiring,
                emergency electrical service, and electrical inspections to
                Houston-area homeowners. ENE Electrical covers Houston
                neighborhoods including the Energy Corridor, Southwest Houston,
                Memorial, Spring Branch, and Westchase, as well as surrounding
                suburbs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENE ELECTRICAL IN HOUSTON ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              About ENE Electrical in Houston
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Your Trusted Houston Metro Electrician
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <div
              className="space-y-4 text-gray-600 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <p>
                ENE Electrical is a fully licensed, insured, and bonded
                residential electrical contractor headquartered in{" "}
                <strong style={{ color: "#0B1F3A" }}>Katy, TX 77494</strong>.
                With over{" "}
                <strong style={{ color: "#0B1F3A" }}>15 years of experience</strong>{" "}
                serving greater Houston, we understand the unique electrical
                needs of the area's diverse housing stock — from mid-century
                ranch homes in Spring Branch to new construction in Cinco Ranch
                and Fulshear.
              </p>
              <p>
                Our coverage spans the full Houston metro, including city
                neighborhoods like the Energy Corridor, Southwest Houston,
                Memorial, Westchase, and out to suburban communities like
                Richmond, Brookshire, Fulshear, and beyond. Every technician is
                background-checked and trained to deliver professional,
                respectful service in your home.
              </p>
              <p>
                Whether you need an emergency repair, a panel upgrade to support
                modern appliances, or a new EV charger for your electric vehicle,
                ENE Electrical brings Houston homeowners the peace of mind that
                comes with licensed, experienced electrical professionals.
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
                Book Service
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                style={{
                  borderColor: "#0B1F3A",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                About Us
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="ENE Electrical licensed technician working in a Houston area home"
              className="w-full h-80 lg:h-96 object-cover"
            />
            {/* Overlay card */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl px-5 py-4 flex items-center gap-4"
              style={{ backgroundColor: "#0B1F3A", opacity: 0.97 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
              >
                <MapPin size={20} color="#0B1F3A" />
              </div>
              <div>
                <p
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Based in Katy, TX 77494
                </p>
                <p
                  className="text-white/65 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Serving the greater Houston metro area
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES GRID ── */}
      <Section background="default" spacing="lg" maxWidth="2xl" id="services">
        <SectionHeading
          eyebrow="What We Do"
          title="Residential Electrical Services Across Houston"
          subtitle="From emergency repairs to new construction wiring, ENE Electrical provides Houston homeowners with comprehensive licensed electrical services."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="block group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.75rem]"
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
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:brightness-105 active:scale-95"
            style={{
              backgroundColor: "#0B1F3A",
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            View All Services
            <ArrowRight size={15} />
          </Link>
        </div>
      </Section>

      {/* ── NEIGHBORHOODS WE SERVE ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="neighborhoods">
        <SectionHeading
          eyebrow="Service Area"
          title="Houston Neighborhoods We Serve"
          subtitle="ENE Electrical provides residential electrical services throughout the Houston metro — from inner-city neighborhoods to outer suburbs."
          align="center"
          inverted
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {neighborhoods.map((n) => (
            <Link
              key={n.name}
              href={n.href}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-amber-400 hover:bg-white/5 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <MapPin
                size={20}
                className="group-hover:scale-110 transition-transform duration-200"
                style={{ color: "#F5A623" }}
              />
              <span
                className="text-center text-sm font-semibold text-white/85 group-hover:text-white transition-colors"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {n.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-xl p-6 border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <p
            className="text-white/75 text-sm leading-relaxed text-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical's verified service area encompasses the greater Houston, TX metro, including city
            neighborhoods such as the <strong className="text-white">Energy Corridor, Southwest Houston, Memorial,
            Spring Branch, and Westchase</strong>, as well as suburban communities like{" "}
            <strong className="text-white">Katy, Cinco Ranch, Fulshear, Brookshire, and Richmond, TX</strong>.
            Houston's large housing stock — ranging from older mid-century homes to new construction — creates
            consistent demand for the panel upgrades, EV charger installations, and electrical inspections that
            ENE Electrical specializes in.
          </p>
        </div>
      </Section>

      {/* ── WHY HOUSTON HOMEOWNERS TRUST ENE ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="why-ene">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Houston Homeowners Trust ENE Electrical"
          subtitle="When it comes to your home's electrical system, credentials and experience matter. Here's why Houston residents choose ENE Electrical."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustReasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="flex flex-col gap-4 p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <Icon size={22} color="#0B1F3A" strokeWidth={2} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── TRUST INDICATORS / STAT COUNTERS ── */}
      <div ref={statsRef}>
        <Section background="primary" spacing="md" maxWidth="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-2 divide-white/10 md:divide-y-0 md:divide-x md:divide-white/10">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                startCounting={startCounting}
              />
            ))}
          </div>

          {/* Credential badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map((cred) => (
              <div
                key={cred}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                style={{
                  backgroundColor: "rgba(245,166,35,0.12)",
                  border: "1px solid rgba(245,166,35,0.3)",
                }}
              >
                <ShieldCheck size={16} style={{ color: "#F5A623" }} />
                <span
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {cred}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Houston Homeowners Are Saying"
          subtitle="Real reviews from real Houston-area customers who've trusted ENE Electrical with their home's electrical needs."
          align="center"
        />

        {/* Mobile: single card; Desktop: show all visible cards with slide */}
        <div className="relative">
          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Mobile carousel */}
          <div className="md:hidden">
            <Card
              variant="testimonial"
              quote={testimonials[currentTestimonial].quote}
              authorName={testimonials[currentTestimonial].authorName}
              authorLocation={testimonials[currentTestimonial].authorLocation}
              rating={testimonials[currentTestimonial].rating}
            />
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 hover:bg-amber-400 hover:border-amber-400"
                style={{ borderColor: "#0B1F3A", color: "#0B1F3A" }}
              >
                ‹
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                    style={{
                      backgroundColor: i === currentTestimonial ? "#F5A623" : "#CBD5E1",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 hover:bg-amber-400 hover:border-amber-400"
                style={{ borderColor: "#0B1F3A", color: "#0B1F3A" }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Overall rating bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex gap-1" aria-label="5 out of 5 stars overall">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} fill="#F5A623" stroke="#F5A623" />
            ))}
          </div>
          <p
            className="text-sm font-semibold"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            5.0 Star Rating · Trusted by Houston homeowners
          </p>
        </div>
      </Section>

      {/* ── GOOGLE MAPS EMBED ── */}
      <section aria-label="Service area map" className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-2"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Our Location
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Serving Houston from Katy, TX
            </h2>
            <p
              className="mt-2 text-gray-500 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Based in Katy, TX 77494 — reaching every corner of the Houston metro
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: "400px" }}>
            <iframe
              title="ENE Electrical service area map — Katy, TX and Houston metro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221929.08499050856!2d-95.79999999999998!3d29.785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e4a28d23ace3%3A0xc3dd0bfc9cec39e9!2sKaty%2C%20TX%2077494!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-center text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
            ENE Electrical · Katy, TX 77494 · Serving Houston, TX and surrounding areas
          </p>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="default" spacing="lg" maxWidth="lg" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Houston Electrical Services FAQ"
          subtitle="Answers to the most common questions Houston homeowners ask about ENE Electrical's services, licensing, and service area."
          align="center"
        />
        <FaqAccordion items={faqData} />
      </Section>

      {/* ── CTA / LEAD CAPTURE ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div>
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book a Houston Electrician
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <p
              className="text-white/75 text-base leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ready to schedule service or get a quote? Fill out the form and an ENE
              Electrical team member will be in touch promptly. We serve the full
              Houston metro area — no job too small or too complex.
            </p>
            <ul className="space-y-3">
              {[
                "Licensed, Insured & Bonded Technicians",
                "Background-Checked for Your Peace of Mind",
                "15+ Years Serving Houston-Area Homeowners",
                "Emergency Electrical Services Available",
                "Full Coverage: Energy Corridor to Richmond, TX",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle size={18} style={{ color: "#F5A623", flexShrink: 0 }} />
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

          {/* Right: form */}
          <div>
            <ContactForm
              heading="Request a Quote in Houston"
              subheading="Fill out the form and a licensed ENE Electrical technician will respond within 24 hours."
              ctaLabel="Send My Request"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}