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

export interface Booking {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceCategory: "Residential" | "Commercial";
  serviceType: string;
  date: string;
  timeSlot: string;
  zipCode: string;
  notes: string;
  status: "approved" | "pending" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface BookingsResponse {
  items: Booking[];
  total: number;
  page: number;
  limit: number;
}

export interface BookingStats {
  range: { start: string; end: string };
  totalAppointments: number;
  customers: number;
  statusCounts: Record<string, number>;
  upcoming: Booking[];
}

export interface Employee {
  _id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  visibility: "visible" | "hidden";
  availability: "available" | "away";
  services: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeesResponse {
  items: Employee[];
  total: number;
}

export interface Service {
  _id: string;
  name: string;
  category: "Residential" | "Commercial";
  durationMinutes: number;
  price: number;
  description: string;
  visibility: "visible" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  items: Service[];
  total: number;
}

export interface NotificationTemplate {
  _id: string;
  status: "approved" | "pending" | "cancelled";
  subject: string;
  body: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationTemplatesResponse {
  items: NotificationTemplate[];
}
