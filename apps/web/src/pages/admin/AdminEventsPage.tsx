import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { deleteEvent, listEvents, type SportEvent } from "@pp/shared";
import { Container } from "../../components/Container";
import { formatEventDate } from "../../lib/format";

export function AdminEventsPage() {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listEvents()
      .then(setEvents)
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not load events."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (ev: SportEvent) => {
    if (!confirm(`Delete "${ev.title}"? This cannot be undone.`)) return;
    try {
      await deleteEvent(ev.id);
      setEvents((cur) => cur.filter((e) => e.id !== ev.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed.");
    }
  };

  return (
    <section className="py-8">
      <Container>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Events admin</h1>
            <p className="mt-2 text-ink-600">Create, edit, cancel — sab yahin.</p>
          </div>
          <Link to="/admin/events/new" className="btn-primary">
            <Plus className="h-4 w-4" /> New event
          </Link>
        </div>

        {err && <p className="mb-4 text-sm text-red-600">{err}</p>}

        {loading ? (
          <p className="text-ink-500">Loading…</p>
        ) : events.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-ink-700">No events yet. Create your first one!</p>
            <Link to="/admin/events/new" className="btn-primary mt-4 inline-flex">
              <Plus className="h-4 w-4" /> New event
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Venue</th>
                  <th className="px-4 py-3">RSVPs</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t border-ink-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink-900">{e.title}</div>
                      <div className="text-xs capitalize text-ink-500">
                        {e.sport.replace("-", " ")}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-700">
                      {formatEventDate(e.startsAt, e.endsAt)}
                    </td>
                    <td className="px-4 py-3 text-ink-700">{e.venue}</td>
                    <td className="px-4 py-3 text-ink-700">
                      {e.enrolledCount}/{e.capacity}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "chip capitalize " +
                          (e.status === "upcoming"
                            ? "bg-green-100 text-green-800"
                            : e.status === "live"
                            ? "bg-blue-100 text-blue-800"
                            : e.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-ink-100 text-ink-700")
                        }
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/events/${e.id}/rsvps`}
                          className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                          title="View RSVPs"
                        >
                          <Users className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/admin/events/${e.id}/edit`}
                          className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(e)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </section>
  );
}
