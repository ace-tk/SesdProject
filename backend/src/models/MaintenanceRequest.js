class MaintenanceRequest {
  constructor(data = {}) {
    this.request_id = data.request_id || null;
    this.resident_id = data.resident_id || null;
    this.assigned_staff_id = data.assigned_staff_id || null;
    this.description = data.description || '';
    this.status = data.status || 'Pending';
    this.priority = data.priority || 'Medium';
    this.request_date = data.request_date || new Date();
    this.completion_date = data.completion_date || null;
    this.feedback = data.feedback || '';
  }

  /**
   * Basic validation logic for requests
   */
  validate() {
    if (!this.resident_id || !this.description) {
      throw new Error('Resident ID and Description are required for a maintenance request');
    }
    return true;
  }
}

module.exports = MaintenanceRequest;
