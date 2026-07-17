import { AlertTriangle } from "lucide-react";

export function ConfigBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-900">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <strong>Demo mode:</strong> Firebase env vars are not set, so events shown are sample data
          and sign-in is disabled. Copy <code>apps/web/.env.example</code> to{" "}
          <code>apps/web/.env.local</code> and fill in your Firebase project values.
        </p>
      </div>
    </div>
  );
}
