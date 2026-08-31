import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";

interface VanCtaProps {
  heading: React.ReactNode;
  description: string;
  bookHref?: string;
  bookLabel?: string;
  phone?: string;
  phoneHref?: string;
}

const VanCta: React.FC<VanCtaProps> = ({
  heading,
  description,
  bookHref = "/appointment-booking",
  bookLabel = "Book an Appointment",
  phone = "(832) 783-0303",
  phoneHref = "tel:+18327830303",
}) => {
  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: "#0F2A52" }}
      aria-label="Schedule your electrical service"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <Image
              src="/van_ene-2-1024x731.png"
              alt="ENE Electrical service van"
              width={1024}
              height={731}
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight text-white mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {heading}
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif" }}
            >
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={bookHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <CalendarCheck size={16} strokeWidth={2.5} />
                {bookLabel}
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.4)",
                }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Call ENE Electrical
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VanCta;
