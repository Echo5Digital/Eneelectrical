"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, User, Mail, Phone, AlertCircle, ChevronDown, Check } from "lucide-react";
import { apiFetch, Employee, Service, ServicesResponse } from "../lib/api";

const CATEGORY_ORDER = ["Residential", "Commercial"] as const;

interface EmployeeFormModalProps {
  employee: Employee | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  visibility: "visible" | "hidden";
  availability: "available" | "away";
  services: string[];
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Name is required.";
  if (!form.phone.trim() || !/^[\d\s\-()+]{7,20}$/.test(form.phone))
    errors.phone = "A valid phone number is required.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "A valid email is required.";
  return errors;
}

const inputBase =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] placeholder:text-gray-400";
const selectBase =
  "w-full pl-4 pr-8 py-2.5 rounded-xl border bg-white text-[#1A2530] text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] appearance-none cursor-pointer";
const normalBorder = "border-gray-200 hover:border-gray-300";
const errorBorder = "border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400";

export default function EmployeeFormModal({ employee, onClose, onSaved }: EmployeeFormModalProps) {
  const isEdit = !!employee;
  const [form, setForm] = useState<FormState>({
    name: employee?.name ?? "",
    phone: employee?.phone ?? "",
    email: employee?.email ?? "",
    visibility: employee?.visibility ?? "visible",
    availability: employee?.availability ?? "available",
    services: employee?.services ?? [],
    notes: employee?.notes ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    apiFetch("/api/services/admin")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load services"))))
      .then((data: ServicesResponse) => setServices(data.items))
      .catch(() => setServices([]));
  }, []);

  const servicesByCategory = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      key: category,
      label: category,
      services: services.filter((s) => s.category === category),
    }));
  }, [services]);

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

  const toggleService = (service: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaveError(null);
    setSaving(true);
    try {
      const path = isEdit ? `/api/employees/${employee!._id}` : "/api/employees";
      const method = isEdit ? "PATCH" : "POST";
      const res = await apiFetch(path, { method, body: JSON.stringify(form) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save employee. Please try again.");
      }
      onSaved();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save employee. Please try again.");
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
            {isEdit ? "Edit Employee" : "Add Employee"}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  name="name"
                  type="text"
                  placeholder="Alex Rivera"
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="(713) 555-0148"
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

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  placeholder="alex.rivera@eneelectrical.com"
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                Availability
              </label>
              <div className="relative">
                <select name="availability" value={form.availability} onChange={handleChange} className={`${selectBase} ${normalBorder}`}>
                  <option value="available">Available</option>
                  <option value="away">Away</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Assigned Services
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 rounded-xl p-4">
              {servicesByCategory.map((cat) => (
                <div key={cat.key}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{cat.label}</p>
                  <div className="flex flex-col gap-1.5">
                    {cat.services.map((service) => {
                      const checked = form.services.includes(service.name);
                      return (
                        <button
                          key={service._id}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className="flex items-center gap-2 text-left text-sm py-1 group"
                        >
                          <span
                            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors"
                            style={{
                              backgroundColor: checked ? "#F5A623" : "#fff",
                              borderColor: checked ? "#F5A623" : "#D1D5DB",
                            }}
                          >
                            {checked && <Check size={11} strokeWidth={3} className="text-[#0B1F3A]" />}
                          </span>
                          <span className={checked ? "text-[#0B1F3A] font-medium" : "text-gray-600"}>
                            {service.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Notes <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Any relevant details…"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] resize-none"
            />
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
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
