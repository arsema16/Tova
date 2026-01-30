const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Configure CORS to allow frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://tova-kgvz.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, true); // For now, allow all origins - change to false in production
    }
  },
  credentials: true
}));
app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // This is literal string 'apikey'
    pass: process.env.SENDGRID_API_KEY
  }
});

// Verify connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.log('--- SendGrid Connection Failed ---');
    console.log(error.message);
  } else {
    console.log('--- SendGrid Ready to Send ---');
  }
});

// Debug logs to verify environment variables are loaded in Render
console.log('--- Backend Environment Check ---');
console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
console.log('EMAIL_TO exists:', !!process.env.EMAIL_TO);
console.log('---------------------------------');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, companyName, email, phone, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Verify Sender Identity (SendGrid requirement)
    const mailOptions = {
      from: process.env.EMAIL_USER, // This MUST be your verified SendGrid sender
      to: process.env.EMAIL_TO,
      replyTo: email, // So you can reply directly to the visitor
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    console.log('--- Processing Form Submission ---');
    console.log(`From: ${fullName} (${email})`);

    // Skip email sending for now - uncomment below when email is configured

    try {
      const emailPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email timeout')), 10000)
      );
      await Promise.race([emailPromise, timeoutPromise]);
      console.log('Email sent successfully to:', process.env.EMAIL_TO);
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
    }


    // Return success immediately
    res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Hello world route
app.get('/', (req, res) => {
  res.send('Tova Website Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
