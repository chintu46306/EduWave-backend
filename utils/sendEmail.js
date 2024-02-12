 //npm install resend

 import { Resend } from 'resend';
 import dotenv from "dotenv";
 dotenv.config({ silent: process.env.NODE_ENV === 'production' });
 
 console.log(process.env.RESEND_API_KEY);
 const resend = new Resend(process.env.RESEND_API_KEY);
 
 // const resend = new Resend("YOUR_API_KEY");
 
 const sendEmail = async function (email, subject, message) {
   const { data, error } = await resend.emails.send({
     from: 'Acme <onboarding@resend.dev>',
     to: [email],
     subject: subject,
     html: message,
   });
 
   if (error) {
     return console.error({ error });
   }
 
   console.log({ data });
 };
 
 export default sendEmail;
 