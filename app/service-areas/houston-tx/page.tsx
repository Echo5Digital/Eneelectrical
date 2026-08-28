import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HoustonClient from "./HoustonClient";

export const metadata: Metadata = {
  title: "Residential Electrician in Houston, TX | ENE Electrical",
  description:
    "ENE Electrical provides licensed, insured residential electrical services across Houston, TX. Panel upgrades, EV chargers, emergency repairs & inspections. Get a quote today.",
  alternates: {
    canonical: "/service-areas/houston-tx",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical serve all of Houston, TX?",
    answer:
      "ENE Electrical serves the broader Houston metro area, including neighborhoods such as the Energy Corridor, Southwest Houston, Memorial, Spring Branch, and Westchase, as well as suburbs including Katy, Cinco Ranch, Fulshear, Brookshire, and Richmond, TX.",
  },
  {
    question: "Is ENE Electrical licensed to perform electrical work in Houston?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded, and employs background-checked technicians for all residential electrical work throughout the Houston metro area.",
  },
  {
    question:
      "What kinds of residential electrical services does ENE Electrical provide in Houston?",
    answer:
      "ENE Electrical offers electrical repair and installation, electrical panel upgrades, EV charger installation, generator installation, security lighting, recessed LED lighting, new construction wiring, emergency electrician service, and electrical inspections for Houston-area homeowners.",
  },
  {
    question: "How much experience does ENE Electrical have serving Houston residents?",
    answer:
      "ENE Electrical has 15+ years of experience serving residential customers in the Houston and Katy, TX metro area.",
  },
  {
    question: "Can ENE Electrical handle electrical emergencies in Houston?",
    answer:
      "Yes. ENE Electrical offers emergency electrician services for Houston homeowners who need urgent electrical assistance.",
  },
];

const serviceSchemaJson = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Houston, TX",
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
    areaServed: {
      "@type": "City",
      name: "Houston",
      sameAs: "https://en.wikipedia.org/wiki/Houston",
    },
    hasCredential: ["Licensed", "Insured", "Bonded", "Background-Checked Technicians"],
  },
  serviceType: [
    "Electrical Repair",
    "Electrical Panel Upgrade",
    "EV Charger Installation",
    "Generator Installation",
    "Security Lighting",
    "Recessed LED Lighting",
    "New Construction Wiring",
    "Emergency Electrician",
    "Electrical Inspection",
  ],
  description:
    "ENE Electrical provides licensed, insured residential electrical services across Houston, TX including panel upgrades, EV charger installation, generator installation, emergency repairs, and electrical inspections.",
};

const faqSchemaJson = {
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

export default function HoustonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJson) }}
      />
      <Header />
      <HoustonClient faqData={faqData} />
      <Footer />
    </>
  );
}