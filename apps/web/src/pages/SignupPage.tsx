import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmail } from "@pp/shared";
import { Container } from "../components/Container";
import { useAuth } from "../context/AuthContext";

export function SignupPage() {
  const { configured } = useAuth();
  const nav = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!configured) {
      setErr("Sign-up is disabled in demo mode.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await signUpWithEmail({ displayName, email, password });
      nav("/events");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not create account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-md card p-8">
          <h1 className="text-2xl font-bold">Squad me shamil ho jao</h1>
          <p className="mt-2 text-ink-600">
            Free membership. RSVP karo, khelo, naye log milo.
          </p>

          {!configured && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <b>Demo mode:</b> sign-up is disabled until Firebase env vars are set. Copy{" "}
              <code>apps/web/.env.example</code> to <code>apps/web/.env.local</code> and fill in
              your Firebase project values.
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="label" htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                className="input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-1 text-xs text-ink-500">At least 6 characters.</p>
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <button type="submit" className="btn-primary w-full" disabled={busy}>
              {busy ? "Creating account…" : "Create free account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-600">
            Already a member?{" "}
            <Link to="/login" className="font-semibold text-brand-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
