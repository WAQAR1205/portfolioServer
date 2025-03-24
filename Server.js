// require('dotenv').config();

// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// // server used to send send emails
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/", router);
// const port = 5000;
// app.listen(port, () => console.log(`Server Running on ${port}`));

// const contactEmail = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
    
//   },
// });

// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

// router.post("/contact", (req, res) => {
//   const name = req.body.firstName + req.body.lastName;
//   const email = req.body.email;
//   const message = req.body.message;
//   const phone = req.body.phone;
//   const mail = {
//     from: name,
//     to: "mwaqarulhaq1234@gmail.com",
//     subject: "Contact Form Submission - Portfolio",
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Phone: ${phone}</p>
//            <p>Message: ${message}</p>`,
//   };
//   contactEmail.sendMail(mail, (error) => {
//     if (error) {
//       res.json(error);
//     } else {
//       console.log(`sent:  ${name}: name ${email}: email ${message}: message ${phone}: phone ${mail}: mail`)
//       res.json({ code: 200, status: "Message Sent" });
//     }
//   });
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 5000;

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
app.listen(port, () => {
  console.log(`🚀 Server Running on port ${port}`);
});
