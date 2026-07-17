import { Link } from "react-router-dom";
import { Container } from "../components/Container";

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-3 text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-ink-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Back home
      </Link>
    </Container>
  );
}
