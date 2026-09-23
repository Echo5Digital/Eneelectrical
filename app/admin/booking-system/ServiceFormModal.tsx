"use client";

import React, { useState } from "react";
import { X, Tag, Clock, DollarSign, AlignLeft, AlertCircle, ChevronDown } from "lucide-react";
import { apiFetch, Service } from "../lib/api";

interface ServiceFormModalProps {
  service: Service | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  category: "Residential" | "Commercial";
  hours: string;
  minutes: string;
  price: string;
  description: string;
  visibility: "visible" | "hidden";
}

interface FormErrors {
  name?: string;
  price?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Service name is required.";
  if (form.price && (Number.isNaN(Number(form.price)) || Number(form.price) < 0))
    errors.price = "Price must be a positive number.";
  return errors;
}

const inputBase =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400";
const selectBase =
  "w-full pl-4 pr-8 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] appearance-none cursor-pointer";
const normalBorder = "border-gray-200 hover:border-gray-300";
const errorBorder = "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";

export default function ServiceFormModal({ service, onClose, onSaved }: ServiceFormModalProps) {
  const isEdit = !!service;
  const initialMinutes = service?.durationMinutes ?? 60;
  const [form, setForm] = useState<FormState>({
    name: service?.name ?? "",
    category: service?.category ?? "Residential",
    hours: String(Math.floor(initialMinutes / 60)),
    minutes: String(initialMinutes % 60),
    price: service ? String(service.price) : "0",
    description: service?.description ?? "",
    visibility: service?.visibility ?? "visible",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const fieldErr = (field: keyof FormErrors) =>
    errors[field] && touched[field] ? errorBorder : normalBorder;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, price: true });
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaveError(null);
    setSaving(true);
    try {
      const durationMinutes = Math.max(0, Number(form.hours) || 0) * 60 + Math.max(0, Number(form.minutes) || 0);
      const path = isEdit ? `/api/services/${service!._id}` : "/api/services";
      const method = isEdit ? "PATCH" : "POST";
      const res = await apiFetch(path, {
        method,
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          durationMinutes,
          price: Number(form.price) || 0,
          description: form.description,
          visibility: form.visibility,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save service. Please try again.");
      }
      onSaved();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save service. Please try again.");
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
            {isEdit ? "Edit Service" : "Add Service"}
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

        <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Service Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                name="name"
                type="text"
                placeholder="EV Charger Installation"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${fieldErr("name")}`}
              />
            </div>
            {errors.name && touched.name && (
              <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Category
              </label>
              <div className="relative">
                <select name="category" value={form.category} onChange={handleChange} className={`${selectBase} ${normalBorder}`}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Visibility
              </label>
              <div className="relative">
                <select name="visibility" value={form.visibility} onChange={handleChange} className={`${selectBase} ${normalBorder}`}>
                  <option value="visible">Visible</option>
                  <option value="hidden">Hidden</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Duration (hrs)
              </label>
              <div className="relative">
                <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  name="hours"
                  type="number"
                  min={0}
                  value={form.hours}
                  onChange={handleChange}
                  className={`${inputBase} ${normalBorder}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Duration (min)
              </label>
              <input
                name="minutes"
                type="number"
                min={0}
                max={59}
                value={form.minutes}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] ${normalBorder}`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Price
              </label>
              <div className="relative">
                <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  name="price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputBase} ${fieldErr("price")}`}
                />
              </div>
              {errors.price && touched.price && (
                <p className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={11} /> {errors.price}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Description <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <div className="relative">
              <AlignLeft size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
              <textarea
                name="description"
                rows={3}
                placeholder="Book a professional service for your home or business…"
                value={form.description}
                onChange={handleChange}
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          {saveError && (
            <p className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle size={14} className="flex-shrink-0" /> {saveError}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
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
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
