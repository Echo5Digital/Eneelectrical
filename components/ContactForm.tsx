"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, Send, AlertCircle, CheckCircle, Calendar, MapPin, Wrench } from "lucide-react";

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  compact?: boolean;
  dark?: boolean;
  showServiceField?: boolean;
  serviceOptions?: string[];
  locationLabel?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
}

const DEFAULT_SERVICE_OPTIONS = [
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
  "Other",
];

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  heading = "Request an Appointment",
  subheading = "Fill out the form below and one of our licensed electricians will get back to you within 24 hours.",
  ctaLabel = "Send Message",
  compact = false,
  dark = false,
  showServiceField = false,
  serviceOptions = DEFAULT_SERVICE_OPTIONS,
  locationLabel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.name.trim()) {
      errs.name = "Full name is required.";
    } else if (data.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }

    if (!data.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!data.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[\d\s\-()+]{7,20}$/.test(data.phone)) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!data.message.trim()) {
      errs.message = "Please describe how we can help you.";
    } else if (data.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    if (showServiceField && !data.service.trim()) {
      errs.service = "Please select a service.";
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true, service: true };
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const { service, ...rest } = formData;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...rest,
            serviceRequested: service,
            source: "contact_form",
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      onSubmit?.(formData);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", message: "", service: "" });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const cardBg = dark ? "#16294A" : "#F7F8FA";
  const cardBorder = dark ? "1px solid rgba(255,255,255,0.14)" : "none";

  const inputBase = `w-full pl-11 pr-4 py-3 rounded-xl border font-['Inter'] text-sm transition-all duration-200 outline-none focus:ring-2 ${
    dark
      ? "focus:ring-[#F5A623] placeholder:text-white/40 text-white"
      : "bg-white text-[#1A2530] focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400"
  }`;
  const inputNormal = dark
    ? "border-white/15 bg-white/5 hover:border-white/25"
    : "border-gray-200 hover:border-gray-300";
  const inputError = dark
    ? "border-red-400/60 bg-red-500/10 focus:ring-red-400"
    : "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";
  const iconColor = (hasError: boolean) =>
    hasError ? "#ef4444" : dark ? "rgba(255,255,255,0.4)" : "#9ca3af";
  const labelColor = dark ? "#FFFFFF" : "#0B1F3A";

  if (submitted) {
    return (
      <div
        className={`w-full ${compact ? "" : "max-w-xl mx-auto"} rounded-[0.75rem] overflow-hidden shadow-lg`}
        style={{ backgroundColor: cardBg, border: cardBorder }}
      >
        {!compact && (
          <div
            className="px-6 py-5"
            style={{ backgroundColor: dark ? "transparent" : "#0B1F3A" }}
          >
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {heading}
            </h2>
          </div>
        )}

        <div className={`${compact ? "p-6" : "p-8"} flex flex-col items-center text-center gap-4`}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F5A62322" }}>
            <CheckCircle size={36} style={{ color: "#F5A623" }} strokeWidth={2} />
          </div>
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "Montserrat, sans-serif", color: dark ? "#FFFFFF" : "#0B1F3A" }}
          >
            Message Sent!
          </h3>
          <p className="text-sm" style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b7280", fontFamily: "Inter, sans-serif" }}>
            Thanks, <strong style={{ color: dark ? "#FFFFFF" : "#1A2530" }}>{formData.name}</strong>! We've received your request and will reach out to{" "}
            <strong style={{ color: dark ? "#FFFFFF" : "#1A2530" }}>{formData.email}</strong> shortly.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: dark ? "#F5A623" : "#0B1F3A",
              color: dark ? "#0B1F3A" : "#ffffff",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.07em",
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full ${compact ? "" : "max-w-xl mx-auto"} rounded-[0.75rem] overflow-hidden shadow-lg`}
      style={{ backgroundColor: cardBg, border: cardBorder }}
    >
      {/* Header */}
      {!compact && !dark && (
        <div
          className="px-6 py-5"
          style={{ backgroundColor: "#0B1F3A" }}
        >
          <h2
            className="text-2xl font-bold text-white leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="mt-1 text-sm text-blue-200 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {subheading}
            </p>
          )}
        </div>
      )}
      {compact && !dark && (heading || subheading) && (
        <div className="px-6 pt-6 pb-1">
          {heading && (
            <h2
              className="text-lg font-bold leading-tight"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p
              className="mt-1 text-xs text-gray-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {subheading}
            </p>
          )}
        </div>
      )}
      {dark && (heading || subheading) && (
        <div className="px-6 pt-6 pb-2 flex items-start gap-3.5">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            <Calendar size={18} color="#FFFFFF" strokeWidth={2} />
          </div>
          <div>
            {heading && (
              <h2
                className="text-lg font-bold leading-tight text-white"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p
                className="mt-0.5 text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}
              >
                {subheading}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className={`${compact ? "p-6 gap-3.5" : "p-6 gap-5"} flex flex-col`}>

        {/* Name + Phone (side-by-side in dark mode, stacked otherwise) */}
        <div className={dark ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5" : "flex flex-col gap-5"}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            {!dark && (
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Montserrat, sans-serif", color: labelColor }}
              >
                Full Name <span style={{ color: "#F5A623" }}>*</span>
              </label>
            )}
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: iconColor(!!(errors.name && touched.name)) }}
              />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${errors.name && touched.name ? inputError : inputNormal}`}
              />
            </div>
            {errors.name && touched.name && (
              <p className="flex items-center gap-1 text-xs text-red-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            {!dark && (
              <label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Montserrat, sans-serif", color: labelColor }}
              >
                Phone Number <span style={{ color: "#F5A623" }}>*</span>
              </label>
            )}
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: iconColor(!!(errors.phone && touched.phone)) }}
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${errors.phone && touched.phone ? inputError : inputNormal}`}
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="flex items-center gap-1 text-xs text-red-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                <AlertCircle size={12} /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          {!dark && (
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "Montserrat, sans-serif", color: labelColor }}
            >
              Email Address <span style={{ color: "#F5A623" }}>*</span>
            </label>
          )}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: iconColor(!!(errors.email && touched.email)) }}
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={dark ? "Email Address" : "jane@example.com"}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="flex items-center gap-1 text-xs text-red-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        {/* Service (optional field) */}
        {showServiceField && (
          <div className="flex flex-col gap-1">
            {!dark && (
              <label
                htmlFor="service"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ fontFamily: "Montserrat, sans-serif", color: labelColor }}
              >
                Service Needed <span style={{ color: "#F5A623" }}>*</span>
              </label>
            )}
            <div className="relative">
              <Wrench
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: iconColor(!!(errors.service && touched.service)) }}
              />
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} appearance-none cursor-pointer ${
                  errors.service && touched.service ? inputError : inputNormal
                } ${dark ? "" : ""}`}
                style={dark ? { colorScheme: "dark" } : undefined}
              >
                <option value="" disabled className="text-gray-400">
                  Service Needed
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-[#1A2530]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.service && touched.service && (
              <p className="flex items-center gap-1 text-xs text-red-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                <AlertCircle size={12} /> {errors.service}
              </p>
            )}
          </div>
        )}

        {/* Message */}
        <div className="flex flex-col gap-1">
          {!dark && (
            <label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "Montserrat, sans-serif", color: labelColor }}
            >
              How Can We Help? <span style={{ color: "#F5A623" }}>*</span>
            </label>
          )}
          <div className="relative">
            <MessageSquare
              size={16}
              className="absolute left-3.5 top-3.5 pointer-events-none"
              style={{ color: iconColor(!!(errors.message && touched.message)) }}
            />
            <textarea
              id="message"
              name="message"
              rows={compact || dark ? 2 : 4}
              placeholder={dark ? "Tell us about your project..." : "Describe your electrical issue or service needed..."}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} resize-none ${errors.message && touched.message ? inputError : inputNormal}`}
            />
          </div>
          {errors.message && touched.message && (
            <p className="flex items-center gap-1 text-xs text-red-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={12} /> {errors.message}
            </p>
          )}
        </div>

        {/* Location line */}
        {dark && locationLabel && (
          <p
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
          >
            <MapPin size={15} /> {locationLabel}
          </p>
        )}

        {/* Submit */}
        {submitError && (
          <p
            className={`flex items-center gap-1.5 text-sm rounded-lg px-3 py-2 ${
              dark ? "text-red-300 bg-red-500/10 border border-red-400/30" : "text-red-600 bg-red-50 border border-red-200"
            }`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <AlertCircle size={14} className="flex-shrink-0" /> {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:brightness-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          style={{
            backgroundColor: "#F5A623",
            color: "#0B1F3A",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "0.1em",
          }}
        >
          <Send size={15} strokeWidth={2.5} />
          {submitting ? "Sending..." : ctaLabel}
        </button>

        {!compact && (
          <p
            className="text-center text-xs -mt-1"
            style={{ color: dark ? "rgba(255,255,255,0.4)" : "#9ca3af", fontFamily: "Inter, sans-serif" }}
          >
            We respect your privacy. {dark ? "Your information is safe with us." : "No spam, ever."}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;