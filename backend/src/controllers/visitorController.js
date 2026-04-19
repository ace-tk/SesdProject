const visitorService = require('../services/VisitorService');

/**
 * Pre-approve a visitor
 * @route POST /api/visitors/pre-approve
 */
const preApproveVisitor = async (req, res) => {
  try {
    const { visitor_name, expected_date, ...rest } = req.body;
    const visitorData = {
      ...rest,
      name: visitor_name,
      expected_arrival: expected_date,
      host_resident_id: req.user.resident_id
    };
    const visitor = await visitorService.preApproveVisitor(visitorData);
    res.status(201).json({ success: true, data: visitor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get visitor logs for current resident
 * @route GET /api/visitors/history
 */
const getResidentVisitors = async (req, res) => {
  try {
    const logs = await visitorService.getResidentVisitors(req.user.resident_id);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get security dashboard (Expected vs Active)
 * @route GET /api/visitors/security/dashboard
 */
const getSecurityDashboard = async (req, res) => {
  try {
    const dashboard = await visitorService.getSecurityDashboard();
    res.status(200).json({ success: true, data: dashboard });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Log visitor entry
 * @route PATCH /api/visitors/:id/entry
 */
const logEntry = async (req, res) => {
  try {
    const visitor = await visitorService.logEntry(req.params.id);
    res.status(200).json({ success: true, data: visitor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Log visitor exit
 * @route PATCH /api/visitors/:id/exit
 */
const logExit = async (req, res) => {
  try {
    const visitor = await visitorService.logExit(req.params.id);
    res.status(200).json({ success: true, data: visitor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  preApproveVisitor,
  getResidentVisitors,
  getSecurityDashboard,
  logEntry,
  logExit
};
