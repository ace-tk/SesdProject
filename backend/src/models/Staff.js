const User = require('./User');

class Staff extends User {
  constructor(data = {}) {
    super(data);
    this.role = 'Staff';
    this.staff_id = data.staff_id || null;
    this.specialization = data.specialization || '';
    this.shift_timing = data.shift_timing || '';
    this.join_date = data.join_date || null;
  }

  /**
   * Check if staff is available for a specific task
   */
  canHandle(taskType) {
    return this.specialization.toLowerCase().includes(taskType.toLowerCase());
  }
}

module.exports = Staff;
