import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CincoRanchClient from "./CincoRanchClient";

export const metadata: Metadata = {
  title: "Electrician in Cinco Ranch, TX | ENE Electrical Katy",
  description:
    "ENE Electrical serves Cinco Ranch, TX with licensed, insured residential electrical services. EV chargers, panel upgrades, security lighting & more. Schedule service today.",
  alternates: {
    canonical: "/service-areas/cinco-ranch-tx",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical serve Cinco Ranch, TX?",
    answer:
      "Yes. Cinco Ranch is part of ENE Electrical's service area. The company is based in nearby Katy, TX 77494 and dispatches licensed, background-checked technicians to Cinco Ranch homes.",
  },
  {
    question: "What electrical services are available to Cinco Ranch homeowners?",
    answer:
      "ENE Electrical offers electrical repair and installation, panel upgrades, EV charger installation, generator installation, security lighting, recessed LED lighting, new construction wiring, electrical inspections, and emergency electrical service in Cinco Ranch, TX.",
  },
  {
    question: "Can ENE Electrical install an EV charger in my Cinco Ranch home?",
    answer:
      "Yes. ENE Electrical provides EV charger installation for residential customers in Cinco Ranch and throughout the Katy and Houston metro area.",
  },
  {
    question: "Is ENE Electrical licensed and insured in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded, with background-checked technicians serving Cinco Ranch and the broader Houston and Katy metro area.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Cinco Ranch, TX",
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
    name: "Cinco Ranch, TX",
  },
  description:
    "ENE Electrical provides licensed, insured, and bonded residential electrical services to Cinco Ranch, TX homeowners including EV charger installation, panel upgrades, security lighting, generator installation, and more.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Panel Upgrade" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recessed LED Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrical Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Inspection" } },
    ],
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

export default function CincoRanchPage() {
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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas/houston-tx" },
          { label: "Cinco Ranch, TX", href: "/service-areas/cinco-ranch-tx" },
        ]}
      />
      <main>
        <CincoRanchClient faqData={faqData} />
      </main>
      <Footer />
    </>
  );
}