const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const urlRoutes = require('./routes/url.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/urls', urlRoutes);

// Global error handler (must be registered after routes)
app.use(errorMiddleware);

module.exports = app;
