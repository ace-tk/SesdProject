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
   * Ensure the database exists
   */
  async ensureDatabaseExists() {
    try {
      console.log(`🔍 Checking if database "${process.env.DB_NAME}" exists...`);
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
      await connection.end();
      console.log(`✅ Database "${process.env.DB_NAME}" is ready.`);
    } catch (error) {
      if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('❌ MySQL Access Denied: Please check your DB_USER and DB_PASSWORD in .env');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('❌ MySQL Connection Refused: Is your MySQL server running?');
      } else {
        console.error('⚠️ Database existence check failed (but we will try to connect anyway):', error.message);
      }
    }
  }

  /**
   * Initialize the MySQL pool
   */
  async connect() {
    try {
      if (!this.connection) {
        // First ensure DB exists
        await this.ensureDatabaseExists();

        console.log(`🔗 Connecting to MySQL at ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}...`);
        
        this.connection = mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: parseInt(process.env.DB_PORT) || 3306,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0
        });

        // Test the connection immediately
        const conn = await this.connection.getConnection();
        console.log('✅ MySQL Pool Connected Successfully');
        conn.release(); // Important: release the test connection back to pool
      }
    } catch (error) {
      console.error('❌ CRITICAL DATABASE ERROR ❌');
      console.error(`📍 Target: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
      console.error(`👤 User: ${process.env.DB_USER}`);
      console.error(`📁 Database: ${process.env.DB_NAME}`);
      console.error(`💬 Error Message: ${error.message}`);
      
      if (error.code === 'ER_BAD_DB_ERROR') {
        console.error('👉 The database does not exist. Please run "npm run db:init" first.');
      } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error(`👉 Password/Username mismatch. Please verify "Tisha123" is correct for "${process.env.DB_USER}".`);
      } else if (error.code === 'ECONNREFUSED') {
        console.error('👉 MySQL is NOT RUNNING on this port/host. Please start MySQL.');
      }
      
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
