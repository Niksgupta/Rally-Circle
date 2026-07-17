import { useEffect, useMemo, useState } from "react";
import { listEvents, subscribeEvents, type Sport, type SportEvent } from "@pp/shared";
import { Container } from "../components/Container";
import { EventCard } from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import { MOCK_EVENTS } from "../lib/mock-events";
import { cn } from "../lib/cn";

const SPORT_FILTERS: { value: Sport | "all"; label: string }[] = [
  { value: "all", label: "All sports" },
  { value: "badminton", label: "Badminton" },
  { value: "football", label: "Football" },
  { value: "cricket", label: "Cricket" },
  { value: "tennis", label: "Tennis" },
  { value: "table-tennis", label: "Table Tennis" },
  { value: "running", label: "Running" },
];

export function EventsPage() {
  const { configured } = useAuth();
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Sport | "all">("all");

  useEffect(() => {
    if (!configured) {
      setEvents(MOCK_EVENTS);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeEvents((e) => {
      setEvents(e);
      setLoading(false);
    }, "upcoming");
    // Also do an initial fetch in case snapshot is delayed
    listEvents("upcoming").then((e) => {
      setEvents((prev) => (prev.length === 0 ? e : prev));
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => unsub();
  }, [configured]);

  const filtered = useMemo(
    () => (filter === "all" ? events : events.filter((e) => e.sport === filter)),
    [events, filter],
  );

  return (
    <section className="py-10">
      <Container>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Upcoming events</h1>
          <p className="mt-2 text-ink-600">Apna sport chuno. Spot lock karo. Weekend set.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {SPORT_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.value
                  ? "bg-brand-500 text-white"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-ink-500">Loading events…</p>
        ) : filtered.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-ink-700">No events match this filter yet.</p>
            <p className="mt-1 text-sm text-ink-500">Try another sport or check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
