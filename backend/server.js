const express = require('express');
const cors = require('cors');
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
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all during debug
    }
  },
  credentials: true
}));
app.use(express.json());

// Helper to send email via Resend API
async function sendEmailViaResend(formData) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO],
      subject: `New Tova Contact: ${formData.fullName}`,
      reply_to: formData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Company:</strong> ${formData.companyName || 'N/A'}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `
    })
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Resend API Error');
  }
  return result;
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, companyName, email, phone, message } = req.body;

    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${fullName}, Email: ${email}`);

    // Send email via Resend API
    if (process.env.RESEND_API_KEY && process.env.EMAIL_TO) {
      try {
        await sendEmailViaResend({ fullName, companyName, email, phone, message });
        console.log('Email sent successfully via Resend!');
      } catch (err) {
        console.error('Email Error:', err.message);
      }
    } else {
      console.log('RESEND_API_KEY or EMAIL_TO not set. Logging only.');
    }

    res.json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error processing contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

app.get('/', (req, res) => {
  res.send('Tova Website Backend API (Resend Mode)');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
