const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');

// List all shortened URLs (for the demo UI)
router.get('/', urlController.listUrls);

// Create a short URL
router.post('/shorten', urlController.shortenUrl);

// Redirect to the original URL
router.get('/:code', urlController.redirectUrl);

module.exports = router;
