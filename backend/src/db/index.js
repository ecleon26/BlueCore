import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

// Use DATABASE_URL from .env
// Note: For migrations (drizzle-kit), a direct connection (port 5432) is needed.
// For runtime queries, the pooler URL (port 6543) is fine.
const client = postgres(process.env.DATABASE_URL, { max: 10 });

export const db = drizzle(client, { schema });

export { schema };
