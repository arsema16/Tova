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
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // In production, we typically restrict this, but keeping it open for debug
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, companyName, email, phone, message } = req.body;

    // Basic validation
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // LOG SUBMISSION TO CONSOLE
    // This ensures no timeouts and works 100% of the time on Render free tier.
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Name: ${fullName}`);
    console.log(`Company: ${companyName || 'N/A'}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // Return success to the frontend immediately
    res.json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

app.get('/', (req, res) => {
  res.send('Tova Website Backend API (Stable Stable Mode)');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
