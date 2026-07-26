import emailjs from "@emailjs/browser";

const SERVICE_ID = 'service_t7w3y9d';
const TEMPLATE_ID = 'template_6in9stj';
const PUBLIC_KEY = 'VcxT5zpD4Xtfncdbm';

export async function sendConfirmationEmail({
 toEmail,
 toName,
 eventName,
 venue,
 date,
 fee,
}: {
 toEmail: string;
 toName: string;
 eventName: string;
 venue: string;
 date: string;
 fee: number;
}) 


{
console.log(toEmail, "Email");
console.log(toName, "to name");
console.log(venue, "venue");
console.log(eventName, "event name");
console.log(date, "date");
console.log(fee, "fee");
console.log(PUBLIC_KEY, "public key");
console.log(TEMPLATE_ID, "template id");
console.log(PUBLIC_KEY, "public key")
console.log("1 fn entered");

 try {
    console.log("2 fn before");
 const response = await emailjs.send(
 SERVICE_ID,
 TEMPLATE_ID,
 {
 to_email: toEmail,
 to_name: toName,
 event_name: eventName,
 venue,
 date,
 fee,
 },
 PUBLIC_KEY
 );
console.log("3 fn after");
 console.log("Email sent", response);

 return true;
 } catch (error) {
 console.error("4 Email failed", error);
 return false;
 }
}