require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

// Basic security headers without requiring another dependency.
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

// Explicitly serve robots.txt so crawlers always receive the correct
// robots file instead of the website HTML/fallback page.
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// Explicitly serve sitemap.xml so Google can retrieve it as XML.
app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});

app.use(express.static(path.join(__dirname), {
  extensions: ["html"],
  index: "index.html"
}));

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP configuration is missing.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/api/contact", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const message = String(req.body.message || "").trim();
  const website = String(req.body.website || "").trim();

  // Honeypot for simple bots.
  if (website) return res.status(200).json({ ok: true });

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Please fill in all fields." });
  }

  if (!validEmail(email)) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ ok: false, message: "One or more fields are too long." });
  }

  const recipient = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (!recipient) {
    console.error("MAIL_TO is not configured.");
    return res.status(500).json({ ok: false, message: "Email service is not configured on the server." });
  }

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `New message from your portfolio`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message
      ].join("\n"),
      html: `
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `
    });

    return res.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(502).json({ ok: false, message: "Unable to send the message right now." });
  }
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "Aya Saouli portfolio" });
});

app.listen(PORT, HOST, () => {
  console.log(`Portfolio server running on http://${HOST}:${PORT}`);
});
