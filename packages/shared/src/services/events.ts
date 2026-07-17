import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type QueryConstraint,
} from "firebase/firestore";
import { getDb } from "../firebase";
import type { EventStatus, SportEvent } from "../types";

const COL = "events";

export async function createEvent(input: Omit<SportEvent, "id" | "createdAt" | "enrolledCount">) {
  const db = getDb();
  const ref = await addDoc(collection(db, COL), {
    ...input,
    enrolledCount: 0,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateEvent(id: string, patch: Partial<SportEvent>) {
  await updateDoc(doc(getDb(), COL, id), patch);
}

export async function deleteEvent(id: string) {
  await deleteDoc(doc(getDb(), COL, id));
}

export async function getEvent(id: string): Promise<SportEvent | null> {
  const snap = await getDoc(doc(getDb(), COL, id));
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<SportEvent, "id">) }) : null;
}

export async function listEvents(status?: EventStatus): Promise<SportEvent[]> {
  const constraints: QueryConstraint[] = [orderBy("startsAt", "asc")];
  if (status) constraints.unshift(where("status", "==", status));
  const snap = await getDocs(query(collection(getDb(), COL), ...constraints));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SportEvent, "id">) }));
}

export function subscribeEvents(cb: (events: SportEvent[]) => void, status?: EventStatus) {
  const constraints: QueryConstraint[] = [orderBy("startsAt", "asc")];
  if (status) constraints.unshift(where("status", "==", status));
  return onSnapshot(query(collection(getDb(), COL), ...constraints), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SportEvent, "id">) })));
  });
}
