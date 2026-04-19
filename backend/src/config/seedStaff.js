const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const db = require('./db');
const { hashPassword } = require('../utils/passwordUtils');

async function seedStaff() {
  try {
    console.log('🌱 Seeding Staff Members...');

    const staffData = [
      {
        username: 'plumber_joe',
        email: 'joe@aptmanager.com',
        password: 'password123',
        role: 'Staff',
        specialization: 'Plumbing',
        shift_timing: '9 AM - 5 PM'
      },
      {
        username: 'sparky_bill',
        email: 'bill@aptmanager.com',
        password: 'password123',
        role: 'Staff',
        specialization: 'Electrical',
        shift_timing: '10 AM - 6 PM'
      },
      {
        username: 'cleaner_amy',
        email: 'amy@aptmanager.com',
        password: 'password123',
        role: 'Staff',
        specialization: 'Cleaning',
        shift_timing: '8 AM - 4 PM'
      }
    ];

    for (const data of staffData) {
      // 1. Check if exists
      const [existing] = await db.query('SELECT user_id FROM USERS WHERE email = ?', [data.email]);
      if (existing) {
        console.log(`⚠️ User ${data.username} already exists, skipping...`);
        continue;
      }

      // 2. Create User
      const hashedPassword = await hashPassword(data.password);
      const userResult = await db.query(
        'INSERT INTO USERS (username, email, password, role) VALUES (?, ?, ?, ?)',
        [data.username, data.email, hashedPassword, data.role]
      );
      
      const userId = userResult.insertId;

      // 3. Create Staff entry
      await db.query(
        'INSERT INTO STAFF (user_id, specialization, shift_timing, join_date) VALUES (?, ?, ?, ?)',
        [userId, data.specialization, data.shift_timing, new Date().toISOString().split('T')[0]]
      );

      console.log(`✅ Created Staff: ${data.username} (${data.specialization})`);
    }

    console.log('✨ Staff Seeding Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Staff Seeding Failed:', error.message);
    process.exit(1);
  }
}

seedStaff();
