import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AppointmentBookingClient from "./AppointmentBookingClient";

export const metadata: Metadata = {
  title: "Book an Electrician Appointment | ENE Electrical TX",
  description:
    "Schedule a licensed residential electrician in Katy or Houston TX with ENE Electrical. Book online for panel upgrades, EV chargers, repairs, lighting, and more.",
  alternates: {
    canonical: "https://eneelectrical.com/appointment-booking",
  },
};

const faqData = [
  {
    question: "How do I book an electrician with ENE Electrical?",
    answer:
      "Fill out the online appointment form with your contact details, service type, and preferred date/time. ENE Electrical will confirm your appointment and dispatch a licensed, background-checked technician.",
  },
  {
    question: "Can I book an emergency electrician through the appointment form?",
    answer:
      "For emergencies, ENE Electrical recommends calling directly rather than using the online booking form to ensure the fastest possible response.",
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

export default function AppointmentBookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Appointment Booking", href: "/appointment-booking" },
        ]}
      />
      <AppointmentBookingClient faqData={faqData} />
      <Footer />
    </>
  );
}