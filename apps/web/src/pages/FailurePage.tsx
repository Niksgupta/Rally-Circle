import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";

interface BookingData {
  paymentStatus?: string;
}

export function FailurePage() {
  const navigate = useNavigate();
  const [bookingValid, setBookingValid] = useState(true);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("rallyCircleBooking");
    if (!raw) {
      navigate("/register", { replace: true });
      return;
    }
    try {
      const stored = JSON.parse(raw) as BookingData | null;
      if (stored?.paymentStatus !== "failed") {
        navigate("/register", { replace: true });
      }
    } catch {
      navigate("/register", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="py-16 text-[#3d2b1f]">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#d8c7b4] bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.2em] text-[#8a5c3d]">Payment failed</p>
          <h1 className="mt-4 text-3xl font-bold">Oops! Payment was not completed</h1>
          <p className="mt-3 text-[#5b4536]">
            The transaction did not complete successfully. Please try again using PhonePe, UPI, or another supported payment method.
          </p>

          <div className="mt-8 rounded-3xl bg-[#f7efe6] p-8 text-[#5b4536]">
            <p className="font-semibold">What to do next</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Check your UPI app for any pending payment prompts.</li>
              <li>• Retry booking with the same details.</li>
              <li>• Contact us if the issue persists.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="btn-primary w-full text-center">
              Try payment again
            </Link>
            <Link to="/" className="btn-outline w-full text-center">
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
