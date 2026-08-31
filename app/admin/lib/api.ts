const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("admin_token");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    throw new Error("Session expired. Please log in again.");
  }

  return res;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: "contact_form" | "appointment_booking";
  serviceRequested: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  status: "new" | "contacted" | "scheduled" | "won" | "lost";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsResponse {
  items: Lead[];
  total: number;
  page: number;
  limit: number;
}
