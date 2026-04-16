const maintenanceRepository = require('../repositories/MaintenanceRepository');

class MaintenanceService {
  /**
   * Raise a new maintenance request
   */
  async createRequest(requestData) {
    const { resident_id, description, priority } = requestData;

    if (!resident_id || !description) {
      throw new Error('Resident ID and Description are required');
    }

    const requestId = await maintenanceRepository.create({
      resident_id,
      description,
      priority: priority || 'Medium',
      status: 'Pending'
    });

    return await maintenanceRepository.findById(requestId);
  }

  /**
   * Get all requests for a specific resident
   */
  async getResidentRequests(residentId) {
    return await maintenanceRepository.findByResidentId(residentId);
  }

  /**
   * Get all requests assigned to a specific staff member
   */
  async getStaffTasks(staffId) {
    return await maintenanceRepository.findByStaffId(staffId);
  }

  /**
   * Get all requests (for Admin)
   */
  async getAllRequests() {
    return await maintenanceRepository.findAll();
  }

  /**
   * Update the status or feedback of a request
   */
  async updateRequest(requestId, updateData) {
    const { status, feedback } = updateData;
    
    const request = await maintenanceRepository.findById(requestId);
    if (!request) {
      throw new Error('Maintenance request not found');
    }

    const dataToUpdate = {};
    if (status) dataToUpdate.status = status;
    if (feedback) dataToUpdate.feedback = feedback;
    
    // If status is completed, set the completion date
    if (status === 'Completed') {
      dataToUpdate.completion_date = new Date();
    }

    await maintenanceRepository.update(requestId, dataToUpdate);
    return await maintenanceRepository.findById(requestId);
  }
  /**
   * Assign a staff member to a maintenance request (Admin feature)
   */
  async assignStaff(requestId, staffId) {
    const request = await maintenanceRepository.findById(requestId);
    if (!request) {
      throw new Error('Maintenance request not found');
    }

    // Update the request with staff ID and move to In-Progress
    await maintenanceRepository.update(requestId, {
      assigned_staff_id: staffId,
      status: 'In-Progress'
    });

    return await maintenanceRepository.getDetailedRequest(requestId);
  }
}

module.exports = new MaintenanceService();
