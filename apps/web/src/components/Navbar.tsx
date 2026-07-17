import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { signOutUser } from "@pp/shared";
import { useAuth } from "../context/AuthContext";
import { Container } from "./Container";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const { user, profile, configured } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const isStaff = profile?.role === "organizer" || profile?.role === "admin";

  const handleSignOut = async () => {
    await signOutUser();
    nav("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "text-brand-600" : "text-ink-700 hover:text-brand-600",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-ink-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">R</span>
          <span className="text-lg">
            Re<span className="text-brand-600">cess</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/my-events" className={linkClass}>
              My Events
            </NavLink>
          )}
          {isStaff && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {configured && user ? (
            <>
              <Link to="/profile" className="btn-outline">
                {profile?.displayName || user.email?.split("@")[0] || "Profile"}
              </Link>
              <button className="btn-secondary" onClick={handleSignOut} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary">
                Join the squad
              </Link>
            </>
          )}
        </div>

        <button
          className="btn-secondary md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink-100 bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
            {user && (
              <NavLink to="/my-events" className={linkClass} onClick={() => setOpen(false)}>
                My Events
              </NavLink>
            )}
            {isStaff && (
              <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
                Admin
              </NavLink>
            )}
            <div className="mt-2 flex gap-2 border-t border-ink-100 pt-3">
              {configured && user ? (
                <>
                  <Link to="/profile" className="btn-outline flex-1" onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                  <button
                    className="btn-secondary"
                    onClick={async () => {
                      setOpen(false);
                      await handleSignOut();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline flex-1" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/signup" className="btn-primary flex-1" onClick={() => setOpen(false)}>
                    Join the squad
                  </Link>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
