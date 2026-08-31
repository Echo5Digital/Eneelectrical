import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, { SectionHeading } from "@/components/Section";
import VanCta from "@/components/VanCta";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Star,
  MapPin,
  CheckCircle,
  Clock,
  Zap,
  ThumbsUp,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About ENE Electrical | 15+ Years Serving Houston Homeowners",
  description:
    "Learn about ENE Electrical, a licensed, insured, and bonded residential electrician based in Katy, TX with 15+ years of experience serving the greater Houston metro area.",
  alternates: {
    canonical: "/about-us",
  },
};

const credentials = [
  {
    icon: ShieldCheck,
    label: "Licensed",
    description: "Fully licensed residential electrical contractor in the state of Texas.",
  },
  {
    icon: Award,
    label: "Insured",
    description: "Comprehensive liability insurance protecting your home and family.",
  },
  {
    icon: CheckCircle,
    label: "Bonded",
    description: "Bonded for your protection and complete peace of mind.",
  },
  {
    icon: Users,
    label: "Background-Checked Technicians",
    description: "Every technician undergoes thorough background screening before entering your home.",
  },
];

const coreValues = [
  {
    icon: Clock,
    title: "Reliability",
    description:
      "We show up on time, every time. Homeowners across Houston count on ENE Electrical because we deliver consistent, dependable service without the runaround.",
  },
  {
    icon: ThumbsUp,
    title: "Transparency",
    description:
      "No surprise charges. We provide clear, upfront estimates in plain language before any work begins so you always know what to expect.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Every job is completed to code with licensed technicians who prioritize your family's safety above all else. We never cut corners.",
  },
  {
    icon: Heart,
    title: "Community Commitment",
    description:
      "We're neighbors serving neighbors. ENE Electrical is proud to be a trusted part of the Katy and greater Houston community for over 15 years.",
  },
];

const serviceAreas = [
  { label: "Katy, TX", route: "/service-areas/electrician-katy-tx" },
  { label: "Houston, TX", route: "/service-areas/houston-tx" },
  { label: "Energy Corridor", route: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Southwest Houston", route: "/service-areas/electrician-houston-southwest" },
  { label: "Cinco Ranch", route: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear", route: "/service-areas/fulshear-tx" },
  { label: "Memorial", route: "/service-areas/memorial-houston" },
  { label: "Spring Branch", route: "/service-areas/spring-branch-houston" },
  { label: "Westchase", route: "/service-areas/westchase-houston" },
  { label: "Brookshire", route: "/service-areas/brookshire-tx" },
  { label: "Richmond", route: "/service-areas/richmond-tx" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed" },
  { icon: Award, label: "Insured" },
  { icon: CheckCircle, label: "Bonded" },
  { icon: Star, label: "15+ Years Experience" },
];

const faqData = [
  {
    question: "How long has ENE Electrical been in business?",
    answer: "ENE Electrical has 15+ years of experience in residential electrical services.",
  },
  {
    question: "Are ENE Electrical's technicians background-checked?",
    answer:
      "Yes. All ENE Electrical technicians are background-checked, in addition to the company being licensed, insured, and bonded.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About ENE Electrical",
  description:
    "ENE Electrical is a licensed, insured, and bonded residential electrical contractor with over 15 years of experience based in Katy, TX. The company serves homeowners across the Houston and Katy metro area.",
  url: "https://eneelectrical.com/about-us",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "ENE Electrical",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77494",
      addressCountry: "US",
    },
    areaServed: [
      "Katy, TX",
      "Houston, TX",
      "Energy Corridor",
      "Southwest Houston",
      "Cinco Ranch",
      "Fulshear",
      "Memorial",
      "Spring Branch",
      "Westchase",
      "Brookshire",
      "Richmond, TX",
    ],
    description:
      "Licensed, insured, and bonded residential electrical contractor with 15+ years of experience serving the Houston and Katy, TX metro area.",
  },
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

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
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
            { label: "About Us", href: "/about-us" },
          ]}
        />
      </div>

      {/* ── ABOUT HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="about-hero-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="ENE Electrical technician performing residential electrical work"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center gap-6">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Our Story
          </span>
          <h1
            id="about-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Powering Houston Homes{" "}
            <span style={{ color: "#F5A623" }}>With Trust</span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.78)", fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is a licensed, insured, and bonded residential electrical
            contractor proudly serving Katy, TX and the greater Houston metro for over
            15 years, with background-checked technicians and a commitment to doing
            the job right the first time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
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
              Book a Service
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ── */}
      <section
        aria-label="Quick Answer"
        style={{ backgroundColor: "#F5A623" }}
        className="py-6"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#0B1F3A" }}
            aria-hidden="true"
          >
            <Zap size={18} style={{ color: "#F5A623" }} />
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Quick Answer
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical is a licensed, insured, and bonded residential electrical
              contractor with over 15 years of experience based in Katy, TX. The company
              serves homeowners across the Houston and Katy metro area, providing safe
              and reliable electrical services with background-checked technicians.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPANY STORY & MISSION ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Our Story
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              15+ Years of Trusted Residential Electrical Service
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-8"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <div
              className="space-y-5 text-base leading-relaxed"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              <p>
                ENE Electrical was built on a simple belief: Houston homeowners deserve
                an electrician they can truly trust, someone who shows up on time,
                explains the work clearly, and stands behind every job completed.
              </p>
              <p>
                Over 15 years ago, we set out to fill that gap in the Katy and greater
                Houston market. What started as a commitment to quality craftsmanship
                has grown into a reputation built one satisfied homeowner at a time,
                across communities from Cinco Ranch to the Energy Corridor.
              </p>
              <p>
                Our mission remains unchanged: to deliver safe, reliable, code-compliant
                electrical work that protects your home, your family, and your
                investment, performed by background-checked technicians who treat your
                home with the same care and respect they'd give their own.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-[0.75rem] overflow-hidden shadow-xl">
              <img
                src="/about.png"
                alt="ENE Electrical technician working on a residential electrical panel"
                className="w-full h-80 lg:h-[420px] object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.0) 100%)",
                }}
              >
                <p
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Proudly Based in Katy, TX
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
                >
                  Serving the Greater Houston Metro for 15+ Years
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CREDENTIALS & LICENSING ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Licensed · Insured · Bonded"
          title="Credentials You Can Count On"
          subtitle="Every ENE Electrical technician arrives at your door fully credentialed, background-checked, and ready to deliver safe, compliant electrical work."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-6 rounded-[0.75rem] bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Icon size={28} style={{ color: "#0B1F3A" }} strokeWidth={2} />
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {label}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif", opacity: 0.75 }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CORE VALUES / WHY WE'RE DIFFERENT ── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Why Choose ENE Electrical"
          title="What Sets Us Apart"
          subtitle="We don't just fix wiring. We build long-term relationships based on honesty, expertise, and care for the communities we serve."
          align="center"
          inverted
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col p-6 rounded-[0.75rem] border border-white/10 hover:border-[#F5A623]/40 transition-colors duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Icon size={22} style={{ color: "#0B1F3A" }} strokeWidth={2} />
              </div>
              <h3
                className="text-base font-bold mb-3 text-white"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)", fontFamily: "Inter, sans-serif" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── LOCAL RELEVANCE / SERVICE AREA OVERVIEW ── */}
      <Section background="white" spacing="lg" maxWidth="xl" id="service-area">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Serving Greater Houston
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              Proudly Serving Katy, TX&nbsp;&amp; the Houston Metro
            </h2>
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            />
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical has spent 15+ years building its reputation among residential
              homeowners in{" "}
              <strong>Katy, TX 77494</strong> and the greater Houston metro, including
              communities like Cinco Ranch, Fulshear, Energy Corridor, Memorial, and
              Spring Branch.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
            >
              Whether you're in a neighborhood just down the road or across the Houston
              metro, our licensed technicians come to you on time and fully prepared.
            </p>
            <nav aria-label="Service area links">
              <ul className="flex flex-wrap gap-3">
                {serviceAreas.map(({ label, route }) => (
                  <li key={label}>
                    <Link
                      href={route}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 hover:border-[#F5A623] hover:text-[#0B1F3A] hover:bg-[#F5A623]/10"
                      style={{
                        borderColor: "#0B1F3A",
                        color: "#0B1F3A",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <MapPin size={13} aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="relative rounded-[0.75rem] overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/4036301/pexels-photo-4036301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Aerial view of a Katy, TX residential neighborhood served by ENE Electrical"
              className="w-full h-72 lg:h-[400px] object-cover"
            />
            <div
              className="absolute inset-0 flex items-end p-6"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,31,58,0.9) 0%, rgba(11,31,58,0.0) 60%)",
              }}
            >
              <div className="flex items-center gap-3">
                <MapPin size={20} style={{ color: "#F5A623" }} aria-hidden="true" />
                <div>
                  <p
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Based in Katy, TX 77494
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(255,255,255,0.72)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Serving Houston &amp; Surrounding Suburbs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── TRUST BADGES BAR ── */}
      <section
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Trust credentials"
        className="py-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row items-center gap-3 justify-center text-center sm:text-left"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)" }}
                  aria-hidden="true"
                >
                  <Icon size={22} style={{ color: "#F5A623" }} strokeWidth={2} />
                </div>
                <span
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <Section background="default" spacing="lg" maxWidth="xl">
        <SectionHeading
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          align="center"
        />
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {faqData.map(({ question, answer }) => (
            <div
              key={question}
              className="bg-white rounded-[0.75rem] shadow-md border border-gray-100 p-6"
            >
              <h3
                className="text-base font-bold mb-3 flex items-start gap-3"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                  aria-hidden="true"
                >
                  Q
                </span>
                {question}
              </h3>
              <p
                className="text-sm leading-relaxed pl-9"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                {answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA — BOOK A SERVICE ── */}
      <section
        style={{ backgroundColor: "#F5A623" }}
        aria-labelledby="cta-heading"
        className="py-16 md:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#0B1F3A" }}
            aria-hidden="true"
          >
            <Zap size={28} style={{ color: "#F5A623" }} strokeWidth={2.5} />
          </div>
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            Ready to Work With a Team You Can Trust?
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(11,31,58,0.8)", fontFamily: "Inter, sans-serif" }}
          >
            If our story resonates with you, we'd love to help with your next electrical
            project. Book a service or reach out, and our licensed team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#ffffff",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(11,31,58,0.35)",
              }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Book a Service
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-[#0B1F3A]/10 active:scale-95"
              style={{
                borderColor: "#0B1F3A",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <VanCta
        heading={
          <>
            Ready to Work With Houston and Katy's{" "}
            <span style={{ color: "#F5A623" }}>Trusted Electrical Team?</span>
          </>
        }
        description="From routine repairs to major installations, ENE Electrical brings licensed, insured, and background-checked technicians to every job. We're proud to serve homeowners across Houston, Katy, and surrounding communities with dependable electrical service."
      />

      <Footer />
    </>
  );
}