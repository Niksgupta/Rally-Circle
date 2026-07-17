import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createEvent } from "@pp/shared";
import { Container } from "../../components/Container";
import { EventForm } from "../../components/EventForm";

export function AdminEventNewPage() {
  const nav = useNavigate();
  return (
    <section className="py-8">
      <Container>
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-ink-600 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to admin
        </Link>
        <h1 className="text-3xl font-bold">Create event</h1>
        <p className="mt-2 text-ink-600">Fill this in and hit save.</p>
        <div className="card mt-6 p-6">
          <EventForm
            submitLabel="Publish event"
            onSubmit={async (values) => {
              await createEvent(values);
              nav("/admin");
            }}
          />
        </div>
      </Container>
    </section>
  );
}
