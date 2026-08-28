import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Residential Electrical Services | ENE Electrical Houston TX",
  description:
    "ENE Electrical offers full residential electrical services in Houston & Katy TX — panel upgrades, EV chargers, generators, lighting, new construction wiring, emergency service & more.",
  alternates: {
    canonical: "https://eneelectrical.com/services",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What residential electrical services does ENE Electrical offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ENE Electrical offers electrical repair and installation, panel upgrades, EV charger installation, whole-home generator installation, security lighting, recessed LED lighting, new construction electrical work, emergency electrician service, and electrical inspections.",
      },
    },
    {
      "@type": "Question",
      name: "Does ENE Electrical work on new construction homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ENE Electrical provides new construction electrician and new construction wiring services for residential projects in the Houston and Katy area.",
      },
    },
    {
      "@type": "Question",
      name: "Can ENE Electrical handle both small repairs and large installations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ENE Electrical handles the full spectrum of residential electrical needs, from minor repairs to large-scale installations like generator hookups and panel upgrades.",
      },
    },
  ],
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Residential Electrical Services | ENE Electrical Houston TX",
  description:
    "ENE Electrical offers full residential electrical services in Houston & Katy TX — panel upgrades, EV chargers, generators, lighting, new construction wiring, emergency service & more.",
  url: "https://eneelectrical.com/services",
  provider: {
    "@type": "LocalBusiness",
    name: "ENE Electrical",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77494",
    },
    areaServed: "Houston and Katy, TX metro",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Header />
      <ServicesClient />
      <Footer />
    </>
  );
}