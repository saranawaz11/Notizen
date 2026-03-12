import 'dotenv/config'
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// console.log("DB URL:", process.env.DATABASE_URL) // check if it's undefined
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });
export default db;