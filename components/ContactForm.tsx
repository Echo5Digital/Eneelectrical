"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, Send, AlertCircle, CheckCircle } from "lucide-react";

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  heading = "Request an Appointment",
  subheading = "Fill out the form below and one of our licensed electricians will get back to you within 24 hours.",
  ctaLabel = "Send Message",
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
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

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source: "contact_form" }),
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
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-[#1A2530] font-['Inter'] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400";
  const inputNormal = "border-gray-200 hover:border-gray-300";
  const inputError = "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";

  if (submitted) {
    return (
      <div
        className="w-full max-w-xl mx-auto rounded-[0.75rem] overflow-hidden shadow-lg"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div
          className="px-6 py-5"
          style={{ backgroundColor: "#0B1F3A" }}
        >
          <h2
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {heading}
          </h2>
        </div>

        <div className="p-8 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F5A62322" }}>
            <CheckCircle size={36} style={{ color: "#F5A623" }} strokeWidth={2} />
          </div>
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            Message Sent!
          </h3>
          <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            Thanks, <strong style={{ color: "#1A2530" }}>{formData.name}</strong>! We've received your request and will reach out to{" "}
            <strong style={{ color: "#1A2530" }}>{formData.email}</strong> shortly.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#0B1F3A",
              color: "#ffffff",
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
      className="w-full max-w-xl mx-auto rounded-[0.75rem] overflow-hidden shadow-lg"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      {/* Header */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-5">

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
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.name && touched.name ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.name && touched.name ? inputError : inputNormal}`}
            />
          </div>
          {errors.name && touched.name && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={12} /> {errors.name}
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
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.email && touched.email ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={12} /> {errors.email}
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
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.phone && touched.phone ? "#ef4444" : "#9ca3af" }}
            />
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.phone && touched.phone ? inputError : inputNormal}`}
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={12} /> {errors.phone}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
          >
            How Can We Help? <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="relative">
            <MessageSquare
              size={16}
              className="absolute left-3.5 top-3.5 pointer-events-none"
              style={{ color: errors.message && touched.message ? "#ef4444" : "#9ca3af" }}
            />
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Describe your electrical issue or service needed..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} resize-none`}
              style={
                errors.message && touched.message
                  ? { borderColor: "#f87171", backgroundColor: "#fef2f2" }
                  : { borderColor: "#e5e7eb" }
              }
            />
          </div>
          {errors.message && touched.message && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertCircle size={12} /> {errors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        {submitError && (
          <p className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" style={{ fontFamily: "Inter, sans-serif" }}>
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

        <p
          className="text-center text-xs text-gray-400 -mt-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          We respect your privacy. No spam, ever.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;