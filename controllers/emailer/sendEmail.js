// emailer/sendEmail.js
const nodemailer = require('nodemailer');
const {TRANSPORTER_EMAIL_HOST, TRANSPORTER_EMAIL_PORT, TRANSPORTER_EMAIL_USER, TRANSPORTER_EMAIL_PASS} = require("../../utils/config");

const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: TRANSPORTER_EMAIL_HOST,
        port: TRANSPORTER_EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: TRANSPORTER_EMAIL_USER,
            pass: TRANSPORTER_EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: TRANSPORTER_EMAIL_USER,
        to: email,
        subject: subject,
        html: text
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;