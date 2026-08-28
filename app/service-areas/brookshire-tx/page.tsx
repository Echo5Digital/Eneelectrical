import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrookshireClient from "./BrookshireClient";

export const metadata: Metadata = {
  title: "Electrician in Brookshire TX | ENE Electrical",
  description:
    "ENE Electrical serves Brookshire, TX with licensed residential electrical services — repairs, panel upgrades, generators, EV chargers & emergency electrician. Based in nearby Katy, TX.",
  alternates: {
    canonical: "/service-areas/brookshire-tx",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical service Brookshire, TX?",
    answer:
      "Yes. Brookshire, TX is included in ENE Electrical's service area, which spans the Houston and Katy metro. ENE Electrical operates from nearby Katy, TX 77494.",
  },
  {
    question: "Can ENE Electrical install a whole-home generator in Brookshire?",
    answer:
      "Yes. Whole-home generator installation is one of ENE Electrical's core residential services, available to homeowners in Brookshire and across the Houston-Katy metro.",
  },
  {
    question: "Is there an additional charge for traveling to Brookshire from Katy?",
    answer:
      "For specific pricing information, please contact ENE Electrical directly. Brookshire is within the standard service area served from the Katy, TX 77494 location.",
  },
  {
    question: "What makes ENE Electrical a trustworthy choice in Brookshire?",
    answer:
      "ENE Electrical is licensed, insured, and bonded with background-checked technicians and 15+ years of residential electrical experience serving the Houston and Katy metro area.",
  },
];

const faqSchemaData = {
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

const serviceSchemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Residential Electrical Services",
  provider: {
    "@type": "LocalBusiness",
    name: "ENE Electrical",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77494",
      addressCountry: "US",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Brookshire",
    containedInPlace: {
      "@type": "State",
      name: "Texas",
    },
  },
  description:
    "ENE Electrical provides licensed residential electrical services to Brookshire, TX homeowners including electrical repairs, panel upgrades, generator installation, EV charger installation, lighting services, and 24/7 emergency electrical response.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Panel Upgrade" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrician" } },
    ],
  },
};

export default function BrookshireTXPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaData) }}
      />

      <Header />

      <div className="bg-[#F7F8FA] px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas/houston-tx" },
            { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/8278494/pexels-photo-8278494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Residential neighborhood in Brookshire, TX"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.15)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
                border: "1px solid rgba(245,166,35,0.3)",
              }}
            >
              Service Area — Brookshire, TX
            </span>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Licensed Electrician in{" "}
              <span style={{ color: "#F5A623" }}>Brookshire, TX</span>
            </h1>
            <p
              className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical brings 15+ years of licensed residential electrical expertise directly to Brookshire homeowners — from repairs and panel upgrades to generators and EV chargers. Based in nearby Katy, TX 77494.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                Book Appointment
              </a>
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer / AEO Block */}
      <section
        className="w-full border-l-4 border-[#F5A623]"
        style={{ backgroundColor: "#EEF4FF" }}
        aria-label="Quick Answer"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
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
            <strong>ENE Electrical</strong> is a licensed, insured, and bonded residential electrical contractor serving{" "}
            <strong>Brookshire, TX</strong> and the greater Katy-Houston metro area. Based in Katy, TX 77494, ENE Electrical provides
            Brookshire homeowners with electrical repairs, panel upgrades, generator installation, EV charger installation, lighting
            services, and 24/7 emergency electrical response with{" "}
            <strong>15+ years of experience</strong>.
          </p>
        </div>
      </section>

      {/* Trust Badge Bar */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Trust credentials"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: "Licensed", icon: "🏆" },
              { label: "Insured", icon: "🛡️" },
              { label: "Bonded", icon: "🔒" },
              { label: "Background-Checked Technicians", icon: "✅" },
              { label: "15+ Years Experience", icon: "⭐" },
            ].map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <span className="text-xl" aria-hidden="true">{badge.icon}</span>
                <span className="text-white text-sm font-bold uppercase tracking-wide">
                  {badge.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services Available in Brookshire */}
      <Section background="white" spacing="lg" maxWidth="2xl" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Residential Electrical Services in Brookshire, TX"
          subtitle="ENE Electrical provides comprehensive residential electrical services to Brookshire homeowners — from routine repairs to full generator installations."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Electrical Repair & Installation",
              description:
                "Fast, reliable repairs for outlets, switches, wiring, and new electrical installations throughout your Brookshire home.",
              href: "/services/electrical-repair-installation",
            },
            {
              title: "Electrical Panel Upgrade",
              description:
                "Upgrade your home's electrical panel for safer, more reliable power — essential for growing families and older Brookshire homes.",
              href: "/services/electrical-panel-upgrade",
            },
            {
              title: "Generator Installation",
              description:
                "Whole-home standby generator installation ideal for Brookshire's rural properties — stay powered through any outage.",
              href: "/services/generator-installation",
            },
            {
              title: "EV Charger Installation",
              description:
                "Level 2 home EV charger installation for Brookshire homeowners driving electric vehicles — convenient and fast charging at home.",
              href: "/services/ev-charger-installation",
            },
            {
              title: "Security Lighting",
              description:
                "Enhance safety around your Brookshire property with professionally installed motion-sensor and security lighting systems.",
              href: "/services/security-lighting",
            },
            {
              title: "Recessed LED Lighting",
              description:
                "Modernize your home's interior with energy-efficient recessed LED lighting — expert installation for any room.",
              href: "/services/recessed-led-lighting",
            },
            {
              title: "New Construction Wiring",
              description:
                "Complete electrical wiring for new construction homes and additions in Brookshire and surrounding subdivisions.",
              href: "/services/new-construction-wiring",
            },
            {
              title: "Electrical Inspection",
              description:
                "Comprehensive home electrical inspections for Brookshire buyers, sellers, or homeowners concerned about safety.",
              href: "/services/electrical-inspection",
            },
            {
              title: "Emergency Electrician",
              description:
                "24/7 emergency electrical response for Brookshire homeowners — power outages, sparking wires, and urgent repairs.",
              href: "/services/emergency-electrician",
            },
          ].map((service) => (
            <article
              key={service.title}
              className="bg-white rounded-[0.75rem] border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
            >
              <div
                className="w-10 h-1 rounded-full mb-4"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              />
              <h3
                className="text-lg font-bold mb-2 text-[#0B1F3A]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm text-gray-500 leading-relaxed flex-grow mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {service.description}
              </p>
              <a
                href={service.href}
                className="self-start text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-75 flex items-center gap-1"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </Section>

      {/* Why Brookshire Homeowners Choose ENE Electrical */}
      <Section background="default" spacing="lg" maxWidth="2xl" id="why-ene">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Serving Brookshire
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Why Brookshire Homeowners Choose ENE Electrical
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <div
              className="space-y-4 text-[#1A2530] text-base leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <p>
                Brookshire, TX sits along I-10 just west of Katy — a small city where rural character meets growing residential development. Homeowners here often manage larger properties, aging electrical systems, and the very real need for reliable backup power when storms roll through.
              </p>
              <p>
                ENE Electrical is based in <strong>Katy, TX 77494</strong>, making Brookshire a natural part of our service area. Our licensed technicians regularly serve the Houston-Katy corridor, bringing the same level of professionalism to Brookshire that west Houston homeowners have relied on for over 15 years.
              </p>
              <p>
                Whether you need a generator to protect your rural property, a panel upgrade for an older home, or a new EV charger in your garage, ENE Electrical delivers dependable workmanship backed by full licensing, insurance, and bonding — and technicians who have passed thorough background checks.
              </p>
            </div>
          </div>
          <div className="relative rounded-[0.75rem] overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Licensed ENE Electrical technician inspecting a residential electrical panel"
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{ backgroundColor: "rgba(11,31,58,0.88)" }}
            >
              <p
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Serving Brookshire from our Katy, TX 77494 base
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Local Relevance Section */}
      <Section background="primary" spacing="md" maxWidth="2xl" id="local-relevance">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <div
              className="w-14 h-14 rounded-[0.75rem] flex items-center justify-center"
              style={{ backgroundColor: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)" }}
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Serving Brookshire, TX
            </h2>
            <p
              className="text-blue-100 text-base leading-relaxed max-w-3xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Brookshire, TX is a small city west of Katy along I-10, home to a mix of rural properties and growing residential subdivisions. ENE Electrical, based in{" "}
              <strong className="text-white">Katy, TX 77494</strong>, serves Brookshire homeowners with licensed residential electrical services including generator installation for rural properties, panel upgrades, new construction wiring, and emergency electrical response across the Houston and Katy metro service area.
            </p>
          </div>
        </div>
      </Section>

      {/* Stat Counters */}
      <BrookshireClient />

      {/* Testimonials */}
      <Section background="default" spacing="lg" maxWidth="2xl" id="testimonials">
        <SectionHeading
          eyebrow="What Customers Say"
          title="Trusted by West Houston & Katy Area Homeowners"
          subtitle="Hear from homeowners across the Katy-Houston metro who have experienced ENE Electrical's licensed service firsthand."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            variant="testimonial"
            quote="ENE Electrical upgraded our electrical panel and installed a whole-home generator. Professional from start to finish — on time, clean work, and fully explained everything. Highly recommend for any homeowner in the area."
            authorName="Marcus T."
            authorLocation="Katy, TX"
            rating={5}
          />
          <Card
            variant="testimonial"
            quote="We had an emergency at 10 PM — circuit breaker kept tripping. ENE Electrical sent someone out quickly and had us sorted within an hour. Couldn't ask for better service."
            authorName="Sandra R."
            authorLocation="Fulshear, TX"
            rating={5}
          />
          <Card
            variant="testimonial"
            quote="Installed two EV chargers in our garage and ran new circuits perfectly. Great price, licensed and insured, and the technician was courteous and background-checked. Will use again."
            authorName="David L."
            authorLocation="West Houston, TX"
            rating={5}
          />
        </div>
      </Section>

      {/* Google Maps Embed */}
      <Section background="white" spacing="md" maxWidth="2xl" id="location">
        <SectionHeading
          eyebrow="Location"
          title="Brookshire, TX — In Our Service Area"
          subtitle="ENE Electrical is based in Katy, TX 77494, just a short drive from Brookshire along I-10."
          align="center"
        />
        <div className="rounded-[0.75rem] overflow-hidden shadow-lg border border-gray-100" style={{ height: "400px" }}>
          <iframe
            title="Brookshire TX map showing proximity to Katy TX"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55608.40!2d-96.0!3d29.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86412d1c6e9d7c0b%3A0x1234567890abcdef!2sBrookshire%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Map showing Brookshire, TX location near Katy, TX"
          />
        </div>
        <p
          className="text-center text-sm text-gray-500 mt-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          ENE Electrical — Based in <strong>Katy, TX 77494</strong> · Serving Brookshire and the greater Houston metro
        </p>
      </Section>

      {/* Service Area Neighbor Links */}
      <Section background="default" spacing="md" maxWidth="2xl" id="nearby-areas">
        <SectionHeading
          eyebrow="Also Serving"
          title="Nearby Service Areas"
          subtitle="ENE Electrical serves communities throughout the Houston and Katy metro. Explore adjacent service areas below."
          align="center"
        />
        <nav aria-label="Nearby service area links">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Katy, TX", href: "/service-areas/katy-tx" },
              { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
              { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
              { label: "Houston, TX", href: "/service-areas/houston-tx" },
              { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
            ].map((area) => (
              <li key={area.href}>
                <a
                  href={area.href}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-[0.75rem] bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F5A623] transition-all duration-200 text-[#0B1F3A] text-sm font-semibold text-center"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {area.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {/* FAQ Accordion */}
      <Section background="white" spacing="lg" maxWidth="xl" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="FAQ — ENE Electrical in Brookshire, TX"
          subtitle="Answers to the most common questions from Brookshire homeowners about ENE Electrical's service availability and offerings."
          align="center"
        />
        <BrookshireFAQ faqData={faqData} />
      </Section>

      {/* CTA Section */}
      <section
        className="w-full relative overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F5A623" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              border: "1px solid rgba(245,166,35,0.3)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Ready to Get Started?
          </span>
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Schedule Your Brookshire Electrical Service Today
          </h2>
          <p
            className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is licensed, insured, bonded, and ready to serve Brookshire, TX homeowners. Contact us today to book an appointment or ask about our residential electrical services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              Book Appointment
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Inline server-renderable FAQ component (no interactivity needed at page level — accordion handled in client)
function BrookshireFAQ({ faqData }: { faqData: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-[0.75rem] bg-[#F7F8FA] overflow-hidden"
        >
          <details className="group">
            <summary
              className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <span className="font-bold text-[#0B1F3A] text-base pr-4">
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-open:rotate-45"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </span>
            </summary>
            <div
              className="px-6 pb-5 text-sm text-[#1A2530] leading-relaxed border-t border-gray-200 pt-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.answer}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}