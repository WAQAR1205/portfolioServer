require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify Email Connection
contactEmail.verify((error) => {
  if (error) {
    console.log("Error setting up email:", error);
  } else {
    console.log("Ready to Send Emails");
  }
});

// API Routes
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.post("/contact", (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body;
  const name = `${firstName} ${lastName}`;

  const mail = {
    from: name,
    to: "mwaqarulhaq1234@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Email sending failed:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log(`Email sent successfully from: ${name} (${email})`);
      res.status(200).json({ status: "Message Sent" });
    }
  });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server Running on port ${process.env.PORT}`);
});
