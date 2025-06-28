import dotenv from 'dotenv';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function uploadSQL(sqlFile) {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 1,
    allowExitOnIdle: true
  });

  try {
    // Check if file exists
    if (!fs.existsSync(sqlFile)) {
      console.error(`❌ SQL file not found: ${sqlFile}`);
      process.exit(1);
    }

    // Read SQL file
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    console.log(`📄 Reading SQL file: ${sqlFile}`);
    console.log(`📊 File size: ${(sqlContent.length / 1024).toFixed(2)} KB`);

    const client = await pool.connect();
    console.log('✅ Connected to database');

    // Execute SQL
    console.log('🚀 Executing SQL statements...');
    const result = await client.query(sqlContent);
    
    console.log('✅ SQL executed successfully!');
    if (result.rowCount) {
      console.log(`📝 Rows affected: ${result.rowCount}`);
    }
    
    client.release();
    await pool.end();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error executing SQL:', error.message);
    if (error.detail) {
      console.error('📋 Details:', error.detail);
    }
    process.exit(1);
  }
}

// Get SQL file from command line argument
const sqlFile = process.argv[2];
if (!sqlFile) {
  console.error('❌ Please provide SQL file path as argument');
  console.log('Usage: node scripts/upload-sql.js path/to/file.sql');
  process.exit(1);
}

uploadSQL(sqlFile);

