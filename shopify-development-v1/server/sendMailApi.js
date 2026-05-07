import nodemailer from "nodemailer";

const sendEmail = async (mailObj) => {
  const { from, to, cc, subject, text, html } = mailObj;

 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
  let info = await transporter.sendMail({
    from,
    to,
    cc,
    subject,
    text,
    html,
  });

  console.log(`Message sent: ${info.messageId}`);
  return `Message sent: ${info.messageId}`;
};

export default sendEmail;
