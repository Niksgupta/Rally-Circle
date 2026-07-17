import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enrollInEvent, cancelRsvp, type RSVP, type SportEvent, type UserProfile } from "@pp/shared";
import { useAuth } from "../context/AuthContext";

export function RsvpButton({
  event,
  rsvp,
  onChange,
}: {
  event: SportEvent;
  rsvp: RSVP | null;
  onChange: (next: RSVP | null) => void;
}) {
  const { user, profile, configured } = useAuth();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!configured) {
    return (
      <button className="btn-primary w-full" disabled title="Enable Firebase to allow RSVPs">
        RSVP disabled in demo mode
      </button>
    );
  }

  if (!user) {
    return (
      <button className="btn-primary w-full" onClick={() => nav("/login", { state: { from: `/events/${event.id}` } })}>
        Log in to RSVP
      </button>
    );
  }

  const isGoing = rsvp?.status === "going" || rsvp?.status === "waitlist";
  const isFull = event.enrolledCount >= event.capacity;

  const handleEnroll = async () => {
    setBusy(true);
    setErr(null);
    try {
      const p: UserProfile = profile ?? {
        uid: user.uid,
        displayName: user.displayName ?? user.email?.split("@")[0] ?? "Member",
        email: user.email ?? "",
        photoURL: user.photoURL ?? undefined,
        role: "member",
      };
      const status = await enrollInEvent(event.id, p);
      onChange({
        id: `${event.id}_${user.uid}`,
        eventId: event.id,
        uid: user.uid,
        displayName: p.displayName,
        photoURL: p.photoURL,
        status,
        paymentStatus: "unpaid",
        createdAt: Date.now(),
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not RSVP.");
    } finally {
      setBusy(false);
    }
  };

  const handleCancel = async () => {
    setBusy(true);
    setErr(null);
    try {
      await cancelRsvp(event.id, user.uid);
      onChange(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not cancel.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      {isGoing ? (
        <button className="btn-outline w-full" disabled={busy} onClick={handleCancel}>
          {busy ? "Cancelling…" : `You're ${rsvp?.status === "waitlist" ? "on waitlist" : "in"} — cancel RSVP`}
        </button>
      ) : (
        <button className="btn-primary w-full" disabled={busy} onClick={handleEnroll}>
          {busy ? "Reserving…" : isFull ? "Join waitlist" : "RSVP now"}
        </button>
      )}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
