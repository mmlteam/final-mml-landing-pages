import path from "path";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import responseTime from "response-time";
import bodyParser from "body-parser";
import { renderServerSideApp } from "./renderServerSideApp";
import sendEmail from "./sendMailApi";
const sgMail = require("@sendgrid/mail");

const { PUBLIC_URL = "" } = process.env;
// This export is used by our initialization code in /scripts
export const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

// Serve generated assets
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../build"), {
    maxage: Infinity,
  }),
);

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../public"), {
    maxage: "30 days",
  }),
);

app.use(morgan("tiny"));

// Demo API endpoints
app.post("/sendmail", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { fname, email, phone, message, page } = req.body.data;

  const htmlEmail = `
    <h3>New Lead from: ${page || "Website"}</h3>
    <p><b>Name:</b> ${fname}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Message:</b> ${message}</p>
  `;

  const mailOption = {
    from: process.env.GMAIL_USER,
    to: [
      "sharik@makemelive.in",
      "ershaikhsharik@gmail.com",
      "connect@makemelive.in",
      "nitin.tambe@makemelive.in",
    ],
    cc: "",
    subject: `New Lead Enquiry - ${page || "Website"}`,
    text: `Name: ${fname}, Phone: ${phone}, Email: ${email}, Message: ${message}`,
    html: htmlEmail,
  };

  try {
    const result = await sendEmail(mailOption);
    res.json({ status: true, payload: result });
  } catch (error) {
    console.error(error.message);
    res.json({
      status: false,
      payload: "Something went wrong in Sendmail Route.",
    });
  }
});
app.use(
  responseTime((_req, res, time) => {
    res.setHeader("X-Response-Time", time.toFixed(2) + "ms");
    res.setHeader("Server-Timing", `renderServerSideApp;dur=${time}`);
  }),
);

app.use(renderServerSideApp);
