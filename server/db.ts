import dotenv from "dotenv";
dotenv.config();

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Please set up a production database and configure the DATABASE_URL environment variable.",
  );
}

// Don't use local database URL in production
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL.includes('localhost')) {
  throw new Error(
    "Production environment detected but DATABASE_URL points to localhost. Please set a production database URL.",
  );
}

// Configure SSL for production (required for most cloud databases)
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });
