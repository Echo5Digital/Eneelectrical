import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, { SectionHeading } from "@/components/Section";
import NewConstructionClient from "./NewConstructionClient";

export const metadata: Metadata = {
  title: "New Construction Electrician Katy & Houston TX | ENE Electrical",
  description:
    "ENE Electrical is a licensed new construction electrician serving Katy & Houston, TX. Expert rough-in, panel install & inspection coordination. Get a project quote today.",
  alternates: {
    canonical:
      "https://www.eneelectrical.com/services/new-construction-electrician",
  },
};

const faqData = [
  {
    question:
      "Does ENE Electrical work with custom home builders in the Houston area?",
    answer:
      "Yes. ENE Electrical works with both custom home builders and individual homeowners building new homes throughout the Houston and Katy, TX metro.",
  },
  {
    question:
      "What phases of new construction does ENE Electrical handle?",
    answer:
      "ENE Electrical handles all electrical phases of new construction including rough-in wiring, panel installation, trim-out, lighting, EV charger pre-wiring, and coordinating electrical inspections.",
  },
  {
    question:
      "Is ENE Electrical licensed for new construction electrical work in Texas?",
    answer:
      "Yes. ENE Electrical is fully licensed, insured, and bonded in Texas with background-checked technicians and 15+ years of residential electrical experience.",
  },
  {
    question:
      "Do you serve the Fulshear and Cinco Ranch new construction market?",
    answer:
      "Yes. ENE Electrical actively serves new construction projects in Fulshear, Cinco Ranch, Katy, and other rapidly developing west Houston communities.",
  },
];

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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "New Construction Electrician",
  description:
    "ENE Electrical is a licensed new construction electrician serving Katy & Houston, TX. Expert rough-in, panel install & inspection coordination.",
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
    "Katy, TX",
    "Houston, TX",
    "Fulshear, TX",
    "Cinco Ranch, TX",
    "Energy Corridor",
    "Southwest Houston",
    "Memorial",
    "Spring Branch",
    "Westchase",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  serviceType: "New Construction Electrical",
  url: "https://www.eneelectrical.com/services/new-construction-electrician",
};

export default function NewConstructionElectricianPage() {
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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "New Construction Electrician", href: "/services/new-construction-electrician" },
        ]}
      />
      <NewConstructionClient faqData={faqData} />
      <Footer />
    </>
  );
}