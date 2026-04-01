require("dotenv").config();
 const nodemailer = require("nodemailer");
 
 /**
  * sendEmail
  * @param {Object} mailObj - Email information
  * @param {String} from - Email address of the sender
  * @param {Array} to - Array of receipents email address
 * @param {String} subject - Subject of the email
 * @param {String} text - Email body
 */
const sendEmail = async (mailObj) => {
  const { from, to, cc, subject, text, html } = mailObj;
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
            user: process.env.SENDINBLUE_USER,
            pass: process.env.SENDINBLUE_PASS,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      cc: cc, // list of receivers in cc
      subject: subject, // Subject line
      text: text, // plain text body
      html: html
   });

    console.log(`Message sent: ${info.messageId}`);
    return `Message sent: ${info.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
};

//module.exports = sendEmail;
export default sendEmail
