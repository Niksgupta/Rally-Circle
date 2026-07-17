import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getEvent, updateEvent, type SportEvent } from "@pp/shared";
import { Container } from "../../components/Container";
import { EventForm } from "../../components/EventForm";

export function AdminEventEditPage() {
  const { id = "" } = useParams();
  const nav = useNavigate();
  const [event, setEvent] = useState<SportEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center text-ink-500">Loading…</div>;
  if (!event)
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Link to="/admin" className="btn-outline mt-6 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to admin
        </Link>
      </Container>
    );

  return (
    <section className="py-8">
      <Container>
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-ink-600 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to admin
        </Link>
        <h1 className="text-3xl font-bold">Edit event</h1>
        <p className="mt-2 text-ink-600">Update details, then save.</p>
        <div className="card mt-6 p-6">
          <EventForm
            initial={event}
            submitLabel="Save changes"
            onSubmit={async (values) => {
              await updateEvent(event.id, values);
              nav("/admin");
            }}
          />
        </div>
      </Container>
    </section>
  );
}
