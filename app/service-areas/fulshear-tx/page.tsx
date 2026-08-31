import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import FulshearClient from "./FulshearClient";

export const metadata: Metadata = {
  title: "Electrician in Fulshear TX | ENE Electrical",
  description:
    "ENE Electrical provides licensed residential electrical services in Fulshear, TX, including panel upgrades, EV chargers, generators, lighting & more. Serving Fulshear from Katy, TX.",
  alternates: {
    canonical: "/service-areas/fulshear-tx",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical serve Fulshear, TX?",
    answer:
      "Yes. ENE Electrical serves Fulshear, TX as part of its Houston and Katy metro service area, operating from its Katy, TX 77494 location.",
  },
  {
    question: "Is ENE Electrical licensed to work in Fulshear?",
    answer:
      "Yes. ENE Electrical is a licensed, insured, and bonded electrical contractor with background-checked technicians serving Fulshear and surrounding Texas communities.",
  },
  {
    question: "What electrical services are available to Fulshear homeowners?",
    answer:
      "ENE Electrical offers Fulshear residents electrical repairs, panel upgrades, EV charger installation, whole-home generator installation, security lighting, recessed LED lighting, new construction wiring, electrical inspections, and 24/7 emergency electrical services.",
  },
  {
    question: "How experienced is ENE Electrical?",
    answer:
      "ENE Electrical has 15+ years of experience providing residential electrical services to homeowners in Fulshear, Katy, Houston, and surrounding Texas suburbs.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Fulshear, TX",
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
    name: "Fulshear",
    containedInPlace: {
      "@type": "State",
      name: "Texas",
    },
  },
  description:
    "ENE Electrical provides licensed residential electrical services in Fulshear, TX, including panel upgrades, EV chargers, generators, lighting & more. Serving Fulshear from Katy, TX.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel Upgrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recessed LED Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "New Construction Wiring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Inspections" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrical Services" } },
    ],
  },
};

export default function FulshearPage() {
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
            { label: "Service Areas", href: "/service-areas/houston-tx" },
            { label: "Fulshear, TX", href: "/service-areas/fulshear-tx" },
          ]}
        />
      </div>
      <FulshearClient faqData={faqData} />
      <Footer />
    </>
  );
}