"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CalendarDays,
  Clock,
  ChevronDown,
  Pencil,
  Copy,
  Trash2,
  Check,
} from "lucide-react";
import { apiFetch, Booking } from "../lib/api";
import { STATUS_COLORS } from "./constants";

interface BookingDetailsPanelProps {
  booking: Booking;
  onClose: () => void;
  onChanged: (updated?: Booking) => void;
  onEdit: (booking: Booking) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_OPTIONS: Booking["status"][] = ["approved", "pending", "cancelled"];

export default function BookingDetailsPanel({
  booking,
  onClose,
  onChanged,
  onEdit,
  onDuplicate,
  onDelete,
}: BookingDetailsPanelProps) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setStatusMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleStatusChange = async (status: Booking["status"]) => {
    if (status === booking.status) {
      setStatusMenuOpen(false);
      return;
    }
    setStatusError(null);
    setUpdatingStatus(true);
    try {
      const res = await apiFetch(`/api/bookings/${booking._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated: Booking = await res.json();
      onChanged(updated);
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingStatus(false);
      setStatusMenuOpen(false);
    }
  };

  const statusColor = STATUS_COLORS[booking.status] || STATUS_COLORS.approved;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(11,31,58,0.4)" }} />
      <div
        className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
            Appointment Details
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
          {/* Service + date/time */}
          <div className="rounded-2xl border border-gray-100 p-5">
            <p className="text-lg font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              {booking.serviceType}
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDays size={15} className="text-gray-400" />
                {new Date(booking.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-gray-400" />
                {booking.timeSlot}
              </div>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            {/* Status dropdown */}
            <div className="relative" ref={statusRef}>
              <button
                type="button"
                onClick={() => setStatusMenuOpen((o) => !o)}
                disabled={updatingStatus}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold capitalize transition-opacity disabled:opacity-60"
                style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
              >
                {updatingStatus ? "Updating..." : booking.status}
                <ChevronDown size={13} />
              </button>

              {statusMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                  {STATUS_OPTIONS.map((opt) => {
                    const optColor = STATUS_COLORS[opt];
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleStatusChange(opt)}
                        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm capitalize hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: optColor.text }}
                          />
                          {opt}
                        </span>
                        {opt === booking.status && <Check size={14} style={{ color: "#F5A623" }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {statusError && <p className="text-xs text-red-500 mt-2">{statusError}</p>}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onEdit(booking)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              type="button"
              onClick={() => onDuplicate(booking._id)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Copy size={14} /> Duplicate
            </button>
          </div>

          {/* Customer info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Customer
            </p>
            <p className="text-base font-bold mb-2" style={{ color: "#0B1F3A" }}>{booking.customerName}</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400 flex-shrink-0" /> {booking.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400 flex-shrink-0" /> {booking.phone}
              </div>
              {booking.zipCode && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400 flex-shrink-0" /> {booking.zipCode}
                </div>
              )}
            </div>
          </div>

          {/* Service meta */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Service
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                {booking.serviceCategory}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                {booking.serviceType}
              </span>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <MessageSquare size={13} /> Notes
              </p>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{booking.notes}</p>
            </div>
          )}

          <div className="h-px bg-gray-100" />

          <button
            type="button"
            onClick={() => onDelete(booking._id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Delete Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
