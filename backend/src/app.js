const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Initialize express app
const app = express();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // CORS support
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Basic Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'up', message: 'Apartment Maintenance API is running' });
});

// Import and use routes here later...


// Global Error Handler (to be implemented fully in later stages)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;
