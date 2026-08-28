"use client";

import React, { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import {
  CalendarDays,
  CheckCircle,
  ShieldCheck,
  Zap,
  PhoneCall,
  ClipboardList,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  AlertCircle,
  MapPin,
  Clock,
  Wrench,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface AppointmentBookingClientProps {
  faqData: FaqItem[];
}

const SERVICE_TYPES = [
  "Electrical Panel Upgrade",
  "EV Charger Installation",
  "Electrical Repair",
  "Lighting Installation / Recessed LED",
  "Generator Installation",
  "Security Lighting",
  "New Construction Wiring",
  "Electrical Inspection",
  "Emergency Electrical Service",
  "Other / Not Listed",
];

const TIME_SLOTS = [
  "Morning (8am – 11am)",
  "Midday (11am – 2pm)",
  "Afternoon (2pm – 5pm)",
  "Flexible / Any Time",
];

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  zipCode: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  preferredDate?: string;
  preferredTime?: string;
  zipCode?: string;
}

function validateForm(data: BookingFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Full name is required (at least 2 characters).";
  if (!data.phone.trim() || !/^[\d\s\-()+]{7,20}$/.test(data.phone))
    errors.phone = "A valid phone number is required.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "A valid email address is required.";
  if (!data.serviceType) errors.serviceType = "Please select a service type.";
  if (!data.preferredDate) errors.preferredDate = "Please select a preferred date.";
  if (!data.preferredTime) errors.preferredTime = "Please select a preferred time slot.";
  if (!data.zipCode.trim() || !/^\d{5}(-\d{4})?$/.test(data.zipCode.trim()))
    errors.zipCode = "A valid 5-digit ZIP code is required.";
  return errors;
}

function BookingForm() {
  const [form, setForm] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    zipCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400";
  const selectBase =
    "w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] appearance-none cursor-pointer";
  const normalBorder = "border-gray-200 hover:border-gray-300";
  const errorBorder = "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";

  const fieldErr = (field: keyof FormErrors) =>
    errors[field] && touched[field] ? errorBorder : normalBorder;

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center gap-5 border border-gray-100">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#FFF8EC" }}
        >
          <CheckCircle size={44} style={{ color: "#F5A623" }} strokeWidth={2} />
        </div>
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
        >
          Booking Request Received!
        </h3>
        <p className="text-gray-500 text-sm max-w-md leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          Thank you, <strong className="text-[#1A2530]">{form.name}</strong>! ENE Electrical has received your appointment request for{" "}
          <strong className="text-[#1A2530]">{form.serviceType}</strong>. We'll confirm your appointment shortly via{" "}
          <strong className="text-[#1A2530]">{form.email}</strong> or by calling you at{" "}
          <strong className="text-[#1A2530]">{form.phone}</strong>.
        </p>
        <button
          onClick={() => {
            setForm({
              name: "",
              phone: "",
              email: "",
              serviceType: "",
              preferredDate: "",
              preferredTime: "",
              zipCode: "",
              notes: "",
            });
            setErrors({});
            setTouched({});
            setSubmitted(false);
          }}
          className="mt-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "#0B1F3A",
            color: "#ffffff",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      aria-label="Appointment booking form"
    >
      {/* Form header */}
      <div className="px-7 py-5" style={{ backgroundColor: "#0B1F3A" }}>
        <h2
          className="text-xl font-bold text-white"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Request Your Appointment
        </h2>
        <p className="text-blue-200 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
          All fields marked <span style={{ color: "#F5A623" }}>*</span> are required. We'll confirm within 1 business day.
        </p>
      </div>

      <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Full Name <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <User
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.name && touched.name ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldErr("name")}`}
              aria-describedby={errors.name && touched.name ? "name-error" : undefined}
              aria-invalid={!!(errors.name && touched.name)}
            />
          </div>
          {errors.name && touched.name && (
            <p id="name-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="phone"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Phone Number <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <Phone
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.phone && touched.phone ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldErr("phone")}`}
              aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
              aria-invalid={!!(errors.phone && touched.phone)}
            />
          </div>
          {errors.phone && touched.phone && (
            <p id="phone-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Email Address <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.email && touched.email ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldErr("email")}`}
              aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              aria-invalid={!!(errors.email && touched.email)}
            />
          </div>
          {errors.email && touched.email && (
            <p id="email-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.email}
            </p>
          )}
        </div>

        {/* ZIP Code */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="zipCode"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            ZIP Code <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <MapPin
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.zipCode && touched.zipCode ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              autoComplete="postal-code"
              placeholder="77494"
              value={form.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldErr("zipCode")}`}
              maxLength={10}
              aria-describedby={errors.zipCode && touched.zipCode ? "zip-error" : undefined}
              aria-invalid={!!(errors.zipCode && touched.zipCode)}
            />
          </div>
          {errors.zipCode && touched.zipCode && (
            <p id="zip-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.zipCode}
            </p>
          )}
        </div>

        {/* Service Type */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label
            htmlFor="serviceType"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Service Type <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <Wrench
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
              style={{ color: errors.serviceType && touched.serviceType ? "#ef4444" : "#9ca3af" }}
            />
            <select
              id="serviceType"
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${selectBase} ${fieldErr("serviceType")}`}
              aria-describedby={errors.serviceType && touched.serviceType ? "service-error" : undefined}
              aria-invalid={!!(errors.serviceType && touched.serviceType)}
            >
              <option value="">Select a service…</option>
              {SERVICE_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            />
          </div>
          {errors.serviceType && touched.serviceType && (
            <p id="service-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.serviceType}
            </p>
          )}
        </div>

        {/* Preferred Date */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="preferredDate"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Preferred Date <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <CalendarDays
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.preferredDate && touched.preferredDate ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              min={todayStr}
              value={form.preferredDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldErr("preferredDate")}`}
              aria-describedby={errors.preferredDate && touched.preferredDate ? "date-error" : undefined}
              aria-invalid={!!(errors.preferredDate && touched.preferredDate)}
            />
          </div>
          {errors.preferredDate && touched.preferredDate && (
            <p id="date-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.preferredDate}
            </p>
          )}
        </div>

        {/* Preferred Time */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="preferredTime"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Preferred Time <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <Clock
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
              style={{ color: errors.preferredTime && touched.preferredTime ? "#ef4444" : "#9ca3af" }}
            />
            <select
              id="preferredTime"
              name="preferredTime"
              value={form.preferredTime}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${selectBase} ${fieldErr("preferredTime")}`}
              aria-describedby={errors.preferredTime && touched.preferredTime ? "time-error" : undefined}
              aria-invalid={!!(errors.preferredTime && touched.preferredTime)}
            >
              <option value="">Select a time slot…</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            />
          </div>
          {errors.preferredTime && touched.preferredTime && (
            <p id="time-error" className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={11} /> {errors.preferredTime}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label
            htmlFor="notes"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Additional Notes{" "}
            <span className="text-gray-400 font-normal normal-case tracking-normal" style={{ fontFamily: "Inter, sans-serif" }}>
              (optional)
            </span>
          </label>
          <div className="relative">
            <MessageSquare
              size={15}
              className="absolute left-3.5 top-3.5 pointer-events-none text-gray-400"
            />
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Describe your electrical issue, any relevant details about your home, or questions you have…"
              value={form.notes}
              onChange={handleChange}
              className={`${inputBase} resize-none`}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623]"
            style={{
              backgroundColor: "#F5A623",
              color: "#0B1F3A",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <Send size={16} strokeWidth={2.5} />
            Book My Appointment
          </button>
          <p className="text-center text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
            Your information is secure and will never be shared. We'll respond within 1 business day.
          </p>
        </div>
      </div>
    </form>
  );
}

function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F5A623]"
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-sm sm:text-base leading-snug"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isOpen ? "#F5A623" : "#F7F8FA" }}
                aria-hidden="true"
              >
                {isOpen ? (
                  <ChevronUp size={15} style={{ color: "#0B1F3A" }} />
                ) : (
                  <ChevronDown size={15} style={{ color: "#0B1F3A" }} />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <div className="h-px bg-gray-100 mb-4" aria-hidden="true" />
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AppointmentBookingClient({ faqData }: AppointmentBookingClientProps) {
  const processSteps = [
    {
      step: "01",
      icon: ClipboardList,
      title: "Submit Your Request",
      description:
        "Fill out the booking form with your service type, preferred date/time, and contact details. Takes under 2 minutes.",
    },
    {
      step: "02",
      icon: CheckCircle,
      title: "Appointment Confirmed",
      description:
        "ENE Electrical reviews your request and sends a confirmation within 1 business day via phone or email.",
    },
    {
      step: "03",
      icon: Truck,
      title: "Technician Dispatched",
      description:
        "A licensed, background-checked electrician is assigned and heads to your home at the scheduled time.",
    },
    {
      step: "04",
      icon: Star,
      title: "Service Completed",
      description:
        "Your electrical work is completed to code, with a full walkthrough so you know exactly what was done.",
    },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "Licensed" },
    { icon: ShieldCheck, label: "Insured" },
    { icon: ShieldCheck, label: "Bonded" },
    { icon: ShieldCheck, label: "Background-Checked Technicians" },
  ];

  return (
    <main id="main-content">
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="booking-hero-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Licensed ENE Electrical technician performing residential electrical work"
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.97) 0%, rgba(11,31,58,0.80) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
              border: "1px solid rgba(245,166,35,0.3)",
            }}
          >
            <Zap size={12} />
            Houston &amp; Katy, TX — Residential Electricians
          </span>

          <h1
            id="booking-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Book a Licensed{" "}
            <span style={{ color: "#F5A623" }}>Electrician</span>
            <br className="hidden sm:block" /> in Minutes
          </h1>

          <p
            className="text-base sm:text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENE Electrical schedules residential electrical appointments for
            homeowners across Houston and Katy, TX. Panel upgrades, EV chargers,
            repairs, lighting, and more — all with licensed, insured professionals.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { value: "15+ Years", label: "Experience" },
              { value: "Licensed", label: "& Insured" },
              { value: "Same-Week", label: "Availability" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-5 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-blue-200" style={{ fontFamily: "Inter, sans-serif" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY ALTERNATIVE CTA ── */}
      <div
        className="w-full py-4 px-4"
        style={{ backgroundColor: "#F5A623" }}
        role="alert"
        aria-label="Emergency electrical service notice"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <PhoneCall size={22} className="text-[#0B1F3A] flex-shrink-0" aria-hidden="true" />
            <p
              className="font-bold text-sm sm:text-base uppercase tracking-wide text-[#0B1F3A]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Electrical Emergency? Don't wait — call us directly for the fastest response.
            </p>
          </div>
          <a
            href="tel:+18327830303"
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white font-bold uppercase tracking-wide text-sm px-5 py-2.5 rounded-xl shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Phone size={15} />
            Call Now: (832) 783-0303
          </a>
        </div>
      </div>

      {/* ── BOOKING FORM ── */}
      <Section background="default" spacing="lg" maxWidth="xl" id="booking-form">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left column: form */}
          <div className="lg:col-span-3">
            <BookingForm />
          </div>

          {/* Right column: side info */}
          <aside className="lg:col-span-2 flex flex-col gap-6">
            {/* Why Book Online */}
            <div
              className="rounded-2xl p-7 border border-gray-100 shadow-sm"
              style={{ backgroundColor: "#fff" }}
            >
              <h2
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                Why Book with ENE Electrical?
              </h2>
              <ul className="flex flex-col gap-3">
                {[
                  "Licensed, insured & bonded electricians",
                  "15+ years serving Houston & Katy homeowners",
                  "Background-checked technicians — every visit",
                  "Upfront pricing — no hidden fees",
                  "Same-week appointments available",
                  "Residential specialists for all electrical needs",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#F5A623" }}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Area */}
            <div
              className="rounded-2xl p-7 border border-[#F5A623]/30"
              style={{ backgroundColor: "#FFF8EC" }}
            >
              <h3
                className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
              >
                <MapPin size={15} style={{ color: "#F5A623" }} aria-hidden="true" />
                Service Area
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Appointments available for residential homeowners across the{" "}
                <strong>Houston and Katy, TX metro area</strong>, including Katy, Cinco Ranch,
                Fulshear, Energy Corridor, Memorial, Spring Branch, Westchase, Brookshire, and
                Richmond, TX.
              </p>
              <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                Based in Katy, TX 77494
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* ── WHAT TO EXPECT ── */}
      <Section background="primary" spacing="lg" maxWidth="xl" id="what-to-expect">
        <SectionHeading
          eyebrow="The Process"
          title="What to Expect"
          subtitle="We've made booking a residential electrician simple and transparent. Here's exactly what happens after you submit your request."
          align="center"
          inverted={true}
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li
                key={step.step}
                className="relative flex flex-col items-center text-center p-7 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Connector line (hidden on last) */}
                {idx < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-[calc(100%-1rem)] w-8 h-px"
                    style={{ backgroundColor: "rgba(245,166,35,0.35)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
                  aria-label={`Step ${step.step}`}
                >
                  STEP {step.step}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.25)" }}
                  aria-hidden="true"
                >
                  <Icon size={26} style={{ color: "#F5A623" }} strokeWidth={1.75} />
                </div>

                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }}
                >
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* ── TRUST BADGES ── */}
      <Section background="white" spacing="sm" maxWidth="xl" id="trust-badges">
        <div
          className="rounded-2xl px-6 py-8 md:py-10 border border-gray-100 shadow-sm"
          style={{ backgroundColor: "#F7F8FA" }}
        >
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            You're In Good Hands — ENE Electrical Is Fully Credentialed
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <li
                  key={badge.label}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white shadow-sm border border-gray-100"
                >
                  <Icon
                    size={18}
                    style={{ color: "#F5A623" }}
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
                  >
                    {badge.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section background="default" spacing="lg" maxWidth="lg" id="faq">
        <SectionHeading
          eyebrow="Common Questions"
          title="Booking FAQs"
          subtitle="Quick answers to help you schedule your appointment with confidence."
          align="center"
        />
        <FAQAccordion items={faqData} />
      </Section>

      {/* ── SECOND EMERGENCY CTA ── */}
      <Section background="primary" spacing="md" maxWidth="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl p-8 md:p-10"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,166,35,0.25)" }}
        >
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <PhoneCall size={20} style={{ color: "#F5A623" }} aria-hidden="true" />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#F5A623" }}
              >
                Electrical Emergency?
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Don't Wait — Call ENE Electrical Directly
            </h2>
            <p
              className="text-blue-200 text-sm max-w-lg leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              For urgent electrical issues — sparking outlets, breaker failures, power outages — skip the form and call us now. We dispatch quickly across the Houston and Katy area.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="tel:+18327830303"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{
                backgroundColor: "#F5A623",
                color: "#0B1F3A",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 6px 24px rgba(245,166,35,0.4)",
              }}
            >
              <Phone size={18} strokeWidth={2.5} />
              Call (832) 783-0303
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}