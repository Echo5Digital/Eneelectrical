"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Inbox,
} from "lucide-react";
import { apiFetch, Lead, LeadsResponse } from "../lib/api";
import AdminShell from "../components/AdminShell";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: "#EFF6FF", text: "#1D4ED8" },
  contacted: { bg: "#FEF3C7", text: "#B45309" },
  scheduled: { bg: "#EDE9FE", text: "#6D28D9" },
  won: { bg: "#DCFCE7", text: "#15803D" },
  lost: { bg: "#FEE2E2", text: "#B91C1C" },
};

const STATUS_ORDER: Lead["status"][] = ["new", "contacted", "scheduled", "won", "lost"];

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  scheduled: "Scheduled",
  won: "Won",
  lost: "Lost",
};

const AVATAR_PALETTE = [
  { bg: "#EFF6FF", text: "#2563EB" },
  { bg: "#F0FDF4", text: "#16A34A" },
  { bg: "#FFFBEB", text: "#D97706" },
  { bg: "#FDF2F8", text: "#DB2777" },
  { bg: "#F5F3FF", text: "#7C3AED" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function dayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/leads?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load leads");
        return res.json();
      })
      .then((data: LeadsResponse) => {
        setLeads(data.items);
        setTotal(data.total);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newLast7Days = leads.filter((l) => new Date(l.createdAt).getTime() >= sevenDaysAgo).length;
  const inProgress = leads.filter((l) => l.status === "contacted" || l.status === "scheduled").length;
  const converted = leads.filter((l) => l.status === "won").length;
  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  const stats = [
    { label: "Total Leads", sub: "All time submissions", value: total, icon: Users, color: "#2563EB", bg: "#EFF6FF" },
    { label: "New Leads", sub: "Last 7 days", value: newLast7Days, icon: Calendar, color: "#16A34A", bg: "#F0FDF4" },
    { label: "In Progress", sub: "Active leads", value: inProgress, icon: Clock, color: "#D97706", bg: "#FFFBEB" },
    { label: "Converted", sub: `${conversionRate}% conversion rate`, value: converted, icon: CheckCircle2, color: "#7C3AED", bg: "#F5F3FF" },
  ];

  const recentLeads = leads.slice(0, 6);

  // Last 7 days trend (oldest -> newest)
  const trend = useMemo(() => {
    const days: { label: string; date: Date; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push({ label: dayLabel(d), date: d, count: 0 });
    }
    leads.forEach((l) => {
      const created = new Date(l.createdAt);
      created.setHours(0, 0, 0, 0);
      const match = days.find((d) => d.date.getTime() === created.getTime());
      if (match) match.count += 1;
    });
    return days;
  }, [leads]);
  const maxTrend = Math.max(...trend.map((d) => d.count), 1);

  const statusBreakdown = STATUS_ORDER.map((key) => ({
    key,
    label: STATUS_LABELS[key],
    count: leads.filter((l) => l.status === key).length,
    color: STATUS_COLORS[key],
  }));
  const statusTotal = Math.max(leads.length, 1);

  return (
    <AdminShell>
      <header
        className="relative overflow-hidden px-8 py-8"
        style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #14305C 55%, #1B3E75 100%)" }}
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
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg"
                style={{ backgroundColor: "rgba(245,166,35,0.18)" }}
              >
                <Sparkles size={14} style={{ color: "#F5A623" }} />
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Overview
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Dashboard
            </h1>
            <p className="text-sm text-blue-100/80 mt-1">Overview of your leads and activity</p>
          </div>
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-150 hover:brightness-105 active:scale-95"
            style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            View All Leads <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-8 py-7" style={{ backgroundColor: "#F7F8FA" }}>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            {error}
          </p>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {stats.map(({ label, sub, value, icon: Icon, color, bg }) => (
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

        {/* Trend + status breakdown */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={17} style={{ color: "#F5A623" }} />
                <h2 className="text-base font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
                  Leads This Week
                </h2>
              </div>
              <span className="text-xs text-gray-400">Last 7 days</span>
            </div>
            <div className="flex items-end justify-between gap-3 h-40">
              {trend.map((d) => {
                const heightPct = (d.count / maxTrend) * 100;
                const isToday = d.date.getTime() === new Date(new Date().setHours(0, 0, 0, 0)).getTime();
                return (
                  <div key={d.label + d.date.toISOString()} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-xs font-semibold" style={{ color: "#0B1F3A" }}>
                      {loading ? "" : d.count > 0 ? d.count : ""}
                    </span>
                    <div className="w-full flex items-end justify-center" style={{ height: "100%" }}>
                      <div
                        className="w-full max-w-9 rounded-t-lg transition-all duration-500 ease-out"
                        style={{
                          height: loading ? "4%" : `${Math.max(heightPct, 4)}%`,
                          background: isToday
                            ? "linear-gradient(180deg, #F5A623 0%, #D97706 100%)"
                            : "linear-gradient(180deg, #2E5FE8 0%, #1D4ED8 100%)",
                          opacity: isToday ? 1 : 0.85,
                        }}
                      />
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: isToday ? "#F5A623" : "#9CA3AF" }}
                    >
                      {d.label}
                    </span>
                  </div>
                );
              })}
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
                Breakdown reflects the most recent 100 leads across all sources.
              </p>
            </div>
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Inbox size={17} style={{ color: "#F5A623" }} />
              <h2 className="text-base font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
                Recent Leads
              </h2>
            </div>
            <Link
              href="/admin/leads"
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
                ) : recentLeads.length === 0 ? (
                  <tr>
                    <td className="px-6 py-8 text-center text-gray-400">No leads yet.</td>
                  </tr>
                ) : (
                  recentLeads.map((lead, idx) => {
                    const statusColor = STATUS_COLORS[lead.status] || STATUS_COLORS.new;
                    const avatar = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
                    return (
                      <tr
                        key={lead._id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: avatar.bg, color: avatar.text }}
                            >
                              {initials(lead.name)}
                            </div>
                            <Link
                              href={`/admin/leads/${lead._id}`}
                              className="font-semibold hover:underline"
                              style={{ color: "#0B1F3A" }}
                            >
                              {lead.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-gray-500">{lead.email}</td>
                        <td className="px-6 py-3.5 text-gray-500">
                          {lead.source === "appointment_booking" ? "Appointment" : "Contact Form"}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-gray-400 whitespace-nowrap text-right">
                          {new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
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
