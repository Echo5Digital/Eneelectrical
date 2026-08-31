import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ElectricalInspectionClient from "./ElectricalInspectionClient";

export const metadata: Metadata = {
  title: "Electrical Inspection Services | ENE Electrical Houston",
  description:
    "ENE Electrical provides licensed residential electrical inspections in Houston & Katy, TX. Identify safety hazards, ensure code compliance, and protect your home. Book today.",
  alternates: {
    canonical: "/services/electrical-inspection-houston",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a residential electrical inspection take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The duration depends on the size and age of the home, but most standard residential electrical inspections are completed within one to three hours. ENE Electrical's licensed technicians are thorough and efficient.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a licensed electrician to perform a home electrical inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In Texas, electrical inspections should be performed by a licensed electrician to ensure the assessment is accurate, code-referenced, and legally credible, especially for real estate transactions or insurance purposes. ENE Electrical is licensed, insured, and bonded.",
      },
    },
    {
      "@type": "Question",
      name: "What does an ENE Electrical inspection cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ENE Electrical inspects your electrical panel, wiring, outlets, GFCI and AFCI protection, grounding, load capacity, and overall code compliance to give you a clear picture of your home's electrical safety.",
      },
    },
    {
      "@type": "Question",
      name: "When should I schedule an electrical inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons include buying or selling a home, planning a renovation, experiencing frequent tripped breakers or flickering lights, living in an older home, or following a major storm or flooding event.",
      },
    },
    {
      "@type": "Question",
      name: "Is ENE Electrical licensed and insured to perform inspections in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ENE Electrical is licensed, insured, and bonded, and employs background-checked technicians throughout the Houston and Katy, TX metro area.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Residential Electrical Inspection",
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
  areaServed: [
    "Houston, TX",
    "Katy, TX",
    "Cinco Ranch, TX",
    "Fulshear, TX",
    "Energy Corridor, TX",
    "Memorial, TX",
    "Spring Branch, TX",
    "Westchase, TX",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  description:
    "ENE Electrical provides licensed residential electrical inspections in Houston & Katy, TX. Identify safety hazards, ensure code compliance, and protect your home.",
  serviceType: "Electrical Inspection",
};

export default function ElectricalInspectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <ElectricalInspectionClient />
      <Footer />
    </>
  );
}