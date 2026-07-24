import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";

interface BookingData {
  name: string;
  mobile: string;
  gender: string;
  level: string;
  createdAt: number;
  paymentStatus: "pending" | "success" | "failed";
  orderId?: string;
  transactionID?: string;
}

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0)
    const raw = window.sessionStorage.getItem("rallyCircleBooking");
    if (!raw) {
      navigate("/register", { replace: true });
      return;
    }
      const stored = location.state?.registration;
      console.log("stored", stored);
        setBooking(stored[0]);

  }, [navigate]);


  return (
    <section className="py-16 text-[#3d2b1f]">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#d8c7b4] bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.2em] text-[#8a5c3d]">Booking confirmed</p>
          <h1 className="mt-4 text-3xl font-bold">You’re booked, {booking?.name}!</h1>
          <p className="mt-3 text-[#5b4536]">
            We’ve received your payment details. Our team will verify it shortly. Meantime you can Click the link below to join our WhatsApp community for match details and updates.
          </p>

          <div className="mt-8 rounded-3xl bg-[#f7efe6] p-8 text-[#5b4536]">
            <p className="font-semibold">Next step</p>
            <a
              href="https://chat.whatsapp.com/IZnygJh6gOC0KXxj6Ao3Yn"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-2xl bg-[#8a5c3d] px-5 py-3 text-white shadow-sm hover:bg-[#6d472f]"
            >
              Join our WhatsApp community
            </a>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl bg-[#efe3d6] p-6 text-[#5b4536]">
            <p className="font-semibold">Bring this to the game</p>
            <ul className="space-y-2 pl-0 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-xl">👟</span>
                <span>Non marking shoes</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">🏸</span>
                <span>Badminton racket</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">💧</span>
                <span>Water bottle</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">🙂</span>
                <span>Positive attitude</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn-outline w-full text-center">
              Back to home
            </Link>
            <Link to="/register" className="btn-primary w-full text-center">
              Book another slot
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
