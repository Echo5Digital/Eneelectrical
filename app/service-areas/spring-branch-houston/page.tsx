import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpringBranchHoustonClient from "./SpringBranchHoustonClient";

export const metadata: Metadata = {
  title: "Electrician Spring Branch Houston TX | ENE Electrical",
  description:
    "ENE Electrical offers licensed residential electrical services in Spring Branch, Houston TX — repairs, panel upgrades, EV chargers, generators & emergency response. 15+ yrs experience.",
  alternates: {
    canonical: "/service-areas/spring-branch-houston",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical serve Spring Branch Houston?",
    answer:
      "Yes. Spring Branch Houston is within ENE Electrical's service area, which covers the Houston and Katy, TX metro from their Katy, TX 77494 base.",
  },
  {
    question:
      "What residential electrical services does ENE Electrical offer in Spring Branch?",
    answer:
      "ENE Electrical provides Spring Branch homeowners with electrical repairs, panel upgrades, EV charger installation, whole-home generator installation, security lighting, recessed LED lighting, electrical inspections, and 24/7 emergency electrical service.",
  },
  {
    question: "Are ENE Electrical's technicians background-checked?",
    answer:
      "Yes. All ENE Electrical technicians are background-checked in addition to the company being licensed, insured, and bonded.",
  },
  {
    question:
      "Can ENE Electrical handle electrical needs for older Spring Branch homes?",
    answer:
      "Yes. ENE Electrical has 15+ years of experience working on a wide range of residential properties, including older homes that may need panel upgrades, rewiring, or electrical inspections.",
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
  name: "Residential Electrical Services in Spring Branch, Houston TX",
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
    name: "Spring Branch, Houston, TX",
  },
  description:
    "ENE Electrical offers licensed residential electrical services in Spring Branch, Houston TX — repairs, panel upgrades, EV chargers, generators & emergency response. 15+ yrs experience.",
  serviceType: [
    "Electrical Repair",
    "Panel Upgrade",
    "EV Charger Installation",
    "Generator Installation",
    "Security Lighting",
    "Recessed LED Lighting",
    "Electrical Inspection",
    "Emergency Electrical Service",
  ],
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Service Areas", href: "/service-areas/houston-tx" },
  { label: "Spring Branch, Houston", href: "/service-areas/spring-branch-houston" },
];

export default function SpringBranchHoustonPage() {
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
      <Breadcrumbs items={breadcrumbItems} />
      <SpringBranchHoustonClient faqData={faqData} />
      <Footer />
    </>
  );
}