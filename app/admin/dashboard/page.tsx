"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { apiFetch, Lead, LeadsResponse } from "../lib/api";
import AdminShell from "../components/AdminShell";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: "#EFF6FF", text: "#1D4ED8" },
  contacted: { bg: "#FEF3C7", text: "#B45309" },
  scheduled: { bg: "#EDE9FE", text: "#6D28D9" },
  won: { bg: "#DCFCE7", text: "#15803D" },
  lost: { bg: "#FEE2E2", text: "#B91C1C" },
};

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

  const stats = [
    { label: "Total Leads", sub: "All time submissions", value: total, icon: Users, color: "#2563EB", bg: "#EFF6FF" },
    { label: "New Leads", sub: "Last 7 days", value: newLast7Days, icon: Calendar, color: "#16A34A", bg: "#F0FDF4" },
    { label: "In Progress", sub: "Active leads", value: inProgress, icon: Clock, color: "#D97706", bg: "#FFFBEB" },
    { label: "Converted", sub: "Won leads", value: converted, icon: CheckCircle2, color: "#7C3AED", bg: "#F5F3FF" },
  ];

  const recentLeads = leads.slice(0, 5);

  return (
    <AdminShell>
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">Overview of your leads and activity</p>
        </div>
      </header>

      <main className="flex-1 px-8 py-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            {error}
          </p>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map(({ label, sub, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
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

        {/* Recent leads */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
              Recent Leads
            </h2>
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
                  recentLeads.map((lead) => {
                    const statusColor = STATUS_COLORS[lead.status] || STATUS_COLORS.new;
                    return (
                      <tr key={lead._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <td className="px-6 py-3.5">
                          <Link
                            href={`/admin/leads/${lead._id}`}
                            className="font-semibold hover:underline"
                            style={{ color: "#0B1F3A" }}
                          >
                            {lead.name}
                          </Link>
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
