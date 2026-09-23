"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Package, Clock, DollarSign, Pencil, Trash2, Eye, EyeOff, ChevronDown, Check } from "lucide-react";
import { apiFetch, Service } from "../lib/api";
import { VISIBILITY_COLORS, formatDuration, formatPrice } from "./constants";

interface ServiceDetailsPanelProps {
  service: Service;
  onClose: () => void;
  onChanged: (updated?: Service) => void;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

const VISIBILITY_OPTIONS: Service["visibility"][] = ["visible", "hidden"];

export default function ServiceDetailsPanel({
  service,
  onClose,
  onChanged,
  onEdit,
  onDelete,
}: ServiceDetailsPanelProps) {
  const [visibilityMenuOpen, setVisibilityMenuOpen] = useState(false);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);
  const [visibilityError, setVisibilityError] = useState<string | null>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (visibilityRef.current && !visibilityRef.current.contains(e.target as Node)) {
        setVisibilityMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleVisibilityChange = async (visibility: Service["visibility"]) => {
    if (visibility === service.visibility) {
      setVisibilityMenuOpen(false);
      return;
    }
    setVisibilityError(null);
    setUpdatingVisibility(true);
    try {
      const res = await apiFetch(`/api/services/${service._id}`, {
        method: "PATCH",
        body: JSON.stringify({ visibility }),
      });
      if (!res.ok) throw new Error("Failed to update visibility");
      const updated: Service = await res.json();
      onChanged(updated);
    } catch (err) {
      setVisibilityError(err instanceof Error ? err.message : "Failed to update visibility");
    } finally {
      setUpdatingVisibility(false);
      setVisibilityMenuOpen(false);
    }
  };

  const visColor = VISIBILITY_COLORS[service.visibility] || VISIBILITY_COLORS.visible;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(11,31,58,0.4)" }} />
      <div
        className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
            Service Details
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
          <div className="rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-full flex justify-between items-start mb-3">
              <div className="relative" ref={visibilityRef}>
                <button
                  type="button"
                  onClick={() => setVisibilityMenuOpen((o) => !o)}
                  disabled={updatingVisibility}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: visColor.bg, color: visColor.text }}
                >
                  {updatingVisibility ? "Updating..." : service.visibility}
                  <ChevronDown size={12} />
                </button>
                {visibilityMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 text-left">
                    {VISIBILITY_OPTIONS.map((opt) => {
                      const optColor = VISIBILITY_COLORS[opt];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleVisibilityChange(opt)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm capitalize hover:bg-gray-50 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: optColor.text }} />
                            {opt}
                          </span>
                          {opt === service.visibility && <Check size={14} style={{ color: "#F5A623" }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400">ID: {service._id.slice(-6)}</span>
            </div>

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
              style={{ backgroundColor: "#FFF8EC" }}
            >
              <Package size={28} style={{ color: "#F5A623" }} strokeWidth={1.75} />
            </div>
            <p className="text-lg font-bold mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              {service.name}
            </p>
            <span
              className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}
            >
              {service.category}
            </span>

            <div className="w-full flex items-center justify-center gap-6 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Clock size={14} className="text-gray-400" /> {formatDuration(service.durationMinutes)}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <DollarSign size={14} className="text-gray-400" /> {formatPrice(service.price)}
              </div>
            </div>
            {visibilityError && <p className="text-xs text-red-500 mt-2">{visibilityError}</p>}
          </div>

          {service.description && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Description
              </p>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{service.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onEdit(service)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              type="button"
              onClick={() => handleVisibilityChange(service.visibility === "visible" ? "hidden" : "visible")}
              disabled={updatingVisibility}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              {service.visibility === "visible" ? (
                <>
                  <EyeOff size={14} /> Hide
                </>
              ) : (
                <>
                  <Eye size={14} /> Show
                </>
              )}
            </button>
          </div>

          <div className="h-px bg-gray-100" />

          <button
            type="button"
            onClick={() => onDelete(service._id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Delete Service
          </button>
        </div>
      </div>
    </div>
  );
}
