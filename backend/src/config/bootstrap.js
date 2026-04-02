const fs = require('fs');
const path = require('path');
const db = require('./db');

async function bootstrap() {
  try {
    console.log('🏁 Starting Database Bootstrap...');
    
    // Read the SQL script
    const sqlPath = path.join(__dirname, 'init_db.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split queries by semicolon (simplified for this schema)
    const queries = sqlContent
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    for (const query of queries) {
      await db.query(query);
      // console.log('✅ Query executed successfully');
    }

    console.log('✨ Database Bootstrap Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database Bootstrap Failed:', error.message);
    process.exit(1);
  }
}

// Run the bootstrap
bootstrap();
