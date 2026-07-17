import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getDb } from "../firebase";
import type { UserProfile } from "../types";

export async function signUpWithEmail(params: {
  email: string;
  password: string;
  displayName: string;
}): Promise<UserProfile> {
  const auth = getFirebaseAuth();
  const cred = await createUserWithEmailAndPassword(auth, params.email, params.password);
  await updateProfile(cred.user, { displayName: params.displayName });

  const profile: UserProfile = {
    uid: cred.user.uid,
    displayName: params.displayName,
    email: params.email,
    role: "member",
    createdAt: Date.now(),
  };
  await setDoc(doc(getDb(), "users", cred.user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });
  return profile;
}

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOutUser() {
  await signOut(getFirebaseAuth());
}

export function subscribeAuth(cb: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), cb);
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(getDb(), "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function updateUserProfile(uid: string, patch: Partial<UserProfile>) {
  await setDoc(doc(getDb(), "users", uid), patch, { merge: true });
}
