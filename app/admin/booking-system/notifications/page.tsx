"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, Check, Info } from "lucide-react";
import { apiFetch, NotificationTemplate, NotificationTemplatesResponse } from "../../lib/api";
import AdminShell from "../../components/AdminShell";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  approved: "Approved",
  pending: "Pending",
  cancelled: "Cancelled",
};

const STATUS_ORDER = ["new", "approved", "pending", "cancelled"];

const PLACEHOLDERS = [
  { token: "%customer_name%", desc: "Customer's full name" },
  { token: "%service_name%", desc: "Booked service" },
  { token: "%appointment_date%", desc: "Appointment date" },
  { token: "%appointment_time%", desc: "Appointment time slot" },
  { token: "%company_name%", desc: "Your company name" },
];

export default function AdminNotificationsPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("new");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/notification-templates");
      if (!res.ok) throw new Error("Failed to load notification templates");
      const data: NotificationTemplatesResponse = await res.json();
      setTemplates(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notification templates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const selectedTemplate = templates.find((t) => t.status === selectedStatus);

  useEffect(() => {
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      setBody(selectedTemplate.body);
      setSaveMessage(null);
    }
  }, [selectedTemplate]);

  const handleToggleEnabled = async (status: string, enabled: boolean) => {
    setError(null);
    try {
      const res = await apiFetch(`/api/notification-templates/${status}`, {
        method: "PATCH",
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) throw new Error("Failed to update template");
      fetchTemplates();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update template");
    }
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;
    setSaving(true);
    setError(null);
    setSaveMessage(null);
    try {
      const res = await apiFetch(`/api/notification-templates/${selectedStatus}`, {
        method: "PATCH",
        body: JSON.stringify({ subject, body }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save template");
      }
      setSaveMessage("Saved.");
      fetchTemplates();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard?.writeText(token).catch(() => {});
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <AdminShell>
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
            Notifications
          </h1>
          <p className="text-sm text-gray-500">Email templates sent to customers on appointment status changes</p>
        </div>
      </header>

      <main className="flex-1 px-8 py-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Status list */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 h-fit">
            {STATUS_ORDER.map((status) => {
              const template = templates.find((t) => t.status === status);
              const active = selectedStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-colors"
                  style={{ backgroundColor: active ? "#FFF8EC" : "transparent" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell size={15} style={{ color: active ? "#F5A623" : "#9CA3AF" }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: active ? "#0B1F3A" : "#374151" }}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (template) handleToggleEnabled(status, !template.enabled);
                    }}
                    className="relative w-9 h-5 rounded-full transition-colors flex-shrink-0"
                    style={{ backgroundColor: template?.enabled ? "#F5A623" : "#D1D5DB" }}
                    aria-label={`Toggle ${status} notification`}
                  >
                    <span
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                      style={{ left: template?.enabled ? "18px" : "2px" }}
                    />
                  </button>
                </button>
              );
            })}
          </div>

          {/* Editor */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {loading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : !selectedTemplate ? (
              <p className="text-sm text-gray-400">Template not found.</p>
            ) : (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                  {STATUS_LABELS[selectedStatus]}
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "#0B1F3A" }}>
                    Message Content
                  </label>
                  <textarea
                    rows={10}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] resize-y font-mono"
                  />
                </div>

                <div className="rounded-xl border border-gray-100 p-4" style={{ backgroundColor: "#F7F8FA" }}>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                    <Info size={13} /> Placeholders — click to copy
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PLACEHOLDERS.map((p) => (
                      <button
                        key={p.token}
                        type="button"
                        onClick={() => handleCopyToken(p.token)}
                        title={p.desc}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                        style={{ color: "#0B1F3A", fontFamily: "monospace" }}
                      >
                        {copiedToken === p.token ? <Check size={12} style={{ color: "#16A34A" }} /> : null}
                        {p.token}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-105 active:scale-95"
                    style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  {saveMessage && <span className="text-sm text-green-600 font-medium">{saveMessage}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </AdminShell>
  );
}
