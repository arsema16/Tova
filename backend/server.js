const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Hello world route
app.get('/', (req, res) => {
  res.send('Tova Website Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
