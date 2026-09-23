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
} from "lucide-react";
import { apiFetch, Booking, BookingsResponse } from "../../lib/api";
import AdminShell from "../../components/AdminShell";
import { STATUS_COLORS } from "../constants";
import BookingFormModal from "../BookingFormModal";
import BookingDetailsPanel from "../BookingDetailsPanel";

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
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
            Bookings
          </h1>
          <p className="text-sm text-gray-500">{total} total appointments</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingBooking(null);
            setModalMode("create");
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-150 hover:brightness-105 active:scale-95"
          style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
        >
          <Plus size={16} strokeWidth={2.5} /> Book Appointment
        </button>
      </header>

      <main className="flex-1 px-8 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
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
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623]"
          >
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-400">No bookings found.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => {
                    const statusColor = STATUS_COLORS[booking.status] || STATUS_COLORS.approved;
                    return (
                      <tr
                        key={booking._id}
                        onClick={() => setDetailsBooking(booking)}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                          {new Date(booking.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{booking.timeSlot}</td>
                        <td className="px-5 py-4">
                          <div className="font-semibold" style={{ color: "#0B1F3A" }}>{booking.customerName}</div>
                          <div className="text-xs text-gray-400">{booking.email}</div>
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
