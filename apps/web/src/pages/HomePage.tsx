import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Trophy,
  Sparkles,
  Laptop2,
  Coffee,
  Zap,
  Quote,
  MessageCircleQuestion,
} from "lucide-react";
import { Container } from "../components/Container";
import { EventCard } from "../components/EventCard";
import { useEffect, useState, type ReactNode } from "react";
import { listEvents, type SportEvent } from "@pp/shared";
import { useAuth } from "../context/AuthContext";
import { MOCK_EVENTS } from "../lib/mock-events";

export function HomePage() {
  const { configured } = useAuth();
  const [events, setEvents] = useState<SportEvent[]>([]);

  useEffect(() => {
    if (!configured) {
      setEvents(MOCK_EVENTS.slice(0, 3));
      return;
    }
    listEvents("upcoming")
      .then((e) => setEvents(e.slice(0, 3)))
      .catch(() => setEvents([]));
  }, [configured]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="chip w-fit bg-brand-100 text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> It's your recess. Take it.
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-ink-900 md:text-6xl">
              Standup se Standoff.{" "}
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                Standoff se Smashdown.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-600">
              Recess is your weekend escape from the 9-to-9. Badminton, football, running —
              Pune ke IT parks se seedha turf, court aur tekdi tak. Bas ek weekend do, baaki hum sambhal lenge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/events" className="btn-primary">
                Slot book karo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/signup" className="btn-outline">
                Free me join karo
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              <Stat label="Members" value="1,200+" />
              <Stat label="Games / mo" value="30+" />
              <Stat label="Standups" value="Zero" />
            </div>
          </div>

          <div className="relative">
            <img
              className="w-full rounded-3xl object-cover shadow-lg"
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=60"
              alt="Log Pune mein khel rahe hain"
              loading="eager"
            />
            <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl bg-white p-4 shadow-lg md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">OOO on Saturday</p>
                  <p className="text-xs text-ink-500">Auto-reply set. Court booked.</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-6 hidden rotate-3 rounded-xl bg-ink-900 px-3 py-2 text-xs font-semibold text-white shadow-lg md:block">
              "Sprint" ka matlab actual dauda karo 🏃
            </div>
          </div>
        </Container>
      </section>

      {/* Corporate pain → sports antidote */}
      <section className="border-y border-ink-100 bg-ink-50 py-16">
        <Container>
          <div className="mb-12 max-w-2xl">
            <span className="chip bg-white text-brand-700">The great IT-park detox</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Kaam se ek chhoti si azaadi.</h2>
            <p className="mt-3 text-ink-600">
              Har corporate warrior deserves a plot twist on weekends. Yeh raha yours:
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SwapCard
              before="Monday standup"
              after="Sunday smashdown"
              note="Manager: 'Any blockers?' Aap: 'Sirf net.'"
            />
            <SwapCard
              before="Sprint planning"
              after="Actual sprinting"
              note="Retrospective bhi hoga — chai ke saath."
            />
            <SwapCard
              before="1:1 with manager"
              after="1:1 badminton match"
              note="Feedback loop lekin thoda fun."
            />
            <SwapCard
              before="P0 bug in prod"
              after="P0 smash on court"
              note="Hotfix karo, phir shot maaro."
            />
            <SwapCard
              before="Deadline pressure"
              after="Deadlift pressure"
              note="Same stress, better outcome."
            />
            <SwapCard
              before="OOO on email"
              after="OOO on turf"
              note="Auto-reply: 'Match mein hoon, ping mat karo.'"
            />
          </div>
        </Container>
      </section>

      {/* Value props */}
      <section className="py-16">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Bas aa jao. Baaki sab hum handle karenge.
            </h2>
            <p className="mt-3 text-ink-600">
              Venue, gear, teams, aur post-match chai — sab planned. Aapko sirf shoes aur energy laani hai.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Feature
              icon={<CalendarDays className="h-6 w-6 text-brand-600" />}
              title="Weekly events, sab jagah"
              text="Baner, Kothrud, Viman Nagar, Hinjewadi, Deccan — office se 15 min ki dooriyan."
            />
            <Feature
              icon={<Laptop2 className="h-6 w-6 text-brand-600" />}
              title="9-to-9 se breathing room"
              text="Weekday shaam ke slots bhi. Log-off, walk-in, play. Simple."
            />
            <Feature
              icon={<Trophy className="h-6 w-6 text-brand-600" />}
              title="Leagues & mini-tourneys"
              text="Monthly mini-leagues. Winners ko trophy, sabko chai."
            />
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-white pb-16">
        <Container>
          <div className="mb-10">
            <h2 className="text-3xl font-bold md:text-4xl">Log kya keh rahe hain</h2>
            <p className="mt-2 text-ink-600">Real Punekars. Real reviews. (Roughly.)</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Testimonial
              quote="Pehle Saturday ka plan sirf Netflix tha. Ab shoes ready rehte hain. Weekend finally feels like weekend."
              name="Rohan D."
              role="Backend engineer, Hinjewadi"
              avatar="https://i.pravatar.cc/80?img=12"
            />
            <Testimonial
              quote="Beginner thi, dari hui thi. Log itne sweet the ki agli hi Sunday phir aayi. Ab regular hoon."
              name="Priya S."
              role="Product manager, Baner"
              avatar="https://i.pravatar.cc/80?img=47"
            />
            <Testimonial
              quote="Standup mein team se jyada baat court par hoti hai. Half the office is here now, honestly."
              name="Kunal M."
              role="EM, Viman Nagar"
              avatar="https://i.pravatar.cc/80?img=32"
            />
          </div>
        </Container>
      </section>

      {/* Upcoming events */}
      <section className="pb-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Iss weekend kya khelein?</h2>
              <p className="mt-2 text-ink-600">Ek click me spot lock. Simple.</p>
            </div>
            <Link to="/events" className="btn-outline hidden sm:inline-flex">
              Sab dekho <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="text-ink-500">Abhi koi event nahi — jaldi wapas aana!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
          <div className="mt-8 sm:hidden">
            <Link to="/events" className="btn-outline w-full">
              Sab events dekho <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <Container>
          <div className="mb-8 flex items-center gap-3">
            <MessageCircleQuestion className="h-6 w-6 text-brand-600" />
            <h2 className="text-3xl font-bold md:text-4xl">Quick FAQs (no jargon)</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Faq
              q="Beginner hoon, allowed hai kya?"
              a="Bilkul. Half our regulars started as absolute beginners. We match teams by skill so games stay fun for everyone."
            />
            <Faq
              q="Gear nahi hai — problem?"
              a="Rackets, shuttles, footballs — sab provide karte hain. Bas sports shoes le aana (non-marking sole for indoor courts)."
            />
            <Faq
              q="Payment kaise hota hai?"
              a="RSVP ke baad UPI ya card se pay karo. Free events bhi bahut hote hain."
            />
            <Faq
              q="Cancel karna ho toh?"
              a="Game se 12 ghante pehle cancel karo — full refund. Uske baad slot waitlist ko chala jaata hai."
            />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="pb-20">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-ink-900 p-10 text-white md:p-14">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <span className="chip bg-white/10 text-white">
                  <Coffee className="h-3.5 w-3.5" /> Chai + snacks after every game
                </span>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Take your recess. Weekend banao. Monday bhulao.
                </h2>
                <p className="mt-3 text-ink-200">
                  Free member account banao. Pehla game 60 seconds mein RSVP. No commitments, no group WhatsApp spam.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link to="/signup" className="btn-primary">
                  Free account banao
                </Link>
                <Link
                  to="/events"
                  className="btn-outline border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Events dekho
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl font-extrabold text-ink-900">{value}</p>
      <p className="text-xs uppercase tracking-wide text-ink-500">{label}</p>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="card p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink-600">{text}</p>
    </div>
  );
}

function SwapCard({ before, after, note }: { before: string; after: string; note: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <span className="line-through">{before}</span>
        <span className="text-ink-300">→</span>
        <span className="font-semibold text-brand-600">{after}</span>
      </div>
      <p className="mt-3 text-sm text-ink-700">{note}</p>
    </div>
  );
}

function Testimonial({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <figure className="card flex h-full flex-col p-6">
      <Quote className="h-5 w-5 text-brand-500" />
      <blockquote className="mt-3 flex-1 text-ink-800">{quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
        <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-ink-900">{name}</p>
          <p className="text-xs text-ink-500">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="card group p-5 open:shadow-md">
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-ink-900">
        {q}
        <span className="text-brand-500 transition-transform group-open:rotate-45">＋</span>
      </summary>
      <p className="mt-3 text-sm text-ink-600">{a}</p>
    </details>
  );
}
