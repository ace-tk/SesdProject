const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// All visitor routes are protected
router.use(protect);

// Resident routes
router.post('/pre-approve', authorize('Resident'), visitorController.preApproveVisitor);
router.get('/history', authorize('Resident'), visitorController.getResidentVisitors);

// Security routes
router.get('/security/dashboard', authorize('Security'), visitorController.getSecurityDashboard);
router.patch('/:id/entry', authorize('Security'), visitorController.logEntry);
router.patch('/:id/exit', authorize('Security'), visitorController.logExit);

module.exports = router;
