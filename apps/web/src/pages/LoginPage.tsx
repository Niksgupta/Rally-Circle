import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmail } from "@pp/shared";
import { Container } from "../components/Container";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { configured } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!configured) {
      setErr("Sign-in is disabled in demo mode.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await signInWithEmail(email, password);
      nav(loc.state?.from ?? "/events");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-md card p-8">
          <h1 className="text-2xl font-bold">Wapas aa gaye!</h1>
          <p className="mt-2 text-ink-600">Log in karo aur agla game lock karo.</p>

          {!configured && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <b>Demo mode:</b> sign-in is disabled until Firebase env vars are set. Copy{" "}
              <code>apps/web/.env.example</code> to <code>apps/web/.env.local</code> and fill in
              your Firebase project values.
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
                autoComplete="current-password"
                required
                minLength={6}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <button type="submit" className="btn-primary w-full" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-600">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-brand-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
