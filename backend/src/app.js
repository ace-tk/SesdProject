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

// Import Routes
const authRoutes = require('./routes/authRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const visitorRoutes = require('./routes/visitorRoutes');

// Basic Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'up', message: 'Apartment Maintenance API is running' });
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/visitors', visitorRoutes);

// Error Middleware
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

module.exports = app;
