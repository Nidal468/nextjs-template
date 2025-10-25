import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export async function POST(req: NextRequest) {
    const { email, message, subject } = await req.json();

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOSTNAME,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    try {

        await transport.verify();
        const emailText = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
    <p><strong>Sender:</strong> ${email}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  </div>
`;


        const mailOptions: Mail.Options = {
            from: process.env.MAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: subject,
            html: emailText
        };

        await transport.sendMail(mailOptions);

        return NextResponse.json('Email sent', { status: 200 });
    } catch (err) {
        console.error(err);

        return NextResponse.json('Please try again later', { status: 400 });
    }


}