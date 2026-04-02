const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
  }

  /**
   * Singleton implementation to get the database instance
   */
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Initialize the MySQL pool
   */
  async connect() {
    try {
      if (!this.connection) {
        this.connection = mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT || 3306,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
        });

        console.log('✅ MySQL Pool Created Successfully');
      }
    } catch (error) {
      console.error('❌ Error creating MySQL Pool:', error.message);
      process.exit(1);
    }
  }

  /**
   * Helper method to execute queries
   */
  async query(sql, params) {
    if (!this.connection) {
      await this.connect();
    }
    const [results] = await this.connection.execute(sql, params);
    return results;
  }
}

const dbInstance = Database.getInstance();
module.exports = dbInstance;
