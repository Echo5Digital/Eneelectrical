"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Wrench,
  Trash2,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { apiFetch, getToken, Lead } from "../../lib/api";

const STATUS_OPTIONS = ["new", "contacted", "scheduled", "won", "lost"];

export default function AdminLeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push("/admin/login");
      return;
    }

    apiFetch(`/api/leads/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lead not found");
        return res.json();
      })
      .then((data: Lead) => {
        setLead(data);
        setStatus(data.status);
        setNotes(data.notes || "");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load lead"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await apiFetch(`/api/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, notes }),
      });
      if (!res.ok) throw new Error("Failed to save changes");
      const updated: Lead = await res.json();
      setLead(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      router.push("/admin/leads");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete lead");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F8FA" }}>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F8FA" }}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/admin/leads" className="text-sm font-semibold" style={{ color: "#0B1F3A" }}>
            &larr; Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F8FA" }}>
      <header
        className="sticky top-0 z-10 flex items-center px-6 py-4"
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <Link
          href="/admin/leads"
          className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Leads
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {lead.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Submitted {new Date(lead.createdAt).toLocaleString()} via{" "}
              {lead.source === "appointment_booking" ? "Appointment Booking" : "Contact Form"}
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 size={15} /> {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lead details */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                  <a href={`mailto:${lead.email}`} className="text-sm font-medium hover:underline" style={{ color: "#0B1F3A" }}>
                    {lead.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                  <a href={`tel:${lead.phone}`} className="text-sm font-medium hover:underline" style={{ color: "#0B1F3A" }}>
                    {lead.phone}
                  </a>
                </div>
              </div>
              {lead.serviceRequested && (
                <div className="flex items-start gap-2.5">
                  <Wrench size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Service</p>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{lead.serviceRequested}</p>
                  </div>
                </div>
              )}
              {lead.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Address / ZIP</p>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{lead.address}</p>
                  </div>
                </div>
              )}
              {lead.preferredDate && (
                <div className="flex items-start gap-2.5">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Preferred Date</p>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{lead.preferredDate}</p>
                  </div>
                </div>
              )}
              {lead.preferredTime && (
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Preferred Time</p>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3A" }}>{lead.preferredTime}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Message</p>
              <p className="text-sm leading-relaxed" style={{ color: "#1A2530" }}>
                {lead.message}
              </p>
            </div>
          </div>

          {/* Status + notes panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5 h-fit">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#0B1F3A" }}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm capitalize outline-none focus:ring-2 focus:ring-[#F5A623]"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#0B1F3A" }}>
                Internal Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Add notes about this lead..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none resize-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>

            {saved && (
              <p className="flex items-center gap-1.5 text-sm text-green-600">
                <CheckCircle size={14} /> Saved
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:brightness-105 active:scale-95 disabled:opacity-60"
              style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              <Save size={15} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
