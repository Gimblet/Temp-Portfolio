export const prerender = false;

import {SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM, SMTP_TO} from "astro:env/server";
import nodemailer from "nodemailer";

export async function POST({request}) {
    const formData = await request.formData();
    const transporter =
        nodemailer.createTransport({
            service: "SendinBlue",
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
            },
        });
    const response = await transporter.sendMail({
        from: SMTP_FROM,
        to: SMTP_TO,
        subject: `${formData.get("from_name").toString()} has contacted you from your portfolio!`,
        text: `Name: ${formData.get("from_name").toString()}\nEmail: ${formData.get("reply_to").toString()}\nMessage: ${formData.get("message").toString()}`,
    }).then(info => {
        console.log("Message sent: %s", info.messageId);
        return new Response(JSON.stringify({
            message: "Email sent successfully",
        }), {
            headers: {"Content-Type": "application/json"},
            status: 200,
        });
    }).catch(error => {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({
            message: "There was an error sending the email:",
        }), {
            headers: {"Content-Type": "application/json"},
            status: 400,
        });
    });

    return new Response(JSON.stringify({
        message: "We were unable to send the mail",
    }), {
        headers: {"Content-Type": "application/json"},
        status: 400,
    });
}