require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection (optional at startup). If not set, server still runs and logs a warning.
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  mongoose
    .connect(mongoUri, { dbName: process.env.MONGODB_DB || undefined })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.warn('Warning: MONGODB_URI not set in .env. Server will run without DB connection.');
}

// Routes
app.use('/api/contact', require('./routes/contact'));

// In production serve React build if desired (optional)
// const clientBuildPath = path.join(__dirname, '..', 'build');
// app.use(express.static(clientBuildPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(clientBuildPath, 'index.html'));
// });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
