const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (To, Sub, Message) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: To,
    subject: Sub,
    text: Message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(" Email Error:", err.message);
    } else {
      console.log(" Email Sent:", info.response);
    }
  });
};

module.exports = { sendEmail };
