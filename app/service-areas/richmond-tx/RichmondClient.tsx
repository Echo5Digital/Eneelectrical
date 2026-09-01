"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import {
  ShieldCheck,
  BadgeCheck,
  Zap,
  Clock,
  Star,
  HardHat,
  Car,
  Lightbulb,
  Wrench,
  AlertTriangle,
  ClipboardCheck,
  Home,
  TrendingUp,
  MapPin,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FAQItem[];
}

// Animated counter hook
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

const services = [
  {
    title: "Electrical Panel Upgrades",
    description:
      "Upgrade your Richmond home's electrical panel to handle modern power demands safely. We install 200A+ panels for larger suburban homes.",
    icon: Zap,
  },
  {
    title: "EV Charger Installation",
    description:
      "Level 2 home EV charger installation for Richmond homeowners. Fast, safe, code-compliant charging solutions from licensed electricians.",
    icon: Car,
  },
  {
    title: "New Construction Wiring",
    description:
      "Full electrical wiring for new residential construction in Richmond, TX. We work with builders and homeowners from ground up.",
    icon: HardHat,
  },
  {
    title: "Generator Installation",
    description:
      "Whole-home standby and portable generator installation and hookup so your Richmond home is prepared for any power outage.",
    icon: Wrench,
  },
  {
    title: "Recessed LED Lighting",
    description:
      "Transform your Richmond home with energy-efficient recessed lighting. We handle layout, installation, and dimmer integration.",
    icon: Lightbulb,
  },
  {
    title: "Electrical Repairs",
    description:
      "From tripping breakers to faulty outlets, our licensed electricians diagnose and repair residential electrical issues quickly.",
    icon: ClipboardCheck,
  },
  {
    title: "Emergency Electrician",
    description:
      "24/7 emergency electrical service available for Richmond, TX homeowners. When it can't wait, we're ready to respond.",
    icon: AlertTriangle,
  },
  {
    title: "Electrical Inspections",
    description:
      "Comprehensive residential electrical inspections for Richmond home buyers, sellers, and homeowners concerned about safety.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    quote:
      "ENE Electrical installed our EV charger and upgraded our panel, all in one day. Professional crew, clean work, and they explained everything. Highly recommend for any Richmond homeowner.",
    authorName: "Marcus T.",
    authorLocation: "Richmond, TX",
    rating: 5,
  },
  {
    quote:
      "Called them for an emergency late at night when we lost power to half the house. They came out fast, diagnosed a panel issue, and had us back up and running. Lifesavers.",
    authorName: "Sandra R.",
    authorLocation: "Katy, TX",
    rating: 5,
  },
  {
    quote:
      "We used ENE Electrical for the full electrical build-out of our new construction home in Fort Bend County. Everything was done on schedule and passed inspection first try.",
    authorName: "David & Kim L.",
    authorLocation: "Fulshear, TX",
    rating: 5,
  },
  {
    quote:
      "Great experience getting recessed lighting installed throughout our home. The team was clean, on time, and did beautiful work. Will use them again for our garage panel.",
    authorName: "Angela M.",
    authorLocation: "Cinco Ranch, TX",
    rating: 5,
  },
];

const neighborLinks = [
  { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
  { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { label: "Southwest Houston", href: "/service-areas/electrician-houston-southwest" },
  { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
];

const trustBadges = [
  { label: "Licensed", icon: BadgeCheck },
  { label: "Insured", icon: ShieldCheck },
  { label: "Bonded", icon: Star },
  { label: "Background-Checked Technicians", icon: HardHat },
  { label: "15+ Years Experience", icon: Clock },
];

function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target, 1800);
  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2">
      <span
        className="text-5xl sm:text-6xl font-extrabold"
        style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-white/80 text-base font-medium uppercase tracking-wide"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span
              className="font-semibold text-base"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              {item.question}
            </span>
            <span className="flex-shrink-0">
              {openIndex === i ? (
                <ChevronDown size={20} style={{ color: "#F5A623" }} />
              ) : (
                <ChevronDown
                  size={20}
                  style={{ color: "#0B1F3A" }}
                  className="rotate-0"
                />
              )}
            </span>
          </button>
          {openIndex === i && (
            <div
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function RichmondClient({ faqData }: Props) {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[520px] sm:min-h-[600px] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Hero section"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/4036301/pexels-photo-4036301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Richmond, TX residential neighborhood at twilight"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.72) 60%, rgba(11,31,58,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} style={{ color: "#F5A623" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Serving Richmond, TX
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Licensed Electrician
              <br />
              <span style={{ color: "#F5A623" }}>in Richmond, TX</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ENE Electrical delivers expert residential electrical services to Richmond homeowners: panel upgrades, EV chargers, generators, new construction wiring, and 24/7 emergency response. Based in Katy, TX 77494.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Zap size={18} strokeWidth={2.5} />
                Book Appointment
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get a Free Quote
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER / INTRO ── */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div className="max-w-4xl mx-auto">
          {/* Quick Answer Block */}
          <div
            className="rounded-2xl p-6 sm:p-8 mb-10 border-l-4 flex gap-5"
            style={{
              backgroundColor: "#FFF8EC",
              borderColor: "#F5A623",
            }}
          >
            <div className="flex-shrink-0 mt-1">
              <Zap size={28} style={{ color: "#F5A623" }} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Quick Answer
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                ENE Electrical is a licensed, insured, and bonded residential electrical contractor serving Richmond, TX as part of the Houston and Katy metro service area. Based in Katy, TX 77494 with 15+ years of experience, ENE Electrical offers Richmond homeowners panel upgrades, EV charger installation, generator installation, new construction wiring, recessed lighting, electrical repairs, and 24/7 emergency electrical services.
              </p>
            </div>
          </div>

          {/* Local Relevance */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                Electrical Services for Richmond, TX Homeowners
              </h2>
              <div
                className="w-12 h-1 rounded-full mb-5"
                style={{ backgroundColor: "#F5A623" }}
              />
              <p
                className="text-base leading-relaxed text-gray-600 mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Richmond, TX is a rapidly expanding Fort Bend County city with significant new residential construction and growing neighborhoods. ENE Electrical serves Richmond homeowners from its Katy, TX 77494 base, offering a full range of licensed residential electrical services including new construction wiring, panel upgrades to support larger homes, EV charger installation, and emergency electrical response throughout the Houston and Katy metro area.
              </p>
              <p
                className="text-base leading-relaxed text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Whether you're moving into a new build, upgrading an older home, or need fast emergency help, ENE Electrical's licensed technicians bring the expertise Richmond residents deserve.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Licensed electrician inspecting a residential electrical panel in a Richmond TX home"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── TRUST BADGE BAR ── */}
      <Section background="primary" spacing="sm" maxWidth="2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trustBadges.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-3 py-4 px-3 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#F5A623" }}
              >
                <Icon size={22} style={{ color: "#0B1F3A" }} strokeWidth={2} />
              </div>
              <span
                className="text-white font-semibold text-sm leading-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SERVICES AVAILABLE IN RICHMOND TX ── */}
      <Section background="default" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="What We Offer"
          title="Residential Electrical Services in Richmond, TX"
          subtitle="From new construction wiring to 24/7 emergency response, ENE Electrical covers every electrical need for Richmond homeowners."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <Card
              key={svc.title}
              variant="service"
              title={svc.title}
              description={svc.description}
              icon={svc.icon}
            />
          ))}
        </div>
      </Section>

      {/* ── WHY RICHMOND HOMEOWNERS CHOOSE ENE ── */}
      <Section background="white" spacing="lg" maxWidth="xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
            <img
              src="https://images.pexels.com/photos/33404353/pexels-photo-33404353.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="New residential construction homes in Richmond, Fort Bend County Texas"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Why Choose ENE Electrical
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-2 mb-4 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              Built for Richmond's Growing Homes
            </h2>
            <div
              className="w-12 h-1 rounded-full mb-6"
              style={{ backgroundColor: "#F5A623" }}
            />

            <ul className="flex flex-col gap-5">
              {[
                {
                  icon: TrendingUp,
                  heading: "Expert in Suburban Growth",
                  body: "Richmond is one of Fort Bend County's fastest-growing cities. ENE Electrical specializes in the higher electrical demands of newer, larger suburban homes, from 200A+ panel installs to smart home wiring.",
                },
                {
                  icon: HardHat,
                  heading: "New Construction Specialists",
                  body: "We work alongside Richmond builders and homeowners from the ground up, delivering fully code-compliant residential electrical systems that pass inspection the first time.",
                },
                {
                  icon: Home,
                  heading: "Local to Katy, Close to You",
                  body: "Serving Richmond from our Katy, TX 77494 base means fast response times and electricians who know the Fort Bend County permitting landscape inside and out.",
                },
                {
                  icon: ShieldCheck,
                  heading: "Licensed, Bonded & Background-Checked",
                  body: "Every ENE Electrical technician is licensed, insured, bonded, and background-checked, giving Richmond homeowners total confidence in who enters their home.",
                },
              ].map(({ icon: Icon, heading, body }) => (
                <li key={heading} className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#F5A623" }}
                  >
                    <Icon size={18} style={{ color: "#0B1F3A" }} strokeWidth={2} />
                  </div>
                  <div>
                    <p
                      className="font-bold text-base mb-1"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
                    >
                      {heading}
                    </p>
                    <p
                      className="text-sm text-gray-600 leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── STAT COUNTERS ── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <StatCounter target={15} suffix="+" label="Years of Experience" />
          <StatCounter target={10} suffix="+" label="Cities Served" />
          <StatCounter target={500} suffix="+" label="Panels Upgraded" />
          <StatCounter target={24} suffix="/7" label="Emergency Response" />
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section background="default" spacing="lg" maxWidth="2xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Homeowners Are Saying"
          subtitle="Trusted by homeowners across Richmond, Katy, Fulshear, and the greater Houston metro."
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

      {/* ── GOOGLE MAPS EMBED ── */}
      <Section background="white" spacing="md" maxWidth="2xl">
        <SectionHeading
          eyebrow="Our Location"
          title="Serving Richmond from Katy, TX"
          subtitle="ENE Electrical is based in Katy, TX 77494 and serves Richmond, TX and surrounding Fort Bend County communities."
          align="center"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: "420px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495496.49418776145!2d-95.465351!3d29.836095000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87edc16e279a22c1%3A0xa79d9e35ba6d5e51!2sE-N-E%20Electrical%2C%20LLC!5e1!3m2!1sen!2sin!4v1788230466922!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map showing Richmond, TX relative to ENE Electrical's Katy, TX 77494 service base"
            aria-label="Google Maps showing Richmond TX and surrounding ENE Electrical service area"
          />
        </div>
        <p
          className="text-center text-sm text-gray-500 mt-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          ENE Electrical Based in{" "}
          <strong style={{ color: "#0B1F3A" }}>Katy, TX 77494</strong>
          {" "}· Serving{" "}
          <strong style={{ color: "#0B1F3A" }}>Richmond, TX</strong>
          {" "}and the Houston–Katy metro
        </p>
      </Section>

      {/* ── SERVICE AREA NEIGHBOR LINKS ── */}
      <Section background="default" spacing="md" maxWidth="xl">
        <SectionHeading
          eyebrow="Also Serving Nearby"
          title="Neighbor Service Areas"
          subtitle="ENE Electrical serves Richmond and all surrounding communities in the Houston and Katy metro."
          align="center"
        />
        <nav aria-label="Neighboring service area links">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {neighborLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between gap-3 px-5 py-4 rounded-xl border-2 font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-md group"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#0B1F3A",
                  borderColor: "#0B1F3A",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1F3A";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                  (e.currentTarget as HTMLElement).style.color = "#0B1F3A";
                }}
              >
                <span className="flex items-center gap-2">
                  <MapPin size={15} />
                  {label}
                </span>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </nav>
      </Section>

      {/* ── FAQ ACCORDION ── */}
      <Section background="white" spacing="lg" maxWidth="md">
        <SectionHeading
          eyebrow="Common Questions"
          title="Richmond, TX Electrical FAQ"
          subtitle="Answers to common questions from Richmond homeowners about ENE Electrical services."
          align="center"
        />
        <FAQAccordion items={faqData} />
      </Section>

      {/* ── CTA SECTION ── */}
      <Section background="primary" spacing="lg" maxWidth="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA copy */}
          <div>
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Ready to Get Started?
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-5 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Richmond's Trusted
              <br />
              <span style={{ color: "#F5A623" }}>Licensed Electrician</span>
            </h2>
            <p
              className="text-white/75 text-base leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Whether you need a panel upgrade, EV charger, generator hookup, or emergency electrical service, ENE Electrical is ready to help Richmond homeowners. Schedule your service today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Zap size={18} strokeWidth={2.5} />
                Book Appointment
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View All Services
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* NAP */}
            <div
              className="flex items-center gap-2 text-white/60 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <MapPin size={15} style={{ color: "#F5A623" }} />
              <address className="not-italic">
                ENE Electrical, Katy, TX 77494 · Serving Richmond, TX &amp; the Houston-Katy Metro
              </address>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <ContactForm
              heading="Request a Quote"
              subheading="Tell us about your Richmond home's electrical needs and we'll respond promptly."
              ctaLabel="Send Request"
            />
          </div>
        </div>
      </Section>

      <VanCta
        heading={
          <>
            Ready to Schedule Your Residential Electrician in{" "}
            <span style={{ color: "#F5A623" }}>Richmond, TX?</span>
          </>
        }
        description="Whether you've got an electrical issue that needs fixing, an upgrade you've been putting off, or a new installation you're ready to move forward on, ENE Electrical is ready to help. We serve Richmond homeowners and the surrounding Fort Bend County communities with dependable, licensed electrical service."
      />
    </main>
  );
}