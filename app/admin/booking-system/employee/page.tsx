"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { apiFetch, Employee, EmployeesResponse } from "../../lib/api";
import AdminShell from "../../components/AdminShell";
import { VISIBILITY_COLORS, AVAILABILITY_COLORS } from "../constants";
import EmployeeFormModal from "../EmployeeFormModal";
import EmployeeDetailsPanel from "../EmployeeDetailsPanel";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdminEmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [detailsEmployee, setDetailsEmployee] = useState<Employee | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      const res = await apiFetch(`/api/employees?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load employees");
      const data: EmployeesResponse = await res.json();
      setEmployees(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id: string) => {
    setActionError(null);
    try {
      const res = await apiFetch(`/api/employees/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete employee");
      setDeletingId(null);
      setDetailsEmployee(null);
      fetchEmployees();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete employee");
    }
  };

  return (
    <AdminShell>
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}>
            Employee
          </h1>
          <p className="text-sm text-gray-500">{total} team members</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingEmployee(null);
            setModalMode("create");
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-150 hover:brightness-105 active:scale-95"
          style={{ backgroundColor: "#F5A623", color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
        >
          <Plus size={16} strokeWidth={2.5} /> Employee
        </button>
      </header>

      <main className="flex-1 px-8 py-6">
        <div className="mb-5">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, email, or phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623]"
            />
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
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Name</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Visibility</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Availability</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Phone</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Email</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400">No employees found.</td>
                  </tr>
                ) : (
                  employees.map((employee) => {
                    const visColor = VISIBILITY_COLORS[employee.visibility] || VISIBILITY_COLORS.visible;
                    const availColor = AVAILABILITY_COLORS[employee.availability] || AVAILABILITY_COLORS.available;
                    return (
                      <tr
                        key={employee._id}
                        onClick={() => setDetailsEmployee(employee)}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 overflow-hidden"
                              style={{ backgroundColor: "#FFF8EC", color: "#0B1F3A" }}
                            >
                              {employee.photoUrl ? (
                                <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
                              ) : (
                                initials(employee.name)
                              )}
                            </div>
                            <span className="font-semibold" style={{ color: "#0B1F3A" }}>{employee.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{ backgroundColor: visColor.bg, color: visColor.text }}
                          >
                            {employee.visibility}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{ backgroundColor: availColor.bg, color: availColor.text }}
                          >
                            {employee.availability}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{employee.phone}</td>
                        <td className="px-5 py-4 text-gray-600">{employee.email}</td>
                        <td className="px-5 py-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setOpenMenuId(openMenuId === employee._id ? null : employee._id)}
                            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            aria-label="Actions"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openMenuId === employee._id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                              <div className="absolute right-5 top-11 z-20 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-left">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingEmployee(employee);
                                    setModalMode("edit");
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Pencil size={14} /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeletingId(employee._id);
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

      {detailsEmployee && (
        <EmployeeDetailsPanel
          employee={detailsEmployee}
          onClose={() => setDetailsEmployee(null)}
          onChanged={(updated) => {
            if (updated) setDetailsEmployee(updated);
            fetchEmployees();
          }}
          onEdit={(employee) => {
            setEditingEmployee(employee);
            setModalMode("edit");
            setDetailsEmployee(null);
          }}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {modalMode && (
        <EmployeeFormModal
          employee={modalMode === "edit" ? editingEmployee : null}
          onClose={() => setModalMode(null)}
          onSaved={() => {
            setModalMode(null);
            fetchEmployees();
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
              Delete Employee?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently remove this employee. This action cannot be undone.
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
