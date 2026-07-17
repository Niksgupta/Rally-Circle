import type { ReactNode } from "react";
import { Heart, ShieldCheck, HandHeart, Users, Coffee, Rocket } from "lucide-react";
import { Container } from "../components/Container";

export function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14">
        <Container>
          <span className="chip w-fit bg-brand-100 text-brand-700">Humari kahani</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-5xl">
            Pune ki sabse dost-yaar sports community.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-600">
            Recess ek chhote se WhatsApp group se shuru hua — Deccan mein har Sunday
            badminton khelne wale kuch dost. Aaj, hum har mahine 30+ events chalate hain — Baner ki
            turf se lekar Vetal Tekdi ke sunrise runs tak. Vision simple hai:{" "}
            <b>khel ho, log ho, chai ho.</b>
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <img
            className="rounded-3xl shadow-md"
            src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=60"
            alt="Community football match"
          />
          <div>
            <h2 className="text-3xl font-bold">Hum kya karte hain</h2>
            <p className="mt-4 text-ink-700">
              Pay-and-play sports events across Pune. Har session teen cheezon ke around banaya jaata hai:
            </p>
            <ul className="mt-6 space-y-4">
              <ListItem
                icon={<Users className="h-5 w-5 text-brand-600" />}
                title="Balanced teams"
                text="Skill ke hisaab se teams shuffle karte hain — match interesting rehta hai."
              />
              <ListItem
                icon={<ShieldCheck className="h-5 w-5 text-brand-600" />}
                title="Safe, vetted venues"
                text="Sirf achhi tarah maintained courts aur turfs — hum khud check karke aate hain."
              />
              <ListItem
                icon={<HandHeart className="h-5 w-5 text-brand-600" />}
                title="Judgement-free zone"
                text="Kabhi racket nahi pakda? Chill. Regulars aapke saath khelne mein khush honge."
              />
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-3xl bg-ink-50 p-10 md:p-14">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-brand-600" />
              <h2 className="text-2xl font-bold">Humari values</h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Value
                icon={<Rocket className="h-5 w-5 text-brand-600" />}
                title="Dil se khelo"
                text="Ego ghar chhod ke aao. Fun sabse pehle."
              />
              <Value
                icon={<Users className="h-5 w-5 text-brand-600" />}
                title="Sabka welcome"
                text="Beginner, pro, weekend warrior — sab yahaan ke hain."
              />
              <Value
                icon={<Coffee className="h-5 w-5 text-brand-600" />}
                title="Chai zaruri hai"
                text="Har game ke baad ek chai. That's the rule."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ListItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="flex gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100">{icon}</div>
      <div>
        <p className="font-semibold text-ink-900">{title}</p>
        <p className="text-sm text-ink-600">{text}</p>
      </div>
    </li>
  );
}

function Value({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div>
      <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-brand-100">{icon}</div>
      <p className="font-semibold text-ink-900">{title}</p>
      <p className="mt-1.5 text-sm text-ink-600">{text}</p>
    </div>
  );
}
