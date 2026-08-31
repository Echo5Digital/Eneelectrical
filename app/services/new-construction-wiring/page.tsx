import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewConstructionWiringClient from "./NewConstructionWiringClient";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  FileCheck,
  Zap,
  MapPin,
  ArrowRight,
  Cable,
  CircuitBoard,
  Home,
  Cpu,
  Sun,
  BatteryCharging,
} from "lucide-react";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "New Construction Wiring Services Houston & Katy TX | ENE Electrical",
  description:
    "Professional new construction wiring by ENE Electrical, serving Houston & Katy, TX. Licensed electricians for rough-in, circuits & code-compliant installs. Get a quote.",
  alternates: {
    canonical: "/services/new-construction-wiring",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "New Construction Wiring",
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
    "Fulshear, TX",
    "Cinco Ranch, TX",
    "Energy Corridor",
    "Memorial",
    "Spring Branch",
    "Westchase",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  description:
    "Complete new construction wiring services for residential homes, including rough-in wiring, outlet placement, dedicated circuits, low-voltage pre-wiring, sub-panel feeds, and smart-home wiring rough-in. All work is performed to Texas electrical code by licensed, bonded, and insured electricians.",
  serviceType: "New Construction Electrical Wiring",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does new construction wiring include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New construction wiring from ENE Electrical includes rough-in wiring, outlet and switch placement, dedicated circuits, sub-panel feeds, low-voltage pre-wiring, and outdoor circuit installation, all coordinated with the build schedule and inspections.",
      },
    },
    {
      "@type": "Question",
      name: "Does ENE Electrical ensure wiring is up to Texas electrical code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All new construction wiring by ENE Electrical is performed to Texas electrical code standards, and we coordinate with local inspectors to ensure compliance at every stage.",
      },
    },
    {
      "@type": "Question",
      name: "Can you pre-wire for EV chargers and smart-home systems during new construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ENE Electrical can include EV charger conduit and circuit pre-wiring as well as low-voltage smart-home wiring rough-in as part of a new construction wiring project.",
      },
    },
    {
      "@type": "Question",
      name: "Which TX communities do you serve for new construction wiring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ENE Electrical serves new construction wiring projects in Katy, Fulshear, Cinco Ranch, Houston, Energy Corridor, Memorial, Westchase, Spring Branch, Southwest Houston, Brookshire, and Richmond, TX.",
      },
    },
  ],
};

const trustBadges = [
  { icon: BadgeCheck, label: "Licensed" },
  { icon: ShieldCheck, label: "Insured" },
  { icon: FileCheck, label: "Bonded" },
  { icon: Wrench, label: "Background-Checked Technicians" },
  { icon: Zap, label: "15+ Years Experience" },
];

const wiringServices = [
  {
    icon: Cable,
    title: "Rough-In Wiring",
    description:
      "We run all branch circuits through studs and joists before drywall, precisely laid out per your floor plan and ready for inspection.",
  },
  {
    icon: CircuitBoard,
    title: "Dedicated Circuits",
    description:
      "Kitchen appliances, HVAC systems, and high-demand equipment get their own properly rated dedicated circuits to prevent overloads.",
  },
  {
    icon: Home,
    title: "Outlet & Switch Placement",
    description:
      "Strategic placement of outlets, switches, and junction boxes per code minimums and your custom layout preferences.",
  },
  {
    icon: Zap,
    title: "Sub-Panel Feeds",
    description:
      "We install and feed sub-panels for large homes, garages, or detached structures, sized correctly from the ground up.",
  },
  {
    icon: Sun,
    title: "Outdoor & Exterior Circuits",
    description:
      "Weather-resistant outdoor outlets, landscape lighting circuits, and exterior fixture wiring installed to code.",
  },
  {
    icon: Cpu,
    title: "Low-Voltage & Smart-Home Pre-Wiring",
    description:
      "Cat6, coax, speaker, and smart-home control wiring rough-in handled during framing so your home is future-ready.",
  },
  {
    icon: BatteryCharging,
    title: "EV Charger Pre-Wiring",
    description:
      "Conduit runs and dedicated circuits for Level 2 EV chargers installed during new construction for seamless future hookup.",
  },
];

const relatedServices = [
  {
    label: "New Construction Electrician Hub",
    href: "/services/new-construction-electrician-houston",
    description: "Full overview of our new construction electrical services.",
  },
  {
    label: "Electrical Panel Upgrade",
    href: "/services/electrical-panel-upgrade-houston",
    description: "Panel sizing and upgrades for new builds and additions.",
  },
  {
    label: "EV Charger Installation",
    href: "/services/ev-charger-installation-houston",
    description: "Complete EV charger installation once your home is ready.",
  },
  {
    label: "Electrical Inspection",
    href: "/services/electrical-inspection-houston",
    description: "Pre-purchase and code-compliance inspections.",
  },
];

const serviceAreas = [
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
  { label: "Houston, TX", href: "/service-areas/houston-tx" },
  { label: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Brookshire, TX", href: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
];

const testimonials = [
  {
    quote:
      "ENE Electrical handled all the rough-in wiring for our new build in Fulshear. They coordinated perfectly with our framing crew and passed inspection on the first try. Couldn't be happier.",
    authorName: "Marcus T.",
    authorLocation: "Fulshear, TX",
    rating: 5,
  },
  {
    quote:
      "We built a custom home in Cinco Ranch and ENE did every bit of the electrical from rough-in to trim-out. Professional, on-schedule, and every outlet is exactly where we asked.",
    authorName: "Priya & James R.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
  {
    quote:
      "The team pre-wired our entire house for smart home and EV charging during framing. Made the finish work so much cleaner. Highly recommend for any new construction project.",
    authorName: "Derek W.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What does new construction wiring include?",
    answer:
      "New construction wiring from ENE Electrical includes rough-in wiring, outlet and switch placement, dedicated circuits, sub-panel feeds, low-voltage pre-wiring, and outdoor circuit installation, all coordinated with the build schedule and inspections.",
  },
  {
    question: "Does ENE Electrical ensure wiring is up to Texas electrical code?",
    answer:
      "Yes. All new construction wiring by ENE Electrical is performed to Texas electrical code standards, and we coordinate with local inspectors to ensure compliance at every stage.",
  },
  {
    question: "Can you pre-wire for EV chargers and smart-home systems during new construction?",
    answer:
      "Yes. ENE Electrical can include EV charger conduit and circuit pre-wiring as well as low-voltage smart-home wiring rough-in as part of a new construction wiring project.",
  },
  {
    question: "Which TX communities do you serve for new construction wiring?",
    answer:
      "ENE Electrical serves new construction wiring projects in Katy, Fulshear, Cinco Ranch, Houston, Energy Corridor, Memorial, Westchase, Spring Branch, Southwest Houston, Brookshire, and Richmond, TX.",
  },
];

export default function NewConstructionWiringPage() {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "New Construction Wiring", href: "/services/new-construction-wiring" },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero section"
      >
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/7937305/pexels-photo-7937305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="ENE Electrical technician running rough-in wiring inside a new home under construction"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.97) 0%, rgba(11,31,58,0.75) 60%, rgba(11,31,58,0.5) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.15)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
                border: "1px solid rgba(245,166,35,0.4)",
              }}
            >
              Residential New Construction
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Expert New{" "}
              <span style={{ color: "#F5A623" }}>Construction Wiring</span>{" "}
              From Rough-In to Final Inspection
            </h1>
            <p
              className="text-blue-100 text-lg leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Licensed, bonded, and insured electricians delivering complete
              residential wiring for new builds across Houston &amp; Katy, TX.
              On schedule. Code compliant. Built to last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Zap size={16} strokeWidth={2.5} />
                Request a Wiring Quote
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ── */}
      <Section background="white" spacing="md">
        <div
          className="rounded-2xl p-6 md:p-8 border-l-4"
          style={{
            backgroundColor: "#F7F8FA",
            borderLeftColor: "#F5A623",
          }}
          role="note"
          aria-label="Quick Answer"
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Quick Answer
          </p>
          <h2
            className="text-xl md:text-2xl font-bold mb-3"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            What Is New Construction Wiring, and What Does ENE Electrical Deliver?
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical provides complete new construction wiring services for
            residential homes being built in Houston and Katy, TX. This includes
            rough-in wiring, outlet and switch placement, dedicated circuit
            installation, low-voltage pre-wiring, and sub-panel feeds, all
            performed to Texas electrical code by licensed, bonded, and insured
            electricians. ENE Electrical coordinates with inspectors and other
            trades to keep your build on schedule.
          </p>
        </div>
      </Section>

      {/* ── TRUST BADGE BAR ── */}
      <Section background="primary" spacing="sm">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5"
              aria-label={label}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
              >
                <Icon size={18} style={{ color: "#F5A623" }} strokeWidth={2} />
              </div>
              <span
                className="text-sm font-semibold text-white whitespace-nowrap"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHAT IS NEW CONSTRUCTION WIRING? ── */}
      <Section background="white" spacing="lg" id="what-is-new-construction-wiring">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Education"
              title="What Is New Construction Wiring?"
              subtitle="New construction wiring is a multi-phase electrical process that begins before the walls go up and continues through final inspection. It's fundamentally different from retrofit or repair work."
              align="left"
            />
            <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <span className="font-bold text-sm" style={{ color: "#0B1F3A" }}>1</span>
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Rough-In Phase
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Wire runs, conduit, boxes, and panel feeds are installed
                    through studs and joists before drywall is hung. This is the
                    most critical phase, since errors here are expensive to fix later.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <span className="font-bold text-sm" style={{ color: "#0B1F3A" }}>2</span>
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Outlet, Switch & Circuit Planning
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Every outlet, switch, and circuit is positioned per code
                    minimums and your layout plan, covering kitchen, bathrooms, bedrooms,
                    garage, and outdoor spaces all accounted for.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <span className="font-bold text-sm" style={{ color: "#0B1F3A" }}>3</span>
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Panel Feeds & Sub-Panels
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Main electrical panel sizing and sub-panel feeds are planned
                    early to support your home's total load, including future EV
                    chargers, HVAC, and smart systems.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <span className="font-bold text-sm" style={{ color: "#0B1F3A" }}>4</span>
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Inspection Stages
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Texas requires rough-in inspection before drywall and final
                    inspection before occupancy. ENE Electrical coordinates both,
                    so your project never stalls waiting on re-inspections.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[400px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/4642438/pexels-photo-4642438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="New home under construction showing electrical rough-in wiring running through wall framing"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{
                background: "linear-gradient(to top, rgba(11,31,58,0.9), transparent)",
              }}
            >
              <p
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical: New Construction Rough-In Specialists
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── OUR WIRING SERVICES BREAKDOWN ── */}
      <Section background="default" spacing="lg" id="wiring-services">
        <SectionHeading
          eyebrow="Services"
          title="Our New Construction Wiring Services"
          subtitle="From the first wire pull to the final device, every aspect of your home's electrical system is handled by our licensed team."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wiringServices.map((service) => (
            <Card
              key={service.title}
              variant="service"
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </Section>

      {/* ── CODE COMPLIANCE & INSPECTION COORDINATION ── */}
      <Section background="primary" spacing="lg" id="code-compliance">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Code Compliance"
              title="Texas Code Compliance & Inspection Coordination"
              subtitle="Every wire we pull, every circuit we plan, and every panel we install adheres to Texas electrical code and local jurisdiction requirements."
              align="left"
              inverted
            />
            <ul className="space-y-4" style={{ fontFamily: "Inter, sans-serif" }}>
              {[
                "We design and install all wiring to NEC standards as adopted by Texas, with no shortcuts.",
                "ENE Electrical schedules and coordinates rough-in inspections before drywall closes the walls.",
                "We work directly with local municipal inspectors in Katy, Fulshear, and Harris/Fort Bend counties.",
                "Final trim-out and panel energization are completed only after all inspections pass.",
                "Documentation provided for your records, builder files, and future resale disclosures.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "#F5A623" }}
                  >
                    <FileCheck size={13} style={{ color: "#0B1F3A" }} strokeWidth={2.5} />
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-auto min-h-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/8486903/pexels-photo-8486903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="ENE Electrical technician reviewing code compliance documentation on a new construction site"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── INTERNAL LINK: RELATED SERVICES ── */}
      <Section background="white" spacing="md" id="related-services">
        <SectionHeading
          eyebrow="Related Services"
          title="Also Part of Your New Build"
          subtitle="New construction electrical goes beyond wiring. Explore related services ENE Electrical provides for new builds."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedServices.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="group flex flex-col gap-3 p-6 rounded-2xl border-2 transition-all duration-200 hover:border-amber-400 hover:shadow-md"
              style={{ borderColor: "#E5E7EB", backgroundColor: "#F7F8FA" }}
              aria-label={service.label}
            >
              <div className="flex items-center gap-2">
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "#F5A623" }}
                />
                <h3
                  className="font-bold text-sm"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {service.label}
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── SERVICE AREA CALLOUT ── */}
      <Section background="default" spacing="lg" id="service-areas">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Serving West Houston &amp; Beyond
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            New Construction Wiring Across Houston's Fastest-Growing Communities
          </h2>
          <p
            className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            New home construction is booming across Katy, Fulshear, Cinco Ranch,
            and the broader west Houston corridor. ENE Electrical provides new
            construction wiring services throughout this high-growth region,
            ensuring homes are wired safely, efficiently, and in full compliance
            with Texas electrical codes from the ground up.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <Link
              key={area.label}
              href={area.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:border-amber-400 hover:bg-amber-50"
              style={{
                borderColor: "#0B1F3A",
                color: "#0B1F3A",
                fontFamily: "Inter, sans-serif",
                backgroundColor: "white",
              }}
            >
              <MapPin size={14} style={{ color: "#F5A623" }} />
              {area.label}
            </Link>
          ))}
        </div>
        <p
          className="text-center text-sm text-gray-500 mt-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Not seeing your area? <Link href="/contact-us" className="font-semibold underline" style={{ color: "#0B1F3A" }}>Contact us</Link>, as we may still serve your location.
        </p>
      </Section>

      {/* ── TESTIMONIALS CAROUSEL (client) ── */}
      <NewConstructionWiringClient
        testimonials={testimonials}
        faqs={faqs}
      />

      {/* ── CTA SECTION ── */}
      <Section background="primary" spacing="lg" id="get-a-quote">
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            Get Started Today
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Ready to Wire Your New Build?
          </h2>
          <p
            className="text-blue-100 text-lg leading-relaxed mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get a detailed wiring estimate from ENE Electrical, licensed,
            bonded &amp; insured electricians with 15+ years of new construction
            experience serving Houston and Katy, TX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Get a Wiring Estimate
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Contact Our Team
            </Link>
          </div>
          <p
            className="text-blue-200 text-sm mt-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {/* Placeholder address — verified from business facts */}
            Serving new construction projects from our base in{" "}
            <strong className="text-white">Katy, TX 77494</strong>
          </p>
        </div>
      </Section>

      <Footer />
    </>
  );
}