import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvent, listUserRsvps, type RSVP, type SportEvent } from "@pp/shared";
import { Container } from "../components/Container";
import { EventCard } from "../components/EventCard";
import { useAuth } from "../context/AuthContext";

export function MyEventsPage() {
  const { user } = useAuth();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const r = await listUserRsvps(user.uid);
        if (cancelled) return;
        setRsvps(r);
        const es = await Promise.all(r.map((x) => getEvent(x.eventId)));
        if (cancelled) return;
        setEvents(es.filter((e): e is SportEvent => !!e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) return null;

  return (
    <section className="py-10">
      <Container>
        <h1 className="text-3xl font-bold">My events</h1>
        <p className="mt-2 text-ink-600">Games you've RSVPed to.</p>

        {loading ? (
          <p className="mt-8 text-ink-500">Loading…</p>
        ) : events.length === 0 ? (
          <div className="card mt-8 p-10 text-center">
            <p className="text-ink-700">You haven't RSVPed to anything yet.</p>
            <Link to="/events" className="btn-primary mt-4 inline-flex">
              Browse events
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => {
              const r = rsvps.find((x) => x.eventId === e.id);
              return (
                <div key={e.id} className="relative">
                  <EventCard event={e} />
                  {r && (
                    <span
                      className={
                        "absolute right-3 top-3 chip " +
                        (r.status === "going"
                          ? "bg-green-100 text-green-800"
                          : r.status === "waitlist"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-ink-100 text-ink-700")
                      }
                    >
                      {r.status === "going" ? "You're in" : r.status === "waitlist" ? "Waitlist" : "Cancelled"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
