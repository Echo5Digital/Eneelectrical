"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  CalendarDays,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  AlertCircle,
  Send,
} from "lucide-react";

type StepKey = "service" | "datetime" | "info";

interface RemoteService {
  _id: string;
  name: string;
  category: "Residential" | "Commercial";
  visibility: "visible" | "hidden";
}

interface ServiceCategory {
  key: string;
  label: string;
  services: string[];
}

const CATEGORY_ORDER: { key: string; label: "Residential" | "Commercial" }[] = [
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
];

const STEPS: { key: StepKey; label: string; icon: React.ElementType }[] = [
  { key: "service", label: "Service Selection", icon: ClipboardList },
  { key: "datetime", label: "Date & Time", icon: CalendarDays },
  { key: "info", label: "Your Information", icon: User },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildCalendarDays(monthOffset: number) {
  const base = new Date();
  const viewDate = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, inMonth: false });
    if (cells.length >= 42) break;
  }

  return { cells, label: viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }) };
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

interface WizardFormState {
  category: string;
  service: string;
  date: Date | null;
  time: string;
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  notes: string;
}

interface InfoErrors {
  name?: string;
  phone?: string;
  email?: string;
  zipCode?: string;
}

function validateInfo(data: WizardFormState): InfoErrors {
  const errors: InfoErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Full name is required (at least 2 characters).";
  if (!data.phone.trim() || !/^[\d\s\-()+]{7,20}$/.test(data.phone))
    errors.phone = "A valid phone number is required.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "A valid email address is required.";
  if (!data.zipCode.trim() || !/^\d{5}(-\d{4})?$/.test(data.zipCode.trim()))
    errors.zipCode = "A valid 5-digit ZIP code is required.";
  return errors;
}

const inputBase =
  "w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400";
const normalBorder = "border-gray-200 hover:border-gray-300";
const errorBorder = "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";

export default function ScheduleWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<StepKey>>(new Set());
  const [selectOpen, setSelectOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ORDER[0].key);
  const [remoteServices, setRemoteServices] = useState<RemoteService[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [infoErrors, setInfoErrors] = useState<InfoErrors>({});

  const [form, setForm] = useState<WizardFormState>({
    category: "",
    service: "",
    date: null,
    time: "",
    name: "",
    phone: "",
    email: "",
    zipCode: "",
    notes: "",
  });

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    fetch(`${apiBase}/api/services`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load services"))))
      .then((data: { items: RemoteService[] }) => setRemoteServices(data.items))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  const CATEGORIES: ServiceCategory[] = useMemo(
    () =>
      CATEGORY_ORDER.map((cat) => ({
        key: cat.key,
        label: cat.label,
        services: remoteServices.filter((s) => s.category === cat.label).map((s) => s.name),
      })),
    [remoteServices]
  );

  const currentStep = STEPS[stepIndex].key;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= STEPS.length) return;
    if (idx <= stepIndex || completedSteps.has(STEPS[idx].key)) {
      setStepIndex(idx);
    }
  };

  const canContinueService = !!form.service;
  const canContinueDateTime = !!form.date && !!form.time;

  const handleContinue = () => {
    if (currentStep === "service" && !canContinueService) return;
    if (currentStep === "datetime" && !canContinueDateTime) return;
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      const newErrors = validateInfo(updated);
      setInfoErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof InfoErrors] }));
    }
  };

  const handleInfoBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateInfo(form);
    setInfoErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof InfoErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = { name: true, phone: true, email: true, zipCode: true };
    setTouched(allTouched);
    const validationErrors = validateInfo(form);
    setInfoErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const dateStr = form.date ? form.date.toISOString().split("T")[0] : "";

      const leadRes = await fetch(`${apiBase}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.notes || `Appointment request for ${form.service}`,
          source: "appointment_booking",
          serviceRequested: form.service,
          preferredDate: dateStr,
          preferredTime: form.time,
          address: form.zipCode,
        }),
      });

      if (!leadRes.ok) {
        const data = await leadRes.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Also create a Booking record so it appears in the admin Booking System
      // (dashboard/calendar/bookings). Non-fatal if this fails.
      fetch(`${apiBase}/api/bookings/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          serviceCategory: form.category,
          serviceType: form.service,
          date: dateStr,
          timeSlot: form.time,
          zipCode: form.zipCode,
          notes: form.notes,
        }),
      }).catch((err) => console.error("Failed to create booking record:", err));

      setCompletedSteps((prev) => new Set(prev).add("info"));
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetWizard = () => {
    setForm({
      category: "",
      service: "",
      date: null,
      time: "",
      name: "",
      phone: "",
      email: "",
      zipCode: "",
      notes: "",
    });
    setStepIndex(0);
    setCompletedSteps(new Set());
    setTouched({});
    setInfoErrors({});
    setSubmitted(false);
    setSubmitError(null);
    setMonthOffset(0);
  };

  const { cells, label: monthLabel } = buildCalendarDays(monthOffset);
  const activeCategoryObj = CATEGORIES.find((c) => c.key === activeCategory) ?? CATEGORIES[0];

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_360px]">
        {/* ── SIDEBAR: steps ── */}
        <aside
          className={`flex flex-col ${collapsed ? "lg:w-[76px]" : "lg:w-64"} transition-all duration-200`}
          style={{ backgroundColor: "#0B1F3A" }}
        >
          <nav className="flex flex-col gap-1 p-4" aria-label="Booking steps">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === stepIndex;
              const isDone = completedSteps.has(step.key);
              const isClickable = idx <= stepIndex || isDone;
              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => isClickable && goToStep(idx)}
                  disabled={!isClickable}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors duration-150 ${
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                  } ${!isClickable ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <Icon size={17} className="flex-shrink-0" style={{ color: isActive ? "#F5A623" : "rgba(255,255,255,0.7)" }} />
                  {!collapsed && (
                    <span
                      className="text-sm font-semibold flex-1 truncate"
                      style={{ fontFamily: "Montserrat, sans-serif", color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)" }}
                    >
                      {step.label}
                    </span>
                  )}
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      border: isDone ? "none" : `1.5px solid ${isActive ? "#F5A623" : "rgba(255,255,255,0.35)"}`,
                      backgroundColor: isDone ? "#22c55e" : "transparent",
                    }}
                    aria-hidden="true"
                  >
                    {isDone && <CheckCircle2 size={14} className="text-white" strokeWidth={2.5} />}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-4 flex flex-col gap-4">
            {!collapsed && (
              <div className="text-center pb-2 border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-widest text-blue-200 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Get in Touch
                </p>
                <a
                  href="tel:+18327830303"
                  className="block text-sm font-semibold text-white hover:text-[#F5A623] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  +1 (832) 783-0303
                </a>
                <a
                  href="mailto:info@eneelectrical.com"
                  className="block text-sm text-blue-200 hover:text-[#F5A623] transition-colors break-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  info@eneelectrical.com
                </a>
              </div>
            )}
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="hidden lg:flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-white/10 text-blue-200 hover:text-white hover:bg-white/5 transition-colors text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {!collapsed && <span>Collapse menu</span>}
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 flex-shrink-0">
                {collapsed ? <ChevronRight size={13} /> : <ChevronRight size={13} className="rotate-180" />}
              </span>
            </button>
          </div>
        </aside>

        {/* ── MAIN PANEL ── */}
        <div className="flex flex-col border-t lg:border-t-0 lg:border-x border-gray-100">
          <div className="flex items-center gap-2 px-6 sm:px-7 py-5 border-b border-gray-100">
            {stepIndex > 0 && !submitted && (
              <button
                type="button"
                onClick={handleBack}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
                aria-label="Go back"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}
            >
              {STEPS[stepIndex].label}
            </h3>
          </div>

          <div className="flex-1 px-6 sm:px-7 py-6 min-h-[340px]">
            {/* STEP 1: Service Selection */}
            {currentStep === "service" && (
              <div className="flex flex-col gap-2 max-w-xl">
                <label className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}>
                  <span className="text-red-500">*</span> Service:
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-colors ${
                      selectOpen ? "border-[#F5A623] ring-2 ring-[#F5A623]/40" : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                    aria-expanded={selectOpen}
                  >
                    <span className={form.service ? "text-[#1A2530]" : "text-gray-400"}>
                      {form.service || "Select Service"}
                    </span>
                    {selectOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>

                  {selectOpen && (
                    <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-2">
                      <div className="border-r border-gray-100">
                        <p className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Category
                        </p>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => setActiveCategory(cat.key)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                              activeCategory === cat.key ? "bg-[#FFF8EC] font-semibold" : "hover:bg-gray-50"
                            }`}
                            style={{ fontFamily: "Inter, sans-serif", color: activeCategory === cat.key ? "#0B1F3A" : "#374151" }}
                          >
                            {cat.label}
                            <span className="text-gray-400 text-xs">({cat.services.length})</span>
                          </button>
                        ))}
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <p className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Service
                        </p>
                        {activeCategoryObj.services.map((svc) => (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, category: activeCategoryObj.label, service: svc }));
                              setSelectOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-gray-50 ${
                              form.service === svc ? "text-[#F5A623] font-semibold" : "text-[#1A2530]"
                            }`}
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {svc}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time */}
            {currentStep === "datetime" && (
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => setMonthOffset((m) => Math.max(m - 1, 0))}
                      disabled={monthOffset === 0}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span className="text-sm font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                      {monthLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => setMonthOffset((m) => m + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-center mb-1.5">
                    {WEEKDAYS.map((d) => (
                      <span key={d} className="text-xs font-semibold text-gray-400 py-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {cells.map(({ date, inMonth }, idx) => {
                      const isPast = date < today;
                      const isSunday = date.getDay() === 0;
                      const disabled = !inMonth || isPast || isSunday;
                      const isSelected =
                        form.date &&
                        form.date.getFullYear() === date.getFullYear() &&
                        form.date.getMonth() === date.getMonth() &&
                        form.date.getDate() === date.getDate();
                      const isToday =
                        date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        date.getDate() === today.getDate();

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={disabled}
                          onClick={() => setForm((f) => ({ ...f, date }))}
                          className={`relative aspect-square rounded-lg text-sm flex items-center justify-center transition-colors ${
                            !inMonth ? "text-gray-300" : disabled ? "text-gray-300 cursor-not-allowed" : "text-[#1A2530] hover:bg-[#FFF8EC]"
                          } ${isSelected ? "font-bold" : ""}`}
                          style={{
                            fontFamily: "Inter, sans-serif",
                            backgroundColor: isSelected ? "#F5A623" : "transparent",
                            color: isSelected ? "#0B1F3A" : undefined,
                          }}
                        >
                          {date.getDate()}
                          {isToday && !isSelected && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: "#F5A623" }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {form.date && (
                  <div>
                    <p className="text-sm font-medium mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#1A2530" }}>
                      <span className="text-red-500">*</span> Available times for{" "}
                      <strong>{form.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</strong>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, time: slot }))}
                          className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                            form.time === slot
                              ? "border-[#F5A623] bg-[#FFF8EC] text-[#0B1F3A]"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Your Information */}
            {currentStep === "info" && !submitted && (
              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                <div className="flex flex-col gap-1">
                  <label htmlFor="wiz-name" className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="wiz-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleInfoChange}
                      onBlur={handleInfoBlur}
                      className={`${inputBase} ${infoErrors.name && touched.name ? errorBorder : normalBorder}`}
                    />
                  </div>
                  {infoErrors.name && touched.name && (
                    <p className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                      <AlertCircle size={11} /> {infoErrors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="wiz-phone" className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="wiz-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={handleInfoChange}
                      onBlur={handleInfoBlur}
                      className={`${inputBase} ${infoErrors.phone && touched.phone ? errorBorder : normalBorder}`}
                    />
                  </div>
                  {infoErrors.phone && touched.phone && (
                    <p className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                      <AlertCircle size={11} /> {infoErrors.phone}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="wiz-email" className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="wiz-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleInfoChange}
                      onBlur={handleInfoBlur}
                      className={`${inputBase} ${infoErrors.email && touched.email ? errorBorder : normalBorder}`}
                    />
                  </div>
                  {infoErrors.email && touched.email && (
                    <p className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                      <AlertCircle size={11} /> {infoErrors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="wiz-zip" className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="wiz-zip"
                      name="zipCode"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="77494"
                      maxLength={10}
                      value={form.zipCode}
                      onChange={handleInfoChange}
                      onBlur={handleInfoBlur}
                      className={`${inputBase} ${infoErrors.zipCode && touched.zipCode ? errorBorder : normalBorder}`}
                    />
                  </div>
                  {infoErrors.zipCode && touched.zipCode && (
                    <p className="flex items-center gap-1 text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                      <AlertCircle size={11} /> {infoErrors.zipCode}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label htmlFor="wiz-notes" className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    Additional Notes <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                    <textarea
                      id="wiz-notes"
                      name="notes"
                      rows={3}
                      placeholder="Describe your electrical issue or any relevant details…"
                      value={form.notes}
                      onChange={handleInfoChange}
                      className={`${inputBase} resize-none`}
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="sm:col-span-2 flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    <AlertCircle size={14} className="flex-shrink-0" /> {submitError}
                  </p>
                )}
              </form>
            )}

            {/* SUCCESS STATE */}
            {currentStep === "info" && submitted && (
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFF8EC" }}>
                  <CheckCircle2 size={34} style={{ color: "#F5A623" }} strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                  Appointment Request Received!
                </h4>
                <p className="text-gray-500 text-sm max-w-md leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  Thank you, <strong className="text-[#1A2530]">{form.name}</strong>! We've received your request for{" "}
                  <strong className="text-[#1A2530]">{form.service}</strong> on{" "}
                  <strong className="text-[#1A2530]">
                    {form.date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </strong>{" "}
                  at <strong className="text-[#1A2530]">{form.time}</strong>. We'll confirm shortly via{" "}
                  <strong className="text-[#1A2530]">{form.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={resetWizard}
                  className="mt-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#0B1F3A", color: "#ffffff", fontFamily: "Montserrat, sans-serif" }}
                >
                  Book Another Appointment
                </button>
              </div>
            )}
          </div>

          {/* Footer nav */}
          {!(currentStep === "info" && submitted) && (
            <div className="flex items-center justify-end gap-3 px-6 sm:px-7 py-4 border-t border-gray-100">
              {currentStep !== "info" ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={currentStep === "service" ? !canContinueService : !canContinueDateTime}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:scale-95"
                  style={{ backgroundColor: "#2E5FE8", color: "#ffffff", fontFamily: "Inter, sans-serif" }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-105 active:scale-95"
                  style={{ backgroundColor: "#2E5FE8", color: "#ffffff", fontFamily: "Inter, sans-serif" }}
                >
                  <Send size={14} />
                  {submitting ? "Sending..." : "Book My Appointment"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL: image + info ── */}
        <aside className="hidden lg:flex flex-col p-6 gap-5">
          <div className="rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src="/Generator-Be-Installed.jpg"
              alt="ENE Electrical technician installing a generator for a residential customer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-[#1A2530] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              <strong>Service Areas:</strong> We proudly serve the following cities and areas
              within a <strong>30-mile</strong> radius of ZIP code <strong>77494</strong>.
            </p>
            <ul className="flex flex-col gap-2 mt-4">
              {[
                "Hours: Mon–Sat, 9 AM–6 PM.",
                "Emergencies: Call us for urgent same-day requests.",
                "Confirmation: All bookings are confirmed via call/email.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#1A2530]" style={{ fontFamily: "Inter, sans-serif" }}>
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#F5A623" }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Your info is kept private and used only for your appointment.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
