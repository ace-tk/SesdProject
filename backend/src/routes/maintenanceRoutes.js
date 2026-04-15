const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// All maintenance routes are protected
router.use(protect);

// Resident routes
router.post('/', authorize('Resident'), maintenanceController.createRequest);
router.get('/resident', authorize('Resident'), maintenanceController.getResidentRequests);

// Staff routes
router.get('/staff', authorize('Staff'), maintenanceController.getStaffTasks);
router.patch('/:id', authorize('Staff', 'Admin'), maintenanceController.updateRequest);

// Admin routes
router.get('/admin', authorize('Admin'), maintenanceController.getAllRequests);
router.post('/:id/assign', authorize('Admin'), maintenanceController.assignStaff);

module.exports = router;
