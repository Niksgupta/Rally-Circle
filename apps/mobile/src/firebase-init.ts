import Constants from "expo-constants";
import { initFirebase, type FirebaseConfig } from "@pp/shared";

export function bootstrapFirebase(): { configured: boolean } {
  const cfg = (Constants.expoConfig?.extra?.firebase ?? {}) as Partial<FirebaseConfig>;
  const config: FirebaseConfig = {
    apiKey: cfg.apiKey ?? "",
    authDomain: cfg.authDomain ?? "",
    projectId: cfg.projectId ?? "",
    storageBucket: cfg.storageBucket ?? "",
    messagingSenderId: cfg.messagingSenderId ?? "",
    appId: cfg.appId ?? "",
    measurementId: cfg.measurementId,
  };
  if (!config.projectId || !config.apiKey || !config.appId) {
    return { configured: false };
  }
  initFirebase(config);
  return { configured: true };
}
