const maintenanceService = require('../services/MaintenanceService');

/**
 * Raise a new maintenance request
 * @route POST /api/maintenance
 */
const createRequest = async (req, res) => {
  try {
    // Inject current user's resident_id if they are a resident
    const requestData = {
      ...req.body,
      resident_id: req.user.resident_id
    };
    
    const request = await maintenanceService.createRequest(requestData);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get requests for current resident
 * @route GET /api/maintenance/resident
 */
const getResidentRequests = async (req, res) => {
  try {
    const requests = await maintenanceService.getResidentRequests(req.user.resident_id);
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get tasks for current staff member
 * @route GET /api/maintenance/staff
 */
const getStaffTasks = async (req, res) => {
  try {
    const tasks = await maintenanceService.getStaffTasks(req.user.staff_id);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Update request status (Staff/Admin)
 * @route PATCH /api/maintenance/:id
 */
const updateRequest = async (req, res) => {
  try {
    const request = await maintenanceService.updateRequest(req.params.id, req.body);
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get all requests (Admin)
 * @route GET /api/maintenance/admin
 */
const getAllRequests = async (req, res) => {
  try {
    const requests = await maintenanceService.getAllRequests();
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Assign staff to request (Admin)
 * @route POST /api/maintenance/:id/assign
 */
const assignStaff = async (req, res) => {
  try {
    const { staff_id } = req.body;
    const request = await maintenanceService.assignStaff(req.params.id, staff_id);
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRequest,
  getResidentRequests,
  getStaffTasks,
  updateRequest,
  getAllRequests,
  assignStaff
};
