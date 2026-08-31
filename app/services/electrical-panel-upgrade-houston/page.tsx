import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import ElectricalPanelUpgradeClient from "./ElectricalPanelUpgradeClient";
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardList,
  BadgeCheck,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Electrical Panel Upgrade Houston & Katy TX | ENE Electrical",
  description:
    "Need a 200-amp electrical panel upgrade in Houston or Katy, TX? ENE Electrical's licensed, bonded team upgrades residential panels safely and to code. Book now.",
  alternates: {
    canonical: "/services/electrical-panel-upgrade-houston",
  },
};

const faqData = [
  {
    question: "What is a 200-amp panel upgrade and do I need one?",
    answer:
      "A 200-amp panel upgrade replaces your existing electrical panel with a higher-capacity breaker box, allowing your home to safely power modern appliances, EV chargers, and additional circuits. It is often needed when your current panel frequently trips breakers or can no longer meet your home's electrical demands.",
  },
  {
    question:
      "Is a permit required for an electrical panel upgrade in Houston or Katy, TX?",
    answer:
      "Yes, panel upgrades typically require a permit in Texas. ENE Electrical's licensed team is familiar with local requirements and can guide homeowners through the permitting process.",
  },
  {
    question: "How long does a panel upgrade take?",
    answer:
      "Most residential panel upgrades can be completed in a single day, though the exact timeline may vary depending on the scope of work and local inspection scheduling.",
  },
  {
    question: "Will my power be turned off during the panel upgrade?",
    answer:
      "Yes, your electricity will need to be temporarily shut off during the panel upgrade for safety. ENE Electrical's team works efficiently to minimize downtime.",
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
  name: "Electrical Panel Upgrade",
  description:
    "Residential electrical panel upgrade services including 200-amp panel upgrades for homeowners in Houston and Katy, TX. Licensed, insured, and bonded technicians with 15+ years of experience.",
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
    "Memorial, TX",
    "Spring Branch, TX",
    "Westchase, TX",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  serviceType: "Electrical Panel Upgrade",
};

const signs = [
  {
    icon: AlertTriangle,
    title: "Frequent Breaker Trips",
    description:
      "If your breakers trip repeatedly under normal usage, your panel may be overloaded and unable to handle your home's demand.",
  },
  {
    icon: Zap,
    title: "Outdated or Recalled Panel",
    description:
      "Older panels (Federal Pacific, Zinsco, or fuse boxes) are fire hazards and often uninsurable, so replacement is urgent.",
  },
  {
    icon: ClipboardList,
    title: "Home Addition or Renovation",
    description:
      "Adding rooms, finishing a garage, or expanding your kitchen can quickly exceed your current panel's capacity.",
  },
  {
    icon: ShieldCheck,
    title: "Adding High-Demand Appliances",
    description:
      "EV chargers, HVAC upgrades, hot tubs, and large home appliances require dedicated circuits a standard panel may not support.",
  },
  {
    icon: BadgeCheck,
    title: "Flickering or Dimming Lights",
    description:
      "Lights that flicker when appliances run are a sign your panel is struggling to distribute power evenly across circuits.",
  },
  {
    icon: MapPin,
    title: "Selling or Buying a Home",
    description:
      "Home inspectors commonly flag undersized or outdated panels. Upgrading increases home value and speeds up sales.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Free Assessment",
    description:
      "Our licensed electrician visits your home to evaluate your current panel, load requirements, and any code considerations.",
  },
  {
    step: "02",
    title: "Custom Recommendation",
    description:
      "We provide a clear, written estimate for the appropriate panel upgrade, typically a 200-amp panel for modern Houston-area homes.",
  },
  {
    step: "03",
    title: "Permit Coordination",
    description:
      "ENE Electrical pulls the required permits with the City of Houston, Katy, or the relevant municipality so you stay fully code-compliant.",
  },
  {
    step: "04",
    title: "Professional Installation",
    description:
      "Our background-checked, insured technicians perform the upgrade safely, including utility coordination for the temporary power shutoff.",
  },
  {
    step: "05",
    title: "Inspection & Sign-Off",
    description:
      "We coordinate the required local inspection and ensure your new panel passes, handing you a fully code-compliant, upgraded electrical system.",
  },
];

const credentials = [
  { label: "Licensed", icon: BadgeCheck },
  { label: "Insured", icon: ShieldCheck },
  { label: "Bonded", icon: ShieldCheck },
  { label: "Background-Checked Technicians", icon: BadgeCheck },
  { label: "15+ Years Experience", icon: Star },
];

const serviceAreas = [
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
];

const testimonials = [
  {
    quote:
      "ENE Electrical upgraded our 100-amp panel to 200 amps for our EV charger installation. They pulled permits, handled the inspection, and finished in one day. Very professional and no surprises on the bill.",
    authorName: "Marcus T.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "Our old Federal Pacific panel was a liability. ENE Electrical replaced it quickly and walked us through everything. The inspector said it was one of the cleanest installs he'd seen. Highly recommend.",
    authorName: "Sandra L.",
    authorLocation: "Energy Corridor, Houston TX",
    rating: 5,
  },
  {
    quote:
      "Breakers kept tripping after we added a hot tub. ENE upgraded our panel and added the dedicated circuits we needed. Responsive, on time, and fairly priced for the Cinco Ranch area.",
    authorName: "David R.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
];

export default function ElectricalPanelUpgradePage() {
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
            { label: "Electrical Panel Upgrade", href: "/services/electrical-panel-upgrade-houston" },
          ]}
        />
      </div>

      {/* ─── Hero ─── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Service Hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed electrician performing a residential electrical panel upgrade"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <span
              className="inline-block mb-4 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(245,166,35,0.18)",
                color: "#F5A623",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Residential Electrical Services
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Electrical Panel{" "}
              <span style={{ color: "#F5A623" }}>Upgrade</span> in Houston &amp;
              Katy, TX
            </h1>
            <p
              className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Outdated breaker box causing problems? ENE Electrical's licensed,
              insured, and bonded team installs 200-amp panel upgrades to keep
              your home safe, code-compliant, and ready for modern demands.
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
                Book a Panel Assessment
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-white/10 active:scale-95"
                style={{
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Answer / Service Summary ─── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div
          className="rounded-2xl border-l-4 p-6 sm:p-8"
          style={{
            backgroundColor: "#F0F4FF",
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
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            An electrical panel upgrade replaces an outdated or undersized
            breaker box with a modern panel capable of handling today's home
            electrical demands.{" "}
            <strong>ENE Electrical</strong> provides residential panel upgrades,
            including 200-amp upgrades, for homeowners in Houston and Katy, TX.
            Their licensed, insured, and bonded technicians have 15+ years of
            experience and serve the entire Houston metro area.
          </p>
        </div>
      </Section>

      {/* ─── Signs You Need a Panel Upgrade ─── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="signs">
        <SectionHeading
          eyebrow="Is It Time?"
          title="Signs You Need an Electrical Panel Upgrade"
          subtitle="Recognizing the warning signs early can prevent electrical hazards, insurance issues, and unexpected outages in your Houston-area home."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signs.map((sign) => (
            <div
              key={sign.title}
              className="bg-white rounded-[0.75rem] border border-gray-100 shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <sign.icon size={22} color="#0B1F3A" strokeWidth={2} />
              </div>
              <h3
                className="text-base font-bold"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {sign.title}
              </h3>
              <div
                className="w-10 h-0.5 rounded-full"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              />
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {sign.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 200-Amp Panel Upgrade Details ─── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="200-amp">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              The Modern Standard
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              200-Amp Panel Upgrade: Built for Today's Houston Homes
            </h2>
            <p
              className="text-blue-100 leading-relaxed mb-6 text-base"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              A 200-amp electrical panel is the standard upgrade for modern
              residential homes throughout the Houston and Katy metro area. Most
              older homes were built with 60- or 100-amp service panels, which
              simply cannot support today's energy demands, including EV
              chargers, smart home systems, central HVAC, and large kitchen
              appliances.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Supports EV charger and solar energy system integration",
                "Provides capacity for home additions and renovations",
                "Reduces fire risk from overloaded circuits",
                "Meets modern NEC code requirements",
                "May lower your homeowner's insurance premiums",
                "Increases home resale value in the Houston market",
              ].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-blue-100 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <ChevronRight
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Schedule Your 200-Amp Upgrade
            </a>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Modern 200-amp residential electrical panel installed by ENE Electrical"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.9) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                200-Amp Panel: The Houston Area Standard
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Our Panel Upgrade Process ─── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="process">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Panel Upgrade Process"
          subtitle="From first visit to final inspection, ENE Electrical handles every step of your panel upgrade with transparency and professionalism."
          align="center"
        />
        <div className="relative">
          {/* Vertical connector line on desktop */}
          <div
            className="hidden lg:block absolute left-[2.15rem] top-8 bottom-8 w-0.5"
            style={{ backgroundColor: "rgba(245,166,35,0.25)" }}
            aria-hidden="true"
          />
          <div className="space-y-6">
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                className="relative flex items-start gap-6 bg-[#F7F8FA] rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="flex-shrink-0 w-[4.3rem] h-[4.3rem] rounded-xl flex items-center justify-center text-lg font-extrabold z-10"
                  style={{
                    backgroundColor: "#0B1F3A",
                    color: "#F5A623",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  aria-hidden="true"
                >
                  {step.step}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{
                      color: "#0B1F3A",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Trust & Credentials Bar ─── */}
      <section
        className="w-full py-10"
        style={{ backgroundColor: "#F5A623" }}
        aria-label="Trust and Credentials"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="flex items-center gap-3"
              >
                <cred.icon
                  size={22}
                  strokeWidth={2.5}
                  style={{ color: "#0B1F3A" }}
                  aria-hidden="true"
                />
                <span
                  className="text-sm font-bold uppercase tracking-wide"
                  style={{
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {cred.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Area / Local Relevance ─── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="service-area">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <span
              className="inline-block mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Local Expertise
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Serving Houston, Katy &amp; the Surrounding Communities
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              Many older homes in the Katy, Houston, and surrounding TX suburbs,
              including Cinco Ranch, Energy Corridor, Spring Branch, and Westchase,
              have outdated electrical panels that can't support modern
              appliances, EV chargers, or home additions. ENE Electrical serves
              these communities with licensed panel upgrade services throughout the
              Houston and Katy metro service area.
            </p>
            <address
              className="not-italic text-sm"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              <div className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#F5A623" }}
                  aria-hidden="true"
                />
                <span>ENE Electrical, Katy, TX 77494</span>
              </div>
            </address>
          </div>
          <div>
            <div
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: "white",
                borderColor: "rgba(11,31,58,0.08)",
              }}
            >
              <h3
                className="text-lg font-bold mb-5"
                style={{
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Communities We Serve
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#F5A623" }}
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Testimonials ─── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="testimonials">
        <SectionHeading
          eyebrow="What Homeowners Say"
          title="Panel Upgrade Reviews from Houston-Area Customers"
          subtitle="Real feedback from homeowners who trusted ENE Electrical with their panel upgrades."
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

      {/* ─── FAQ Accordion ─── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Electrical Panel Upgrade FAQ"
          subtitle="Everything Houston and Katy homeowners ask before scheduling their panel upgrade."
          align="center"
        />
        <div className="max-w-3xl mx-auto">
          <ElectricalPanelUpgradeClient faqData={faqData} />
        </div>
      </Section>

      {/* ─── CTA / Booking Form ─── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Upgrade Your Electrical Panel?
            </h2>
            <p
              className="text-blue-100 text-base leading-relaxed mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Don't wait for a breaker failure or a failed home inspection. Book
              a panel assessment with ENE Electrical's licensed, insured team
              today. We serve Katy, Houston, and all surrounding communities.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Licensed, Insured & Bonded Technicians",
                "15+ Years of Houston-Area Experience",
                "Permit Coordination Included",
                "Same-Day Assessments Available",
                "Background-Checked Professionals",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-blue-100 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <BadgeCheck
                    size={18}
                    className="flex-shrink-0"
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <ContactForm
              heading="Book Your Panel Upgrade Assessment"
              subheading="Tell us about your home's electrical needs and we'll get back to you promptly."
              ctaLabel="Request My Free Quote"
            />
          </div>
        </div>
      </Section>

      <Footer address="Katy, TX, serving Greater Houston & Surrounding Areas" />
    </>
  );
}