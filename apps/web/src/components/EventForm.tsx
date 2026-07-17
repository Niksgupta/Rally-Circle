import { useState, type FormEvent } from "react";
import type { Sport, SkillLevel, SportEvent, EventStatus } from "@pp/shared";

const SPORTS: Sport[] = [
  "badminton",
  "football",
  "cricket",
  "tennis",
  "table-tennis",
  "volleyball",
  "running",
  "yoga",
  "other",
];
const LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced", "pro"];
const STATUSES: EventStatus[] = ["upcoming", "live", "completed", "cancelled"];

type EventFormValues = Omit<SportEvent, "id" | "createdAt" | "enrolledCount">;

function toLocalDatetimeValue(ms?: number): string {
  if (!ms) return "";
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  initial,
  submitLabel = "Save event",
  onSubmit,
}: {
  initial?: Partial<SportEvent>;
  submitLabel?: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [sport, setSport] = useState<Sport>((initial?.sport as Sport) ?? "badminton");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [venue, setVenue] = useState(initial?.venue ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [startsAt, setStartsAt] = useState(toLocalDatetimeValue(initial?.startsAt));
  const [endsAt, setEndsAt] = useState(toLocalDatetimeValue(initial?.endsAt));
  const [capacity, setCapacity] = useState<number>(initial?.capacity ?? 12);
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [skillLevel, setSkillLevel] = useState<SkillLevel | "">(initial?.skillLevel ?? "");
  const [status, setStatus] = useState<EventStatus>(initial?.status ?? "upcoming");
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(", "));
  const [perksText, setPerksText] = useState((initial?.perks ?? []).join("\n"));

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);

    const startMs = new Date(startsAt).getTime();
    const endMs = new Date(endsAt).getTime();
    if (!startsAt || !endsAt || Number.isNaN(startMs) || Number.isNaN(endMs)) {
      setErr("Please pick valid start and end times.");
      return;
    }
    if (endMs <= startMs) {
      setErr("End time must be after start time.");
      return;
    }
    if (capacity < 1) {
      setErr("Capacity must be at least 1.");
      return;
    }

    const values: EventFormValues = {
      title: title.trim(),
      sport,
      description: description.trim(),
      coverImage: coverImage.trim() || undefined,
      venue: venue.trim(),
      address: address.trim() || undefined,
      startsAt: startMs,
      endsAt: endMs,
      capacity,
      price,
      currency: "INR",
      skillLevel: (skillLevel || undefined) as SkillLevel | undefined,
      status,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      perks: perksText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    setBusy(true);
    try {
      await onSubmit(values);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handle} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label className="label">Sport</label>
          <select className="input capitalize" value={sport} onChange={(e) => setSport(e.target.value as Sport)}>
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Skill level</label>
          <select
            className="input capitalize"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as SkillLevel | "")}
          >
            <option value="">— any —</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Starts at</label>
          <input
            className="input"
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">Ends at</label>
          <input
            className="input"
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">Venue</label>
          <input className="input" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        </div>

        <div>
          <label className="label">Address</label>
          <input
            className="input"
            value={address}
            placeholder="Bhandarkar Rd, Deccan"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Capacity</label>
          <input
            className="input"
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value || "0", 10))}
            required
          />
        </div>

        <div>
          <label className="label">Price (INR, 0 = free)</label>
          <input
            className="input"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value || "0", 10))}
            required
          />
        </div>

        <div>
          <label className="label">Status</label>
          <select
            className="input capitalize"
            value={status}
            onChange={(e) => setStatus(e.target.value as EventStatus)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="label">Cover image URL</label>
          <input
            className="input"
            value={coverImage}
            placeholder="https://…"
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Tags (comma-separated)</label>
          <input
            className="input"
            value={tagsText}
            placeholder="indoor, doubles, weekend"
            onChange={(e) => setTagsText(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Perks (one per line)</label>
          <textarea
            className="input min-h-[100px]"
            value={perksText}
            placeholder={"Filter coffee + masala chai\nPost-game snacks\nLoaner rackets & shuttles"}
            onChange={(e) => setPerksText(e.target.value)}
          />
          <p className="mt-1 text-xs text-ink-500">
            These show up under "What's included" on the event page.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="input min-h-[160px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="flex gap-3">
        <button className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
