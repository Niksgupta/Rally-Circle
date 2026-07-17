import { useEffect, useState, type FormEvent } from "react";
import {
  updateUserProfile,
  type Sport,
  type SkillLevel,
  type UserProfile,
} from "@pp/shared";
import { Container } from "../components/Container";
import { useAuth } from "../context/AuthContext";

const SPORTS: Sport[] = [
  "badminton",
  "football",
  "cricket",
  "tennis",
  "table-tennis",
  "volleyball",
  "running",
  "yoga",
];
const LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced", "pro"];

export function ProfilePage() {
  const { user, profile } = useAuth();
  const [form, setForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (profile) setForm(profile);
    else if (user) {
      setForm({
        uid: user.uid,
        displayName: user.displayName ?? "",
        email: user.email ?? "",
      });
    }
  }, [profile, user]);

  const toggleSport = (s: Sport) => {
    setForm((f) => {
      const cur = new Set(f.favoriteSports ?? []);
      cur.has(s) ? cur.delete(s) : cur.add(s);
      return { ...f, favoriteSports: Array.from(cur) };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMsg(null);
    try {
      await updateUserProfile(user.uid, {
        displayName: form.displayName ?? "",
        phone: form.phone,
        city: form.city,
        skillLevel: form.skillLevel,
        favoriteSports: form.favoriteSports,
        bio: form.bio,
      });
      setMsg("Profile saved.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <section className="py-10">
      <Container>
        <h1 className="text-3xl font-bold">Your profile</h1>
        <p className="mt-2 text-ink-600">Help us match you to the right games.</p>

        <form onSubmit={onSubmit} className="mt-8 grid max-w-2xl gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                value={form.displayName ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input bg-ink-50" value={form.email ?? ""} disabled />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                className="input"
                inputMode="tel"
                value={form.phone ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="label">City / Area</label>
              <input
                className="input"
                value={form.city ?? ""}
                placeholder="Baner, Kothrud, …"
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              />
            </div>
            <div>
              <label className="label">Skill level</label>
              <select
                className="input"
                value={form.skillLevel ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, skillLevel: (e.target.value || undefined) as SkillLevel }))
                }
              >
                <option value="">—</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l} className="capitalize">
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Favourite sports</label>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((s) => {
                const active = (form.favoriteSports ?? []).includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSport(s)}
                    className={
                      "rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors " +
                      (active
                        ? "bg-brand-500 text-white"
                        : "bg-ink-100 text-ink-700 hover:bg-ink-200")
                    }
                  >
                    {s.replace("-", " ")}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="label">Bio</label>
            <textarea
              className="input min-h-[100px]"
              value={form.bio ?? ""}
              placeholder="Tell others a little about yourself…"
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </div>

          {msg && <p className="text-sm text-brand-700">{msg}</p>}

          <div>
            <button className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
