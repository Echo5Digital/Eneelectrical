"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Mail,
  Phone,
  ChevronDown,
  Pencil,
  Trash2,
  Check,
  Briefcase,
} from "lucide-react";
import { apiFetch, Employee } from "../lib/api";
import { AVAILABILITY_COLORS } from "./constants";

interface EmployeeDetailsPanelProps {
  employee: Employee;
  onClose: () => void;
  onChanged: (updated?: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const AVAILABILITY_OPTIONS: Employee["availability"][] = ["available", "away"];
const SERVICES_PREVIEW_COUNT = 4;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function EmployeeDetailsPanel({
  employee,
  onClose,
  onChanged,
  onEdit,
  onDelete,
}: EmployeeDetailsPanelProps) {
  const [availabilityMenuOpen, setAvailabilityMenuOpen] = useState(false);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const availabilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (availabilityRef.current && !availabilityRef.current.contains(e.target as Node)) {
        setAvailabilityMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleAvailabilityChange = async (availability: Employee["availability"]) => {
    if (availability === employee.availability) {
      setAvailabilityMenuOpen(false);
      return;
    }
    setAvailabilityError(null);
    setUpdatingAvailability(true);
    try {
      const res = await apiFetch(`/api/employees/${employee._id}`, {
        method: "PATCH",
        body: JSON.stringify({ availability }),
      });
      if (!res.ok) throw new Error("Failed to update availability");
      const updated: Employee = await res.json();
      onChanged(updated);
    } catch (err) {
      setAvailabilityError(err instanceof Error ? err.message : "Failed to update availability");
    } finally {
      setUpdatingAvailability(false);
      setAvailabilityMenuOpen(false);
    }
  };

  const availabilityColor = AVAILABILITY_COLORS[employee.availability] || AVAILABILITY_COLORS.available;
  const visibleServices = showAllServices
    ? employee.services
    : employee.services.slice(0, SERVICES_PREVIEW_COUNT);
  const remainingCount = employee.services.length - SERVICES_PREVIEW_COUNT;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(11,31,58,0.4)" }} />
      <div
        className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
            Employee Details
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

        <div className="p-6 flex flex-col gap-6">
          {/* Profile card */}
          <div className="rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-full flex justify-between items-start mb-2">
              <div className="relative" ref={availabilityRef}>
                <button
                  type="button"
                  onClick={() => setAvailabilityMenuOpen((o) => !o)}
                  disabled={updatingAvailability}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: availabilityColor.bg, color: availabilityColor.text }}
                >
                  {updatingAvailability ? "Updating..." : employee.availability}
                  <ChevronDown size={12} />
                </button>
                {availabilityMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 text-left">
                    {AVAILABILITY_OPTIONS.map((opt) => {
                      const optColor = AVAILABILITY_COLORS[opt];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAvailabilityChange(opt)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm capitalize hover:bg-gray-50 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: optColor.text }} />
                            {opt}
                          </span>
                          {opt === employee.availability && <Check size={14} style={{ color: "#F5A623" }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400">ID: {employee._id.slice(-6)}</span>
            </div>

            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mb-3 overflow-hidden"
              style={{ backgroundColor: "#FFF8EC", color: "#0B1F3A" }}
            >
              {employee.photoUrl ? (
                <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
              ) : (
                initials(employee.name)
              )}
            </div>
            <p className="text-lg font-bold mb-4" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              {employee.name}
            </p>

            <div className="w-full grid grid-cols-2 gap-2">
              <a
                href={`tel:${employee.phone}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold truncate"
                style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}
              >
                <Phone size={12} className="flex-shrink-0" /> {employee.phone}
              </a>
              <a
                href={`mailto:${employee.email}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold truncate"
                style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}
              >
                <Mail size={12} className="flex-shrink-0" /> {employee.email}
              </a>
            </div>
            {availabilityError && <p className="text-xs text-red-500 mt-2">{availabilityError}</p>}
          </div>

          <button
            type="button"
            onClick={() => onEdit(employee)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} /> Edit Employee
          </button>

          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <Briefcase size={13} /> Services
              </p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {employee.services.length}
              </span>
            </div>

            {employee.services.length === 0 ? (
              <p className="text-sm text-gray-400">No services assigned.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {visibleServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-l-4"
                    style={{ borderColor: "#F5A623", backgroundColor: "#F7F8FA" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{service}</span>
                  </div>
                ))}
                {!showAllServices && remainingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllServices(true)}
                    className="text-sm font-semibold py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                    style={{ color: "#0B1F3A" }}
                  >
                    Show more ({remainingCount})
                  </button>
                )}
              </div>
            )}
          </div>

          {employee.notes && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Notes
              </p>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{employee.notes}</p>
            </div>
          )}

          <div className="h-px bg-gray-100" />

          <button
            type="button"
            onClick={() => onDelete(employee._id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}
