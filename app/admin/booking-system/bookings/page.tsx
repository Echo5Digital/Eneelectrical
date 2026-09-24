"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { apiFetch, Booking, BookingsResponse } from "../../lib/api";
import AdminShell from "../../components/AdminShell";
import { STATUS_COLORS, formatBookingDate } from "../constants";
import BookingFormModal from "../BookingFormModal";
import BookingDetailsPanel from "../BookingDetailsPanel";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_PALETTE = [
  { bg: "#EFF6FF", text: "#2563EB" },
  { bg: "#F0FDF4", text: "#16A34A" },
  { bg: "#FFFBEB", text: "#D97706" },
  { bg: "#FDF2F8", text: "#DB2777" },
  { bg: "#F5F3FF", text: "#7C3AED" },
];

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [detailsBooking, setDetailsBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (query) params.set("q", query);
      if (statusFilter) params.set("status", statusFilter);

      const res = await apiFetch(`/api/bookings?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load bookings");
      const data: BookingsResponse = await res.json();
      setBookings(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [page, limit, query, statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleDuplicate = async (id: string) => {
    setActionError(null);
    setOpenMenuId(null);
    try {
      const res = await apiFetch(`/api/bookings/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to duplicate booking");
      fetchBookings();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to duplicate booking");
    }
  };

  const handleDelete = async (id: string) => {
    setActionError(null);
    try {
      const res = await apiFetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete booking");
      setDeletingId(null);
      setDetailsBooking(null);
      fetchBookings();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete booking");
    }
  };

  return (
    <AdminShell>
      <header
        className="relative overflow-hidden px-8 py-8"
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #14305C 55%, #1B3E75 100%)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #2E5FE8 0%, transparent 70%)" }}
        />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg" style={{ backgroundColor: "rgba(245,166,35,0.18)" }}>
                <Sparkles size={14} style={{ color: "#F5A623" }} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}>
                Booking System
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Bookings
            </h1>
            <p className="text-sm text-blue-100/80 mt-1">{total} total appointments</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingBooking(null);
              setModalMode("create");
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-150 hover:brightness-105 active:scale-95"
            style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            <Plus size={16} strokeWidth={2.5} /> Book Appointment
          </button>
        </div>
      </header>

      <main className="flex-1 px-8 py-7" style={{ backgroundColor: "#F7F8FA" }}>
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings by name, email, or phone..."
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623]"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_FILTERS.map((filter) => {
              const active = statusFilter === filter.value;
              const color = filter.value ? STATUS_COLORS[filter.value] : null;
              return (
                <button
                  key={filter.value || "all"}
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setStatusFilter(filter.value);
                  }}
                  className="px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-150 border"
                  style={
                    active
                      ? color
                        ? { backgroundColor: color.bg, color: color.text, borderColor: color.text + "33" }
                        : { backgroundColor: "#0B1F3A", color: "#ffffff", borderColor: "#0B1F3A" }
                      : { backgroundColor: "#ffffff", color: "#6B7280", borderColor: "#E5E7EB" }
                  }
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {(error || actionError) && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            {error || actionError}
          </p>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left" style={{ backgroundColor: "#F7F8FA" }}>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Date</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Time</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Customer</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Service</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Type</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <ClipboardList size={28} className="text-gray-300" />
                        No bookings found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, idx) => {
                    const statusColor = STATUS_COLORS[booking.status] || STATUS_COLORS.approved;
                    const avatar = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
                    return (
                      <tr
                        key={booking._id}
                        onClick={() => setDetailsBooking(booking)}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                          {formatBookingDate(booking.date)}
                        </td>
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{booking.timeSlot}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: avatar.bg, color: avatar.text }}
                            >
                              {initials(booking.customerName)}
                            </div>
                            <div>
                              <div className="font-semibold" style={{ color: "#0B1F3A" }}>{booking.customerName}</div>
                              <div className="text-xs text-gray-400">{booking.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{booking.serviceType}</td>
                        <td className="px-5 py-4 text-gray-500">{booking.serviceCategory}</td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setOpenMenuId(openMenuId === booking._id ? null : booking._id)}
                            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            aria-label="Actions"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openMenuId === booking._id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                              <div className="absolute right-5 top-11 z-20 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-left">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingBooking(booking);
                                    setModalMode("edit");
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Pencil size={14} /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDuplicate(booking._id)}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Copy size={14} /> Duplicate
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeletingId(booking._id);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              style={{ color: "#0B1F3A" }}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              style={{ color: "#0B1F3A" }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>

      {detailsBooking && (
        <BookingDetailsPanel
          booking={detailsBooking}
          onClose={() => setDetailsBooking(null)}
          onChanged={(updated) => {
            if (updated) setDetailsBooking(updated);
            fetchBookings();
          }}
          onEdit={(booking) => {
            setEditingBooking(booking);
            setModalMode("edit");
            setDetailsBooking(null);
          }}
          onDuplicate={(id) => {
            handleDuplicate(id);
            setDetailsBooking(null);
          }}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {modalMode && (
        <BookingFormModal
          booking={modalMode === "edit" ? editingBooking : null}
          onClose={() => setModalMode(null)}
          onSaved={() => {
            setModalMode(null);
            fetchBookings();
          }}
        />
      )}

      {deletingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(11,31,58,0.5)" }}
          onClick={() => setDeletingId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
              Delete Appointment?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently remove this booking. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
