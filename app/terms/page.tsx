import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { FileText, Globe, Calendar, Shield, AlertTriangle, Scale, MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ENE Electrical",
  description:
    "Review the Terms of Service for the ENE Electrical website. Understand the rules governing use of our site, service inquiries, and limitations of liability.",
  alternates: {
    canonical: "/terms",
  },
};

const effectiveDate = "January 1, 2024";

const sections = [
  {
    id: "use-of-website",
    icon: Globe,
    title: "Use of Website",
    content: [
      "By accessing and using the ENE Electrical website (the \u201cSite\u201d), you agree to use it only for lawful purposes and in a manner that does not infringe the rights of others. You may not:",
      null, // indicates a list follows
      "Attempt to gain unauthorized access to any portion of the Site or its related systems or networks.",
      "Use the Site to transmit any unsolicited or unauthorized advertising or promotional material.",
      "Engage in any conduct that restricts or inhibits any other person from using or enjoying the Site.",
      "Use any automated means, including bots or scrapers, to access, collect, or index the Site\u2019s content.",
      "Introduce viruses, trojans, worms, or other malicious or harmful code to the Site.",
      "ENE Electrical reserves the right to terminate or restrict access to the Site for any user who violates these terms, without notice and at our sole discretion.",
    ],
  },
  {
    id: "service-inquiries",
    icon: Calendar,
    title: "Service Inquiries & Appointments",
    content: [
      "Online forms, contact submissions, and scheduling tools available on the ENE Electrical website are provided for inquiry and scheduling convenience only. Submitting a service request, contact form, or appointment request through the Site does not constitute a binding service contract or guarantee of service.",
      "A service agreement is only established when ENE Electrical expressly confirms your appointment or service request in writing or by telephone. ENE Electrical reserves the right to decline any service request at its discretion.",
      "Estimated pricing, availability, and service scope communicated through the Site are subject to change and do not represent a final quote or commitment until confirmed by an ENE Electrical representative.",
    ],
  },
  {
    id: "intellectual-property",
    icon: Shield,
    title: "Intellectual Property",
    content: [
      "All content on this Site \u2014 including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software \u2014 is the property of ENE Electrical or its content suppliers and is protected by applicable United States and international intellectual property laws.",
      "The ENE Electrical name, logo, and all related marks, product and service names, designs, and slogans are trademarks of ENE Electrical. You may not use such marks without the prior written permission of ENE Electrical.",
      "You may view, print, or download content from the Site solely for your personal, non-commercial use. Any other use, including reproduction, modification, distribution, transmission, republication, display, or performance of the content on this Site is strictly prohibited without express written consent from ENE Electrical.",
    ],
  },
  {
    id: "disclaimer-of-warranties",
    icon: AlertTriangle,
    title: "Disclaimer of Warranties",
    content: [
      "The information and content on this Site are provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied. ENE Electrical expressly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "ENE Electrical does not warrant that the Site will be uninterrupted or error-free, that defects will be corrected, or that the Site or the server that makes it available are free of viruses or other harmful components.",
      "While we strive to keep all information on this Site accurate and up to date, ENE Electrical makes no representations or warranties regarding the accuracy, completeness, reliability, or suitability of any information, content, or materials displayed on the Site for any purpose. Any reliance you place on such information is strictly at your own risk.",
    ],
  },
  {
    id: "limitation-of-liability",
    icon: Scale,
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, ENE Electrical, its officers, directors, employees, agents, licensors, and service providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages \u2014 including but not limited to loss of profits, data, goodwill, or other intangible losses \u2014 arising out of or in connection with your access to or use of (or inability to use) this Site or its content.",
      "ENE Electrical\u2019s total liability to you for any claim arising from or relating to these Terms or your use of the Site shall not exceed the greater of (a) the amount paid by you, if any, to ENE Electrical in the twelve (12) months prior to the claim, or (b) one hundred U.S. dollars ($100).",
      "Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such jurisdictions, ENE Electrical\u2019s liability is limited to the maximum extent permitted by law.",
    ],
  },
  {
    id: "governing-law",
    icon: MapPin,
    title: "Governing Law",
    content: [
      "These Terms of Service and any disputes arising out of or related to them or the Site shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.",
      "Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in Texas, and you hereby consent to personal jurisdiction and venue therein.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Service", href: "/terms" },
          ]}
        />
      </div>

      {/* Page Header */}
      <Section background="primary" spacing="lg" as="div">
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
              style={{ backgroundColor: "#F5A623" }}
              aria-hidden="true"
            >
              <FileText size={24} strokeWidth={2} style={{ color: "#0B1F3A" }} />
            </span>
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Legal
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Terms of Service
          </h1>

          <div
            className="w-16 h-1 rounded-full"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          />

          <p
            className="text-blue-200 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Please read these Terms of Service carefully before using the ENE
            Electrical website. By accessing or using our website, you agree to be
            bound by these terms and conditions. If you do not agree to all of these
            terms, please do not use this Site.
          </p>

          <p
            className="text-sm text-blue-300 flex items-center gap-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Calendar size={15} aria-hidden="true" />
            <span>
              <strong className="text-white">Effective Date:</strong> {effectiveDate}
            </span>
          </p>
        </div>
      </Section>

      {/* Table of Contents */}
      <Section background="white" spacing="sm" maxWidth="lg">
        <nav aria-label="Terms of Service sections">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            Contents
          </p>
          <ol className="grid sm:grid-cols-2 gap-2 list-none p-0 m-0">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:underline"
                  style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact-information"
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:underline"
                style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                  aria-hidden="true"
                >
                  {sections.length + 1}
                </span>
                Contact Information
              </a>
            </li>
          </ol>
        </nav>
      </Section>

      {/* Terms Sections */}
      <Section background="default" spacing="lg" maxWidth="lg">
        <div className="flex flex-col gap-12">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const isList = s.content[1] === null;

            return (
              <article
                key={s.id}
                id={s.id}
                className="bg-white rounded-[0.75rem] shadow-sm border border-gray-100 overflow-hidden scroll-mt-28"
              >
                {/* Section header */}
                <div
                  className="flex items-center gap-4 px-6 py-5 border-b border-gray-100"
                  style={{ backgroundColor: "#F7F8FA" }}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: "#0B1F3A" }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={2} style={{ color: "#F5A623" }} />
                  </span>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    <span
                      className="mr-2 text-sm font-semibold"
                      style={{ color: "#F5A623" }}
                    >
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {s.title}
                  </h2>
                </div>

                {/* Section body */}
                <div className="px-6 py-6 flex flex-col gap-4">
                  {isList ? (
                    <>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                      >
                        {s.content[0]}
                      </p>
                      <ul className="flex flex-col gap-2 pl-0">
                        {(s.content.slice(2) as string[]).map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm leading-relaxed"
                            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: "#F5A623" }}
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {/* Last paragraph after list */}
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                      >
                        ENE Electrical reserves the right to terminate or restrict access
                        to the Site for any user who violates these terms, without notice
                        and at our sole discretion.
                      </p>
                    </>
                  ) : (
                    (s.content as string[]).map((para, j) => (
                      <p
                        key={j}
                        className="text-sm leading-relaxed"
                        style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                      >
                        {para}
                      </p>
                    ))
                  )}
                </div>
              </article>
            );
          })}

          {/* Contact Information */}
          <article
            id="contact-information"
            className="bg-white rounded-[0.75rem] shadow-sm border border-gray-100 overflow-hidden scroll-mt-28"
          >
            <div
              className="flex items-center gap-4 px-6 py-5 border-b border-gray-100"
              style={{ backgroundColor: "#F7F8FA" }}
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                style={{ backgroundColor: "#0B1F3A" }}
                aria-hidden="true"
              >
                <Mail size={18} strokeWidth={2} style={{ color: "#F5A623" }} />
              </span>
              <h2
                className="text-xl font-bold"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                <span
                  className="mr-2 text-sm font-semibold"
                  style={{ color: "#F5A623" }}
                >
                  {String(sections.length + 1).padStart(2, "0")}.
                </span>
                Contact Information
              </h2>
            </div>
            <div className="px-6 py-6 flex flex-col gap-4">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                If you have any questions, concerns, or comments about these Terms of
                Service, please reach out to us. We are happy to clarify any part of
                this agreement.
              </p>

              <div
                className="rounded-xl p-5 flex flex-col gap-3 border"
                style={{ backgroundColor: "#F7F8FA", borderColor: "#e5e7eb" }}
              >
                <p
                  className="font-bold text-base"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  ENE Electrical
                </p>
                <p
                  className="text-sm flex items-start gap-2"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  <MapPin
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                  />
                  <span>Katy, TX 77494</span>
                </p>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
              >
                You can also reach us through our{" "}
                <Link
                  href="/contact-us"
                  className="font-semibold underline underline-offset-2 transition-colors hover:opacity-75"
                  style={{ color: "#0B1F3A" }}
                >
                  Contact Us page
                </Link>
                , where you can submit a message or find additional ways to get in
                touch with our team.
              </p>

              <div className="mt-2">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  <Mail size={15} strokeWidth={2.5} aria-hidden="true" />
                  Contact Us
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom notice */}
        <div
          className="mt-10 rounded-xl p-5 border text-center"
          style={{
            backgroundColor: "#0B1F3A",
            borderColor: "#0B1F3A",
          }}
        >
          <p
            className="text-sm text-blue-200 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical reserves the right to update or modify these Terms of
            Service at any time without prior notice. Your continued use of the Site
            after any such changes constitutes your acceptance of the new Terms.
            Please review this page periodically for updates.
          </p>
          <p
            className="mt-2 text-xs text-blue-300"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Last updated: {effectiveDate}
          </p>
        </div>
      </Section>

      <Footer />
    </>
  );
}