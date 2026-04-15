const BaseRepository = require('./BaseRepository');

class MaintenanceRepository extends BaseRepository {
  constructor() {
    super('MAINTENANCE_REQUESTS', 'request_id');
  }

  /**
   * Find all requests raised by a specific resident
   */
  async findByResidentId(residentId) {
    const sql = `SELECT * FROM ${this.tableName} WHERE resident_id = ? ORDER BY request_date DESC`;
    return await this.db.query(sql, [residentId]);
  }

  /**
   * Find all requests assigned to a specific staff member
   */
  async findByStaffId(staffId) {
    const sql = `SELECT * FROM ${this.tableName} WHERE assigned_staff_id = ? ORDER BY request_date DESC`;
    return await this.db.query(sql, [staffId]);
  }

  /**
   * Find requests by status
   */
  async findByStatus(status) {
    const sql = `SELECT * FROM ${this.tableName} WHERE status = ? ORDER BY request_date DESC`;
    return await this.db.query(sql, [status]);
  }

  /**
   * Get detailed request info (with resident and apartment info)
   */
  async getDetailedRequest(requestId) {
    const sql = `
      SELECT mr.*, r.apartment_id, u.username as resident_name, a.block_number, a.flat_number
      FROM MAINTENANCE_REQUESTS mr
      JOIN RESIDENTS r ON mr.resident_id = r.resident_id
      JOIN USERS u ON r.user_id = u.user_id
      JOIN APARTMENTS a ON r.apartment_id = a.apartment_id
      WHERE mr.request_id = ?
    `;
    const results = await this.db.query(sql, [requestId]);
    return results[0] || null;
  }
}

module.exports = new MaintenanceRepository();
