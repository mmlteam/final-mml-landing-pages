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
    maxage: Infinity
  })
);

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../public"), {
    maxage: "30 days"
  })
);

app.use(morgan("tiny"));

// Demo API endpoints
app.post("/sendmail", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const htmlEmail = `
  <p>name : ${req.body.data.fname}</p>
  <p>email : ${req.body.data.email}</p>
  <p>phone : ${req.body.data.phone}</p>
  <p>message : ${req.body.data.message}</p>
`;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    // to: "sharik@makemelive.in, ershaikhsharik@gmail.com", // Change to your recipient
    to: ["sharik@makemelive.in", "ershaikhsharik@gmail.com"],
    from: "support@makemelive.in", // Change to your verified sender
    subject: "Lead Enquiry",
    text: "and easy to do anywhere, even with Node.js",
    html: htmlEmail
  };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  try {
    const result = await sgMail.send(msg);
    res.json({
      status: true,
      payload: result
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      status: false,
      payload: "Something went wrong in Sendmail Route."
    });
  }
  //     let mailOption = {
  //     from: req.body.data.email,
  //     to: ["sharik@makemelive.in, rupesh@makemelive.in"],
  //     cc: "support@makemelive.in",
  //     replyTo: req.body.data.email,
  //     subject: "Contact form enquiry",
  //     text: req.body.data.message,
  //     html: htmlEmail
  //   };

  // try {
  // const result = await sendEmail(mailOption);
  //  // send the response
  //  res.json({
  //    status: true,
  //     payload: result,
  //   });
  // } catch (error) {
  //   console.error(error.message);
  //   res.json({
  //    status: false,
  //     payload: "Something went wrong in Sendmail Route.",
  //   });
  // }
});

app.use(
  responseTime((_req, res, time) => {
    res.setHeader("X-Response-Time", time.toFixed(2) + "ms");
    res.setHeader("Server-Timing", `renderServerSideApp;dur=${time}`);
  })
);

app.use(renderServerSideApp);
