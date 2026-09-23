"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  LogOut,
  ChevronLeft,
  ChevronDown,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  UserCog,
  Package,
  Bell,
} from "lucide-react";
import { clearToken, getToken } from "../lib/api";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
];

const BOOKING_SYSTEM_GROUP = {
  label: "Booking System",
  icon: CalendarClock,
  basePath: "/admin/booking-system",
  items: [
    { label: "Dashboard", href: "/admin/booking-system/dashboard", icon: LayoutDashboard },
    { label: "Calendar", href: "/admin/booking-system/calendar", icon: CalendarDays },
    { label: "Bookings", href: "/admin/booking-system/bookings", icon: ClipboardList },
    { label: "Employee", href: "/admin/booking-system/employee", icon: UserCog },
    { label: "Catalog", href: "/admin/booking-system/catalog", icon: Package },
    { label: "Notifications", href: "/admin/booking-system/notifications", icon: Bell },
  ],
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const bookingGroupActive = pathname?.startsWith(BOOKING_SYSTEM_GROUP.basePath) ?? false;
  const [bookingGroupOpen, setBookingGroupOpen] = useState(bookingGroupActive);

  useEffect(() => {
    if (bookingGroupActive) setBookingGroupOpen(true);
  }, [bookingGroupActive]);

  useEffect(() => {
    if (!getToken()) {
      router.push("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/admin/login");
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F7F8FA" }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col flex-shrink-0 transition-all duration-200 ${
          collapsed ? "w-20" : "w-64"
        }`}
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ backgroundColor: "#F5A623" }}
          >
            <Image
              src="/favicon (2).png"
              alt=""
              width={30}
              height={30}
              className="w-7 h-7 object-contain"
              aria-hidden="true"
            />
          </div>
          {!collapsed && (
            <span
              className="text-sm font-bold text-white leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              ENE Electrical
              <span className="block text-[11px] font-medium text-white/50 tracking-wide">
                Admin
              </span>
            </span>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
                style={{
                  backgroundColor: active ? "rgba(245,166,35,0.14)" : "transparent",
                  color: active ? "#F5A623" : "#CBD8E6",
                }}
              >
                <Icon size={18} strokeWidth={2} className="flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}

          {/* Booking System group */}
          <div className="mt-1">
            <button
              type="button"
              onClick={() => {
                if (collapsed) {
                  router.push(BOOKING_SYSTEM_GROUP.items[0].href);
                  return;
                }
                setBookingGroupOpen((o) => !o);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
              style={{
                backgroundColor: bookingGroupActive ? "rgba(245,166,35,0.14)" : "transparent",
                color: bookingGroupActive ? "#F5A623" : "#CBD8E6",
              }}
              aria-expanded={bookingGroupOpen}
            >
              <BOOKING_SYSTEM_GROUP.icon size={18} strokeWidth={2} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{BOOKING_SYSTEM_GROUP.label}</span>
                  <ChevronDown
                    size={15}
                    className={`flex-shrink-0 transition-transform duration-150 ${
                      bookingGroupOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>

            {!collapsed && bookingGroupOpen && (
              <div className="mt-1 ml-4 pl-3 border-l border-white/10 flex flex-col gap-1">
                {BOOKING_SYSTEM_GROUP.items.map(({ label, href, icon: Icon }) => {
                  const active = pathname === href || pathname?.startsWith(href + "/");
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150"
                      style={{
                        backgroundColor: active ? "rgba(245,166,35,0.14)" : "transparent",
                        color: active ? "#F5A623" : "#CBD8E6",
                      }}
                    >
                      <Icon size={15} strokeWidth={2} className="flex-shrink-0" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-colors duration-150"
          >
            <LogOut size={18} strokeWidth={2} className="flex-shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-150"
          >
            <ChevronLeft
              size={18}
              strokeWidth={2}
              className={`flex-shrink-0 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
