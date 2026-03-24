// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'
import path from 'path'

// Load .env.local or system environment variables
dotenv.config({ path: path.resolve(__dirname, '.env.local') })

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL is not defined! Please set it in .env.local or your environment."
    )
}

// Determine driver automatically
// If using a Neon WebSocket URL (neon://), use serverless driver
// Otherwise use regular pg driver for local TCP Postgres
const isNeonServerless = process.env.DATABASE_URL.startsWith('neon://')

export default defineConfig({
    schema: './app/db/schema.ts',          // your Drizzle schema
    out: './app/db/drizzle',               // migration folder
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
      ...(isNeonServerless && { driver: '@neondatabase/serverless' }),
    },
})