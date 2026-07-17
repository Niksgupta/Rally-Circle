import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-ink-50">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-ink-900">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">R</span>
            <span>Recess</span>
          </div>
          <p className="mt-3 text-sm text-ink-600">
            Your recess from the 9-to-9. Aa jao, khel lo, chai peelo. Deadlines yahaan nahi aati.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link className="hover:text-brand-600" to="/events">Upcoming events</Link></li>
            <li><Link className="hover:text-brand-600" to="/about">About us</Link></li>
            <li><Link className="hover:text-brand-600" to="/signup">Become a member</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-500" /> Pune, Maharashtra
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-500" /> hello@recess.club
            </li>
            <li className="inline-flex items-center gap-2">
              <Instagram className="h-4 w-4 text-brand-500" /> @recess.club
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-ink-100 py-4 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} Recess. Take your break. Khelo. Milo. Chill karo.
      </div>
    </footer>
  );
}
