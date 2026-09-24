"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Eye,
  EyeOff,
  Trash2,
  Package,
  Sparkles,
  Home,
  Building2,
  Clock,
  DollarSign,
} from "lucide-react";
import { apiFetch, Service, ServicesResponse } from "../../lib/api";
import AdminShell from "../../components/AdminShell";
import { VISIBILITY_COLORS, formatDuration, formatPrice } from "../constants";
import ServiceFormModal from "../ServiceFormModal";
import ServiceDetailsPanel from "../ServiceDetailsPanel";

const CATEGORY_TABS = ["All", "Residential", "Commercial"] as const;

const CATEGORY_ICON: Record<string, typeof Home> = {
  Residential: Home,
  Commercial: Building2,
};

const CATEGORY_ICON_COLORS: Record<string, { bg: string; text: string }> = {
  Residential: { bg: "#EFF6FF", text: "#2563EB" },
  Commercial: { bg: "#FFFBEB", text: "#D97706" },
};

export default function AdminCatalogPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [categoryTab, setCategoryTab] = useState<(typeof CATEGORY_TABS)[number]>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [detailsService, setDetailsService] = useState<Service | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (categoryTab !== "All") params.set("category", categoryTab);
      const res = await apiFetch(`/api/services/admin?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load services");
      const data: ServicesResponse = await res.json();
      setServices(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [query, categoryTab]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleToggleVisibility = async (service: Service) => {
    setActionError(null);
    setOpenMenuId(null);
    try {
      const nextVisibility = service.visibility === "visible" ? "hidden" : "visible";
      const res = await apiFetch(`/api/services/${service._id}`, {
        method: "PATCH",
        body: JSON.stringify({ visibility: nextVisibility }),
      });
      if (!res.ok) throw new Error("Failed to update visibility");
      fetchServices();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update visibility");
    }
  };

  const handleDelete = async (id: string) => {
    setActionError(null);
    try {
      const res = await apiFetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      setDeletingId(null);
      setDetailsService(null);
      fetchServices();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete service");
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
              Catalog
            </h1>
            <p className="text-sm text-blue-100/80 mt-1">{total} services</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingService(null);
              setModalMode("create");
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-150 hover:brightness-105 active:scale-95"
            style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            <Plus size={16} strokeWidth={2.5} /> Service
          </button>
        </div>
      </header>

      <main className="flex-1 px-8 py-7" style={{ backgroundColor: "#F7F8FA" }}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623]"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORY_TABS.map((tab) => {
              const active = categoryTab === tab;
              const iconColor = tab !== "All" ? CATEGORY_ICON_COLORS[tab] : null;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategoryTab(tab)}
                  className="px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-150 border"
                  style={
                    active
                      ? iconColor
                        ? { backgroundColor: iconColor.bg, color: iconColor.text, borderColor: iconColor.text + "33" }
                        : { backgroundColor: "#0B1F3A", color: "#ffffff", borderColor: "#0B1F3A" }
                      : { backgroundColor: "#ffffff", color: "#6B7280", borderColor: "#E5E7EB" }
                  }
                >
                  {tab}
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left" style={{ backgroundColor: "#F7F8FA" }}>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Service</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Category</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Duration</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Price</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Visibility</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <Package size={28} className="text-gray-300" />
                        No services found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  services.map((service) => {
                    const visColor = VISIBILITY_COLORS[service.visibility] || VISIBILITY_COLORS.visible;
                    const CategoryIcon = CATEGORY_ICON[service.category] || Package;
                    const categoryColor = CATEGORY_ICON_COLORS[service.category] || { bg: "#F3F4F6", text: "#6B7280" };
                    return (
                      <tr
                        key={service._id}
                        onClick={() => setDetailsService(service)}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: categoryColor.bg }}
                            >
                              <CategoryIcon size={16} style={{ color: categoryColor.text }} />
                            </div>
                            <span className="font-semibold" style={{ color: "#0B1F3A" }}>{service.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
                          >
                            {service.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={13} className="text-gray-400" />
                            {formatDuration(service.durationMinutes)}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-semibold whitespace-nowrap" style={{ color: "#0B1F3A" }}>
                          <span className="inline-flex items-center gap-1">
                            <DollarSign size={13} className="text-gray-400" />
                            {formatPrice(service.price).replace(/^\$/, "")}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{ backgroundColor: visColor.bg, color: visColor.text }}
                          >
                            {service.visibility}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setOpenMenuId(openMenuId === service._id ? null : service._id)}
                            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            aria-label="Actions"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openMenuId === service._id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                              <div className="absolute right-5 top-11 z-20 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-left">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingService(service);
                                    setModalMode("edit");
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Pencil size={14} /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleVisibility(service)}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  {service.visibility === "visible" ? (
                                    <>
                                      <EyeOff size={14} /> Hide
                                    </>
                                  ) : (
                                    <>
                                      <Eye size={14} /> Show
                                    </>
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeletingId(service._id);
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
      </main>

      {detailsService && (
        <ServiceDetailsPanel
          service={detailsService}
          onClose={() => setDetailsService(null)}
          onChanged={(updated) => {
            if (updated) setDetailsService(updated);
            fetchServices();
          }}
          onEdit={(service) => {
            setEditingService(service);
            setModalMode("edit");
            setDetailsService(null);
          }}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {modalMode && (
        <ServiceFormModal
          service={modalMode === "edit" ? editingService : null}
          onClose={() => setModalMode(null)}
          onSaved={() => {
            setModalMode(null);
            fetchServices();
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
              Delete Service?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently remove this service. This action cannot be undone.
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
