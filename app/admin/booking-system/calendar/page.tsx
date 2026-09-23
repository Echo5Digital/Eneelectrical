"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { apiFetch, Booking, BookingsResponse } from "../../lib/api";
import AdminShell from "../../components/AdminShell";
import { STATUS_COLORS, utcDateAsLocal } from "../constants";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildCalendarDays(monthOffset: number) {
  const base = new Date();
  const viewDate = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, inMonth: false });
    if (cells.length >= 42) break;
  }

  return {
    cells,
    label: viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    monthStart: firstOfMonth,
    monthEnd: new Date(year, month + 1, 0),
  };
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function AdminCalendarPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { cells, label, monthStart, monthEnd } = buildCalendarDays(monthOffset);

  const fetchMonthBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rangeStart = new Date(monthStart);
      rangeStart.setDate(rangeStart.getDate() - 7);
      const rangeEnd = new Date(monthEnd);
      rangeEnd.setDate(rangeEnd.getDate() + 7);

      const params = new URLSearchParams({
        start: rangeStart.toISOString(),
        end: rangeEnd.toISOString(),
        limit: "200",
      });
      const res = await apiFetch(`/api/bookings?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load bookings");
      const data: BookingsResponse = await res.json();
      setBookings(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [monthOffset]);

  useEffect(() => {
    fetchMonthBookings();
  }, [fetchMonthBookings]);

  const bookingsByDay = bookings.reduce<Record<string, Booking[]>>((acc, b) => {
    const key = dateKey(utcDateAsLocal(b.date));
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDayBookings = selectedDate ? bookingsByDay[dateKey(selectedDate)] || [] : [];

  return (
    <AdminShell>
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
            Calendar
          </h1>
          <p className="text-sm text-gray-500">Days with appointments are highlighted</p>
        </div>
      </header>

      <main className="flex-1 px-8 py-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                onClick={() => setMonthOffset((m) => m - 1)}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-base font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                {label}
              </span>
              <button
                type="button"
                onClick={() => setMonthOffset((m) => m + 1)}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {WEEKDAYS.map((d) => (
                <span key={d} className="text-xs font-semibold text-gray-400 py-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {cells.map(({ date, inMonth }, idx) => {
                const key = dateKey(date);
                const dayBookings = bookingsByDay[key] || [];
                const hasBookings = dayBookings.length > 0;
                const isToday =
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();
                const isSelected =
                  selectedDate &&
                  selectedDate.getFullYear() === date.getFullYear() &&
                  selectedDate.getMonth() === date.getMonth() &&
                  selectedDate.getDate() === date.getDate();

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => inMonth && setSelectedDate(date)}
                    disabled={!inMonth}
                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 text-sm transition-colors ${
                      !inMonth ? "text-gray-300 cursor-default" : "cursor-pointer"
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? "#0B1F3A"
                        : hasBookings
                        ? "#FFF3D6"
                        : "transparent",
                      color: isSelected ? "#ffffff" : !inMonth ? undefined : "#1A2530",
                      border: isToday && !isSelected ? "1.5px solid #F5A623" : "1.5px solid transparent",
                    }}
                  >
                    <span className={hasBookings && !isSelected ? "font-bold" : ""}>{date.getDate()}</span>
                    {hasBookings && (
                      <span
                        className="text-[10px] font-bold px-1.5 rounded-full leading-tight"
                        style={{
                          backgroundColor: isSelected ? "rgba(245,166,35,0.25)" : "#F5A623",
                          color: isSelected ? "#F5A623" : "#0B1F3A",
                        }}
                      >
                        {dayBookings.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3.5 h-3.5 rounded-md" style={{ backgroundColor: "#FFF3D6" }} />
                Has bookings
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3.5 h-3.5 rounded-md border-2" style={{ borderColor: "#F5A623" }} />
                Today
              </div>
            </div>
          </div>

          {/* Selected day panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                  : "Select a day"}
              </h2>
              {selectedDate && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                  aria-label="Clear selection"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {loading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : !selectedDate ? (
              <p className="text-sm text-gray-400">Click a day on the calendar to view its appointments.</p>
            ) : selectedDayBookings.length === 0 ? (
              <p className="text-sm text-gray-400">No appointments on this day.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {selectedDayBookings.map((b) => {
                  const statusColor = STATUS_COLORS[b.status] || STATUS_COLORS.approved;
                  return (
                    <div key={b._id} className="rounded-xl border border-gray-100 p-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold" style={{ color: "#0B1F3A" }}>{b.customerName}</span>
                        <span
                          className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{b.serviceType}</p>
                      <p className="text-xs text-gray-400 mt-1">{b.timeSlot}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </AdminShell>
  );
}
