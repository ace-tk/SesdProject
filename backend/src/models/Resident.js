const User = require('./User');

class Resident extends User {
  constructor(data = {}) {
    super(data);
    this.role = 'Resident';
    this.resident_id = data.resident_id || null;
    this.apartment_id = data.apartment_id || null;
    this.is_owner = data.is_owner || false;
    this.move_in_date = data.move_in_date || null;
  }

  /**
   * Specific logic for residents (e.g., check if they live in a specific block)
   */
  isResidentOf(apartmentId) {
    return this.apartment_id === apartmentId;
  }
}

module.exports = Resident;
