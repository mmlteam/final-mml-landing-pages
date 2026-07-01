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
const indianMobileRule = /^[6-9]\d{9}$/;

const updateSheetEmailStatus = async ({ rowNumber, phone, emailStatus }) => {
  try {
    await axios.post(GOOGLE_SHEET_URL, {
      action: "updateEmailStatus",
      rowNumber,
      phone,
      emailStatus,
    });
  } catch (statusError) {
    console.error("Email status update error:", statusError.message);
  }
};

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

  const { fname, email, phone, message, page, moreInfo, source, recaptchaToken, website } = req.body.data;
  const honeypotValue = String(website || "").trim();
  const cleanedPhone = String(phone || "").trim();

  if (honeypotValue.length > 0) {
    return res.status(400).json({
      status: false,
      sheetStatus: "spam",
      payload: "Spam submission rejected.",
    });
  }

  if (!indianMobileRule.test(cleanedPhone)) {
    return res.status(400).json({
      status: false,
      sheetStatus: "invalid_phone",
      payload: "Please enter a valid 10 digit Indian mobile number.",
    });
  }

  const leadSource = source || "Direct";
  console.log("Form received:", { fname, phone: cleanedPhone, page, recaptchaToken: !!recaptchaToken });

  const htmlEmail = `
    <h3>New Lead from: ${page || "Website"}</h3>
    <p><b>Name:</b> ${fname}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${cleanedPhone}</p>
    <p><b>Source:</b> ${leadSource}</p>
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
  text: `Name: ${fname}, Phone: ${cleanedPhone}, Email: ${email}, Source: ${leadSource}, Message: ${message}`,
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
    phone: cleanedPhone,
    budget: message,
    formName: page,
    date: dateMatch ? dateMatch[1].trim() : "N/A",
    time: timeMatch ? timeMatch[1].trim() : "N/A",
    country: locationMatch ? locationMatch[2].trim() : "N/A",
    city: locationMatch ? locationMatch[1].trim() : "N/A",
    ip: ipMatch ? ipMatch[1].trim() : "N/A",
    device: deviceMatch ? deviceMatch[1].trim() : "N/A",
    source: leadSource,
  };

  try {
    let sheetStatus = "error";
    let sheetPayload = null;

    // Google Sheet me append karo
    try {
      const sheetResponse = await axios.post(GOOGLE_SHEET_URL, {
        ...sheetData,
        emailStatus: "Pending",
      });
      sheetPayload = sheetResponse.data;
      sheetStatus = sheetPayload?.status || "success";
      console.log("Google Sheet response:", sheetStatus);
    } catch (sheetError) {
      console.error("Google Sheet error:", sheetError.message);
    }

    res.json({
      status: sheetStatus === "success",
      sheetStatus: sheetStatus,
      payload: sheetPayload || "Done",
    });

    if (sheetStatus === "success") {
      sendEmail(mailOption)
        .then(result => {
          console.log("Email sent:", result);
          return updateSheetEmailStatus({
            rowNumber: sheetPayload?.rowNumber,
            phone: cleanedPhone,
            emailStatus: "Sent",
          });
        })
        .catch(emailError => {
          console.error("Email error:", emailError.message);
          return updateSheetEmailStatus({
            rowNumber: sheetPayload?.rowNumber,
            phone: cleanedPhone,
            emailStatus: "Unsent",
          });
        });
    }
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
