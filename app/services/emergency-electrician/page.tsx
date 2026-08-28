import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, { SectionHeading } from "@/components/Section";
import EmergencyElectricianClient from "./EmergencyElectricianClient";

export const metadata: Metadata = {
  title: "Emergency Electrician Houston & Katy TX | ENE Electrical",
  description:
    "ENE Electrical provides emergency electrician services for Houston & Katy, TX homeowners. Licensed, insured & ready for urgent electrical repairs. Call now for fast response.",
  alternates: {
    canonical: "https://www.eneelectrical.com/services/emergency-electrician",
  },
};

const faqData = [
  {
    question: "What counts as a residential electrical emergency?",
    answer:
      "Electrical emergencies include a burning smell from outlets or panels, visible sparks, breakers that repeatedly trip or won't reset, sudden loss of power to critical areas, exposed or damaged wiring, and any electrical issue near water or flood damage.",
  },
  {
    question: "Is ENE Electrical licensed to handle emergency electrical repairs in Texas?",
    answer:
      "Yes. ENE Electrical is fully licensed, insured, and bonded in Texas, with background-checked technicians and 15+ years of residential electrical experience.",
  },
  {
    question: "Which areas does ENE Electrical cover for emergency electrical calls?",
    answer:
      "ENE Electrical responds to emergency electrical calls throughout the Houston and Katy metro, including Katy, Cinco Ranch, Fulshear, Energy Corridor, Memorial, Spring Branch, Westchase, Southwest Houston, Brookshire, and Richmond, TX.",
  },
  {
    question: "What should I do before the emergency electrician arrives?",
    answer:
      "If it is safe to do so, avoid using the affected outlets or circuits, keep family away from the area, and if you smell burning or see sparks, consider shutting off the main breaker and evacuating until the electrician arrives.",
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
  name: "Emergency Electrician",
  description:
    "ENE Electrical provides emergency electrician services for residential homeowners in Houston and Katy, TX, handling urgent electrical problems including panel failures, breaker issues, burning smells, storm damage, and sudden power loss.",
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
    "Houston, TX",
    "Katy, TX",
    "Cinco Ranch, TX",
    "Fulshear, TX",
    "Energy Corridor, TX",
    "Memorial, TX",
    "Spring Branch, TX",
    "Westchase, TX",
    "Southwest Houston, TX",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  serviceType: "Emergency Electrical Repair",
};

export default function EmergencyElectricianPage() {
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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Emergency Electrician", href: "/services/emergency-electrician" },
        ]}
      />
      <EmergencyElectricianClient faqData={faqData} />
      <Footer />
    </>
  );
}