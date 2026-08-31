import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import ElectricalRepairClient from "./ElectricalRepairClient";
import {
  AlertTriangle,
  Zap,
  ToggleLeft,
  Cable,
  CircuitBoard,
  PlugZap,
  Fan,
  Lightbulb,
  Shield,
  BadgeCheck,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electrical Repair & Installation | ENE Electrical Houston",
  description:
    "ENE Electrical provides expert residential electrical repair and installation in Houston & Katy, TX. Licensed, insured, bonded, with 15+ years experience. Book your service today.",
  alternates: {
    canonical: "/services/electrical-repair-installation",
  },
};

const faqData = [
  {
    question: "What types of electrical repairs does ENE Electrical handle?",
    answer:
      "ENE Electrical handles a wide range of residential electrical repairs including outlets, switches, wiring issues, tripping breakers, and other common home electrical problems in Houston and Katy, TX.",
  },
  {
    question: "Is ENE Electrical licensed to perform electrical work in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded in Texas, with all technicians being background-checked.",
  },
  {
    question:
      "How do I schedule an electrical repair or installation with ENE Electrical?",
    answer:
      "You can book an appointment online through ENE Electrical's website or reach out via the contact page to schedule your electrical repair or installation.",
  },
  {
    question:
      "Does ENE Electrical serve my neighborhood in the Houston area?",
    answer:
      "ENE Electrical serves Katy, TX and the broader Houston metro, including Energy Corridor, Southwest Houston, Cinco Ranch, Fulshear, Memorial, Spring Branch, Westchase, Brookshire, and Richmond, TX.",
  },
];

const repairProblems = [
  {
    icon: AlertTriangle,
    title: "Tripping Circuit Breakers",
    description:
      "Frequent breaker trips signal overloaded circuits or faulty wiring. Our technicians diagnose and resolve the root cause safely.",
  },
  {
    icon: PlugZap,
    title: "Dead or Faulty Outlets",
    description:
      "Non-functioning, sparking, or warm outlets are a safety hazard. We repair or replace outlets quickly to restore safe power.",
  },
  {
    icon: ToggleLeft,
    title: "Broken Switches",
    description:
      "Flickering lights or unresponsive switches often indicate wiring issues behind the wall. We fix or upgrade switches of all types.",
  },
  {
    icon: Cable,
    title: "Wiring Problems",
    description:
      "Outdated aluminum wiring, damaged cables, or improper connections are fire risks. We inspect and repair residential wiring to code.",
  },
  {
    icon: CircuitBoard,
    title: "Panel & Breaker Issues",
    description:
      "Buzzing panels, warm breakers, or frequent outages point to panel problems. ENE Electrical diagnoses and repairs electrical panels.",
  },
  {
    icon: Lightbulb,
    title: "Flickering Lights",
    description:
      "Persistent flickering can indicate loose connections, failing fixtures, or overloaded circuits. We trace and fix the source.",
  },
];

const installationServices = [
  {
    icon: PlugZap,
    title: "Outlet Installation",
    description:
      "New standard, GFCI, AFCI, and USB outlets installed wherever you need them, including kitchens, bathrooms, garages, and outdoor spaces.",
  },
  {
    icon: ToggleLeft,
    title: "Switch Installation",
    description:
      "Single-pole, 3-way, dimmer, and smart switches installed or upgraded throughout your home for full lighting control.",
  },
  {
    icon: Fan,
    title: "Ceiling Fan Installation",
    description:
      "Safe ceiling fan installation with proper wiring, bracing, and switch control, keeping your home comfortable year-round.",
  },
  {
    icon: Lightbulb,
    title: "Light Fixture Installation",
    description:
      "Chandeliers, pendant lights, vanity bars, and exterior fixtures installed with precision and the right electrical connections.",
  },
  {
    icon: CircuitBoard,
    title: "Dedicated Circuits",
    description:
      "New dedicated circuits added for appliances, home offices, EV chargers, or high-draw equipment to prevent overloads.",
  },
  {
    icon: Zap,
    title: "Whole-Home Electrical Work",
    description:
      "From small additions to full room wiring, ENE Electrical handles comprehensive residential electrical installation projects.",
  },
];

const trustSignals = [
  {
    icon: BadgeCheck,
    title: "Licensed, Insured & Bonded",
    description:
      "ENE Electrical is fully licensed, insured, and bonded in Texas, giving you complete peace of mind on every job.",
  },
  {
    icon: Shield,
    title: "Background-Checked Technicians",
    description:
      "Every ENE Electrical technician is background-checked before entering your home. Your safety is our top priority.",
  },
  {
    icon: Clock,
    title: "15+ Years of Experience",
    description:
      "With over 15 years serving the Houston metro, ENE Electrical brings deep expertise to every residential project.",
  },
  {
    icon: MapPin,
    title: "Local Houston & Katy Experts",
    description:
      "We're a local contractor who knows the Houston area codes, neighborhoods, and homeowner needs inside and out.",
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical fixed our tripping breaker and replaced three faulty outlets the same week I called. Fast, professional, and reasonably priced. Highly recommend!",
    authorName: "Maria G.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "The technician was on time, explained everything clearly, and installed four ceiling fans without a single issue. Great experience from start to finish.",
    authorName: "James R.",
    authorLocation: "Energy Corridor, Houston",
    rating: 5,
  },
  {
    quote:
      "We had flickering lights throughout the house for months. ENE Electrical found a loose connection in the panel and resolved it the same day. Excellent service!",
    authorName: "Sandra T.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
];

const serviceAreas = [
  "Katy, TX 77494",
  "Energy Corridor",
  "Cinco Ranch",
  "Fulshear",
  "Memorial",
  "Spring Branch",
  "Westchase",
  "Brookshire",
  "Richmond, TX",
  "Southwest Houston",
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Electrical Repair & Installation", href: "/services/electrical-repair-installation" },
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
  name: "Electrical Repair & Installation",
  description:
    "ENE Electrical provides expert residential electrical repair and installation services in Houston and Katy, TX. Services include fixing outlets, switches, wiring, and circuit breakers, as well as installing new electrical components throughout the home.",
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
  areaServed: [
    "Katy, TX",
    "Houston, TX",
    "Energy Corridor",
    "Cinco Ranch",
    "Fulshear",
    "Memorial",
    "Spring Branch",
    "Westchase",
    "Brookshire",
    "Richmond, TX",
  ],
  serviceType: "Residential Electrical Repair and Installation",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Electrical Repair & Installation Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outlet Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Switch Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wiring Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Circuit Breaker Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ceiling Fan Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Light Fixture Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dedicated Circuit Installation" } },
    ],
  },
};

export default function ElectricalRepairPage() {
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
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A", minHeight: "520px" }}
        aria-labelledby="hero-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4981794/pexels-photo-4981794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed ENE Electrical technician performing residential electrical repair"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="flex flex-col items-start gap-6">
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "rgba(245,166,35,0.15)",
                  color: "#F5A623",
                  fontFamily: "Inter, sans-serif",
                  border: "1px solid rgba(245,166,35,0.35)",
                }}
              >
                <Zap size={13} strokeWidth={2.5} />
                Residential Electrical Services in Houston &amp; Katy, TX
              </span>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-3xl"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Electrical Repair &amp;{" "}
                <span style={{ color: "#F5A623" }}>Installation</span> You Can
                Trust
              </h1>

              <p
                className="text-lg text-blue-100 max-w-2xl leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Licensed, insured, and bonded technicians serving Houston and Katy,
                TX. From a single outlet to full home wiring, ENE Electrical gets
                it done safely, on time, and up to code.
              </p>

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
                  <Zap size={16} strokeWidth={2.5} />
                  Book Your Service
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 text-white transition-all duration-200 hover:bg-white hover:text-[#0B1F3A] active:scale-95"
                  style={{
                    borderColor: "rgba(255,255,255,0.5)",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Contact Us
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-4">
                {["Licensed", "Insured", "Bonded", "Background-Checked"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif" }}
                    >
                      <CheckCircle
                        size={14}
                        style={{ color: "#F5A623" }}
                        strokeWidth={2.5}
                      />
                      {badge}
                    </span>
                  )
                )}
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

      {/* ── Quick Answer / Service Summary ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div
          className="rounded-2xl border-l-4 p-6 md:p-8"
          style={{
            borderLeftColor: "#F5A623",
            backgroundColor: "#F7F8FA",
          }}
          role="note"
          aria-label="Quick Answer: About ENE Electrical's repair and installation services"
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Quick Answer
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical offers comprehensive residential electrical repair
            and installation services in Houston and Katy, TX. Services include
            fixing outlets, switches, wiring, and circuit breakers, as well as
            installing new electrical components throughout the home. ENE
            Electrical's licensed, insured, and bonded technicians bring 15+
            years of experience to homeowners across the Houston metro area.
          </p>
        </div>
      </Section>

      {/* ── Common Electrical Problems We Fix ── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="repairs">
        <SectionHeading
          eyebrow="Repair Services"
          title="Common Electrical Problems We Fix"
          subtitle="Whether it's a tripping breaker, a dead outlet, or flickering lights, ENE Electrical's technicians are trained to diagnose and resolve the most common residential electrical issues quickly and safely."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairProblems.map((item) => (
            <Card
              key={item.title}
              variant="service"
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </Section>

      {/* ── Electrical Installation Services ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="installation">
        <SectionHeading
          eyebrow="Installation Services"
          title="Electrical Installation Services"
          subtitle="Need something new? ENE Electrical handles all types of residential electrical installations, from simple outlet additions to complete room wiring, all completed to Texas electrical code."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {installationServices.map((item) => (
            <Card
              key={item.title}
              variant="service"
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </Section>

      {/* ── Why Choose ENE Electrical ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="why-ene">
        <SectionHeading
          eyebrow="Why ENE Electrical"
          title="Why Homeowners Choose ENE Electrical"
          subtitle="Houston and Katy homeowners trust ENE Electrical because we combine verified credentials, local expertise, and a genuine commitment to quality workmanship."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-start gap-4 rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <Icon size={22} color="#0B1F3A" strokeWidth={2} />
                </div>
                <div>
                  <h3
                    className="text-white font-bold text-base mb-2 leading-snug"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Credential pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            "Licensed in Texas",
            "Fully Insured",
            "Bonded",
            "Background-Checked Technicians",
            "15+ Years Experience",
          ].map((cred) => (
            <span
              key={cred}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "rgba(245,166,35,0.15)",
                border: "1px solid rgba(245,166,35,0.4)",
                color: "#F5A623",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <CheckCircle size={14} strokeWidth={2.5} />
              {cred}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Service Area ── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="service-area">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Service Area
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Serving Katy, Houston &amp; Surrounding Communities
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              Homeowners throughout Katy, TX 77494 and the Houston metro,
              including Cinco Ranch, Energy Corridor, Fulshear, Memorial,
              Spring Branch, Westchase, Brookshire, and Richmond, rely on ENE
              Electrical for reliable residential electrical repair and
              installation. ENE Electrical's local technicians serve the entire
              Houston and Katy metro service area.
            </p>
            <address
              className="not-italic mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "#1A2530" }}
              >
                <MapPin size={16} style={{ color: "#F5A623" }} />
                Katy, TX 77494, serving Greater Houston &amp; Surrounding Areas
              </span>
            </address>
            <Link
              href="/service-areas/houston-tx"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#ffffff",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              View All Service Areas
            </Link>
          </div>

          {/* Area chips */}
          <div className="flex-1 min-w-0 w-full">
            <div className="grid grid-cols-2 gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #E5E7EB",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <MapPin
                    size={15}
                    style={{ color: "#F5A623", flexShrink: 0 }}
                    strokeWidth={2.5}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1A2530" }}
                  >
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Houston Homeowners Are Saying"
          subtitle="Real experiences from real customers across the Houston and Katy metro area."
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

      {/* ── FAQ Accordion ── */}
      <Section background="default" spacing="lg" maxWidth="lg" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Get quick answers about ENE Electrical's repair and installation services."
          align="center"
        />
        <ElectricalRepairClient faqData={faqData} />
      </Section>

      {/* ── CTA / Booking Form ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="book">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: CTA copy */}
          <div className="flex-1 min-w-0">
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Book Your{" "}
              <span style={{ color: "#F5A623" }}>Electrical Service?</span>
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />
            <p
              className="text-lg leading-relaxed mb-8"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Whether you need a quick outlet repair or a full electrical
              installation project, ENE Electrical's licensed team is ready to
              help. Fill out the form and we'll get back to you promptly.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Licensed, Insured & Bonded in Texas",
                "Background-Checked Technicians",
                "15+ Years Serving Houston & Katy",
                "Serving Katy, TX 77494 & the Greater Houston Metro",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <CheckCircle
                    size={18}
                    style={{ color: "#F5A623", flexShrink: 0, marginTop: 1 }}
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact form */}
          <div className="flex-1 min-w-0 w-full">
            <ContactForm
              heading="Request an Appointment"
              subheading="Describe your electrical repair or installation need and our licensed team will get back to you within 24 hours."
              ctaLabel="Book My Service"
            />
          </div>
        </div>
      </Section>

      <Footer address="Katy, TX, serving Greater Houston & Surrounding Areas" />
    </>
  );
}