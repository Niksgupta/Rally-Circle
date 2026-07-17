import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { getEvent, listEventRsvps, type RSVP, type SportEvent } from "@pp/shared";
import { Container } from "../../components/Container";
import { formatEventDate } from "../../lib/format";

export function AdminEventRsvpsPage() {
  const { id = "" } = useParams();
  const [event, setEvent] = useState<SportEvent | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getEvent(id), listEventRsvps(id)])
      .then(([e, r]) => {
        setEvent(e);
        setRsvps(r);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const exportCsv = () => {
    const header = "Name,Status,Payment,Joined at\n";
    const rows = rsvps
      .map(
        (r) =>
          `"${r.displayName.replace(/"/g, '""')}",${r.status},${r.paymentStatus ?? ""},${new Date(
            r.createdAt,
          ).toISOString()}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event?.title ?? "event"}-rsvps.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-10 text-center text-ink-500">Loading…</div>;
  if (!event)
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Link to="/admin" className="btn-outline mt-6 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </Container>
    );

  const going = rsvps.filter((r) => r.status === "going");
  const waitlist = rsvps.filter((r) => r.status === "waitlist");

  return (
    <section className="py-8">
      <Container>
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-ink-600 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to admin
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="mt-1 text-ink-600">
              {formatEventDate(event.startsAt, event.endsAt)} · {event.venue}
            </p>
            <p className="mt-1 text-sm text-ink-500">
              {going.length} going · {waitlist.length} waitlisted · capacity {event.capacity}
            </p>
          </div>
          <button className="btn-outline" onClick={exportCsv} disabled={rsvps.length === 0}>
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>

        <div className="mt-8 card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Attendee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-ink-500">
                    No RSVPs yet.
                  </td>
                </tr>
              ) : (
                rsvps.map((r) => (
                  <tr key={r.id} className="border-t border-ink-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {r.photoURL ? (
                          <img src={r.photoURL} alt="" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">
                            {r.displayName.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-ink-900">{r.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "chip capitalize " +
                          (r.status === "going"
                            ? "bg-green-100 text-green-800"
                            : r.status === "waitlist"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-ink-100 text-ink-700")
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize text-ink-700">
                      {r.paymentStatus ?? "unpaid"}
                    </td>
                    <td className="px-4 py-3 text-ink-500">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
