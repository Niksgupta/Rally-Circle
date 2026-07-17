import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Only renders children if the signed-in user has role "organizer" or "admin".
 * Anyone else gets bounced to login (or a friendly "not allowed" screen).
 */
export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, profile, loading, configured } = useAuth();
  const loc = useLocation();

  if (!configured) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Admin is disabled in demo mode</h1>
        <p className="mt-3 text-ink-600">
          Set your Firebase env vars in <code>apps/web/.env.local</code> and grant your user
          the <code>admin</code> role in the Firestore console.
        </p>
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center text-ink-500">Loading…</div>;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;

  const role = profile?.role;
  if (role !== "organizer" && role !== "admin") {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="mt-3 text-ink-600">
          This area is for event organisers only. If you should have access, ask an admin to
          promote your account (or set your user document's <code>role</code> field to
          <code> "admin"</code> in the Firestore console).
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
