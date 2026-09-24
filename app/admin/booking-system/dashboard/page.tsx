"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Users,
  Percent,
  ArrowRight,
  Clock3,
  Sparkles,
  CalendarClock,
} from "lucide-react";
import { apiFetch, Booking, BookingStats } from "../../lib/api";
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

export default function AdminBookingDashboardPage() {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [detailsBooking, setDetailsBooking] = useState<Booking | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/bookings/stats");
      if (!res.ok) throw new Error("Failed to load booking stats");
      const data: BookingStats = await res.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleDuplicate = async (id: string) => {
    setActionError(null);
    try {
      const res = await apiFetch(`/api/bookings/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to duplicate booking");
      fetchStats();
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
      fetchStats();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete booking");
    }
  };

  const newCount = stats?.statusCounts?.new ?? 0;
  const approved = stats?.statusCounts?.approved ?? 0;
  const pending = stats?.statusCounts?.pending ?? 0;
  const cancelled = stats?.statusCounts?.cancelled ?? 0;
  const total = stats?.totalAppointments ?? 0;
  const occupancyRate = total > 0 ? Math.round((approved / total) * 100) : 0;

  const cards = [
    {
      label: "Total Appointments",
      sub: "Next 30 days",
      value: total,
      icon: CalendarCheck,
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      label: "Customers",
      sub: "Unique in range",
      value: stats?.customers ?? 0,
      icon: Users,
      color: "#16A34A",
      bg: "#F0FDF4",
    },
    {
      label: "Approval Rate",
      sub: `${approved} approved, ${pending} pending`,
      value: `${occupancyRate}%`,
      icon: Percent,
      color: "#D97706",
      bg: "#FFFBEB",
    },
    {
      label: "Next Appointment",
      sub: stats?.upcoming?.[0]?.timeSlot ?? "No bookings yet",
      value: stats?.upcoming?.[0] ? formatBookingDate(stats.upcoming[0].date, { month: "short", day: "numeric" }) : "—",
      icon: CalendarClock,
      color: "#7C3AED",
      bg: "#F5F3FF",
    },
  ];

  const statusBreakdown = [
    { key: "new", label: "New", count: newCount, color: STATUS_COLORS.new },
    { key: "approved", label: "Approved", count: approved, color: STATUS_COLORS.approved },
    { key: "pending", label: "Pending", count: pending, color: STATUS_COLORS.pending },
    { key: "cancelled", label: "Cancelled", count: cancelled, color: STATUS_COLORS.cancelled },
  ];
  const statusTotal = Math.max(newCount + approved + pending + cancelled, 1);

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
              Dashboard
            </h1>
            <p className="text-sm text-blue-100/80 mt-1">Overview of appointments and activity</p>
          </div>
          <Link
            href="/admin/booking-system/bookings"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-150 hover:brightness-105 active:scale-95"
            style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            View All Bookings <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-8 py-7" style={{ backgroundColor: "#F7F8FA" }}>
        {(error || actionError) && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            {error || actionError}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {cards.map(({ label, sub, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold truncate" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
                  {loading ? "—" : value}
                </p>
                <p className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{label}</p>
                <p className="text-xs text-gray-400 truncate">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock3 size={17} style={{ color: "#F5A623" }} />
                <h2 className="text-base font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
                  Upcoming Appointments
                </h2>
              </div>
              <Link
                href="/admin/booking-system/bookings"
                className="flex items-center gap-1 text-sm font-semibold hover:underline"
                style={{ color: "#0B1F3A" }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="px-6 py-8 text-center text-gray-400">Loading...</td>
                    </tr>
                  ) : !stats || stats.upcoming.length === 0 ? (
                    <tr>
                      <td className="px-6 py-8 text-center text-gray-400">No upcoming appointments.</td>
                    </tr>
                  ) : (
                    stats.upcoming.map((booking, idx) => {
                      const statusColor = STATUS_COLORS[booking.status] || STATUS_COLORS.approved;
                      const avatar = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
                      return (
                        <tr
                          key={booking._id}
                          onClick={() => setDetailsBooking(booking)}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{ backgroundColor: avatar.bg, color: avatar.text }}
                              >
                                {initials(booking.customerName)}
                              </div>
                              <span className="font-semibold" style={{ color: "#0B1F3A" }}>{booking.customerName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-gray-500">{booking.serviceType}</td>
                          <td className="px-6 py-3.5 text-gray-500 whitespace-nowrap">{booking.timeSlot}</td>
                          <td className="px-6 py-3.5">
                            <span
                              className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                              style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-gray-400 whitespace-nowrap text-right">
                            {formatBookingDate(booking.date, { month: "short", day: "numeric" })}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
            <h2 className="text-base font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
              Status Breakdown
            </h2>

            <div className="flex items-center gap-1 h-2.5 rounded-full overflow-hidden bg-gray-100">
              {statusBreakdown.map((s) => (
                <div
                  key={s.key}
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(s.count / statusTotal) * 100}%`,
                    backgroundColor: s.color.text,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {statusBreakdown.map((s) => (
                <div key={s.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color.text }} />
                    <span className="text-sm text-gray-600">{s.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: "#0B1F3A" }}>
                    {loading ? "—" : s.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-relaxed">
                Approval rate is calculated from approved appointments against the total in the current 30-day range.
              </p>
            </div>
          </div>
        </div>
      </main>

      {detailsBooking && (
        <BookingDetailsPanel
          booking={detailsBooking}
          onClose={() => setDetailsBooking(null)}
          onChanged={(updated) => {
            if (updated) setDetailsBooking(updated);
            fetchStats();
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
            fetchStats();
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
