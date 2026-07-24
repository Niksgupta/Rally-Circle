import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { supabase } from "../lib/supabase";

type BookingData = {
  name: string;
  mobile: string;
  gender: string;
  level: string;
  createdAt: number;
  paymentStatus: "pending" | "confirmed" | "rejected" | "waitlist";
  orderId?: string;
  transactionID?: string;
};

export function SignupPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [gender, setGender] = useState("male");
  const [level, setLevel] = useState("beginner");
  const [busy, setBusy] = useState(false);
  const [isProceedToPay, setIsProceedToPay] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^([6-9])\d{9}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit Indian mobile number");
      return;
    }
    setIsProceedToPay(true);
    setBusy(true);
    const bookingPayload: BookingData = {
      name,
      mobile,
      gender,
      level,
      createdAt: Date.now(),
      // Demo deploy: skip external payment provider and treat booking as confirmed.
      paymentStatus: "pending",
    };

    // Persist the booking locally so Success/Failure pages can read it.
    window.sessionStorage.setItem(
      "rallyCircleBooking",
      JSON.stringify(bookingPayload),
    );
  };

  const handlePaymentSubmit = async () => {
    // Validate UTR
    if (!/^\d{12}$/.test(transactionID)) {
      alert("Please enter a valid 12-digit UTR number.");
      return;
    }
    setLoading(true);
    try {
      // 1. Get active event
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "open");
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("No active event found. Please try again later.");
      }
      const event = data[0];
      // 2. Check if registrations are full
      const { count, error: countError } = await supabase
        .from("registrations")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("event_id", event.id)
        .eq("payment_status", "confirmed");

      if (countError) throw countError;

      if ((count ?? 0) >= event.capacity) {
        alert("Sorry! Registrations are full.");
        return;
      }

      // 3. Check duplicate mobile
      const { data: existingMobile, error: mobileError } = await supabase
        .from("registrations")
        .select("id")
        .eq("mobile", mobile)
        .eq("event_id", event.id)
        .maybeSingle();

      if (mobileError) throw mobileError;

      if (existingMobile) {
        alert("This mobile number is already registered.");
        return;
      }

      // 4. Check duplicate UTR
      const { data: existingUTR, error: utrError } = await supabase
        .from("registrations")
        .select("id")
        .eq("utr", transactionID)
        .maybeSingle();

      if (utrError) throw utrError;

      if (existingUTR) {
        alert("This UTR has already been submitted.");
        return;
      }

      // 5. Save registration
      const { data: insertedRegistrationData, error: insertError } =
        await supabase
          .from("registrations")
          .insert({
            event_id: event.id,
            name,
            mobile,
            gender,
            level,
            utr: transactionID,
            payment_status: "pending",
            created_at: new Date().toISOString(),
          })
          .select();

      console.log(insertedRegistrationData, "inserted data");
      if (insertError) {
        throw insertError;
      }

      window.sessionStorage.setItem(
        "rallyCircleBooking",
        JSON.stringify(insertedRegistrationData),
      );
      setTimeout(
        () =>
          nav("/success", {
            state: {
              registration: insertedRegistrationData,
            },
          }),
        300,
      );
    } catch (error: any) {
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 useEffect(()=>{
 window.scrollTo(0, 0)
  },[nav])
  return (
    <section className="relative overflow-hidden py-16 text-[#3d2b1f]">
      <div className="bg-circle left-[-1rem] top-10 h-32 w-32 bg-[#f2d7b1] blur-3xl animate-float" />
      <div className="bg-circle right-[-1rem] bottom-20 h-44 w-44 bg-[#e8d7c4] blur-3xl animate-blob" />
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#d8c7b4] bg-white p-10 shadow-soft relative z-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8a5c3d]">
              Book your slot
            </p>
            <h1 className="mt-4 text-3xl font-bold">
              Register for badminton + coffee
            </h1>
            <p className="mt-3 text-[#5b4536]">
              Complete the form and pay ₹349. After payment, you’ll see the
              WhatsApp community link.
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
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="label" htmlFor="mobile">
                Mobile number
              </label>
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-[#efe1d1] px-3 py-2 text-sm text-[#5b4536]">
                  +91
                </div>
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
                  placeholder="Enter your 10-digit mobile number"
                />
              </div>
              {mobileError ? (
                <p className="mt-2 text-sm text-red-600">{mobileError}</p>
              ) : null}
              <p className="mt-2 text-sm text-[#5b4536]">
                We will use this number to share match updates and the WhatsApp
                group link after booking.
              </p>
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
              {busy ? "Redirected to payment…" : "Proceed to Payment ₹349"}
            </button>
          </form>
          {isProceedToPay && (
            <>
              {" "}
              <div>
                <div>
                  <label className="label" htmlFor="name">
                    Scan Below QR Code to book your slot
                  </label>
                  <img
                    src="/QRCode.jpeg"
                    alt="QRCode"
                    className=" h-35 w-35 rounded-2xl object-cover"
                  />
                </div>
                <br></br>
                UPI ID : 7733997488@ybl
                <br></br>
                <br></br>
                <div>
                  <label className="label" htmlFor="mobile">
                    If you have paid, Please enter Transaction ID to confirm
                    your booking
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="transactionId"
                      inputMode="numeric"
                      value={transactionID}
                      onChange={(e) => {
                        const v = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                        setTransactionID(v);
                      }}
                      required
                      className="input flex-1"
                      placeholder="643649836492"
                    />
                    {/* {mobileError ? <p className="mt-2 text-sm text-red-600">{mobileError}</p> : null} */}
                    {/* <p className="mt-2 text-sm text-[#5b4536]">We will use this number to share match updates and the WhatsApp group link after booking.</p> */}
                  </div>
                  <br></br>
                  {transactionID && (
                    <>
                      {" "}
                      <button
                        type="button"
                        className="btn-primary btn-animated w-full"
                        disabled={transactionID.length !== 12}
                        title={"I've Paid"}
                        onClick={handlePaymentSubmit}
                      >
                        {loading ? "Submitting" : "I Have Paid"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
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
