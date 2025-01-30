import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Secure Transporter Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Fetch securely
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define Mail Options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Display client's name
      to: "sanjitpal132@gmail.com", // Replace with recipient email
      subject: "New Inquiry from Your Website",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
