class Visitor {
  constructor(data = {}) {
    this.visitor_id = data.visitor_id || null;
    this.host_resident_id = data.host_resident_id || null;
    this.name = data.name || '';
    this.contact_number = data.contact_number || '';
    this.purpose = data.purpose || '';
    this.expected_arrival = data.expected_arrival || null;
    this.actual_entry = data.actual_entry || null;
    this.exit_time = data.exit_time || null;
    this.status = data.status || 'Expected';
    this.created_at = data.created_at || new Date();
  }

  /**
   * Basic validation for visitor entries
   */
  validate() {
    if (!this.host_resident_id || !this.name) {
      throw new Error('Host Resident ID and Visitor Name are required');
    }
    return true;
  }
}

module.exports = Visitor;
