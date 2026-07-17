import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Tag, IndianRupee } from "lucide-react";
import { getEvent, getUserRsvpForEvent, type RSVP, type SportEvent } from "@pp/shared";
import { Container } from "../components/Container";
import { SportBadge } from "../components/SportBadge";
import { RsvpButton } from "../components/RsvpButton";
import { useAuth } from "../context/AuthContext";
import { MOCK_EVENTS } from "../lib/mock-events";
import { formatEventDate } from "../lib/format";

export function EventDetailPage() {
  const { id = "" } = useParams();
  const { user, configured } = useAuth();
  const [event, setEvent] = useState<SportEvent | null>(null);
  const [rsvp, setRsvp] = useState<RSVP | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      let e: SportEvent | null = null;
      if (configured) {
        try {
          e = await getEvent(id);
        } catch {
          e = null;
        }
      }
      if (!e) e = MOCK_EVENTS.find((m) => m.id === id) ?? null;
      if (cancelled) return;
      setEvent(e);

      if (configured && user && e) {
        try {
          setRsvp(await getUserRsvpForEvent(e.id, user.uid));
        } catch {
          setRsvp(null);
        }
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [id, configured, user]);

  if (loading) return <div className="p-10 text-center text-ink-500">Loading event…</div>;

  if (!event) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Link to="/events" className="btn-outline mt-6 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to events
        </Link>
      </Container>
    );
  }

  const spotsLeft = Math.max(event.capacity - event.enrolledCount, 0);

  return (
    <section className="py-8">
      <Container>
        <Link to="/events" className="mb-6 inline-flex items-center gap-2 text-sm text-ink-600 hover:text-brand-600">
          <ArrowLeft className="h-4 w-4" /> Back to events
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl bg-ink-100">
              {event.coverImage ? (
                <img src={event.coverImage} alt={event.title} className="aspect-[16/9] w-full object-cover" />
              ) : (
                <div className="grid aspect-[16/9] w-full place-items-center bg-gradient-to-br from-brand-100 to-brand-300 text-6xl">
                  🏟️
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <SportBadge sport={event.sport} />
              {event.skillLevel && <span className="chip capitalize">{event.skillLevel}</span>}
              {event.tags?.map((t) => (
                <span key={t} className="chip">
                  <Tag className="h-3 w-3" /> {t}
                </span>
              ))}
            </div>

            <h1 className="mt-4 text-3xl font-bold md:text-4xl">{event.title}</h1>

            <div className="mt-6 space-y-2 text-ink-700">
              <p className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-500" />
                {formatEventDate(event.startsAt, event.endsAt)}
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span>
                  {event.venue}
                  {event.address ? <span className="text-ink-500"> · {event.address}</span> : null}
                </span>
              </p>
              <p className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-500" />
                {event.enrolledCount}/{event.capacity} joined · {spotsLeft} spots left
              </p>
            </div>

            <div className="mt-8 border-t border-ink-100 pt-6">
              <h2 className="text-lg font-semibold">About this event</h2>
              <p className="mt-3 whitespace-pre-line text-ink-700">{event.description}</p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <p className="text-sm text-ink-500">Price</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink-900">
                    <IndianRupee className="mb-1 mr-0.5 inline h-5 w-5 text-brand-500" />
                    {event.price ? event.price : "Free"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-ink-500">Spots left</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink-900">{spotsLeft}</p>
                </div>
              </div>

              <RsvpButton event={event} rsvp={rsvp} onChange={setRsvp} />

              <p className="mt-4 text-xs text-ink-500">
                By RSVPing you agree to show up on time and follow venue rules. Refunds up to 12h before start.
              </p>
            </div>

            <div className="card mt-4 p-6 text-sm text-ink-600">
              <p className="font-semibold text-ink-900">What to bring</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Sports shoes with non-marking soles</li>
                <li>Water bottle & sweat towel</li>
                <li>Personal gear (loaners available if needed)</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
