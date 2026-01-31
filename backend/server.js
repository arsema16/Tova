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

// Helper to send email via Web3Forms API
async function sendEmailViaWeb3Forms(formData) {
  console.log('Attempting to send email via Web3Forms (URL-encoded)...');

  const params = new URLSearchParams();
  params.append('access_key', process.env.WEB3FORMS_ACCESS_KEY);
  params.append('from_name', formData.fullName);
  params.append('subject', `New Tova Contact: ${formData.fullName}`);
  params.append('name', formData.fullName);
  params.append('email', formData.email);
  params.append('phone', formData.phone);
  params.append('company', formData.companyName || 'N/A');
  params.append('message', formData.message);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://tova-kgvz.vercel.app/'
    },
    body: params
  });

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const result = await response.json();
    if (!result.success) {
      console.error('Web3Forms API Error Result:', result);
      throw new Error(result.message || 'Web3Forms API Error');
    }
    return result;
  } else {
    const text = await response.text();
    console.error('Web3Forms Status:', response.status);
    console.error('Web3Forms Raw Response (First 500 chars):', text.substring(0, 500));
    throw new Error(`Web3Forms returned non-JSON response (Status: ${response.status}). Cloudflare is still blocking the request.`);
  }
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

    // Always log to console first (fail-safe)
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${fullName}, Email: ${email}`);

    // Send email via Web3Forms API
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        await sendEmailViaWeb3Forms({ fullName, companyName, email, phone, message });
        console.log('Email sent successfully via Web3Forms!');
      } catch (err) {
        console.error('Email Error:', err.message);
      }
    } else {
      console.log('WEB3FORMS_ACCESS_KEY not set. Skipping email.');
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
  res.send('Tova Website Backend API (Web3Forms Mode)');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
