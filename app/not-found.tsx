import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, PhoneCall, Wrench } from "lucide-react";

const popularLinks = [
  { label: "Electrical Panel Upgrade", href: "/services/electrical-panel-upgrade-houston" },
  { label: "Emergency Electrician", href: "/services/emergency-electrician-houston" },
  { label: "EV Charger Installation", href: "/services/ev-charger-installation-houston" },
  { label: "Electrical Tips & Insights Blog", href: "/blog" },
];

export default function NotFound() {
  return (
    <>
      <Header />

      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 80% 15%, rgba(245,166,35,0.14) 0%, transparent 55%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center text-center gap-6">
          <span
            className="text-6xl sm:text-7xl font-bold leading-none"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
          >
            404
          </span>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Looks Like This Circuit Got Disconnected
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
          >
            The page you're looking for doesn't exist or may have moved. Let's
            get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
              }}
            >
              <Home size={16} strokeWidth={2.5} />
              Back to Home
            </Link>
            <a
              href="tel:+18327830303"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest border-2 transition-all duration-200 hover:bg-white/5 active:scale-95"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#ffffff",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <PhoneCall size={16} strokeWidth={2.5} />
              (832) 783-0303
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 justify-center mb-6">
            <Wrench size={16} style={{ color: "#F5A623" }} />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
            >
              Or find what you need
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between px-5 py-4 rounded-xl border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-200"
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {link.label}
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#F5A623" }}
                >
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
