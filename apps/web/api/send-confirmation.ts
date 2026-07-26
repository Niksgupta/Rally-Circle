
import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
 req: VercelRequest,
 res: VercelResponse,
) {
 if (req.method !== "POST") {
 return res.status(405).json({
 error: "Method Not Allowed",
 });
 }

 try {
 const {
 email,
 name,
 eventName,
 venue,
 date,
 fee,
 } = req.body;

 const response = await resend.emails.send({
 from: "Rally Circle <onboarding@resend.dev>",
 to: email,
 subject: "🏸 Your Rally Circle Booking is Confirmed!",
 html: `
 <div style="font-family:Arial;padding:30px;max-width:600px;margin:auto">
 
 <h2>🎉 Booking Confirmed</h2>

 <p>Hi <b>${name}</b>,</p>

 <p>Your slot has been <b>confirmed</b>.</p>

 <hr/>

 <p><b>🏸 Event:</b> ${eventName}</p>
 <p><b>📍 Venue:</b> ${venue}</p>
 <p><b>📅 Date:</b> ${date}</p>
 <p><b>💰 Fee:</b> ₹${fee}</p>

 <br/>

 <p>Please arrive 15 minutes before the event.</p>

 <p>
 Bring your racket, non-marking shoes and lots of energy! 🔥
 </p>

 <br/>

 <h3>See you on court! 🏸</h3>

 <p>Team Rally Circle</p>

 </div>
 `,
 });

 return res.status(200).json(response);
 } catch (error: any) {
 console.error(error);

 return res.status(500).json({
 error: error.message,
 });
 }
}

