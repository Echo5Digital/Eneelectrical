import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import EVChargerClient from "./EVChargerClient";
import { Shield, Award, CheckCircle, MapPin, Zap, Clock, FileText, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Home EV Charger Installation Houston & Katy TX | ENE Electrical",
  description:
    "Install a Level 2 EV charger at your Houston or Katy, TX home with ENE Electrical. Licensed, insured electricians providing fast, safe installation. Request your quote today.",
  alternates: {
    canonical: "/services/ev-charger-installation-houston",
  },
};

const faqData = [
  {
    question: "What is a Level 2 home EV charger and why should I install one?",
    answer:
      "A Level 2 EV charger operates on a 240-volt dedicated circuit and can fully charge most electric vehicles overnight, far faster than a standard 120-volt outlet. It is the most practical home charging solution for daily EV use.",
  },
  {
    question: "Do I need an electrical panel upgrade before installing an EV charger?",
    answer:
      "Not always, but it depends on your current panel's capacity. ENE Electrical's licensed electricians will assess your panel during the consultation to determine if an upgrade is needed before installing your EV charger.",
  },
  {
    question: "Is a permit required for EV charger installation in Katy or Houston, TX?",
    answer:
      "In most cases, yes, a permit is required for the dedicated circuit installation associated with a home EV charger in Texas. ENE Electrical's licensed team handles permit coordination as part of the process.",
  },
  {
    question: "How long does EV charger installation take?",
    answer:
      "Most home EV charger installations are completed in a few hours, assuming no major panel upgrades are required. ENE Electrical's team works efficiently to get your charging station operational quickly.",
  },
  {
    question: "Which EV brands and charger models does ENE Electrical work with?",
    answer:
      "ENE Electrical installs EV charging stations compatible with all major electric vehicle brands. The licensed team can work with a variety of home charger hardware to meet your specific needs.",
  },
];

const faqJsonLd = {
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Home EV Charger Installation",
  description:
    "Professional home EV charger installation for residential customers in Houston and Katy, TX. Includes dedicated electrical circuit installation and Level 2 home charging station mounting compatible with all major electric vehicles.",
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
    "Energy Corridor",
    "Southwest Houston",
    "Cinco Ranch, TX",
    "Fulshear, TX",
    "Memorial",
    "Spring Branch",
    "Westchase",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  serviceType: "EV Charger Installation",
};

const credentials = [
  { label: "Licensed", icon: Shield },
  { label: "Insured", icon: Award },
  { label: "Bonded", icon: CheckCircle },
  { label: "Background-Checked Technicians", icon: Shield },
  { label: "15+ Years Experience", icon: Award },
];

const processSteps = [
  {
    step: "01",
    icon: FileText,
    title: "Assessment & Consultation",
    description:
      "Our licensed electrician visits your home to evaluate your electrical panel capacity, determine the ideal charger location, and discuss your EV charging needs.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Dedicated Circuit Installation",
    description:
      "We install a dedicated 240-volt circuit from your panel to the charger location, sized appropriately for your charging station and local code requirements.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Charger Mounting & Wiring",
    description:
      "Your chosen EV charging station is securely mounted and wired to the new dedicated circuit, following all NEC and local Houston/Katy code standards.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Testing & Sign-Off",
    description:
      "We test the full system to confirm safe, reliable operation and coordinate permit sign-off so you can charge with confidence from day one.",
  },
];

const evBrands = [
  "Tesla", "Ford (F-150 Lightning, Mustang Mach-E)", "Chevrolet (Bolt, Silverado EV)",
  "Rivian", "BMW", "Hyundai (IONIQ 5 / 6)", "Kia (EV6)", "Volkswagen (ID.4)",
  "Mercedes-Benz EQ", "Audi e-tron", "Toyota bZ4X", "Nissan LEAF",
];

const chargerBrands = [
  "ChargePoint", "Emporia Energy", "Enel X JuiceBox", "Grizzl-E",
  "Wallbox", "Clipper Creek", "Siemens VersiCharge", "Leviton",
];

const serviceAreas = [
  "Katy, TX", "Cinco Ranch", "Fulshear", "Energy Corridor",
  "Southwest Houston", "Memorial", "Spring Branch", "Westchase",
  "Brookshire, TX", "Richmond, TX",
];

const testimonials = [
  {
    quote:
      "ENE Electrical installed our Level 2 charger for our Tesla and the whole process was seamless. They handled the permit, installed a dedicated circuit, and had us charging the same day. Highly recommend!",
    authorName: "Michael R.",
    authorLocation: "Katy, TX",
    rating: 5 as const,
  },
  {
    quote:
      "We just got a Ford F-150 Lightning and needed a home charger fast. ENE Electrical came out within days, assessed our panel, and installed the charger without any issues. Professional team, great price.",
    authorName: "Sarah T.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5 as const,
  },
  {
    quote:
      "Very impressed with the quality of work and knowledge of the ENE Electrical team. They explained everything clearly, pulled the permit, and our EV charger works perfectly. Will use them again.",
    authorName: "David K.",
    authorLocation: "Energy Corridor, Houston",
    rating: 5 as const,
  },
];

export default function EVChargerInstallationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "EV Charger Installation", href: "/services/ev-charger-installation-houston" },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/27355827/pexels-photo-27355827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Electric vehicle plugged into a Level 2 home EV charger in a residential garage"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/90 via-[#0B1F3A]/70 to-[#0B1F3A]/40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                Residential EV Charging
              </span>
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Home EV Charger{" "}
                <span style={{ color: "#F5A623" }}>Installation</span>{" "}
                in Houston & Katy, TX
              </h1>
              <p
                className="text-lg text-blue-100 leading-relaxed mb-8 max-w-xl"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Charge smarter at home. ENE Electrical's licensed, insured electricians install
                dedicated Level 2 EV charging stations for Houston and Katy homeowners: fast,
                safe, and code-compliant.
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
                  <Zap size={16} strokeWidth={2.5} />
                  Book Your Installation
                </a>
                <a
                  href="#ev-faq"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:border-[#F5A623] hover:text-[#F5A623]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Learn More
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

      {/* ── QUICK ANSWER ── */}
      <section
        className="w-full border-b border-amber-200"
        style={{ backgroundColor: "#FFFBF0" }}
        aria-label="Quick Answer: EV Charger Installation Summary"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex gap-4 items-start">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            >
              <Zap size={20} strokeWidth={2.5} style={{ color: "#0B1F3A" }} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical provides professional home EV charger installation for residential
                customers in Houston and Katy, TX. This service includes installing a dedicated
                electrical circuit and mounting a Level 2 home charging station compatible with
                all major electric vehicles. ENE Electrical's licensed, insured, and bonded team
                has 15+ years of experience serving the Houston metro area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEVEL 1 VS LEVEL 2 ── */}
      <Section background="white" spacing="lg" id="charger-comparison">
        <SectionHeading
          eyebrow="Know Your Options"
          title="Level 1 vs. Level 2 EV Charger"
          subtitle="Understanding the difference helps you make the right choice for your home and driving habits."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Level 1 */}
          <div
            className="rounded-[0.75rem] border-2 border-gray-200 p-8 flex flex-col gap-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#E5E7EB" }}
                aria-hidden="true"
              >
                <Zap size={22} strokeWidth={2} style={{ color: "#6B7280" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-gray-500"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Standard
                </p>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  Level 1 Charging
                </h3>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-[10px] text-gray-500 font-bold">✕</span>
                Uses a standard 120-volt household outlet
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-[10px] text-gray-500 font-bold">✕</span>
                Adds only 3–5 miles of range per hour of charging
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-[10px] text-gray-500 font-bold">✕</span>
                Can take 24–40+ hours for a full charge
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-[10px] text-gray-500 font-bold">✕</span>
                No installation required, but impractical for daily EV use
              </li>
            </ul>
          </div>

          {/* Level 2 */}
          <div
            className="rounded-[0.75rem] border-2 p-8 flex flex-col gap-4 relative overflow-hidden"
            style={{ borderColor: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            <div
              className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Recommended
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Zap size={22} strokeWidth={2} style={{ color: "#0B1F3A" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                >
                  Professional Installation
                </p>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  Level 2 Charging
                </h3>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                >
                  ✓
                </span>
                Dedicated 240-volt circuit, like your dryer or range
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                >
                  ✓
                </span>
                Adds 20–30+ miles of range per hour of charging
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                >
                  ✓
                </span>
                Fully charges most EVs overnight (6–12 hours)
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                >
                  ✓
                </span>
                The practical, everyday home charging solution for EV owners
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ── INSTALLATION PROCESS ── */}
      <Section background="default" spacing="lg" id="installation-process">
        <SectionHeading
          eyebrow="Our Process"
          title="What the Installation Looks Like"
          subtitle="ENE Electrical follows a clear, professional process so you know exactly what to expect from start to finish."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white rounded-[0.75rem] p-6 shadow-md border border-gray-100 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-4xl font-extrabold leading-none"
                    style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif", opacity: 0.25 }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#0B1F3A" }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={2} style={{ color: "#F5A623" }} />
                  </div>
                </div>
                <h3
                  className="text-base font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {step.title}
                </h3>
                <div
                  className="w-8 h-0.5 rounded-full"
                  style={{ backgroundColor: "#F5A623" }}
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── COMPATIBLE VEHICLES & BRANDS ── */}
      <Section background="white" spacing="lg" id="compatible-vehicles">
        <SectionHeading
          eyebrow="Broad Compatibility"
          title="Compatible Vehicles & Charger Brands"
          subtitle="ENE Electrical works with all major electric vehicle brands and leading home EV charger hardware manufacturers."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div>
            <h3
              className="text-lg font-bold mb-5 flex items-center gap-2"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Zap size={14} strokeWidth={2.5} style={{ color: "#0B1F3A" }} />
              </span>
              EV Brands We Support
            </h3>
            <ul className="space-y-2.5">
              {evBrands.map((brand) => (
                <li
                  key={brand}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle size={15} strokeWidth={2} style={{ color: "#F5A623", flexShrink: 0 }} />
                  {brand}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="text-lg font-bold mb-5 flex items-center gap-2"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Wrench size={14} strokeWidth={2.5} style={{ color: "#0B1F3A" }} />
              </span>
              Charger Hardware We Install
            </h3>
            <ul className="space-y-2.5">
              {chargerBrands.map((brand) => (
                <li
                  key={brand}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle size={15} strokeWidth={2} style={{ color: "#F5A623", flexShrink: 0 }} />
                  {brand}
                </li>
              ))}
            </ul>
            <p
              className="mt-5 text-sm text-gray-500 italic"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Don't see your charger brand? Contact ENE Electrical, as we work with a wide range of
              NEMA 14-50 and hardwired home charging stations.
            </p>
          </div>
        </div>
      </Section>

      {/* ── TRUST & CREDENTIALS BAR ── */}
      <section
        className="w-full py-12"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="ENE Electrical credentials and experience"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Why Houston &amp; Katy Homeowners Trust ENE Electrical
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {credentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div
                  key={cred.label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                    aria-hidden="true"
                  >
                    <Icon size={26} strokeWidth={1.8} style={{ color: "#F5A623" }} />
                  </div>
                  <p
                    className="text-sm font-semibold text-white leading-tight"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {cred.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <Section background="default" spacing="lg" id="service-area">
        <SectionHeading
          eyebrow="Local EV Charger Experts"
          title="Serving Houston & Katy, TX"
          subtitle="With electric vehicle adoption growing rapidly across the Houston metro, more homeowners are seeking licensed electricians to install dedicated home EV charging stations. ENE Electrical serves all these communities."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          <p
            className="text-center text-sm text-gray-600 mb-8 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            With electric vehicle adoption growing rapidly across Katy, Cinco Ranch, Fulshear,
            Energy Corridor, and the broader Houston metro, more homeowners are seeking licensed
            electricians to install dedicated home EV charging stations. ENE Electrical serves
            all these communities within its verified Houston and Katy, TX service area.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: "white",
                  borderColor: "#E5E7EB",
                  color: "#0B1F3A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <MapPin size={13} strokeWidth={2} style={{ color: "#F5A623" }} />
                {area}
              </span>
            ))}
          </div>
          {/* NAP — real HTML text, never in image */}
          <address
            className="mt-8 text-center not-italic text-sm text-gray-500"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span className="font-semibold" style={{ color: "#0B1F3A" }}>ENE Electrical</span>
            {", "}
            {/* Address from verified business facts */}
            <span>Katy, TX 77494</span>
          </address>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="white" spacing="lg" id="testimonials">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Homeowners Are Saying"
          subtitle="Real feedback from Houston and Katy homeowners who've had EV chargers installed by ENE Electrical."
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

      {/* ── FAQ ACCORDION ── */}
      <Section background="default" spacing="lg" id="ev-faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="EV Charger Installation FAQ"
          subtitle="Answers to the questions Houston and Katy homeowners ask most about home EV charger installation."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          <EVChargerClient faqData={faqData} />
        </div>
      </Section>

      {/* ── CTA / BOOKING FORM ── */}
      <section
        className="w-full py-16 md:py-24"
        style={{ backgroundColor: "#0B1F3A" }}
        id="book-ev-charger"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(245,166,35,0.15)", color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Ready to Charge at Home?
              </span>
              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Request Your EV Charger{" "}
                <span style={{ color: "#F5A623" }}>Installation Quote</span>
              </h2>
              <p
                className="text-blue-200 text-base leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Get your home EV charging station installed by ENE Electrical's licensed,
                insured, and bonded team. We serve Houston, Katy, and surrounding communities
                with 15+ years of residential electrical experience.
              </p>
              <ul className="space-y-3">
                {[
                  "Licensed, insured & bonded electricians",
                  "Dedicated 240V circuit installation",
                  "Permit coordination included",
                  "Compatible with all major EV brands",
                  "Serving Katy, Houston & surrounding areas",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-blue-100"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <CheckCircle size={16} strokeWidth={2} style={{ color: "#F5A623", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: contact form */}
            <div>
              <EVChargerClient showForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}