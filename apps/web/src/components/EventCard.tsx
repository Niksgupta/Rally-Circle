import { Link } from "react-router-dom";
import { MapPin, Users, Calendar } from "lucide-react";
import type { SportEvent } from "@pp/shared";
import { SportBadge } from "./SportBadge";
import { formatEventDate, inr } from "../lib/format";

export function EventCard({ event }: { event: SportEvent }) {
  const spotsLeft = Math.max(event.capacity - event.enrolledCount, 0);
  const isFull = spotsLeft === 0;

  return (
    <Link
      to={`/events/${event.id}`}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-100">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-300 text-4xl">
            🏟️
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <SportBadge sport={event.sport} />
        </div>
        {isFull && (
          <span className="absolute right-3 top-3 chip bg-ink-900/80 text-white">Waitlist only</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-ink-900">{event.title}</h3>
        <div className="flex flex-col gap-1.5 text-sm text-ink-600">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand-500" />
            {formatEventDate(event.startsAt, event.endsAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-brand-500" />
            {event.venue}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-brand-500" />
            {event.enrolledCount}/{event.capacity} joined
            {!isFull && <span className="text-ink-400">· {spotsLeft} left</span>}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-3">
          <span className="text-sm font-semibold text-ink-900">{inr(event.price)}</span>
          <span className="text-xs font-medium text-brand-600 group-hover:underline">
            View & RSVP →
          </span>
        </div>
      </div>
    </Link>
  );
}
