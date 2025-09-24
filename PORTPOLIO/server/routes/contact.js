const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { sendNotification } = require('../utils/mailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message, source } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const doc = await ContactMessage.create({
      name,
      email,
      message,
      source: source || 'react-portfolio',
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'] || req.headers['referrer']
    });

    // Fire-and-forget email notification; do not fail the request if email fails
    sendNotification({ name, email, message })
      .then((info) => {
        if (!info.ok) {
          console.warn('Email not sent:', info.error);
        }
      })
      .catch((err) => console.warn('Email send error:', err));

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error('Contact route error:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

module.exports = router;
