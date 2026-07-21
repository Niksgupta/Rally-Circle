import { Link } from "react-router-dom";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { ArrowRight, Shield, Users, Coffee, MapPin } from "lucide-react";
import { Container } from "../components/Container";

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleHeroPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 26;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
    heroRef.current.style.setProperty("--pointer-x", `${x}px`);
    heroRef.current.style.setProperty("--pointer-y", `${y}px`);
  };

  const resetHeroPointer = () => {
    heroRef.current?.style.setProperty("--pointer-x", "0px");
    heroRef.current?.style.setProperty("--pointer-y", "0px");
  };

  const heroStyle = {
    "--pointer-x": "0px",
    "--pointer-y": "0px",
  } as CSSProperties;

  return (
    <>
      <section
        ref={heroRef}
        onMouseMove={handleHeroPointer}
        onMouseLeave={resetHeroPointer}
        style={heroStyle}
        className="relative overflow-hidden bg-[#f4ede1] py-16 text-[#3d2b1f]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(138,92,61,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(77,44,22,0.08),transparent_18%)] mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-none absolute left-[18%] top-28 h-52 w-52 rounded-full border border-white/20 bg-white/5 shadow-[0_0_80px_rgba(255,255,255,0.18)] pulse-ring" />
          <div
            className="bg-circle left-[-2rem] top-10 h-40 w-40 bg-[#f2d7b1] blur-3xl animate-blob interactive-bg"
            style={{ transform: "translate(calc(var(--pointer-x)*0.7), calc(var(--pointer-y)*0.55))" }}
          />
          <div
            className="bg-circle right-[-2rem] top-20 h-56 w-56 bg-[#e8d7c4] blur-3xl animate-float interactive-bg"
            style={{ transform: "translate(calc(var(--pointer-x)*-0.6), calc(var(--pointer-y)*0.85))" }}
          />
          <div
            className="bg-circle left-1/2 top-16 h-24 w-24 bg-[#f7efe6] blur-2xl animate-blob interactive-bg"
            style={{ transform: "translate(calc(var(--pointer-x)*0.45), calc(var(--pointer-y)*-0.65))" }}
          />
          <div
            className="bg-circle left-[64%] top-12 h-16 w-16 bg-[#8a5c3d] opacity-10 animate-float interactive-bg"
            style={{ transform: "translate(calc(var(--pointer-x)*-0.25), calc(var(--pointer-y)*0.4))" }}
          />
        </div>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="chip bg-[#efe1d1] text-[#8a5c3d]">Rally Circle</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl fade-in-up">
              <span className="text-[#8a5c3d]">🏸 Badminton</span> hangout in Pune - 🤝 team pair, play, 🧋coffee ke saath.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5b4536] fade-in-up" style={{ animationDelay: "0.15s" }}>
              Register once, and we’ll pair you with new players for a match and a coffee after the game.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/register" className="btn-primary btn-animated">
                Book your slot
              </Link>
              <a href="#how-it-works" className="btn-outline btn-animated">
                How it works
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-[#e8d7c4] p-6 shadow-soft animate-float">
            <img
              className="h-96 w-full rounded-[1.5rem] object-cover"
              src={"/hero.jpeg"}
              alt="Badminton players in a social group"
            />
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a5c3d]">How it works</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Simple booking for social badminton.</h2>
            <p className="mt-4 text-base leading-8 text-[#5b4536]">
              Enter your details, choose your level, and join a friendly badminton team and grab a coffee.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature
              icon={<Users className="h-6 w-6 text-[#8a5c3d]" />}
              title="Meet new players"
              text="We pair you randomly so every game is social and fresh."
              className="fade-in-up"
            />
            <Feature
              icon={<Shield className="h-6 w-6 text-[#8a5c3d]" />}
              title="Badminton only"
              text="No football, no cricket. Just badminton and coffee."
              className="fade-in-up"
            />
            <Feature
              icon={<Coffee className="h-6 w-6 text-[#8a5c3d]" />}
              title="Coffee after play"
              text="A casual coffee session after the match keeps the community vibe strong."
              className="fade-in-up"
            />
          </div>
        </Container>
      </section>

      <section className="bg-[#efe3d6] py-16">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#3d2b1f]">What ₹349 includes</h2>
            <ul className="mt-6 space-y-4 text-[#5b4536]">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#8a5c3d] mt-1" />
                <span>Court slot at a trusted Pune venue</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#8a5c3d] mt-1" />
                <span>Team assignment with random players</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8a5c3d] mt-1">🏸</span>
                <span>Shuttle support and match setup</span>
              </li>
              <li className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-[#8a5c3d] mt-1" />
                <span>Coffee community after the game</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8a5c3d]">Quick register</p>
            <h3 className="mt-4 text-2xl font-semibold text-[#3d2b1f]">Register in under a minute</h3>
            <div className="mt-8 grid gap-4 text-[#5b4536]">
              <p>1. Enter your name, email, gender and level.</p>
              <p>2. Click the payment button and complete checkout.</p>
              <p>3. Join the WhatsApp community for match updates.</p>
            </div>
            <Link to="/register" className="btn-primary mt-8 inline-flex">
              Book ₹349
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a5c3d]">Ready to play</p>
          <h2 className="mt-4 text-3xl font-bold text-[#3d2b1f]">Join Rally Circle and make badminton social again.</h2>
          <div className="mt-8 inline-flex gap-3">
            <Link to="/register" className="btn-primary inline-flex items-center">
              Register now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <a
              href="https://chat.whatsapp.com/IZnygJh6gOC0KXxj6Ao3Yn"
              target="_blank"
              rel="noreferrer"
              className="btn-outline inline-flex items-center"
            >
              Join WhatsApp Community
               <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  text,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.75rem] border border-[#e4d5c4] bg-white p-6 shadow-sm ${className ?? ""}`}>
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3e5d5] text-[#8a5c3d]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#3d2b1f]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5b4536]">{text}</p>
    </div>
  );
}
