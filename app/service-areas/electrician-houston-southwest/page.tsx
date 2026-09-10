import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SouthwestHoustonClient from "./SouthwestHoustonClient";

export const metadata: Metadata = {
  title: "Electrician in Southwest Houston, TX | ENE Electrical",
  description:
    "ENE Electrical delivers licensed residential electrical services across Southwest Houston. From panel upgrades to emergency repairs, we've got you covered. Book today.",
  alternates: {
    canonical: "/service-areas/electrician-houston-southwest",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical serve Southwest Houston homeowners?",
    answer:
      "Yes. Southwest Houston is part of ENE Electrical's service area. Licensed, background-checked technicians are dispatched to Southwest Houston residences from the company's Katy, TX 77494 base.",
  },
  {
    question:
      "What electrical services can Southwest Houston residents book with ENE Electrical?",
    answer:
      "Southwest Houston homeowners can book electrical repair and installation, panel upgrades, EV charger installation, generator installation, security lighting, recessed LED lighting, new construction wiring, electrical inspections, and emergency electrical service through ENE Electrical.",
  },
  {
    question:
      "Is ENE Electrical licensed and insured to work in Southwest Houston?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded in Texas, with background-checked technicians serving all areas of its service region, including Southwest Houston.",
  },
  {
    question: "Do you serve ZIP code 77074?",
    answer:
      "Yes. We provide electrical services in 77074 and surrounding Southwest Houston neighborhoods.",
  },
  {
    question:
      "Are you available for emergency electrical repairs in Southwest Houston?",
    answer:
      "Yes. We offer 24/7 emergency electrician services throughout the area.",
  },
  {
    question: "Do you install EV chargers in 77031?",
    answer:
      "Yes. We provide professional EV charger installation for homes and businesses in 77031 and 77083.",
  },
  {
    question: "Do you serve Alief and Sharpstown?",
    answer:
      "Yes. We provide electrical services throughout Alief, Sharpstown, and nearby Southwest Houston communities.",
  },
  {
    question: "Do you handle commercial electrical services in this area?",
    answer:
      "Yes. We provide commercial electrical repairs and installations across Southwest Houston.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Southwest Houston",
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
    name: "Southwest Houston, TX",
  },
  description:
    "ENE Electrical is a licensed, insured, and bonded residential electrical contractor serving homeowners in Southwest Houston, TX. Services include electrical repair, panel upgrades, EV charger installation, generator installation, security lighting, and emergency electrical services.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel Upgrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recessed LED Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "New Construction Wiring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrician" } },
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

export default function SouthwestHoustonPage() {
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
      <SouthwestHoustonClient faqData={faqData} />
      <Footer />
    </>
  );
}