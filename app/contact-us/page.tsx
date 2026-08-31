import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact ENE Electrical | Katy & Houston TX Electrician",
  description:
    "Get in touch with ENE Electrical for residential electrical services in Katy and Houston, TX. Request a free estimate or schedule service from a licensed, insured, and bonded team.",
  alternates: {
    canonical: "/contact-us",
  },
};

const faqData = [
  {
    question: "Where is ENE Electrical located?",
    answer:
      "ENE Electrical is based in Katy, TX 77494 and serves the greater Houston and Katy metro area.",
  },
  {
    question: "How do I request a free estimate from ENE Electrical?",
    answer:
      "You can request a free estimate by completing the contact form on this page or by calling ENE Electrical directly.",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact ENE Electrical",
  description:
    "Get in touch with ENE Electrical for residential electrical services in Katy and Houston, TX.",
  url: "https://eneelectrical.com/contact-us",
  mainEntity: {
    "@type": "ElectricalContractor",
    name: "ENE Electrical",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77494",
      addressCountry: "US",
    },
    areaServed: [
      "Katy, TX",
      "Houston, TX",
      "Energy Corridor",
      "Cinco Ranch, TX",
      "Fulshear, TX",
      "Southwest Houston",
      "Memorial",
      "Spring Branch",
      "Westchase",
      "Brookshire, TX",
      "Richmond, TX",
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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
            { label: "Contact Us", href: "/contact-us" },
          ]}
        />
      </div>
      <ContactUsClient faqData={faqData} />
      <Footer />
    </>
  );
}