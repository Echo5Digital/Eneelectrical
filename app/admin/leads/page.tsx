"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Users,
  Sparkles,
  CalendarDays,
  MessageSquareText,
} from "lucide-react";
import { apiFetch, getToken, Lead, LeadsResponse } from "../lib/api";
import AdminShell from "../components/AdminShell";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: "#EFF6FF", text: "#1D4ED8" },
  contacted: { bg: "#FEF3C7", text: "#B45309" },
  scheduled: { bg: "#EDE9FE", text: "#6D28D9" },
  won: { bg: "#DCFCE7", text: "#15803D" },
  lost: { bg: "#FEE2E2", text: "#B91C1C" },
};

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const SOURCE_FILTERS = [
  { value: "", label: "All Sources" },
  { value: "contact_form", label: "Contact Form" },
  { value: "appointment_booking", label: "Appointment Booking" },
];

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

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.push("/admin/login");
    }
  }, [router]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (query) params.set("q", query);
      if (statusFilter) params.set("status", statusFilter);
      if (sourceFilter) params.set("source", sourceFilter);

      const res = await apiFetch(`/api/leads?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load leads");
      const data: LeadsResponse = await res.json();
      setLeads(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [page, limit, query, statusFilter, sourceFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const summary = useMemo(() => {
    const newThisWeek = leads.filter((l) => new Date(l.createdAt).getTime() >= sevenDaysAgo).length;
    const won = leads.filter((l) => l.status === "won").length;
    const active = leads.filter((l) => l.status === "contacted" || l.status === "scheduled").length;
    return { newThisWeek, won, active };
  }, [leads, sevenDaysAgo]);

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
        <div className="relative flex items-center justify-between flex-wrap gap-6">
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
                Customer Pipeline
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Leads
            </h1>
            <p className="text-sm text-blue-100/80 mt-1">{total} total submissions</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <CalendarDays size={16} style={{ color: "#F5A623" }} />
              <div>
                <p className="text-sm font-bold text-white leading-none">{summary.newThisWeek}</p>
                <p className="text-[11px] text-blue-100/70 mt-0.5">New this week</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <Users size={16} style={{ color: "#F5A623" }} />
              <div>
                <p className="text-sm font-bold text-white leading-none">{summary.active}</p>
                <p className="text-[11px] text-blue-100/70 mt-0.5">Active leads</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-7" style={{ backgroundColor: "#F7F8FA" }}>
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623]"
            />
          </div>
          <select
            value={sourceFilter}
            onChange={(e) => {
              setPage(1);
              setSourceFilter(e.target.value);
            }}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623]"
          >
            {SOURCE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
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

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            {error}
          </p>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left" style={{ backgroundColor: "#F7F8FA" }}>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Name</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Contact</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Message</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Source</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide text-right">Received</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <Users size={28} className="text-gray-300" />
                        No leads found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead, idx) => {
                    const statusColor = STATUS_COLORS[lead.status] || STATUS_COLORS.new;
                    const avatar = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
                    return (
                      <tr
                        key={lead._id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/admin/leads/${lead._id}`)}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: avatar.bg, color: avatar.text }}
                            >
                              {initials(lead.name)}
                            </div>
                            <Link
                              href={`/admin/leads/${lead._id}`}
                              className="font-semibold hover:underline"
                              style={{ color: "#0B1F3A" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {lead.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Mail size={13} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate max-w-[160px]">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Phone size={13} className="text-gray-400 flex-shrink-0" /> {lead.phone}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500 max-w-[220px]">
                          {lead.message ? (
                            <div className="flex items-start gap-1.5">
                              <MessageSquareText size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
                              <span className="truncate">{lead.message}</span>
                            </div>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                            style={{ backgroundColor: "#F3F4F6", color: "#4B5563" }}
                          >
                            {lead.source === "appointment_booking" ? "Appointment" : "Contact Form"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap text-right">
                          {new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          <div className="text-xs text-gray-400">
                            {new Date(lead.createdAt).toLocaleTimeString(undefined, {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </div>
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
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
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
    </AdminShell>
  );
}
