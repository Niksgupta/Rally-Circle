import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#d8c7b4] bg-[#efe3d6] text-[#4a2f1f]">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-[#3d2b1f]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#8a5c3d] text-white">R</span>
            <span>Rally Circle</span>
          </div>
          <p className="mt-3 text-sm text-[#5b4536]">
            Badminton, random team pairing and coffee after the game. Simple, social, and easy to book.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#6f523f]">Navigate</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#4a2f1f]">
            <li><Link className="hover:text-[#8a5c3d]" to="/register">Register</Link></li>
            <li><Link className="hover:text-[#8a5c3d]" to="/">Home</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#6f523f]">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#4a2f1f]">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#8a5c3d]" /> Pune, Maharashtra
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#8a5c3d]" /> hello@rallycircle.in
            </li>
            <li className="inline-flex items-center gap-2">
              <Instagram className="h-4 w-4 text-[#8a5c3d]" /> @rallycircle.in
            </li>
            <li className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#8a5c3d]" />
              <a href="https://chat.whatsapp.com/IZnygJh6gOC0KXxj6Ao3Yn" target="_blank" rel="noreferrer" className="hover:text-[#8a5c3d]">
                Join our WhatsApp community
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-[#d8c7b4] py-4 text-center text-xs text-[#6f523f]">
        © {new Date().getFullYear()} Rally Circle. Book, play, coffee.
      </div>
    </footer>
  );
}
