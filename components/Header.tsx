"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, Phone } from "lucide-react";

interface NavLink {
  label: string;
  route: string;
}

interface HeaderProps {
  businessName?: string;
  phone?: string;
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaRoute?: string;
  logoSrc?: string;
}

const defaultNavLinks: NavLink[] = [
  { label: "Home", route: "/" },
  { label: "About Us", route: "/about-us" },
  { label: "Services", route: "/services" },
  { label: "Service Areas", route: "/service-areas/houston-tx" },
  { label: "Testimonials", route: "/testimonials" },
  { label: "FAQs", route: "/faqs" },
  { label: "Contact Us", route: "/contact-us" },
];

export default function Header({
  businessName = "ENE Electrical",
  phone = "(832) 783-0303",
  navLinks = defaultNavLinks,
  ctaLabel = "Book Appointment",
  ctaRoute = "/appointment-booking",
  logoSrc,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const visibleNavLinks = navLinks.filter((l) => l.route !== ctaRoute);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-lg"
            : "shadow-sm"
        }`}
        style={{ backgroundColor: "#0B1F3A" }}
      >
        {/* Top utility bar */}
        <div
          className="hidden lg:flex items-center justify-end px-8 py-1.5 text-sm"
          style={{ backgroundColor: "#091629" }}
        >
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 font-medium transition-colors duration-200 hover:opacity-80"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            <Phone size={14} strokeWidth={2.5} />
            {phone}
          </a>
        </div>

        {/* Main nav row */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label={`${businessName} – Home`}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={`${businessName} logo`}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ backgroundColor: "#F5A623" }}
              >
                <Zap size={22} strokeWidth={2.5} style={{ color: "#0B1F3A" }} />
              </span>
            )}
            <span
              className="text-xl font-bold tracking-tight leading-none"
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#FFFFFF",
              }}
            >
              {businessName.split(" ").map((word, i) =>
                i === 0 ? (
                  <span key={i} style={{ color: "#F5A623" }}>
                    {word}{" "}
                  </span>
                ) : (
                  <span key={i}>{word}</span>
                )
              )}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {visibleNavLinks.map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                style={{
                  color: "#E8EEF4",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                  {link.label}
                </span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: "rgba(245,166,35,0.12)" }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href={ctaRoute}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 14px rgba(245,166,35,0.35)",
              }}
            >
              <Zap size={15} strokeWidth={2.5} />
              {ctaLabel}
            </Link>
          </div>

          {/* Tablet CTA + hamburger */}
          <div className="flex xl:hidden items-center gap-3">
            <Link
              href={ctaRoute}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 12px rgba(245,166,35,0.3)",
              }}
            >
              <Zap size={13} strokeWidth={2.5} />
              {ctaLabel}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#FFFFFF" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 xl:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(11,31,58,0.55)", backdropFilter: "blur(2px)" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full flex flex-col xl:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#0B1F3A" }}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ backgroundColor: "#F5A623" }}
            >
              <Zap size={17} strokeWidth={2.5} style={{ color: "#0B1F3A" }} />
            </span>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#FFFFFF" }}
            >
              <span style={{ color: "#F5A623" }}>ENE</span> Electrical
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#FFFFFF" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Phone */}
        <div
          className="px-5 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#091629" }}
        >
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            <Phone size={15} strokeWidth={2.5} />
            {phone}
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-3 mb-1 rounded-xl text-sm font-medium transition-all duration-200 group"
              style={{
                color: "#CBD8E6",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(245,166,35,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#CBD8E6";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div
          className="p-5 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <Link
            href={ctaRoute}
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#F5A623",
              color: "#0B1F3A",
              fontFamily: "Montserrat, sans-serif",
              boxShadow: "0 4px 16px rgba(245,166,35,0.35)",
            }}
          >
            <Zap size={16} strokeWidth={2.5} />
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* Spacer so page content clears the fixed header */}
      <div className="h-[64px] lg:h-[104px]" aria-hidden="true" />
    </>
  );
}