import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

async function checkTables() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 1,
    allowExitOnIdle: true
  });

  try {
    const client = await pool.connect();
    
    // Check for existing tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);
    
    console.log('📋 Existing tables:');
    if (tablesResult.rows.length === 0) {
      console.log('  No tables found in the database');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Failed to check tables:', error.message);
    process.exit(1);
  }
}

checkTables();

