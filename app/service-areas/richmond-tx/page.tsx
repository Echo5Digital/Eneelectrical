import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichmondClient from "./RichmondClient";

export const metadata: Metadata = {
  title: "Electrician in Richmond TX | ENE Electrical Services",
  description:
    "ENE Electrical brings licensed residential electrical services to Richmond, TX — panel upgrades, EV chargers, new construction wiring, generators & 24/7 emergency electrician. Katy-based.",
  alternates: {
    canonical: "/service-areas/richmond-tx",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical serve Richmond, TX?",
    answer:
      "Yes. Richmond, TX is part of ENE Electrical's service area covering the Houston and Katy metro, served from its Katy, TX 77494 location.",
  },
  {
    question: "Does ENE Electrical do new construction electrical wiring in Richmond?",
    answer:
      "Yes. ENE Electrical provides new construction wiring and electrician services for residential properties in Richmond, TX and the surrounding Houston-Katy metro.",
  },
  {
    question: "Can ENE Electrical install an EV charger at my Richmond home?",
    answer:
      "Yes. EV charger installation is a core service ENE Electrical offers to residential homeowners in Richmond, TX and throughout its service area.",
  },
  {
    question: "How experienced is ENE Electrical for Richmond homeowners?",
    answer:
      "ENE Electrical has 15+ years of experience providing residential electrical services across the Houston and Katy metro, including Richmond, TX, and is licensed, insured, bonded, and employs background-checked technicians.",
  },
];

const serviceSchemaJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Richmond, TX",
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
    name: "Richmond",
    containedInPlace: {
      "@type": "State",
      name: "Texas",
    },
  },
  description:
    "ENE Electrical provides licensed residential electrical services to Richmond, TX including panel upgrades, EV charger installation, generator installation, new construction wiring, recessed lighting, electrical repairs, and 24/7 emergency electrical services.",
  serviceType: [
    "Electrical Panel Upgrade",
    "EV Charger Installation",
    "Generator Installation",
    "New Construction Wiring",
    "Recessed Lighting",
    "Electrical Repair",
    "Emergency Electrician",
    "Electrical Inspection",
  ],
};

const faqSchemaJsonLd = {
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

export default function RichmondTXPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJsonLd) }}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas/houston-tx" },
          { label: "Richmond, TX", href: "/service-areas/richmond-tx" },
        ]}
      />
      <RichmondClient faqData={faqData} />
      <Footer />
    </>
  );
}