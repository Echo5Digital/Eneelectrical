"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Zap, Phone, ChevronDown } from "lucide-react";

interface NavLink {
  label: string;
  route: string;
  children?: NavLink[];
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
  {
    label: "Services",
    route: "/services",
    children: [
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
    ],
  },
  {
    label: "Service Areas",
    route: "/service-areas/houston-tx",
    children: [
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
    ],
  },
  { label: "Testimonials", route: "/testimonials" },
  { label: "Blog", route: "/blog" },
  { label: "FAQs", route: "/faqs" },
  { label: "Contact Us", route: "/contact-us" },
];

export default function Header({
  businessName = "ENE Electrical",
  phone = "(832) 783-0303",
  navLinks = defaultNavLinks,
  ctaLabel = "Book Appointment",
  ctaRoute = "/appointment-booking",
  logoSrc = "/logo_ene.png",
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
            href={`tel:+1${phone.replace(/\D/g, "")}`}
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
            className="flex items-center flex-shrink-0 group rounded-xl px-3 py-2"
            style={{ backgroundColor: "#FFFFFF" }}
            aria-label={`${businessName} – Home`}
          >
            <Image
              src={logoSrc}
              alt={`${businessName} logo`}
              width={188}
              height={125}
              priority
              className="h-12 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {visibleNavLinks.map((link) => {
              const hasChildren = !!link.children?.length;
              const isOpen = openDropdown === link.route;

              return (
                <div
                  key={link.route}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenDropdown(link.route)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <Link
                    href={link.route}
                    className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                    style={{
                      color: "#E8EEF4",
                      fontFamily: "Inter, sans-serif",
                    }}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-expanded={hasChildren ? isOpen : undefined}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                      {link.label}
                    </span>
                    {hasChildren && (
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className={`relative z-10 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        style={{ color: isOpen ? "#F5A623" : "#E8EEF4" }}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ backgroundColor: "rgba(245,166,35,0.12)" }}
                    />
                  </Link>

                  {/* Dropdown panel */}
                  {hasChildren && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                        isOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      <div
                        className="w-[560px] max-w-[90vw] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                          backgroundColor: "#0F2847",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="grid grid-cols-2 gap-1 p-3">
                          {link.children!.map((child) => (
                            <Link
                              key={child.route}
                              href={child.route}
                              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 group/item"
                              style={{ color: "#CBD8E6", fontFamily: "Inter, sans-serif" }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.backgroundColor =
                                  "rgba(245,166,35,0.1)";
                                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.backgroundColor =
                                  "transparent";
                                (e.currentTarget as HTMLElement).style.color = "#CBD8E6";
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: "#F5A623" }}
                                aria-hidden="true"
                              />
                              <span className="leading-snug">{child.label}</span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={link.route}
                          className="flex items-center justify-between px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors duration-150"
                          style={{
                            backgroundColor: "rgba(245,166,35,0.08)",
                            color: "#F5A623",
                            fontFamily: "Montserrat, sans-serif",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          View All {link.label}
                          <ChevronDown size={14} className="-rotate-90" strokeWidth={2.5} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo_ene_white.png"
              alt={`${businessName} logo`}
              width={188}
              height={125}
              className="h-14 w-auto object-contain"
            />
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
            href={`tel:+1${phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            <Phone size={15} strokeWidth={2.5} />
            {phone}
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {visibleNavLinks.map((link) => {
            const hasChildren = !!link.children?.length;
            const isExpanded = mobileExpanded === link.route;

            if (!hasChildren) {
              return (
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
              );
            }

            return (
              <div key={link.route} className="mb-1">
                <div
                  className="flex items-center rounded-xl text-sm font-medium transition-all duration-200"
                  style={{ color: "#CBD8E6", fontFamily: "Inter, sans-serif" }}
                >
                  <Link
                    href={link.route}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 px-4 py-3"
                  >
                    {link.label}
                  </Link>
                  <button
                    onClick={() =>
                      setMobileExpanded(isExpanded ? null : link.route)
                    }
                    aria-label={`Toggle ${link.label} submenu`}
                    aria-expanded={isExpanded}
                    className="px-4 py-3"
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      style={{ color: isExpanded ? "#F5A623" : "#CBD8E6" }}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className="ml-3 pl-3 my-1 flex flex-col gap-0.5"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {link.children!.map((child) => (
                      <Link
                        key={child.route}
                        href={child.route}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm transition-colors duration-150"
                        style={{ color: "#9FB3C8", fontFamily: "Inter, sans-serif" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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