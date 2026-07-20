import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "./Container";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/register", label: "Register" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "text-[#8a5c3d]" : "text-[#4a2f1f] hover:text-[#8a5c3d]",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8c7b4] bg-[#f7efe6]/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-extrabold text-[#3d2b1f]">
          <img src="/logo.jpeg" alt="Rally Circle" className="h-14 w-14 rounded-2xl object-cover" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg">
              Rally <span className="text-[#8a5c3d]">Circle</span>
            </span>
            <span className="text-xs text-[#7a5a44]">Play. Chill. Connect.</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/register" className="btn-primary">
            Book a slot
          </Link>
        </div>

        <button
          className="btn-secondary md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-[#d8c7b4] bg-[#f7efe6] md:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/register"
              className="btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              Book a slot
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
