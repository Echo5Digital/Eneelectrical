import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import MemorialHoustonClient from "./MemorialHoustonClient";

export const metadata: Metadata = {
  title: "Electrician in Memorial Houston TX | ENE Electrical",
  description:
    "ENE Electrical serves Memorial Houston with licensed residential electrical services — panel upgrades, EV chargers, security lighting, generators & emergency repairs. 15+ yrs experience.",
  alternates: {
    canonical: "/service-areas/memorial-houston",
  },
};

const faqData = [
  {
    question: "Does ENE Electrical provide services in Memorial Houston?",
    answer:
      "Yes. ENE Electrical includes Memorial Houston in its service area, covering residential electrical needs for homeowners in that community from its Katy, TX 77494 location.",
  },
  {
    question:
      "Can ENE Electrical upgrade an older home's electrical panel in Memorial Houston?",
    answer:
      "Yes. ENE Electrical specializes in electrical panel upgrades for residential homes, including older properties common in established neighborhoods like Memorial Houston.",
  },
  {
    question:
      "Does ENE Electrical offer emergency electrical service in Memorial Houston?",
    answer:
      "Yes. ENE Electrical provides 24/7 emergency electrical services to homeowners in Memorial Houston and throughout the Houston and Katy metro area.",
  },
  {
    question:
      "Is ENE Electrical licensed and insured to work in Houston?",
    answer:
      "Yes. ENE Electrical is a licensed, insured, and bonded electrical contractor with background-checked technicians serving Memorial Houston and the broader Houston metro.",
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
  name: "Residential Electrical Services – Memorial Houston",
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
    name: "Memorial, Houston, TX",
  },
  description:
    "ENE Electrical provides licensed, insured, and bonded residential electrical services to Memorial Houston homeowners including panel upgrades, EV charger installation, generator installation, security lighting, electrical repairs, and 24/7 emergency service.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Panel Upgrade" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrical Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Inspection" } },
    ],
  },
};

export default function MemorialHoustonPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas/houston-tx" },
    { label: "Memorial Houston", href: "/service-areas/memorial-houston" },
  ];

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
      <MemorialHoustonClient faqData={faqData} />
      <Footer />
    </>
  );
}