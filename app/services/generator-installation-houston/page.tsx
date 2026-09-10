import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, { SectionHeading } from "@/components/Section";
import GeneratorInstallationClient from "./GeneratorInstallationClient";

export const metadata: Metadata = {
  title: "Whole-Home Generator Installation | ENE Electrical Houston",
  description:
    "ENE Electrical installs whole-home standby generators for Houston & Katy, TX homeowners. Licensed, insured, 15+ yrs experience. Book your installation today.",
  alternates: {
    canonical: "/services/generator-installation-houston",
  },
};

const faqData = [
  {
    question: "Is ENE Electrical licensed to install generators in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded in Texas, with background-checked technicians and 15+ years of residential electrical experience.",
  },
  {
    question: "Do you handle permits for generator installation?",
    answer:
      "Yes. ENE Electrical manages the permitting process as part of a complete generator installation to ensure full code compliance.",
  },
  {
    question: "What areas do you serve for generator installation?",
    answer:
      "We install whole-home generators throughout the Houston and Katy, TX metro, including Katy, Cinco Ranch, Fulshear, Energy Corridor, Southwest Houston, Memorial, Spring Branch, Westchase, Brookshire, and Richmond.",
  },
  {
    question: "What type of transfer switch do you install with a generator?",
    answer:
      "ENE Electrical installs automatic transfer switches as part of standby generator installations, ensuring your home seamlessly switches to backup power when the grid goes down.",
  },
  {
    question: "How much does generator installation cost in Houston?",
    answer:
      "Costs vary based on generator size and installation complexity. We provide clear, upfront estimates after evaluating your property.",
  },
  {
    question: "What is a whole home generator?",
    answer:
      "A whole home generator powers your entire house during an outage, while smaller systems power selected circuits.",
  },
  {
    question: "Do generators turn on automatically?",
    answer:
      "Yes. Standby generators with automatic transfer switches activate when power is lost.",
  },
  {
    question: "Do you install Generac generators in Katy?",
    answer:
      "Yes. We install Generac and other major standby generator brands.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Whole-Home Generator Installation",
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
    "Cinco Ranch, TX",
    "Fulshear, TX",
    "Energy Corridor",
    "Southwest Houston",
    "Memorial, Houston",
    "Spring Branch, Houston",
    "Westchase, Houston",
    "Brookshire, TX",
    "Richmond, TX",
  ],
  description:
    "ENE Electrical provides whole-home standby generator installation for residential homeowners in Houston and Katy, TX. Licensed, insured, and bonded electricians handle sizing, permitting, transfer switch installation, and final testing.",
  serviceType: "Generator Installation",
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

export default function GeneratorInstallationPage() {
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
            { label: "Services", href: "/services" },
            { label: "Generator Installation", href: "/services/generator-installation-houston" },
          ]}
        />
      </div>
      <GeneratorInstallationClient faqData={faqData} />
      <Footer />
    </>
  );
}