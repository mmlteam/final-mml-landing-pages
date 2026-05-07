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
const axios = require("axios");

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxxQH1c_hJlE7VMhPlp4-s-HtafAGH7OuYYppqePu5Ch0g7yfE75lHjkDV7XamunQhuhA/exec";

const { PUBLIC_URL = "" } = process.env;
export const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../build"), {
    maxage: Infinity,
  }),
);

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../public"), {
    maxage: "30 days",
  }),
);

app.use(morgan("tiny"));

app.post("/sendmail", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { fname, email, phone, message, page, moreInfo, recaptchaToken } = req.body.data;
  console.log("Form received:", { fname, phone, page, recaptchaToken: !!recaptchaToken });

  const htmlEmail = `
    <h3>New Lead from: ${page || "Website"}</h3>
    <p><b>Name:</b> ${fname}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Message:</b> ${message}</p>
    <p><b>More Info:</b> ${moreInfo || "N/A"}</p>
  `;

const mailOption = {
  from: process.env.GMAIL_USER,
  to: [
    "sharik@makemelive.in",
    "ershaikhsharik@gmail.com",
    "connect@makemelive.in",
    "nitin.tambe@makemelive.in",
    "aquib@makemelive.in",
  ],
  cc: "",
  subject: `New Lead Enquiry - ${page || "Website"}`,
  text: `Name: ${fname}, Phone: ${phone}, Email: ${email}, Message: ${message}`,
  html: htmlEmail,
};

  // moreInfo parse karo
  const ipMatch = moreInfo?.match(/IP:\s*([^\|]+)/);
  const locationMatch = moreInfo?.match(/Location:\s*([^,]+),\s*([^\|]+)/);
  const dateMatch = moreInfo?.match(/Date:\s*([^\|]+)/);
  const timeMatch = moreInfo?.match(/Time:\s*([^\|]+)/);
  const deviceMatch = moreInfo?.match(/Device:\s*(.+)$/);

  const sheetData = {
    name: fname,
    phone: phone,
    budget: message,
    formName: page,
    date: dateMatch ? dateMatch[1].trim() : "N/A",
    time: timeMatch ? timeMatch[1].trim() : "N/A",
    country: locationMatch ? locationMatch[2].trim() : "N/A",
    city: locationMatch ? locationMatch[1].trim() : "N/A",
    ip: ipMatch ? ipMatch[1].trim() : "N/A",
    device: deviceMatch ? deviceMatch[1].trim() : "N/A",
  };

  try {
    let emailStatus = "Unsent";

    try {
      const result = await sendEmail(mailOption);
      emailStatus = "Sent";
      console.log("Email sent:", result);
    } catch (emailError) {
      console.error("Email error:", emailError.message);
    }

    // Google Sheet me append karo
    try {
      await axios.post(GOOGLE_SHEET_URL, {
        ...sheetData,
        emailStatus: emailStatus,
      });
      console.log("Sheet updated ✅");
    } catch (sheetError) {
      console.error("Google Sheet error:", sheetError.message);
    }

    res.json({ status: true, payload: "Done" });
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