import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth();
  const loc = useLocation();

  if (!configured) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Sign-in is disabled in demo mode</h1>
        <p className="mt-3 text-ink-600">
          Set your Firebase env vars in <code>apps/web/.env.local</code> to enable member accounts.
        </p>
      </div>
    );
  }
  if (loading) {
    return <div className="p-10 text-center text-ink-500">Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  }
  return <>{children}</>;
}
