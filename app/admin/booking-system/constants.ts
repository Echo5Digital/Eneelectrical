export const TIME_SLOTS = [
  "Morning (8am – 11am)",
  "Midday (11am – 2pm)",
  "Afternoon (2pm – 5pm)",
  "Flexible / Any Time",
];

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: "#DBEAFE", text: "#1D4ED8" },
  approved: { bg: "#DCFCE7", text: "#15803D" },
  pending: { bg: "#FEF3C7", text: "#B45309" },
  cancelled: { bg: "#FEE2E2", text: "#B91C1C" },
};

export const VISIBILITY_COLORS: Record<string, { bg: string; text: string }> = {
  visible: { bg: "#DCFCE7", text: "#15803D" },
  hidden: { bg: "#F3F4F6", text: "#6B7280" },
};

export const AVAILABILITY_COLORS: Record<string, { bg: string; text: string }> = {
  available: { bg: "#EDE9FE", text: "#6D28D9" },
  away: { bg: "#F3E8FF", text: "#9333EA" },
};

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}min`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}min`;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// Booking dates are stored as UTC-midnight date-only values (the actual
// appointment time lives in timeSlot). Reading them with local-timezone
// getters shifts the displayed day for anyone west of UTC, so every display
// of a booking date must go through a UTC-based Date to stay stable
// regardless of the viewer's timezone.
export function utcDateAsLocal(dateStr: string): Date {
  const d = new Date(dateStr);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function formatBookingDate(
  dateStr: string,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
): string {
  return utcDateAsLocal(dateStr).toLocaleDateString(undefined, options);
}
