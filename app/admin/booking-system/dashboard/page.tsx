"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Users, Percent, ArrowRight } from "lucide-react";
import { apiFetch, BookingStats } from "../../lib/api";
import AdminShell from "../../components/AdminShell";
import { STATUS_COLORS, formatBookingDate } from "../constants";

export default function AdminBookingDashboardPage() {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/bookings/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load booking stats");
        return res.json();
      })
      .then((data: BookingStats) => setStats(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const approved = stats?.statusCounts?.approved ?? 0;
  const pending = stats?.statusCounts?.pending ?? 0;
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
  ];

  return (
    <AdminShell>
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
            Booking System Dashboard
          </h1>
          <p className="text-sm text-gray-500">Overview of appointments and activity</p>
        </div>
      </header>

      <main className="flex-1 px-8 py-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {cards.map(({ label, sub, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                <Icon size={20} style={{ color }} strokeWidth={2} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
                  {loading ? "—" : value}
                </p>
                <p className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
              Upcoming Appointments
            </h2>
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
                  stats.upcoming.map((booking) => {
                    const statusColor = STATUS_COLORS[booking.status] || STATUS_COLORS.approved;
                    return (
                      <tr key={booking._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <td className="px-6 py-3.5 font-semibold" style={{ color: "#0B1F3A" }}>
                          {booking.customerName}
                        </td>
                        <td className="px-6 py-3.5 text-gray-500">{booking.serviceType}</td>
                        <td className="px-6 py-3.5 text-gray-500">{booking.timeSlot}</td>
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
      </main>
    </AdminShell>
  );
}
