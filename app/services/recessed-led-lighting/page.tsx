import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import RecessedLEDLightingClient, { ServiceAreaGrid } from "./RecessedLEDLightingClient";

export const metadata: Metadata = {
  title: "Recessed LED Lighting Installation | ENE Electrical Houston TX",
  description:
    "Upgrade your home with recessed LED lighting installed by ENE Electrical. Licensed electricians serving Houston & Katy, TX. Energy-efficient, beautiful results. Book now.",
  alternates: {
    canonical: "/services/recessed-led-lighting",
  },
};

const faqData = [
  {
    question: "Can ENE Electrical add recessed lighting to existing rooms without major renovation?",
    answer:
      "Yes. ENE Electrical's licensed electricians are experienced in retrofitting recessed LED lighting into existing ceilings with minimal disruption to your home.",
  },
  {
    question: "Do you install dimmer switches with recessed lighting?",
    answer:
      "Yes. ENE Electrical can integrate dimmer switches compatible with your LED fixtures for full ambiance control.",
  },
  {
    question: "Are your electricians licensed for interior wiring in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded in Texas with background-checked technicians and 15+ years of residential electrical experience.",
  },
  {
    question: "What areas in Houston do you serve for recessed lighting installation?",
    answer:
      "We serve Katy, Houston, Cinco Ranch, Fulshear, Energy Corridor, Memorial, Spring Branch, Westchase, Southwest Houston, Brookshire, and Richmond, TX.",
  },
];

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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Recessed LED Lighting Installation",
  description:
    "Professional recessed LED lighting installation for residential homeowners in Houston and Katy, TX. ENE Electrical handles layout planning, wiring, fixture installation, and dimmer integration.",
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
    "Energy Corridor",
    "Memorial",
    "Spring Branch",
    "Westchase",
    "Southwest Houston",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  serviceType: "Recessed LED Lighting Installation",
};

export default function RecessedLEDLightingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Recessed LED Lighting", href: "/services/recessed-led-lighting" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative w-full min-h-[560px] md:min-h-[680px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7545498/pexels-photo-7545498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Modern kitchen interior with bright recessed LED lighting illuminating countertops and cabinetry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/90 via-[#0B1F3A]/70 to-[#0B1F3A]/30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                Residential Lighting Upgrade
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Recessed LED{" "}
                <span style={{ color: "#F5A623" }}>Lighting Installation</span>
              </h1>
              <p
                className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Transform any room with clean, modern recessed lighting. ENE Electrical's licensed electricians deliver flawless installations, from layout to dimmer integration, across Houston and Katy, TX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/appointment-booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif", boxShadow: "0 4px 20px rgba(245,166,35,0.45)" }}
                >
                  Schedule Installation
                </a>
                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white text-white hover:bg-white hover:text-[#0B1F3A] transition-all duration-200 active:scale-95"
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

      {/* Quick Answer / Intro */}
      <Section background="white" spacing="md">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-6 md:p-8 border-l-4"
            style={{ backgroundColor: "#F7F8FA", borderLeftColor: "#F5A623" }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Quick Answer
            </span>
            <h2
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              What Is Recessed LED Lighting Installation?
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
            >
              ENE Electrical provides professional recessed LED lighting installation for residential homeowners in Houston and Katy, TX. Our licensed electricians handle layout planning, wiring, fixture installation, and dimmer integration for kitchens, living rooms, hallways, and more. With 15+ years of experience, ENE Electrical delivers energy-efficient, aesthetically polished lighting upgrades throughout the Houston and Katy metro area.
            </p>
          </div>
        </div>
      </Section>

      {/* Trust Badge Bar */}
      <section style={{ backgroundColor: "#0B1F3A" }} className="w-full py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Licensed", icon: "🏅" },
              { label: "Insured", icon: "🛡️" },
              { label: "Bonded", icon: "🔐" },
              { label: "Background-Checked Technicians", icon: "✅" },
              { label: "15+ Years Experience", icon: "⭐" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <span className="text-2xl" role="img" aria-hidden="true">{badge.icon}</span>
                <span
                  className="text-xs font-semibold uppercase tracking-wide text-white"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Recessed LED Lighting */}
      <Section background="default" spacing="lg">
        <SectionHeading
          eyebrow="Why Upgrade"
          title="Benefits of Recessed LED Lighting"
          subtitle="Discover why Houston-area homeowners choose recessed LED lighting for their interior upgrades."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "💡",
              title: "Energy Efficiency",
              description:
                "LED fixtures use up to 75% less energy than traditional incandescent bulbs, significantly reducing your monthly electricity bills.",
            },
            {
              icon: "🏡",
              title: "Elevated Aesthetics",
              description:
                "Recessed lighting delivers a sleek, modern look that eliminates clutter and complements any interior design style.",
            },
            {
              icon: "📈",
              title: "Increased Home Value",
              description:
                "Professional lighting upgrades are a proven return-on-investment, making your home more attractive to future buyers.",
            },
            {
              icon: "🌟",
              title: "Uniform Illumination",
              description:
                "Strategically placed recessed lights eliminate dark corners and shadows for consistent, comfortable lighting throughout every room.",
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <span className="text-3xl mb-4 block" role="img" aria-hidden="true">{benefit.icon}</span>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {benefit.title}
              </h3>
              <div className="w-10 h-0.5 rounded-full mb-3" style={{ backgroundColor: "#F5A623" }} aria-hidden="true" />
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* What We Install */}
      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Our Services"
          title="What We Install"
          subtitle="ENE Electrical installs a wide range of recessed lighting fixtures tailored to your home's needs and aesthetic."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Can Lights",
              description:
                "Classic recessed can lights (4\", 5\", 6\") that provide broad, even illumination ideal for living rooms, kitchens, and hallways.",
              rooms: "Kitchens, Living Rooms, Hallways",
            },
            {
              title: "Gimbal / Adjustable Fixtures",
              description:
                "Directional recessed fixtures that can be angled to highlight artwork, architectural features, or task areas with focused light.",
              rooms: "Home Offices, Dining Rooms, Galleries",
            },
            {
              title: "Wafer / Ultra-Slim Lights",
              description:
                "Low-profile wafer lights perfect for rooms with shallow ceiling cavities or where minimal ceiling intrusion is desired.",
              rooms: "Basements, Bathrooms, Tight Spaces",
            },
            {
              title: "Dimmer-Compatible Setups",
              description:
                "Full dimmer integration with compatible LED drivers and switches so you can set the perfect ambiance for any occasion.",
              rooms: "All Rooms",
            },
            {
              title: "Kitchen Lighting",
              description:
                "Task-focused recessed lighting over countertops and islands, optimized for work areas with proper spacing and beam angles.",
              rooms: "Kitchens, Pantries",
            },
            {
              title: "Bathroom & Vanity Lighting",
              description:
                "Moisture-rated recessed fixtures for bathrooms that meet code requirements while delivering bright, flattering illumination.",
              rooms: "Bathrooms, Laundry Rooms",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 border border-gray-100 bg-[#F7F8FA] hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#0B1F3A" }}
                aria-hidden="true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.description}
              </p>
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: "#F5A62322", color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                {item.rooms}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Our Installation Process */}
      <Section background="primary" spacing="lg">
        <SectionHeading
          eyebrow="How It Works"
          title="Our Installation Process"
          subtitle="From initial layout planning to the final walkthrough, ENE Electrical handles every step with precision and care."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Layout Planning",
              description:
                "We assess your room dimensions, ceiling height, and intended use to design an optimal lighting layout with ideal fixture spacing and beam angles.",
            },
            {
              step: "02",
              title: "Ceiling Cutting",
              description:
                "Our electricians precisely cut openings in your ceiling using templates that match your chosen fixtures, ensuring clean, accurate holes.",
            },
            {
              step: "03",
              title: "Wiring & Circuit Work",
              description:
                "We run all necessary wiring through your attic or walls to each fixture location, connecting to your electrical panel safely and to code.",
            },
            {
              step: "04",
              title: "Fixture Installation",
              description:
                "Each recessed fixture is carefully installed, secured, and aligned flush with your ceiling for a seamless, professional finish.",
            },
            {
              step: "05",
              title: "Dimmer Integration",
              description:
                "We install and configure compatible dimmer switches, test all dimmers with your LED fixtures, and ensure smooth, flicker-free operation.",
            },
            {
              step: "06",
              title: "Final Walkthrough",
              description:
                "We walk you through the completed installation, demonstrate all controls, answer your questions, and clean up before we leave.",
            },
          ].map((step) => (
            <div
              key={step.step}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span
                className="absolute top-4 right-4 text-5xl font-bold opacity-10 select-none"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
                aria-hidden="true"
              >
                {step.step}
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-bold"
                style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {step.step}
              </div>
              <h3
                className="text-lg font-bold mb-2 text-white"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.75)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Before & After / Visual Showcase */}
      <Section background="default" spacing="lg">
        <SectionHeading
          eyebrow="Real Transformations"
          title="Before & After Showcase"
          subtitle="See how recessed LED lighting transforms Houston-area homes, from dull and dim to bright and modern."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              room: "Kitchen",
              before: "Single overhead fixture with harsh shadows over countertops",
              after: "6 recessed LED downlights with dimmer, providing bright, even task lighting",
              imageSrc: "https://images.pexels.com/photos/15580481/pexels-photo-15580481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              imageAlt: "Modern kitchen with newly installed recessed LED lighting illuminating countertops evenly",
            },
            {
              room: "Living Room",
              before: "Floor lamps and one ceiling fan light creating uneven lighting",
              after: "8 recessed LED lights on dimmer, perfect ambiance for any occasion",
              imageSrc: "https://images.pexels.com/photos/7166933/pexels-photo-7166933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              imageAlt: "Comfortable living room interior with warm recessed LED lighting creating even illumination",
            },
            {
              room: "Hallway",
              before: "Single bulb fixture leaving ends of hallway dark",
              after: "3 slim wafer LED lights, fully illuminated, modern look",
              imageSrc: "https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              imageAlt: "Well-lit home hallway with evenly spaced recessed LED wafer lights in the ceiling",
            },
          ].map((showcase) => (
            <div
              key={showcase.room}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={showcase.imageSrc}
                  alt={showcase.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {showcase.room}
                </span>
              </div>
              <div className="p-5">
                <div className="flex flex-col gap-3">
                  <div>
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif" }}
                    >
                      Before
                    </span>
                    <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      {showcase.before}
                    </p>
                  </div>
                  <div className="w-full h-px bg-gray-100" aria-hidden="true" />
                  <div>
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                    >
                      After
                    </span>
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
                    >
                      {showcase.after}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Service Area Callout */}
      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Local Service"
          title="Serving Houston & Katy, TX"
          subtitle="Homeowners across the Greater Houston metro are upgrading to recessed LED lighting with ENE Electrical."
          align="center"
        />
        <div
          className="rounded-2xl p-6 md:p-10 mb-8"
          style={{ backgroundColor: "#F7F8FA" }}
        >
          <p className="text-base leading-relaxed text-center mb-8 max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}>
            Homeowners across Houston and Katy, TX are upgrading to recessed LED lighting to modernize interiors and reduce energy costs. ENE Electrical serves the following communities with expert recessed lighting installations that enhance comfort and home value.
          </p>
          <ServiceAreaGrid />
        </div>
        <p className="text-center text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Don't see your area?{" "}
          <a href="/contact-us" className="font-semibold underline" style={{ color: "#F5A623" }}>
            Contact us
          </a>{" "}
          and we may still serve your neighborhood.
        </p>
      </Section>

      {/* Testimonials Carousel (interactive) */}
      <RecessedLEDLightingClient />

      {/* FAQ Accordion */}
      <Section background="white" spacing="lg" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Recessed LED Lighting FAQs"
          subtitle="Get answers to the most common questions about recessed LED lighting installation in Houston and Katy, TX."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="group mb-4 rounded-2xl border border-gray-200 bg-[#F7F8FA] overflow-hidden"
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 list-none"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <h3
                  className="text-base font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {faq.question}
                </h3>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-45"
                  style={{ backgroundColor: "#F5A623" }}
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section
        className="w-full py-16 md:py-24 relative overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #F5A623 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(245,166,35,0.2)", color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Ready to Upgrade?
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Book Your Recessed Lighting{" "}
            <span style={{ color: "#F5A623" }}>Consultation Today</span>
          </h2>
          <p
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Join hundreds of Houston-area homeowners who have upgraded their homes with professional recessed LED lighting from ENE Electrical. Licensed, insured, and background-checked technicians ready to serve you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest shadow-xl transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 24px rgba(245,166,35,0.45)",
              }}
            >
              Book Lighting Consultation
            </a>
            <a
              href="tel:+18327830303"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest border-2 border-white text-white hover:bg-white hover:text-[#0B1F3A] transition-all duration-200 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l1-1a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.81.72a2 2 0 0 1 1.72 2.04z"/></svg>
              Call Us Now
            </a>
          </div>
          <p className="mt-8 text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
            ENE Electrical · Katy, TX 77494 · Serving Greater Houston Metro
          </p>
        </div>
      </section>

      <VanCta
        heading={
          <>
            Ready to Upgrade Your{" "}
            <span style={{ color: "#F5A623" }}>Houston or Katy Home?</span>
          </>
        }
        description="From sleek can lights in the kitchen to soft accent lighting in the living room, ENE Electrical designs and installs recessed LED lighting that transforms your space while cutting your energy costs. We serve homeowners across Houston, Katy, and surrounding communities with clean, code-compliant installations."
      />

      <Footer />
    </>
  );
}