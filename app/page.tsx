import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "ENE Electrical | Licensed Electrician Katy & Houston TX",
  description:
    "ENE Electrical is a licensed, insured, and bonded residential electrician serving Katy and Houston, TX. 15+ years of experience in panel upgrades, EV chargers, generators & more.",
  alternates: {
    canonical: "https://eneelectrical.com/",
  },
};

const faqData = [
  {
    question: "Is ENE Electrical licensed and insured in Texas?",
    answer:
      "Yes. ENE Electrical is licensed, insured, and bonded, with background-checked technicians serving residential clients across the Houston and Katy, TX metro.",
  },
  {
    question: "What areas does ENE Electrical serve?",
    answer:
      "ENE Electrical serves Katy, Energy Corridor, Southwest Houston, Cinco Ranch, Fulshear, Memorial, Spring Branch, Westchase, Brookshire, Richmond, and the broader Houston, TX metro area.",
  },
  {
    question: "How many years of experience does ENE Electrical have?",
    answer: "ENE Electrical has 15+ years of experience providing residential electrical services.",
  },
  {
    question: "Does ENE Electrical handle emergency electrical calls?",
    answer:
      "Yes. ENE Electrical provides emergency electrician services for residential homeowners in the Houston and Katy, TX area.",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <HomeClient faqData={faqData} />
      <Footer />
    </>
  );
}