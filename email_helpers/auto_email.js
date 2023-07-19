import nodemailer from 'nodemailer';

export default async function auto_email(email,message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NEXT_PUBLIC_JUDGECRED,
          pass: process.env.NEXT_PUBLIC_GMAILPASSWORD// Replace with your generated app password
        }
      });

    const mailOptions = {
    from: process.env.NEXT_PUBLIC_JUDGECRED,
    to: email,
    subject: 'SOMETHING HAPPENED AT PRTRACKER',
    text: message
    };

    let response;
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        response = 200;
        return response;
      } catch (error) {
        console.error('Error sending email:', error);
        response = 400;
        return response;
      }

}