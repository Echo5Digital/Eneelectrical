import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WestchaseHoustonClient from "./WestchaseHoustonClient";

export const metadata: Metadata = {
  title: "Electrician in Westchase Houston TX | ENE Electrical",
  description:
    "ENE Electrical delivers licensed residential electrical services in Westchase, Houston TX, including panel upgrades, EV chargers, generators, lighting & 24/7 emergency electrician. Katy-based, Houston-wide.",
  alternates: {
    canonical: "/service-areas/westchase-houston",
  },
};

const faqData = [
  {
    question: "Is Westchase Houston within ENE Electrical's service area?",
    answer:
      "Yes. ENE Electrical serves Westchase Houston as part of its Houston and Katy metro coverage, operating from Katy, TX 77494.",
  },
  {
    question: "Does ENE Electrical install EV chargers in Westchase Houston?",
    answer:
      "Yes. EV charger installation is one of ENE Electrical's core residential services, available to homeowners in Westchase and throughout the Houston metro.",
  },
  {
    question:
      "Can I book an emergency electrician in Westchase Houston through ENE Electrical?",
    answer:
      "Yes. ENE Electrical provides 24/7 emergency electrical services to Westchase Houston homeowners and the broader Houston and Katy metro area.",
  },
  {
    question: "What credentials does ENE Electrical hold?",
    answer:
      "ENE Electrical is licensed, insured, and bonded, and employs background-checked technicians with 15+ years of residential electrical experience.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Westchase Houston TX",
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
    name: "Westchase, Houston, TX",
  },
  description:
    "ENE Electrical delivers licensed residential electrical services in Westchase, Houston TX, including panel upgrades, EV chargers, generators, lighting & 24/7 emergency electrician.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Panel Upgrade" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recessed LED Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrician" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Repair & Installation" } },
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

export default function WestchaseHoustonPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas/houston-tx" },
    { label: "Westchase Houston", href: "/service-areas/westchase-houston" },
  ];

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

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <main>
        <WestchaseHoustonClient faqData={faqData} />
      </main>
      <Footer />
    </>
  );
}