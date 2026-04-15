const BaseRepository = require('./BaseRepository');

class VisitorRepository extends BaseRepository {
  constructor() {
    super('VISITORS', 'visitor_id');
  }

  /**
   * Find visits scheduled for a specific resident
   */
  async findByResidentId(residentId) {
    const sql = `SELECT * FROM ${this.tableName} WHERE host_resident_id = ? ORDER BY created_at DESC`;
    return await this.db.query(sql, [residentId]);
  }

  /**
   * Find currently active visitors (Checked-In but not yet Checked-Out)
   */
  async findActiveVisitors() {
    const sql = `SELECT * FROM ${this.tableName} WHERE status = 'Checked-In' ORDER BY actual_entry DESC`;
    return await this.db.query(sql);
  }

  /**
   * Find expected visitors for today
   */
  async findExpectedToday() {
    const sql = `
      SELECT v.*, u.username as host_name, a.block_number, a.flat_number
      FROM VISITORS v
      JOIN RESIDENTS r ON v.host_resident_id = r.resident_id
      JOIN USERS u ON r.user_id = u.user_id
      JOIN APARTMENTS a ON r.apartment_id = a.apartment_id
      WHERE v.status = 'Expected' 
      AND DATE(v.expected_arrival) = CURDATE()
      ORDER BY v.expected_arrival ASC
    `;
    return await this.db.query(sql);
  }
}

module.exports = new VisitorRepository();
