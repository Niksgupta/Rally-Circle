import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { getDb } from "../firebase";
import type { RSVP, UserProfile } from "../types";

const RSVP_COL = "rsvps";
const EVENT_COL = "events";

const rsvpId = (eventId: string, uid: string) => `${eventId}_${uid}`;

/**
 * Atomically enroll the user in an event, respecting capacity.
 * Returns the resulting RSVP status ('going' or 'waitlist').
 */
export async function enrollInEvent(eventId: string, user: UserProfile): Promise<"going" | "waitlist"> {
  const db = getDb();
  const eventRef = doc(db, EVENT_COL, eventId);
  const rsvpRef = doc(db, RSVP_COL, rsvpId(eventId, user.uid));

  return await runTransaction(db, async (tx) => {
    const eventSnap = await tx.get(eventRef);
    if (!eventSnap.exists()) throw new Error("Event not found");
    const data = eventSnap.data() as { capacity: number; enrolledCount: number };
    const status: "going" | "waitlist" = data.enrolledCount < data.capacity ? "going" : "waitlist";

    tx.set(rsvpRef, {
      id: rsvpId(eventId, user.uid),
      eventId,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL ?? null,
      status,
      paymentStatus: "unpaid",
      createdAt: serverTimestamp(),
    });
    if (status === "going") {
      tx.update(eventRef, { enrolledCount: increment(1) });
    }
    return status;
  });
}

export async function cancelRsvp(eventId: string, uid: string) {
  const db = getDb();
  const rsvpRef = doc(db, RSVP_COL, rsvpId(eventId, uid));
  const eventRef = doc(db, EVENT_COL, eventId);
  const snap = await getDoc(rsvpRef);
  if (!snap.exists()) return;
  const rsvp = snap.data() as RSVP;
  await deleteDoc(rsvpRef);
  if (rsvp.status === "going") {
    await runTransaction(db, async (tx) => {
      tx.update(eventRef, { enrolledCount: increment(-1) });
    });
  }
}

export async function getUserRsvpForEvent(eventId: string, uid: string): Promise<RSVP | null> {
  const snap = await getDoc(doc(getDb(), RSVP_COL, rsvpId(eventId, uid)));
  return snap.exists() ? (snap.data() as RSVP) : null;
}

export async function listUserRsvps(uid: string): Promise<RSVP[]> {
  const snap = await getDocs(query(collection(getDb(), RSVP_COL), where("uid", "==", uid)));
  return snap.docs.map((d) => d.data() as RSVP);
}

export async function listEventRsvps(eventId: string): Promise<RSVP[]> {
  const snap = await getDocs(query(collection(getDb(), RSVP_COL), where("eventId", "==", eventId)));
  return snap.docs.map((d) => d.data() as RSVP);
}

// Convenience helper used by the RSVP button
export async function markPaid(eventId: string, uid: string) {
  await setDoc(
    doc(getDb(), RSVP_COL, rsvpId(eventId, uid)),
    { paymentStatus: "paid" },
    { merge: true },
  );
}
