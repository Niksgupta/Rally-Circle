import { initFirebase, type FirebaseConfig } from "@pp/shared";

/**
 * Reads Vite env vars and initialises Firebase if a project id is present.
 * If env is not configured, the app runs in "demo mode" (mock events, no auth).
 */
export function bootstrapFirebase(): { configured: boolean } {
  const config: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  if (!config.projectId || !config.apiKey || !config.appId) {
    return { configured: false };
  }

  initFirebase(config);
  return { configured: true };
}
