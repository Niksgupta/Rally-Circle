import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;
let _configured = false;

/**
 * Initialize Firebase once with a config object supplied by the host app
 * (web reads from Vite env, mobile reads from Expo constants).
 */
export function initFirebase(config: FirebaseConfig): FirebaseApp {
  if (_app) return _app;
  _app = getApps()[0] ?? initializeApp(config);
  _auth = getAuth(_app);
  _db = getFirestore(_app);
  _storage = getStorage(_app);
  _configured = true;
  return _app;
}

export function isFirebaseConfigured(): boolean {
  return _configured;
}

export function getFirebaseApp(): FirebaseApp {
  if (!_app) throw new Error("Firebase not initialised. Call initFirebase(config) first.");
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) throw new Error("Firebase not initialised. Call initFirebase(config) first.");
  return _auth;
}

export function getDb(): Firestore {
  if (!_db) throw new Error("Firebase not initialised. Call initFirebase(config) first.");
  return _db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) throw new Error("Firebase not initialised. Call initFirebase(config) first.");
  return _storage;
}
