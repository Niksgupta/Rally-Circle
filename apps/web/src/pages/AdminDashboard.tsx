import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { StatsCard } from "../components/admin/StatsCard";
import { RegistrationTable } from "../components/admin/RegistrationTable";
import {sendConfirmationEmail} from "../services/emailService";
export interface Registration {
 id: string;
 name: string;
 mobile: string;
 gender: string;
 level: string;
 utr: string;
 payment_status: "pending" | "confirmed" | "rejected";
 created_at: string;
}

export default function AdminDashboard() {
 const [registrations, setRegistrations] = useState<Registration[]>([]);
 const [loading, setLoading] = useState(true);
 const [filter, setFilter] = useState("all");

 useEffect(() => {
 fetchRegistrations();
 }, []);

 async function fetchRegistrations() {
 setLoading(true);

 const { data, error } = await supabase
 .from("registrations")
 .select("*")
 .order("created_at", { ascending: false });

 if (error) {
 alert(error.message);
 } else {
 setRegistrations(data || []);
 }

 setLoading(false);
 }
async function updateStatus(
 id: string,
 status: "confirmed" | "rejected"
) {
 const ok = window.confirm(
 `Are you sure you want to ${status} this registration?`
 );

 if (!ok) return;

 // Fetch registration details
 const { data: registration, error: registrationError } = await supabase
 .from("registrations")
 .select("*")
 .eq("id", id)
 .single();
console.log(registration, "registration details")
 if (registrationError) {
 alert(registrationError.message);
 return;
 }

 // Update payment status
 const { error } = await supabase
 .from("registrations")
 .update({
 payment_status: status,
 })
 .eq("id", id);

 if (error) {
 alert(error.message);
 return;
 }

 // Send email only if confirmed
 if (status === "confirmed") {
 const { data: event, error: eventError } = await supabase
 .from("events")
 .select("*")
 .eq("id", registration.event_id)
 .single();
console.log(event, "eventtt????")
 if (!eventError && event && registration.email) {
    console.log("inside")
 const sent = await sendConfirmationEmail({
 toEmail: registration.email,
 toName: registration.name,
 eventName: event.name,
 venue: event.venue,
 date: event.event_date,
 fee: event.fee,
 });

 console.log(sent, "sent or not ?")
 if (sent) {
 alert("✅ Registration confirmed and confirmation email sent.");
 } else {
 alert(
 "⚠️ Registration confirmed, but the email could not be sent."
 );
 }
 }
 }

 fetchRegistrations();
}



 const filteredData = useMemo(() => {
 if (filter === "all") return registrations;

 return registrations.filter(
 (r) => r.payment_status === filter
 );
 }, [registrations, filter]);

 const pendingCount = registrations.filter(
 (r) => r.payment_status === "pending"
 ).length;

 const confirmedCount = registrations.filter(
 (r) => r.payment_status === "confirmed"
 ).length;

 const rejectedCount = registrations.filter(
 (r) => r.payment_status === "rejected"
 ).length;

 return (
 <div className="min-h-screen bg-gray-100 p-8">

 <div className="mx-auto max-w-7xl">

 <div className="flex items-center justify-between">

 <div>
 <h1 className="text-3xl font-bold">
 Rally Circle Admin
 </h1>

 <p className="text-gray-500 mt-1">
 Manage registrations
 </p>
 </div>

 <button
 onClick= {async () => {
 await supabase.auth.signOut();
 window.location.href = "/admin";
 }}
 className="rounded-lg bg-red-500 px-4 py-2 text-white"
 >
 Logout
 </button>

 </div>

 <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">

 <StatsCard
 title="Total"
 value={registrations.length}
 color="bg-blue-500"
 />

 <StatsCard
 title="Pending"
 value={pendingCount}
 color="bg-yellow-500"
 />

 <StatsCard
 title="Confirmed"
 value={confirmedCount}
 color="bg-green-500"
 />

 <StatsCard
 title="Rejected"
 value={rejectedCount}
 color="bg-red-500"
 />

 </div>

 <div className="mt-8 flex gap-3">

 <button
 onClick={() => setFilter("all")}
 className={`rounded-lg px-4 py-2 ${
 filter === "all"
 ? "bg-black text-white"
 : "bg-white"
 }`}
 >
 All
 </button>

 <button
 onClick={() => setFilter("pending")}
 className={`rounded-lg px-4 py-2 ${
 filter === "pending"
 ? "bg-yellow-500 text-white"
 : "bg-white"
 }`}
 >
 Pending
 </button>

 <button
 onClick={() => setFilter("confirmed")}
 className={`rounded-lg px-4 py-2 ${
 filter === "confirmed"
 ? "bg-green-600 text-white"
 : "bg-white"
 }`}
 >
 Confirmed
 </button>

 <button
 onClick={() => setFilter("rejected")}
 className={`rounded-lg px-4 py-2 ${
 filter === "rejected"
 ? "bg-red-600 text-white"
 : "bg-white"
 }`}
 >
 Rejected
 </button>

 </div>

 <div className="mt-8">

 <RegistrationTable
 registrations={filteredData}
 loading={loading}
 onConfirm={(id) => updateStatus(id, "confirmed")}
 onReject={(id) => updateStatus(id, "rejected")}
 />

 </div>

 </div>

 </div>
 );
}

