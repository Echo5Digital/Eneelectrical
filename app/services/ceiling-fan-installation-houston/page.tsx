import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import CeilingFanClient from "./CeilingFanClient";
import {
  ShieldCheck,
  Zap,
  Eye,
  Home,
  Fan,
  Wrench,
  ClipboardList,
  CheckCircle,
  MapPin,
  Cable,
  Lightbulb,
  Gauge,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ceiling Fan Installation Houston & Katy TX | ENE Electrical",
  description:
    "Professional ceiling fan installation and replacement in Houston & Katy, TX. Licensed electricians handle wiring, mounting, and no-existing-wiring jobs. Get a quote today.",
  alternates: {
    canonical: "/services/ceiling-fan-installation-houston",
  },
};

const faqData = [
  {
    question: "How much does ceiling fan installation cost in Houston?",
    answer:
      "Ceiling fan installation cost in the Houston area typically depends on whether existing wiring and a fan-rated electrical box are already in place. Straightforward replacements are more affordable, while installations requiring new wiring, a new switch, or a fan-rated box cost more. ENE Electrical provides a clear, upfront quote before any work begins.",
  },
  {
    question: "Can you install a ceiling fan where there's no existing wiring?",
    answer:
      "Yes. ENE Electrical's licensed electricians can run new wiring, install a dedicated switch, and mount a fan-rated electrical box in rooms that don't already have a ceiling fixture, ensuring the installation is safe and code-compliant.",
  },
  {
    question: "Do I need an electrician to install a ceiling fan?",
    answer:
      "While some fans can technically be hung without an electrician, a licensed electrician ensures the electrical box is properly rated to support the fan's weight and motion, the wiring is correct, and the installation meets Texas electrical code, protecting your home and family.",
  },
  {
    question: "Which Houston-area communities do you serve for ceiling fan installation?",
    answer:
      "We install and replace ceiling fans for homeowners in Katy, Houston, Cinco Ranch, Fulshear, Energy Corridor, Southwest Houston, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ceiling Fan Installation",
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
    "Professional residential ceiling fan installation and replacement, including new wiring for rooms without existing fixtures, fan-rated box installation, and outdoor-rated fan mounting. Licensed, insured, and bonded electricians with 15+ years of experience.",
  serviceType: "Ceiling Fan Installation",
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

const fanServices = [
  {
    icon: Fan,
    title: "New Ceiling Fan Installation",
    description:
      "Professional mounting and wiring for new ceiling fans in bedrooms, living rooms, and outdoor covered patios, with proper support and balance for quiet, safe operation.",
  },
  {
    icon: Wrench,
    title: "Ceiling Fan Replacement",
    description:
      "Removing an old or broken fan and installing a new one, including checking that the existing electrical box and wiring meet current safety standards.",
  },
  {
    icon: Cable,
    title: "Wiring for Rooms Without Existing Fixtures",
    description:
      "Running new circuits and installing a fan-rated electrical box in rooms that never had a ceiling fixture, so you can add a fan anywhere in your home.",
  },
  {
    icon: Gauge,
    title: "Outdoor & Covered Patio Fans",
    description:
      "Installation of damp- and wet-rated ceiling fans for covered patios, porches, and outdoor living spaces, wired to withstand Houston's humidity and heat.",
  },
  {
    icon: Lightbulb,
    title: "Fans with Integrated Lighting",
    description:
      "Installation of combination fan-and-light fixtures, including dimmer and remote-control compatible switches for full control from one wall panel.",
  },
];

const processSteps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Room & Wiring Assessment",
    description:
      "Our licensed electrician checks your ceiling structure, existing wiring, and electrical box to determine what's needed for a safe, secure installation.",
  },
  {
    step: "02",
    icon: Fan,
    title: "Fan & Fixture Review",
    description:
      "We confirm your fan is rated for its intended location, whether indoor, covered outdoor, or wet-rated, and compatible with your desired switch or remote controls.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Wiring & Box Installation",
    description:
      "We install or upgrade the electrical box to a fan-rated support, run any new wiring needed, and ensure every connection meets Texas electrical code.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Mounting & Balancing",
    description:
      "The fan is securely mounted, balanced, and tested at multiple speeds to eliminate wobble and ensure quiet, stable operation for years to come.",
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Testing & Walkthrough",
    description:
      "We test all fan speeds, lighting, and remote or wall controls, then walk you through operation and maintenance before we leave.",
  },
];

const serviceAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear", href: "/service-areas/fulshear-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Brookshire", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const testimonials = [
  {
    quote:
      "ENE Electrical installed ceiling fans in three bedrooms for us in Katy, including one room that never had a fixture before. Clean wiring, no wobble, and they left everything tidy.",
    authorName: "Rebecca H.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "We needed an outdoor-rated fan for our covered patio in Cinco Ranch. The team knew exactly what fan rating we needed and had it running the same afternoon.",
    authorName: "Marcus D.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "Replaced two old, noisy ceiling fans with new ones with remote controls. Professional, on time, and explained the whole process before starting.",
    authorName: "Priya S.",
    authorLocation: "Memorial, Houston TX",
    rating: 5,
  },
  {
    quote:
      "Licensed and background-checked, exactly what we wanted for work in our home. Our new bedroom fan is quiet, balanced, and looks great.",
    authorName: "Tom W.",
    authorLocation: "Westchase, Houston TX",
    rating: 5,
  },
];

export default function CeilingFanInstallationPage() {
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

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-2 lg:pt-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Ceiling Fan Installation", href: "/services/ceiling-fan-installation-houston" },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Ceiling fan installation hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/cellingfan.png"
            alt="ENE Electrical technician installing a ceiling fan in a Houston-area home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/75 to-[#0B1F3A]/20" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Residential Ceiling Fan Installation
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Ceiling Fan Installation for{" "}
                <span style={{ color: "#F5A623" }}>Houston & Katy, TX Homes</span>
              </h1>
              <p
                className="text-lg text-blue-100 leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical installs and replaces ceiling fans throughout
                Houston and Katy, TX, including rooms with no existing wiring.
                Our licensed, insured, and bonded electricians ensure every fan
                is safely mounted, properly wired, and balanced for quiet,
                reliable operation.
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
              ENE Electrical installs and replaces residential ceiling fans
              for homeowners in Houston and Katy, TX, including indoor
              bedroom and living room fans, outdoor-rated patio fans, and
              installations in rooms without existing wiring. Our licensed
              and insured electricians install a properly rated electrical
              box, run any needed wiring, and mount and balance each fan for
              safe, quiet operation. ENE Electrical has{" "}
              <strong>15+ years of experience</strong> serving Houston-area
              homeowners with code-compliant, professionally installed
              ceiling fans.
            </p>
          </div>
        </div>
      </Section>

      {/* ── TRUST BADGE BAR ── */}
      <Section background="primary" spacing="sm" maxWidth="2xl">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {trustBadges.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2.5">
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

      {/* ── WHY PROFESSIONAL INSTALLATION MATTERS ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Why It Matters"
          title="Why Ceiling Fan Installation Needs a Licensed Electrician"
          subtitle="A ceiling fan is heavier and moves more than a standard light fixture, so proper support and wiring are essential for safety."
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
              Properly Rated Support
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Standard light fixture boxes aren't built to handle a moving
              ceiling fan's weight and vibration. We install fan-rated
              electrical boxes so your fan stays securely mounted for years.
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
              Correct Wiring & Controls
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Fans with lights, remotes, or wall-mounted speed controls need
              correct wiring to function properly. We wire each fan to match
              exactly how you want to control it.
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
              Year-Round Comfort
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              A properly installed ceiling fan improves airflow and comfort
              in Houston's heat while helping reduce strain on your air
              conditioning system throughout the year.
            </p>
          </div>
        </div>

        {/* Supporting image */}
        <div className="mt-14 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/6580238/pexels-photo-6580238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Electrician installing a ceiling fan in a Houston-area home"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </Section>

      {/* ── CEILING FAN SERVICES ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Our Services"
          title="Ceiling Fan Installation Services We Offer"
          subtitle="From simple replacements to new wiring in fan-free rooms, ENE Electrical handles every type of residential ceiling fan installation."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fanServices.map((service) => (
            <Card
              key={service.title}
              variant="service"
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>

      {/* ── INSTALLATION PROCESS ── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Ceiling Fan Installation Process"
          subtitle="From assessment to final testing, we handle every step of your ceiling fan installation with care."
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
              Ceiling Fan Installation Across the Houston Metro
            </h2>
            <div className="h-1 w-14 rounded-full mb-6" style={{ backgroundColor: "#F5A623" }} />
            <p
              className="text-base text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Houston and Katy, TX homeowners trust ENE Electrical for
              ceiling fan installations that improve comfort and airflow
              year-round. We serve the full Houston and Katy metro, including
              Cinco Ranch, Fulshear, Memorial, Spring Branch, and Westchase,
              with fan installations tailored to each home's wiring and
              ceiling structure.
            </p>
            <address className="not-italic mb-6">
              <p
                className="flex items-center gap-2 text-sm text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MapPin size={16} style={{ color: "#F5A623" }} />
                <span>ENE Electrical, Katy, TX 77494</span>
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
              src="/cellingfan.png"
              alt="ENE Electrical technician installing a ceiling fan for a Houston-area home"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Homeowners Say About Our Fan Installations"
          subtitle="Real feedback from Houston and Katy-area residents who had ceiling fans installed by ENE Electrical."
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
          title="Ceiling Fan Installation FAQs"
          subtitle="Answers to the questions we hear most often from Houston-area homeowners."
          align="center"
        />
        <CeilingFanClient faqData={faqData} />
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
              Schedule Your Ceiling Fan Installation
            </h2>
            <div className="h-1 w-14 rounded-full mb-6" style={{ backgroundColor: "#F5A623" }} />
            <p
              className="text-blue-100 text-base leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ready to add or replace a ceiling fan in your Houston or Katy
              home? Our licensed electricians will assess your space and
              provide a clear, no-obligation quote. Call us or submit the
              form and we'll be in touch promptly.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                >
                  <ShieldCheck size={18} style={{ color: "#F5A623" }} />
                </div>
                <span className="text-sm text-blue-100" style={{ fontFamily: "Inter, sans-serif" }}>
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
                <span className="text-sm text-blue-100" style={{ fontFamily: "Inter, sans-serif" }}>
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
                <span className="text-sm text-blue-100" style={{ fontFamily: "Inter, sans-serif" }}>
                  15+ Years Serving Houston &amp; Katy, TX
                </span>
              </div>
            </div>
          </div>

          <div>
            <CeilingFanClient showForm />
          </div>
        </div>
      </Section>

      <Footer address="Katy, TX, Serving Greater Houston & Surrounding Areas" />
    </>
  );
}
