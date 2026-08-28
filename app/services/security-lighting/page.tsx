import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import SecurityLightingClient from "./SecurityLightingClient";
import {
  ShieldCheck,
  Zap,
  Eye,
  Home,
  Sun,
  Cpu,
  ClipboardList,
  Wrench,
  CheckCircle,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security Lighting Installation | ENE Electrical Katy & Houston",
  description:
    "Protect your home with professional security lighting installation from ENE Electrical. Serving Katy & Houston, TX. Licensed, bonded & insured. Get a quote today.",
  alternates: {
    canonical: "https://www.eneelectrical.com/services/security-lighting",
  },
};

const faqData = [
  {
    question: "What types of security lighting does ENE Electrical install?",
    answer:
      "ENE Electrical installs motion-sensor lights, LED floodlights, dusk-to-dawn fixtures, pathway lighting, and other exterior security lighting solutions for residential properties.",
  },
  {
    question:
      "Is ENE Electrical licensed to perform exterior lighting installations in Texas?",
    answer:
      "Yes. ENE Electrical is fully licensed, insured, and bonded in Texas, with background-checked technicians serving Houston and Katy area homeowners.",
  },
  {
    question:
      "Which Houston-area communities do you serve for security lighting?",
    answer:
      "We serve Katy, Houston, Cinco Ranch, Fulshear, Energy Corridor, Southwest Houston, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Security Lighting Installation",
  provider: {
    "@type": "LocalBusiness",
    name: "ENE Electrical",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77494",
    },
  },
  areaServed: [
    "Katy, TX",
    "Houston, TX",
    "Cinco Ranch, TX",
    "Fulshear, TX",
    "Energy Corridor, TX",
    "Southwest Houston, TX",
    "Memorial, TX",
    "Spring Branch, TX",
    "Westchase, TX",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  description:
    "Professional residential security lighting installation including motion-sensor lights, LED floodlights, dusk-to-dawn fixtures, pathway lighting, and smart-enabled options. Licensed, insured, and bonded electricians with 15+ years of experience.",
  serviceType: "Security Lighting Installation",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const trustBadges = [
  { label: "Licensed", icon: ShieldCheck },
  { label: "Insured", icon: CheckCircle },
  { label: "Bonded", icon: ShieldCheck },
  { label: "Background-Checked", icon: Eye },
  { label: "15+ Years Experience", icon: Zap },
];

const lightingOptions = [
  {
    icon: Eye,
    title: "Motion-Sensor Lights",
    description:
      "Automatically activate when movement is detected, startling intruders and alerting homeowners. Ideal for driveways, side yards, and backyard perimeters.",
  },
  {
    icon: Sun,
    title: "LED Floodlights",
    description:
      "High-lumen LED floodlights illuminate large areas like garages, backyards, and parking pads. Energy-efficient and long-lasting for continuous exterior coverage.",
  },
  {
    icon: Home,
    title: "Pathway Lighting",
    description:
      "Low-voltage pathway lights guide guests safely and keep your entryways well-lit throughout the night, reducing trip hazards and deterring lurkers.",
  },
  {
    icon: Sun,
    title: "Dusk-to-Dawn Fixtures",
    description:
      "Photocell-controlled fixtures that automatically switch on at sunset and off at sunrise — providing effortless, all-night coverage without any manual operation.",
  },
  {
    icon: Cpu,
    title: "Smart-Enabled Lighting",
    description:
      "Wi-Fi or app-controlled security lights let you schedule, dim, or trigger lights remotely — compatible with popular smart home ecosystems.",
  },
];

const processSteps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Property Assessment",
    description:
      "Our licensed electrician evaluates your home's exterior, identifying vulnerable entry points, dark zones, and optimal mounting locations for maximum coverage.",
  },
  {
    step: "02",
    icon: Eye,
    title: "Fixture Selection",
    description:
      "We recommend the right mix of motion sensors, floodlights, dusk-to-dawn, or smart fixtures based on your budget, aesthetic preferences, and security goals.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Wiring & Circuit Work",
    description:
      "Our team handles all electrical wiring, ensuring each fixture is connected to a properly rated circuit with code-compliant installation throughout.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Mounting & Positioning",
    description:
      "Fixtures are mounted at optimal heights and angles to eliminate blind spots and maximize motion-detection coverage without light pollution.",
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Testing & Walkthrough",
    description:
      "We test every fixture's sensitivity, range, and timer settings, then walk you through how to adjust and maintain your new security lighting system.",
  },
];

const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/katy-tx" },
  { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear", href: "/service-areas/fulshear-tx" },
  { label: "Energy Corridor", href: "/service-areas/energy-corridor-houston" },
  { label: "Southwest Houston", href: "/service-areas/southwest-houston" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const testimonials = [
  {
    quote:
      "ENE Electrical installed motion-sensor floodlights all around our home in Katy. The difference is night and day — we feel so much safer now. Professional, fast, and clean work!",
    authorName: "Melissa R.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "Had dusk-to-dawn lights installed in our Cinco Ranch home. The team was on time, explained everything clearly, and the wiring is perfect. Highly recommend ENE Electrical!",
    authorName: "David T.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "From the assessment to the final walkthrough, ENE's team was exceptional. Our backyard and driveway are now fully lit with smart-enabled lights. Worth every penny.",
    authorName: "Angela M.",
    authorLocation: "Memorial, Houston TX",
    rating: 5,
  },
  {
    quote:
      "Licensed, background-checked technicians who showed up on time and finished ahead of schedule. Our pathway and perimeter lighting looks amazing and makes us feel secure.",
    authorName: "James K.",
    authorLocation: "Westchase, Houston TX",
    rating: 5,
  },
];

export default function SecurityLightingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Security Lighting", href: "/services/security-lighting" },
        ]}
      />

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Security lighting installation hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/10401809/pexels-photo-10401809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Professional security lighting illuminating a residential home exterior at night"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Residential Security Lighting
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Protect Your Home with{" "}
              <span style={{ color: "#F5A623" }}>Professional Security Lighting</span>
            </h1>
            <p
              className="text-lg text-blue-100 leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical installs expert security lighting solutions for
              Houston and Katy, TX homeowners. Our licensed, insured, and
              bonded electricians help you deter intruders, improve safety, and
              protect your property — night after night.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.45)",
                }}
              >
                <Zap size={16} strokeWidth={2.5} />
                Book Installation
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER / INTRO ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-8 border-l-4"
            style={{
              backgroundColor: "#F7F8FA",
              borderColor: "#F5A623",
            }}
            role="note"
            aria-label="Quick Answer"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            >
              Quick Answer
            </p>
            <p
              className="text-base sm:text-lg text-[#1A2530] leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical installs residential security lighting — including
              motion-sensor lights, floodlights, and dusk-to-dawn fixtures —
              for homeowners in Houston and Katy, TX. Our licensed and insured
              electricians assess your property, recommend the right fixtures,
              and handle all wiring and mounting. ENE Electrical has{" "}
              <strong>15+ years of experience</strong> helping Houston-area
              families improve home safety and deter intruders with strategic
              exterior lighting.
            </p>
          </div>
        </div>
      </Section>

      {/* ── TRUST BADGE BAR ── */}
      <Section background="primary" spacing="sm" maxWidth="2xl">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {trustBadges.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2.5"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
              >
                <Icon size={18} style={{ color: "#F5A623" }} strokeWidth={2} />
              </span>
              <span
                className="text-sm font-semibold text-white uppercase tracking-wide"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHY SECURITY LIGHTING MATTERS ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Why It Matters"
          title="The Power of Strategic Security Lighting"
          subtitle="Well-placed exterior lighting is one of the most cost-effective investments a homeowner can make for safety, deterrence, and peace of mind."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#0B1F3A" }}
            >
              <ShieldCheck size={26} style={{ color: "#F5A623" }} strokeWidth={2} />
            </div>
            <h3
              className="text-lg font-bold"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Deter Intruders
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Studies consistently show that well-lit homes are significantly
              less likely to be targeted by burglars. Motion-activated lights
              and floodlights eliminate the darkness intruders rely on, making
              your property a far less attractive target.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#0B1F3A" }}
            >
              <CheckCircle size={26} style={{ color: "#F5A623" }} strokeWidth={2} />
            </div>
            <h3
              className="text-lg font-bold"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Home Insurance Advantages
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Many home insurance carriers offer discounts or favorable terms
              for properties with professionally installed security lighting.
              Upgrading your exterior lights may reduce your premiums while
              adding real protective value.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#0B1F3A" }}
            >
              <Home size={26} style={{ color: "#F5A623" }} strokeWidth={2} />
            </div>
            <h3
              className="text-lg font-bold"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Safer Driveways & Entryways
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Beyond security, proper exterior lighting prevents trips and
              falls on steps, walkways, and driveways — protecting your family
              and guests after dark. It also ensures guests and delivery
              drivers can safely navigate your property.
            </p>
          </div>
        </div>

        {/* Supporting image */}
        <div className="mt-14 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/12700807/pexels-photo-12700807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Houston-area home exterior with professional security lighting illuminating driveway and entryway"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </Section>

      {/* ── SECURITY LIGHTING OPTIONS ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Lighting Solutions"
          title="Security Lighting Options We Install"
          subtitle="From simple motion sensors to smart-enabled systems, ENE Electrical installs the right fixture for every home and budget."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lightingOptions.map((option) => (
            <Card
              key={option.title}
              variant="service"
              icon={option.icon}
              title={option.title}
              description={option.description}
            />
          ))}
          {/* Smart lighting image card */}
          <div className="sm:col-span-2 lg:col-span-2 rounded-[0.75rem] overflow-hidden shadow-md relative min-h-[220px]">
            <img
              src="https://images.pexels.com/photos/39057090/pexels-photo-39057090.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Licensed electrician installing smart-enabled security lighting for a residential home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent flex items-end p-6">
              <p
                className="text-white text-lg font-bold"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Ask about smart-enabled security lighting options
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── INSTALLATION PROCESS ── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Security Lighting Installation Process"
          subtitle="From your first call to the final walkthrough, we handle every step with care and expertise."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map(({ step, icon: Icon, title, description }) => (
            <div
              key={step}
              className="relative rounded-2xl p-6 border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <span
                className="absolute top-5 right-5 text-4xl font-black leading-none select-none"
                style={{ color: "rgba(245,166,35,0.18)", fontFamily: "Montserrat, sans-serif" }}
                aria-hidden="true"
              >
                {step}
              </span>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F5A623" }}
              >
                <Icon size={20} style={{ color: "#0B1F3A" }} strokeWidth={2.5} />
              </div>
              <h3
                className="text-base font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SERVICE AREA CALLOUT ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="service-areas">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Serving Houston &amp; Katy, TX
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Security Lighting Across the Houston Metro
            </h2>
            <div
              className="h-1 w-14 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <p
              className="text-base text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Houston and Katy, TX homeowners increasingly rely on exterior
              security lighting to protect their properties. ENE Electrical
              serves the full Houston and Katy metro — including Cinco Ranch,
              Fulshear, Memorial, Spring Branch, and Westchase — delivering
              professional security lighting installations tailored to each
              home's layout and neighborhood environment.
            </p>
            <address className="not-italic mb-6">
              <p
                className="flex items-center gap-2 text-sm text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MapPin size={16} style={{ color: "#F5A623" }} />
                <span>ENE Electrical — Katy, TX 77494</span>
              </p>
            </address>

            <div className="flex flex-wrap gap-2">
              {serviceAreas.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:border-[#F5A623] hover:text-[#0B1F3A] hover:bg-[#F5A623]/10"
                  style={{
                    borderColor: "#0B1F3A",
                    color: "#0B1F3A",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <MapPin size={13} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/8278494/pexels-photo-8278494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Houston-area residential neighborhood with security lighting on homes at night"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Homeowners Say About Our Lighting Work"
          subtitle="Real feedback from Houston and Katy-area residents who upgraded their security lighting with ENE Electrical."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ── FAQ ACCORDION ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Security Lighting FAQs"
          subtitle="Answers to the questions we hear most often from Houston-area homeowners."
          align="center"
        />
        <SecurityLightingClient faqData={faqData} />
      </Section>

      {/* ── CTA SECTION ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Schedule Your Security Lighting Assessment
            </h2>
            <div
              className="h-1 w-14 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <p
              className="text-blue-100 text-base leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ready to protect your Houston or Katy home with professional
              security lighting? Our licensed electricians will assess your
              property and provide a clear, no-obligation quote. Call us or
              submit the form and we'll be in touch promptly.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                >
                  <ShieldCheck size={18} style={{ color: "#F5A623" }} />
                </div>
                <span
                  className="text-sm text-blue-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Licensed, Insured &amp; Bonded in Texas
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                >
                  <CheckCircle size={18} style={{ color: "#F5A623" }} />
                </div>
                <span
                  className="text-sm text-blue-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Background-Checked Technicians
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                >
                  <Zap size={18} style={{ color: "#F5A623" }} />
                </div>
                <span
                  className="text-sm text-blue-100"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  15+ Years Serving Houston &amp; Katy, TX
                </span>
              </div>
            </div>
          </div>

          <div>
            <SecurityLightingClient showForm />
          </div>
        </div>
      </Section>

      <Footer address="Katy, TX — Serving Greater Houston & Surrounding Areas" />
    </>
  );
}