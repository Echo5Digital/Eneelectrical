"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, User, Mail, Phone, MapPin, MessageSquare, AlertCircle, ChevronDown } from "lucide-react";
import { apiFetch, Booking, Service, ServicesResponse } from "../lib/api";
import { TIME_SLOTS } from "./constants";

interface BookingFormModalProps {
  booking: Booking | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  customerName: string;
  email: string;
  phone: string;
  serviceCategory: "Residential" | "Commercial";
  serviceType: string;
  date: string;
  timeSlot: string;
  zipCode: string;
  notes: string;
  status: "new" | "approved" | "pending" | "cancelled";
}

interface FormErrors {
  customerName?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  date?: string;
  timeSlot?: string;
}

function toDateInputValue(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().split("T")[0];
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.customerName.trim() || form.customerName.trim().length < 2)
    errors.customerName = "Customer name is required.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "A valid email is required.";
  if (!form.phone.trim() || !/^[\d\s\-()+]{7,20}$/.test(form.phone))
    errors.phone = "A valid phone number is required.";
  if (!form.serviceType) errors.serviceType = "Please select a service.";
  if (!form.date) errors.date = "Please select a date.";
  if (!form.timeSlot) errors.timeSlot = "Please select a time slot.";
  return errors;
}

const inputBase =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400";
const selectBase =
  "w-full pl-10 pr-8 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] appearance-none cursor-pointer";
const normalBorder = "border-gray-200 hover:border-gray-300";
const errorBorder = "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";

export default function BookingFormModal({ booking, onClose, onSaved }: BookingFormModalProps) {
  const isEdit = !!booking;
  const [form, setForm] = useState<FormState>({
    customerName: booking?.customerName ?? "",
    email: booking?.email ?? "",
    phone: booking?.phone ?? "",
    serviceCategory: booking?.serviceCategory ?? "Residential",
    serviceType: booking?.serviceType ?? "",
    date: booking ? toDateInputValue(booking.date) : "",
    timeSlot: booking?.timeSlot ?? "",
    zipCode: booking?.zipCode ?? "",
    notes: booking?.notes ?? "",
    status: booking?.status ?? "approved",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    apiFetch("/api/services/admin")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load services"))))
      .then((data: ServicesResponse) => setServices(data.items))
      .catch(() => setServices([]));
  }, []);

  const servicesForCategory = useMemo(
    () => services.filter((s) => s.category === form.serviceCategory),
    [services, form.serviceCategory]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => {
      const updated = { ...f, [name]: value } as FormState;
      if (name === "serviceCategory") {
        updated.serviceType = "";
      }
      return updated;
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const fieldErr = (field: keyof FormErrors) =>
    errors[field] && touched[field] ? errorBorder : normalBorder;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaveError(null);
    setSaving(true);
    try {
      const path = isEdit ? `/api/bookings/${booking!._id}` : "/api/bookings";
      const method = isEdit ? "PATCH" : "POST";
      const res = await apiFetch(path, {
        method,
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save booking. Please try again.");
      }
      onSaved();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save booking. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(11,31,58,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
            {isEdit ? "Edit Appointment" : "Book Appointment"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Customer Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                name="customerName"
                type="text"
                placeholder="Jane Smith"
                value={form.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${fieldErr("customerName")}`}
              />
            </div>
            {errors.customerName && touched.customerName && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.customerName}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                name="phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${fieldErr("phone")}`}
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${fieldErr("email")}`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              ZIP Code
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                name="zipCode"
                type="text"
                placeholder="77494"
                maxLength={10}
                value={form.zipCode}
                onChange={handleChange}
                className={`${inputBase} ${normalBorder}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="serviceCategory"
                value={form.serviceCategory}
                onChange={handleChange}
                className={`${selectBase} ${normalBorder} pl-4`}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Service <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${selectBase} ${fieldErr("serviceType")} pl-4`}
              >
                <option value="">Select a service…</option>
                {servicesForCategory.map((s) => (
                  <option key={s._id} value={s.name}>{s.name}</option>
                ))}
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
            {errors.serviceType && touched.serviceType && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.serviceType}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Date <span className="text-red-500">*</span>
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] ${fieldErr("date")}`}
            />
            {errors.date && touched.date && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.date}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Time Slot <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${selectBase} ${fieldErr("timeSlot")} pl-4`}
              >
                <option value="">Select a time slot…</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
            {errors.timeSlot && touched.timeSlot && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.timeSlot}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={`${selectBase} ${normalBorder} pl-4`}
              >
                <option value="new">New</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Notes <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <div className="relative">
              <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
              <textarea
                name="notes"
                rows={3}
                placeholder="Any relevant details…"
                value={form.notes}
                onChange={handleChange}
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          {saveError && (
            <p className="sm:col-span-2 flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle size={14} className="flex-shrink-0" /> {saveError}
            </p>
          )}

          <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-105 active:scale-95"
              style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
