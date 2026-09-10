import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import KatyClient from "./KatyClient";

export const metadata: Metadata = {
  title: "Licensed Electrician in Katy, TX | ENE Electrical",
  description:
    "ENE Electrical is based in Katy, TX 77494, offering licensed, insured residential electrical services. Panel upgrades, EV chargers, emergency repairs & more. Call today.",
  alternates: {
    canonical: "/service-areas/electrician-katy-tx",
  },
};

const faqData = [
  {
    question: "Is ENE Electrical based in Katy, TX?",
    answer:
      "Yes. ENE Electrical is headquartered in Katy, TX 77494, making it a locally based electrical contractor for Katy-area homeowners.",
  },
  {
    question: "What electrical services does ENE Electrical offer in Katy, TX?",
    answer:
      "ENE Electrical provides electrical repair and installation, panel upgrades, EV charger installation, generator installation, security lighting, recessed LED lighting, new construction wiring, emergency electrical service, and electrical inspections throughout Katy, TX.",
  },
  {
    question: "Is ENE Electrical licensed to work in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded, and all technicians are background-checked, ensuring safe and compliant electrical work for Katy homeowners.",
  },
  {
    question: "Does ENE Electrical handle electrical emergencies in Katy, TX?",
    answer:
      "Yes. ENE Electrical offers emergency electrician services for Katy residents who need urgent electrical repairs.",
  },
  {
    question: "How quickly can an electrician come to my home in Katy?",
    answer:
      "We offer 24/7 emergency service in Katy and can often respond the same day depending on availability.",
  },
  {
    question: "How much does an electrician cost in Katy TX?",
    answer:
      "Costs vary based on the service needed. We provide clear, upfront estimates before beginning any work.",
  },
  {
    question: "Do you serve 77494 and 77450?",
    answer:
      "Yes. We serve all Katy neighborhoods including ZIP codes 77494 and 77450.",
  },
  {
    question: "Do you offer commercial electrical services in Katy?",
    answer:
      "Yes. We provide commercial electrical repairs and installations throughout Katy.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Services in Katy, TX",
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
    name: "Katy",
    containedInPlace: {
      "@type": "State",
      name: "Texas",
    },
  },
  description:
    "ENE Electrical is a licensed, insured, and bonded residential electrical contractor headquartered in Katy, TX 77494, offering panel upgrades, EV charger installation, emergency electrical repair, electrical inspections, and more.",
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

export default function KatyTXPage() {
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
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas/houston-tx" },
            { label: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
          ]}
        />
      </div>
      <KatyClient faqData={faqData} />
      <Footer />
    </>
  );
}