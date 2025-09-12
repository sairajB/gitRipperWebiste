import express from "express";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";

const router = express.Router();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Contact form submission
router.post(
  "/send",
  [
    body("name").trim().isLength({ min: 2 }).escape(),
    body("email").isEmail().normalizeEmail(),
    body("subject").trim().isLength({ min: 5 }).escape(),
    body("message").trim().isLength({ min: 10 }).escape(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const { name, email, subject, message } = req.body;

      // For demo purposes, we'll just log the message
      // In production, you'd set up proper email sending
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });

      // If email credentials are configured, send email
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = createTransporter();

        const mailOptions = {
          from: `"${name}" <${email}>`,
          to: process.env.CONTACT_EMAIL || "contact@example.com",
          subject: `Git-ripper Contact: ${subject}`,
          text: message,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      }

      res.status(200).json({
        success: true,
        message: "Message sent successfully!",
      });
    } catch (error) {
      console.error("Error sending contact message:", error.message);
      res.status(500).json({
        error: "Failed to send message",
        message: "Please try again later or contact us directly.",
      });
    }
  }
);

export default router;
