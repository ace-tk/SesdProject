const db = require('../config/db');

class BaseRepository {
  constructor(tableName, primaryKey = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.db = db;
  }

  /**
   * Find all records in the table
   */
  async findAll() {
    const sql = `SELECT * FROM ${this.tableName}`;
    return await this.db.query(sql);
  }

  /**
   * Find a specific record by its primary key
   */
  async findById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
    const results = await this.db.query(sql, [id]);
    return results[0] || null;
  }

  /**
   * Find records based on a specific criteria (e.g., { email: 'test@test.com' })
   */
  async findOne(criteria) {
    const keys = Object.keys(criteria);
    const values = Object.values(criteria);
    const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
    
    const sql = `SELECT * FROM ${this.tableName} WHERE ${whereClause} LIMIT 1`;
    const results = await this.db.query(sql, values);
    return results[0] || null;
  }

  /**
   * Generic create method
   */
  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    const result = await this.db.query(sql, values);
    return result.insertId;
  }

  /**
   * Generic update method
   */
  async update(id, data) {
    const keys = Object.keys(data);
    const values = [...Object.values(data), id];
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`;
    const result = await this.db.query(sql, values);
    return result.affectedRows > 0;
  }

  /**
   * Generic delete method
   */
  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
    const result = await this.db.query(sql, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = BaseRepository;
