import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Zap, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

interface FooterLink {
  label: string;
  route: string;
}

interface FooterProps {
  businessName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  licenseNumber?: string;
  links?: FooterLink[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

const defaultLinks: FooterLink[] = [
  { label: "Home", route: "/" },
  { label: "About Us", route: "/about-us" },
  { label: "Services", route: "/services" },
  { label: "Electrical Repair & Installation", route: "/services/electrical-repair-installation" },
  { label: "Electrical Panel Upgrade", route: "/services/electrical-panel-upgrade-houston" },
  { label: "EV Charger Installation", route: "/services/ev-charger-installation-houston" },
  { label: "Generator Installation", route: "/services/generator-installation-houston" },
  { label: "Security Lighting", route: "/services/security-lighting-houston" },
  { label: "Recessed LED Lighting", route: "/services/recessed-led-lighting" },
  { label: "Ceiling Fan Installation", route: "/services/ceiling-fan-installation-houston" },
  { label: "New Construction Electrician", route: "/services/new-construction-electrician-houston" },
  { label: "New Construction Wiring", route: "/services/new-construction-wiring" },
  { label: "Emergency Electrician", route: "/services/emergency-electrician-houston" },
  { label: "Electrical Inspection", route: "/services/electrical-inspection-houston" },
  { label: "Katy, TX", route: "/service-areas/electrician-katy-tx" },
  { label: "Houston, TX", route: "/service-areas/houston-tx" },
  { label: "Energy Corridor", route: "/service-areas/electrician-energy-corridor-houston" },
  { label: "Southwest Houston", route: "/service-areas/electrician-houston-southwest" },
  { label: "Cinco Ranch, TX", route: "/service-areas/cinco-ranch-tx" },
  { label: "Fulshear, TX", route: "/service-areas/fulshear-tx" },
  { label: "Memorial Houston", route: "/service-areas/memorial-houston" },
  { label: "Spring Branch", route: "/service-areas/spring-branch-houston" },
  { label: "Westchase Houston", route: "/service-areas/westchase-houston" },
  { label: "Brookshire, TX", route: "/service-areas/brookshire-tx" },
  { label: "Richmond, TX", route: "/service-areas/richmond-tx" },
  { label: "Testimonials", route: "/testimonials" },
  { label: "Blog", route: "/blog" },
  { label: "FAQs", route: "/faqs" },
  { label: "Book Appointment", route: "/appointment-booking" },
  { label: "Contact Us", route: "/contact-us" },
  { label: "Privacy Policy", route: "/privacy-policy" },
  { label: "Terms of Service", route: "/terms" },
];

const serviceLinks = [
  "Electrical Repair & Installation",
  "Electrical Panel Upgrade",
  "EV Charger Installation",
  "Generator Installation",
  "Security Lighting",
  "Recessed LED Lighting",
  "Ceiling Fan Installation",
  "New Construction Electrician",
  "New Construction Wiring",
  "Emergency Electrician",
  "Electrical Inspection",
];

const serviceAreaLinks = [
  "Katy, TX",
  "Houston, TX",
  "Energy Corridor",
  "Southwest Houston",
  "Cinco Ranch, TX",
  "Fulshear, TX",
  "Memorial Houston",
  "Spring Branch",
  "Westchase Houston",
  "Brookshire, TX",
  "Richmond, TX",
];

const companyLinks = ["Home", "About Us", "Services", "Testimonials", "Blog", "FAQs", "Book Appointment", "Contact Us"];

const legalLinks = ["Privacy Policy", "Terms of Service"];

export default function Footer({
  businessName = "ENE Electrical",
  tagline = "Licensed & Insured Residential Electricians Serving Greater Houston",
  phone = "(832) 783-0303",
  email = "info@eneelectrical.com",
  address = "Katy, TX, Serving Greater Houston & Surrounding Areas",
  licenseNumber = "TECL #XXXXXX",
  links = defaultLinks,
  socialLinks = {
    facebook: "#",
    instagram: "https://www.instagram.com/ene_electrical",
    twitter: "#",
    youtube: "#",
  },
}: FooterProps) {
  const getLink = (label: string) => links.find((l) => l.label === label)?.route ?? "#";

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
      className="text-white"
    >
      {/* Emergency CTA Banner */}
      <div
        style={{ backgroundColor: "#F5A623" }}
        className="py-4 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Zap size={22} className="text-[#0B1F3A] flex-shrink-0" />
            <p
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              className="font-bold text-sm sm:text-base uppercase tracking-wide"
            >
              24/7 Emergency Electrical Services Available
            </p>
          </div>
          <a
            href={`tel:+1${phone.replace(/\D/g, "")}`}
            style={{
              backgroundColor: "#0B1F3A",
              borderRadius: "0.75rem",
              fontFamily: "Montserrat, sans-serif",
            }}
            className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wide text-sm px-5 py-2 shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Phone size={16} />
            {phone}
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo / Business Name */}
            <div className="flex items-center mb-4">
              <Image
                src="/logo_ene_white.png"
                alt={`${businessName} logo`}
                width={188}
                height={125}
                className="h-20 w-auto object-contain"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {tagline}
            </p>

            {/* Contact Info */}
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`tel:+1${phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-3 text-slate-300 hover:text-[#F5A623] transition-colors text-sm"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0 text-[#F5A623]" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 text-slate-300 hover:text-[#F5A623] transition-colors text-sm"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-[#F5A623]" />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#F5A623]" />
                <span>{address}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{ borderRadius: "0.5rem" }}
                  className="p-2 bg-white/10 hover:bg-[#F5A623] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Facebook size={16} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ borderRadius: "0.5rem" }}
                  className="p-2 bg-white/10 hover:bg-[#F5A623] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Instagram size={16} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  style={{ borderRadius: "0.5rem" }}
                  className="p-2 bg-white/10 hover:bg-[#F5A623] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Twitter size={16} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  style={{ borderRadius: "0.5rem" }}
                  className="p-2 bg-white/10 hover:bg-[#F5A623] hover:text-[#0B1F3A] text-white transition-colors"
                >
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3
              style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
              className="text-sm font-bold uppercase tracking-widest mb-5 border-b border-white/10 pb-3"
            >
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link
                    href={getLink(label)}
                    className="text-slate-300 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span
                      style={{ backgroundColor: "#F5A623" }}
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h3
              style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
              className="text-sm font-bold uppercase tracking-widest mb-5 border-b border-white/10 pb-3"
            >
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              {serviceAreaLinks.map((label) => (
                <li key={label}>
                  <Link
                    href={getLink(label)}
                    className="text-slate-300 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span
                      style={{ backgroundColor: "#F5A623" }}
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3
              style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
              className="text-sm font-bold uppercase tracking-widest mb-5 border-b border-white/10 pb-3"
            >
              Company
            </h3>
            <ul className="space-y-2.5 mb-8">
              {companyLinks.map((label) => (
                <li key={label}>
                  <Link
                    href={getLink(label)}
                    className="text-slate-300 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span
                      style={{ backgroundColor: "#F5A623" }}
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Book Appointment CTA */}
            <Link
              href={getLink("Book Appointment")}
              style={{
                backgroundColor: "#F5A623",
                borderRadius: "0.75rem",
                fontFamily: "Montserrat, sans-serif",
                color: "#0B1F3A",
              }}
              className="inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide text-sm px-5 py-3 shadow-md hover:opacity-90 transition-opacity w-full text-center"
            >
              <Zap size={15} />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center sm:text-left">
            © {currentYear} {businessName}. All rights reserved.{" "}
            <span className="text-slate-500">| {licenseNumber}</span>
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((label) => (
              <Link
                key={label}
                href={getLink(label)}
                className="text-slate-400 hover:text-[#F5A623] text-xs transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}