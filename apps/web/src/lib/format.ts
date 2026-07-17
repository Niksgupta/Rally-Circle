import { format, formatDistanceToNowStrict, isSameDay } from "date-fns";

export function formatEventDate(startsAt: number, endsAt?: number) {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;
  const dayStr = format(start, "EEE, d MMM");
  const startTime = format(start, "h:mm a");
  if (!end) return `${dayStr} · ${startTime}`;
  const endTime = format(end, "h:mm a");
  return isSameDay(start, end)
    ? `${dayStr} · ${startTime} – ${endTime}`
    : `${dayStr} ${startTime} → ${format(end, "d MMM h:mm a")}`;
}

export function fromNow(ts: number) {
  return formatDistanceToNowStrict(new Date(ts), { addSuffix: true });
}

export function inr(amount: number) {
  if (!amount) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
