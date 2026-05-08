const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }

});



const sendVerificationEmail = async (
  email,
  token
) => {

  try {

    const verificationLink =
      `http://localhost:5000/api/auth/verify-email/${token}`;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Verify Your Email",

      html: `
        <h2>Email Verification</h2>

        <p>Click below to verify your account:</p>

        <a href="${verificationLink}" style="background-color: #000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
      `

    });

  } catch (error) {

    throw new Error(`Email sending failed: ${error.message}`);

  }

};

module.exports = sendVerificationEmail;