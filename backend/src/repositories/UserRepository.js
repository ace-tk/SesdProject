const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('USERS', 'user_id');
  }

  /**
   * Find a user by their username
   */
  async findByUsername(username) {
    return await this.findOne({ username });
  }

  /**
   * Find a user by their email
   */
  async findByEmail(email) {
    return await this.findOne({ email });
  }

  /**
   * Get complete resident data (User + Resident details)
   */
  async findDetailedResident(userId) {
    const sql = `
      SELECT u.*, r.resident_id, r.apartment_id, r.is_owner, r.move_in_date, a.block_number, a.flat_number
      FROM USERS u
      JOIN RESIDENTS r ON u.user_id = r.user_id
      JOIN APARTMENTS a ON r.apartment_id = a.apartment_id
      WHERE u.user_id = ?
    `;
    const results = await this.db.query(sql, [userId]);
    return results[0] || null;
  }

  /**
   * Get complete staff data (User + Staff details)
   */
  async findDetailedStaff(userId) {
    const sql = `
      SELECT u.*, s.staff_id, s.specialization, s.shift_timing, s.join_date
      FROM USERS u
      JOIN STAFF s ON u.user_id = s.user_id
      WHERE u.user_id = ?
    `;
    const results = await this.db.query(sql, [userId]);
    return results[0] || null;
  }

  /**
   * Get all staff members
   */
  async findAllStaff() {
    const sql = `
      SELECT u.username, u.email, s.staff_id, s.specialization, s.shift_timing
      FROM USERS u
      JOIN STAFF s ON u.user_id = s.user_id
      WHERE u.role = 'Staff'
    `;
    return await this.db.query(sql);
  }
}

module.exports = new UserRepository();
