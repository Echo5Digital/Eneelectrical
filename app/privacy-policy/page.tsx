import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section, { SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FileText,
  Database,
  Settings,
  Cookie,
  Share2,
  Shield,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ENE Electrical",
  description:
    "Read ENE Electrical's Privacy Policy to understand how we collect, use, and protect your personal information when you use our website or request electrical services.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const effectiveDate = "January 1, 2025";

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        heading: "Information You Provide Directly",
        body: "When you submit a contact form, request a quote, or book an appointment on our website, we may collect personal information such as your name, email address, phone number, service address, and details about your electrical service request.",
      },
      {
        heading: "Information Collected Automatically",
        body: "When you visit our website, we automatically collect certain technical data, including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages. This information is collected through cookies, Google Analytics 4, and similar technologies.",
      },
      {
        heading: "Call Tracking Data",
        body: "If you contact us by phone through a number displayed on our website, we may use call tracking technology that records the originating phone number, call duration, and call outcome for quality assurance and marketing attribution purposes.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    icon: Settings,
    title: "How We Use Your Information",
    content: [
      {
        heading: "Responding to Inquiries",
        body: "We use your contact information to respond to questions, provide quotes, and communicate about the electrical services you've requested.",
      },
      {
        heading: "Scheduling & Service Delivery",
        body: "Appointment and booking data is used to schedule technician visits, send service confirmations and reminders, and coordinate our residential electrical services in Katy, TX and the greater Houston area.",
      },
      {
        heading: "Website Improvement",
        body: "Aggregated and anonymized usage data helps us understand how visitors interact with our website so we can improve navigation, content, and the overall user experience.",
      },
      {
        heading: "Marketing & Communications",
        body: "With your consent, we may send you information about promotions, new services, or seasonal electrical tips. You can opt out of marketing communications at any time.",
      },
      {
        heading: "Legal Compliance",
        body: "We may use or retain your information as required by applicable law, regulation, or legal process.",
      },
    ],
  },
  {
    id: "cookies-tracking",
    icon: Cookie,
    title: "Cookies & Tracking Technologies",
    content: [
      {
        heading: "Google Analytics 4 (GA4)",
        body: "We use Google Analytics 4 to collect anonymized data about website traffic, user behavior, and conversion events. GA4 uses cookies to distinguish unique visitors and track session activity. Data collected by GA4 is subject to Google's Privacy Policy.",
      },
      {
        heading: "Google Tag Manager",
        body: "Google Tag Manager is used to deploy and manage our marketing and analytics tags (including GA4) without modifying site code directly. GTM itself does not collect personal data but enables tools that may.",
      },
      {
        heading: "Call Tracking Pixels",
        body: "We may use call tracking scripts or pixels on certain pages to attribute inbound phone calls to specific marketing campaigns. These tools may set cookies or collect device-level identifiers.",
      },
      {
        heading: "Managing Your Cookie Preferences",
        body: "Most web browsers allow you to control cookies through their settings. You may also opt out of Google Analytics tracking by installing the Google Analytics Opt-Out Browser Add-on available at tools.google.com/dlpage/gaoptout. Disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
  {
    id: "data-sharing",
    icon: Share2,
    title: "Data Sharing & Third Parties",
    content: [
      {
        heading: "We Do Not Sell Your Data",
        body: "ENE Electrical does not sell, rent, or trade your personal information to third parties for their own marketing purposes.",
      },
      {
        heading: "Service Providers",
        body: "We may share your information with trusted third-party service providers who assist us in operating our website and delivering our services. These providers include web hosting and infrastructure providers, email communication platforms, CRM and scheduling software, and analytics and advertising partners (Google Analytics, Google Tag Manager). All service providers are contractually obligated to handle your data securely and only for the purposes we specify.",
      },
      {
        heading: "Legal Disclosures",
        body: "We may disclose your information if required to do so by law, court order, or government authority, or to protect the rights, property, or safety of ENE Electrical, our customers, or others.",
      },
      {
        heading: "Business Transfers",
        body: "In the event of a merger, acquisition, or sale of business assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal data.",
      },
    ],
  },
  {
    id: "data-security",
    icon: Shield,
    title: "Data Security",
    content: [
      {
        heading: "Security Measures",
        body: "ENE Electrical employs reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Our website uses HTTPS encryption for all data transmitted between your browser and our servers.",
      },
      {
        heading: "Limitations",
        body: "While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to continuously reviewing and improving our security practices.",
      },
      {
        heading: "Data Retention",
        body: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. Contact form submissions and appointment records are retained for a reasonable period to support service delivery and legal obligations.",
      },
    ],
  },
  {
    id: "user-rights",
    icon: UserCheck,
    title: "User Rights & Contact",
    content: [
      {
        heading: "Your Rights",
        body: "Depending on your location and applicable law, you may have the right to access the personal information we hold about you, request correction of inaccurate data, request deletion of your personal information, opt out of marketing communications, and request that we restrict or stop processing your data.",
      },
      {
        heading: "How to Submit a Request",
        body: "To exercise any of these rights, or if you have questions or concerns about this Privacy Policy, please contact us in writing using the contact information provided on our Contact Us page. We will respond to verifiable requests within a reasonable timeframe in accordance with applicable law.",
      },
      {
        heading: "Children's Privacy",
        body: "Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will take steps to delete it.",
      },
      {
        heading: "Changes to This Policy",
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The effective date at the top of this page will be updated accordingly. We encourage you to review this policy periodically.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      {/* Page Header */}
      <Section background="primary" spacing="md" id="privacy-header">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0"
              style={{ backgroundColor: "#F5A623" }}
            >
              <FileText size={28} strokeWidth={2} style={{ color: "#0B1F3A" }} />
            </span>
            <div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Privacy Policy
              </h1>
              <p
                className="mt-1 text-sm font-medium"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Effective Date: {effectiveDate}
              </p>
            </div>
          </div>
          <div
            className="hidden md:block h-16 w-px opacity-20"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          />
          <p
            className="text-blue-100 text-base leading-relaxed max-w-xl md:text-right"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>
        </div>
      </Section>

      {/* Introductory Statement */}
      <Section background="white" spacing="sm" id="privacy-intro">
        <div
          className="rounded-xl border-l-4 p-6 md:p-8"
          style={{
            borderColor: "#F5A623",
            backgroundColor: "#FFF9EE",
          }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            This Privacy Policy applies to{" "}
            <strong style={{ color: "#0B1F3A" }}>ENE Electrical</strong>{" "}
            ("we," "us," or "our"), a licensed, insured, and bonded residential electrical contractor based in{" "}
            <strong style={{ color: "#0B1F3A" }}>Katy, TX 77494</strong>, serving the greater Houston and Katy metro area. This policy governs the information we collect through our website and in connection with our electrical services. By using our website, you agree to the practices described in this policy.
          </p>
        </div>
      </Section>

      {/* Table of Contents */}
      <Section background="default" spacing="sm" id="privacy-toc">
        <nav aria-label="Privacy Policy sections">
          <h2
            className="text-lg font-bold mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Jump to Section
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-amber-400 hover:shadow-md transition-all duration-200 group"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: "#0B1F3A" }}
                    >
                      <Icon size={15} strokeWidth={2} style={{ color: "#F5A623" }} />
                    </span>
                    <span
                      className="text-sm font-medium group-hover:text-amber-600 transition-colors"
                      style={{ color: "#1A2530" }}
                    >
                      <span className="text-gray-400 mr-1">{idx + 1}.</span>
                      {sec.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </Section>

      {/* Main Policy Sections */}
      {sections.map((sec, idx) => {
        const Icon = sec.icon;
        const isEven = idx % 2 === 0;
        return (
          <Section
            key={sec.id}
            id={sec.id}
            background={isEven ? "white" : "default"}
            spacing="md"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                style={{ backgroundColor: "#F5A623" }}
              >
                <Icon size={22} strokeWidth={2} style={{ color: "#0B1F3A" }} />
              </span>
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                >
                  Section {idx + 1}
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold leading-tight"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
                >
                  {sec.title}
                </h2>
              </div>
            </div>

            {/* Sub-sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sec.content.map((item) => (
                <div
                  key={item.heading}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3
                    className="text-base font-bold mb-3 flex items-center gap-2"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#F5A623" }}
                      aria-hidden="true"
                    />
                    {item.heading}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      {/* Contact / Questions CTA */}
      <Section background="primary" spacing="md" id="privacy-contact-cta">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Questions About This Policy?
            </h2>
            <p
              className="text-blue-100 text-base leading-relaxed max-w-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              If you have any questions, concerns, or requests related to your personal data or this Privacy Policy, please reach out to us. ENE Electrical is based in{" "}
              <span className="text-white font-semibold">Katy, TX 77494</span> and serves the greater Houston metro area.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Contact Us
            </a>
            <a
              href="/appointment-booking"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-navy active:scale-95"
              style={{
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}