import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { loadRazorpayScript } from "../lib/razorpay";

type BookingData = {
  name: string;
  mobile: string;
  gender: string;
  level: string;
  createdAt: number;
  paymentStatus: "pending" | "success" | "failed";
  paymentId?: string;
  orderId?: string;
};

export function SignupPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [gender, setGender] = useState("male");
  const [level, setLevel] = useState("beginner");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^([6-9])\d{9}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit Indian mobile number");
      return;
    }

    setBusy(true);
    const bookingPayload: BookingData = {
      name,
      mobile,
      gender,
      level,
      createdAt: Date.now(),
      paymentStatus: "pending",
    };
    window.sessionStorage.setItem("rallyCircleBooking", JSON.stringify(bookingPayload));

    const orderResponse = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mobile, gender, level }),
    });

    const orderData = await orderResponse.json();
    if (!orderResponse.ok || !orderData.orderId) {
      setBusy(false);
      window.sessionStorage.setItem(
        "rallyCircleBooking",
        JSON.stringify({ ...bookingPayload, paymentStatus: "failed" }),
      );
      nav("/failure");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      setBusy(false);
      window.sessionStorage.setItem(
        "rallyCircleBooking",
        JSON.stringify({ ...bookingPayload, paymentStatus: "failed" }),
      );
      nav("/failure");
      return;
    }

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Rally Circle",
      description: "Badminton booking + coffee",
      image: "https://www.rallycircle.app/logo.png",
      order_id: orderData.orderId,
      prefill: {
        name,
        contact: mobile,
      },
      notes: {
        gender,
        level,
        product: "Rally Circle booking",
      },
      theme: {
        color: "#8a5c3d",
      },
      handler: function (response: any) {
        const successfulBooking: BookingData = {
          ...bookingPayload,
          paymentStatus: "success",
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        };
        window.sessionStorage.setItem("rallyCircleBooking", JSON.stringify(successfulBooking));
        nav("/success");
      },
      modal: {
        ondismiss: function () {
          const failedBooking: BookingData = {
            ...bookingPayload,
            paymentStatus: "failed",
          };
          window.sessionStorage.setItem("rallyCircleBooking", JSON.stringify(failedBooking));
          setBusy(false);
          nav("/failure");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function () {
      const failedBooking: BookingData = {
        ...bookingPayload,
        paymentStatus: "failed",
      };
      window.sessionStorage.setItem("rallyCircleBooking", JSON.stringify(failedBooking));
      nav("/failure");
    });

    paymentObject.open();
  };

  return (
    <section className="relative overflow-hidden py-16 text-[#3d2b1f]">
      <div className="bg-circle left-[-1rem] top-10 h-32 w-32 bg-[#f2d7b1] blur-3xl animate-float" />
      <div className="bg-circle right-[-1rem] bottom-20 h-44 w-44 bg-[#e8d7c4] blur-3xl animate-blob" />
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#d8c7b4] bg-white p-10 shadow-soft relative z-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8a5c3d]">Book your slot</p>
            <h1 className="mt-4 text-3xl font-bold">Register for badminton + coffee</h1>
            <p className="mt-3 text-[#5b4536]">
              Complete the form and pay ₹349. After payment, you’ll see the WhatsApp community link.
            </p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input"
                placeholder="Ananya Sharma"
              />
            </div>

            <div>
              <label className="label" htmlFor="mobile">
                Mobile number
              </label>
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-[#efe1d1] px-3 py-2 text-sm text-[#5b4536]">+91</div>
                <input
                  id="mobile"
                  inputMode="numeric"
                  value={mobile}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setMobile(v);
                    if (mobileError) setMobileError("");
                  }}
                  required
                  className="input flex-1"
                  placeholder="98765 43210"
                />
              </div>
              {mobileError ? <p className="mt-2 text-sm text-red-600">{mobileError}</p> : null}
              <p className="mt-2 text-sm text-[#5b4536]">We will use this number to share match updates and the WhatsApp group link after booking.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="label" htmlFor="level">
                  Level
                </label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="input"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary btn-animated w-full"
              disabled={busy || !name}
              title={name ? "Proceed to payment" : "Fill your name to continue"}
            >
              {busy ? "Redirecting to payment…" : "Book your slot @ just ₹349"}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-[#f7efe6] p-6 text-[#5b4536]">
            <p className="font-semibold">What happens next?</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• You’ll be sent to the payment page.</li>
              <li>• After payment, you’ll land on the confirmation page.</li>
              <li>• Join the WhatsApp community for final match details.</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
