import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnergyCorridorClient from "./EnergyCorridorClient";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  BadgeCheck,
  Star,
  MapPin,
  Clock,
  Wrench,
  BatteryCharging,
  Lightbulb,
  Power,
  SearchCheck,
  Construction,
  AlertTriangle,
  Home,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Electrician in Energy Corridor Houston | ENE Electrical",
  description:
    "ENE Electrical serves the Energy Corridor area of Houston with licensed residential electrical services. Panel upgrades, EV chargers, inspections & more. Book now.",
  alternates: {
    canonical: "/service-areas/electrician-energy-corridor-houston",
  },
};

const services = [
  {
    title: "Electrical Panel Upgrade",
    description:
      "Upgrade your home's electrical panel to handle modern power demands safely. Ideal for older Energy Corridor homes adding EV chargers, home offices, or major appliances.",
    icon: Power,
    href: "/services/electrical-panel-upgrade-houston",
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installation by licensed technicians. Fast, code-compliant installation for Energy Corridor homeowners.",
    icon: BatteryCharging,
    href: "/services/ev-charger-installation-houston",
  },
  {
    title: "Security Lighting",
    description:
      "Professional outdoor and security lighting installation to protect your property and enhance curb appeal in upscale Energy Corridor communities.",
    icon: Lightbulb,
    href: "/services/security-lighting-houston",
  },
  {
    title: "Generator Installation",
    description:
      "Whole-home and standby generator installation so your Energy Corridor home stays powered during Houston's severe weather events.",
    icon: Zap,
    href: "/services/generator-installation-houston",
  },
  {
    title: "Emergency Electrician",
    description:
      "Fast emergency electrical repair services for Energy Corridor residents. Contact us directly for availability and response times.",
    icon: AlertTriangle,
    href: "/services/emergency-electrician-houston",
  },
  {
    title: "Electrical Inspection",
    description:
      "Comprehensive residential electrical inspections for Energy Corridor home buyers, sellers, and owners wanting peace of mind.",
    icon: SearchCheck,
    href: "/services/electrical-inspection-houston",
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Modern recessed LED lighting design and installation to elevate the interior ambiance of Energy Corridor homes.",
    icon: Lightbulb,
    href: "/services/recessed-led-lighting",
  },
  {
    title: "Electrical Repair & Installation",
    description:
      "Full-service residential electrical repair and installation for outlets, switches, circuits, and wiring throughout your home.",
    icon: Wrench,
    href: "/services/electrical-repair-installation",
  },
  {
    title: "New Construction Wiring",
    description:
      "Expert electrical wiring for new construction and home additions in the Energy Corridor and surrounding west Houston communities.",
    icon: Construction,
    href: "/services/new-construction-wiring",
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical upgraded our panel and installed an EV charger in one visit. The team was professional, on time, and cleaned up everything before leaving. Highly recommend to any Energy Corridor homeowner.",
    authorName: "Marcus T.",
    authorLocation: "Energy Corridor, Houston, TX",
    rating: 5,
  },
  {
    quote:
      "Called ENE for an electrical emergency late in the evening and they were responsive and professional. The technician was knowledgeable and fixed the issue quickly. Great service.",
    authorName: "Priya R.",
    authorLocation: "Energy Corridor, Houston, TX",
    rating: 5,
  },
  {
    quote:
      "We hired ENE Electrical for recessed lighting throughout our main floor. The quality of work was excellent and the price was fair. Background-checked technicians gave us extra peace of mind.",
    authorName: "James & Linda W.",
    authorLocation: "West Houston, TX",
    rating: 5,
  },
];

const nearbyAreas = [
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Memorial", href: "/service-areas/memorial-houston" },
  { label: "Spring Branch", href: "/service-areas/spring-branch-houston" },
  { label: "Westchase", href: "/service-areas/westchase-houston" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
];

const faqItems = [
  {
    question: "Does ENE Electrical serve the Energy Corridor area of Houston?",
    answer:
      "Yes. The Energy Corridor in west Houston is part of ENE Electrical's service area. The company dispatches licensed, background-checked technicians to Energy Corridor homes from its Katy, TX base.",
  },
  {
    question: "What residential electrical services are available in Energy Corridor?",
    answer:
      "ENE Electrical offers the full range of residential electrical services in Energy Corridor, including panel upgrades, EV charger installation, generator installation, security lighting, recessed LED lighting, electrical inspections, and emergency electrical repair.",
  },
  {
    question:
      "How quickly can ENE Electrical respond to an electrical emergency in Energy Corridor?",
    answer:
      "ENE Electrical offers emergency electrician services throughout its service area, including the Energy Corridor. Contact ENE Electrical directly for availability and response times.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
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
  name: "Residential Electrical Services: Energy Corridor Houston",
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
    "@type": "Place",
    name: "Energy Corridor, Houston, TX",
  },
  description:
    "ENE Electrical provides licensed, insured residential electrical services to homeowners in the Energy Corridor area of Houston, TX. Services include electrical panel upgrades, EV charger installation, security lighting, generator installation, emergency electrical repair, and electrical inspections.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Electrical Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
    })),
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Service Areas", href: "/service-areas/houston-tx" },
  { label: "Energy Corridor Houston", href: "/service-areas/electrician-energy-corridor-houston" },
];

export default function EnergyCorridorHoustonPage() {
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

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero: Electrician in Energy Corridor Houston"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/17286412/pexels-photo-17286412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Aerial view of the Energy Corridor residential area in Houston at dusk"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(245,166,35,0.15)", color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              <MapPin size={13} strokeWidth={2.5} />
              Energy Corridor · Houston, TX
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Trusted Electrician for{" "}
              <span style={{ color: "#F5A623" }}>Energy Corridor</span>, Houston
            </h1>
            <p
              className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical brings 15+ years of licensed residential electrical expertise to Energy Corridor homeowners. Panel upgrades, EV chargers, security lighting &amp; more, dispatched from our Katy, TX base.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg hover:opacity-90 transition-all active:scale-95"
                style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif", boxShadow: "0 4px 20px rgba(245,166,35,0.4)" }}
              >
                <Zap size={16} strokeWidth={2.5} />
                Book an Appointment
              </Link>
              <Link
                href="#cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all active:scale-95"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get a Free Estimate
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {["Licensed", "Insured", "Bonded", "Background-Checked"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/85"
                  style={{ fontFamily: "Inter, sans-serif", backgroundColor: "rgba(255,255,255,0.07)" }}
                >
                  <BadgeCheck size={13} style={{ color: "#F5A623" }} />
                  {badge}
                </span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/85"
                style={{ fontFamily: "Inter, sans-serif", backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <Clock size={13} style={{ color: "#F5A623" }} />
                15+ Years Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div
          className="rounded-2xl p-6 sm:p-8 border-l-4"
          style={{ backgroundColor: "#F7F8FA", borderLeftColor: "#F5A623" }}
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
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical provides <strong>licensed, insured residential electrical services</strong> to homeowners in the <strong>Energy Corridor area of Houston, TX</strong>. Services include electrical panel upgrades, EV charger installation, security lighting, generator installation, emergency electrical repair, and electrical inspections. Operating from a base in <strong>Katy, TX 77494</strong> with <strong>15+ years of experience</strong>, ENE Electrical serves Energy Corridor residents with background-checked, bonded technicians.
          </p>
        </div>
      </Section>

      {/* ── SERVING THE ENERGY CORRIDOR ── */}
      <Section background="default" spacing="lg" maxWidth="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Local Expertise"
              title="Serving the Energy Corridor"
              align="left"
            />
            <div className="space-y-4" style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}>
              <p className="text-base leading-relaxed">
                The Energy Corridor is one of west Houston's most vibrant and upscale residential communities, stretching along I-10 near the Barker Reservoir and Eldridge Parkway. ENE Electrical is proud to serve homeowners throughout this area, bringing the same professional-grade electrical services we've delivered across the greater Houston metro for over 15 years.
              </p>
              <p className="text-base leading-relaxed">
                Dispatching from our Katy, TX 77494 base, our licensed technicians reach Energy Corridor homes quickly, making us one of the most accessible residential electricians for the community. We're familiar with the electrical demands of the area's upscale homes, including high-capacity panel requirements, smart home integrations, EV charging infrastructure, and whole-home generator systems.
              </p>
              <p className="text-base leading-relaxed">
                Whether you live in Eldridge Park, Nottingham, or Memorial Thicket, ENE Electrical is your local, trusted electrical partner. Our team understands the standards Energy Corridor homeowners expect and delivers work that meets or exceeds them every time.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ backgroundColor: "#0B1F3A" }}
              >
                <Clock size={20} style={{ color: "#F5A623" }} />
                <span className="text-white text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  15+ Years Experience
                </span>
              </div>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ backgroundColor: "#0B1F3A" }}
              >
                <MapPin size={20} style={{ color: "#F5A623" }} />
                <span className="text-white text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Based in Katy, TX 77494
                </span>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Licensed ENE Electrical technician working on a residential electrical panel in an Energy Corridor Houston home"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{ background: "linear-gradient(to top, rgba(11,31,58,0.92) 0%, transparent 100%)" }}
            >
              <p className="text-white font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                ENE Electrical: Energy Corridor's Trusted Residential Electrician
              </p>
              <p className="text-blue-200 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                Dispatching from Katy, TX 77494
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES AVAILABLE IN ENERGY CORRIDOR ── */}
      <Section background="white" spacing="lg" maxWidth="2xl" id="services">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services Available in Energy Corridor"
          subtitle="From panel upgrades to EV chargers and emergency repairs, ENE Electrical delivers the full range of residential electrical services to Energy Corridor homeowners."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="block group">
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

      {/* ── WHY ENERGY CORRIDOR HOMEOWNERS TRUST ENE ── */}
      <Section background="primary" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Energy Corridor Homeowners Trust ENE Electrical"
          subtitle="We hold ourselves to the highest standards of professionalism, safety, and craftsmanship, because Energy Corridor homes deserve nothing less."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BadgeCheck,
              title: "Licensed",
              desc: "All work performed by licensed electricians fully compliant with Texas electrical codes and permit requirements.",
            },
            {
              icon: ShieldCheck,
              title: "Insured & Bonded",
              desc: "Fully insured and bonded for every job, protecting your home and giving you complete peace of mind.",
            },
            {
              icon: Star,
              title: "Background-Checked",
              desc: "Every technician passes thorough background checks before entering your home. Your family's safety is our priority.",
            },
            {
              icon: Home,
              title: "Upscale Home Expertise",
              desc: "Experienced with the higher-capacity electrical systems, smart integrations, and design expectations of Energy Corridor properties.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start p-6 rounded-2xl border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
              >
                <item.icon size={22} color="#0B1F3A" strokeWidth={2} />
              </div>
              <h3
                className="text-white font-bold text-base mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TRUST INDICATORS ── */}
      <Section background="default" spacing="md" maxWidth="2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "15+", label: "Years of Experience" },
            { value: "4", label: "Credentials Held" },
            { value: "100%", label: "Background-Checked Team" },
            { value: "West Houston", label: "Local Service Area" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-md border border-gray-100"
            >
              <span
                className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {["Licensed", "Insured", "Bonded", "Background-Checked Technicians"].map((cred) => (
            <span
              key={cred}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#F5A623",
                borderColor: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <BadgeCheck size={15} />
              {cred}
            </span>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            <MapPin size={14} className="inline mr-1 text-amber-500" />
            Serving the Energy Corridor from our base in <strong style={{ color: "#0B1F3A" }}>Katy, TX 77494</strong>, part of our Houston and Katy metro service area.
          </p>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="white" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Energy Corridor Homeowners Say"
          subtitle="Real feedback from real customers in and around the Energy Corridor area."
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

      {/* ── NEARBY SERVICE AREAS ── */}
      <Section background="default" spacing="md" maxWidth="xl">
        <SectionHeading
          eyebrow="Also Nearby"
          title="Nearby Service Areas"
          subtitle="ENE Electrical serves communities throughout west Houston and the Katy metro area."
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {nearbyAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#ffffff",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <MapPin size={14} style={{ color: "#F5A623" }} />
              {area.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Questions from Energy Corridor homeowners about ENE Electrical's services."
          align="center"
        />
        <EnergyCorridorClient faqItems={faqItems} />
      </Section>

      {/* ── CTA / BOOKING SECTION ── */}
      <Section background="primary" spacing="lg" maxWidth="2xl" id="cta">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Book Now"
              title="Ready to Work With Energy Corridor's Trusted Electrician?"
              subtitle="Request an appointment or free estimate for your Energy Corridor home today. Our licensed team is ready to help."
              align="left"
              inverted
            />
            <div className="space-y-4 mt-2">
              {[
                "Licensed, insured & bonded residential electricians",
                "Background-checked technicians on every job",
                "15+ years serving Houston and Katy metro",
                "Dispatching from Katy, TX 77494, close to Energy Corridor",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <BadgeCheck size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#F5A623" }} />
                  <span className="text-blue-100 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Service Area
              </p>
              <p className="text-blue-200 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                Energy Corridor, Houston, TX and surrounding west Houston communities, served from Katy, TX 77494.
              </p>
            </div>
          </div>
          <div>
            <ContactForm
              heading="Request an Appointment"
              subheading="Energy Corridor homeowners: fill out the form and a licensed ENE Electrical technician will follow up promptly."
              ctaLabel="Request Appointment"
            />
          </div>
        </div>
      </Section>

      <VanCta
        heading={
          <>
            Ready to Schedule Your Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Energy Corridor Houston?</span>
          </>
        }
        description="Whether it's a panel upgrade for one of Energy Corridor's established homes, an EV charger installation, or a same-day repair, ENE Electrical is ready to help. We dispatch quickly from nearby Katy, TX to serve homeowners throughout the Energy Corridor and West Houston area."
      />

      <Footer address="Katy, TX, Serving Greater Houston & Surrounding Areas" />
    </>
  );
}