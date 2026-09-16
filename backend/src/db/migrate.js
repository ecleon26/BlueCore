import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// Supabase pooler (port 6543) doesn't support session DDL needed by Drizzle migrator.
// We need the DIRECT connection: db.<project-ref>.supabase.co:5432
// Derive the direct URL from SUPABASE_URL which looks like https://<ref>.supabase.co
const supabaseUrl = process.env.SUPABASE_URL || '';
const projectRef = supabaseUrl.replace('https://', '').split('.')[0]; // e.g. "nmsngryyjnaarxfuvsqi"

// Extract password from the pooler URL
const poolerUrl = new URL(process.env.DATABASE_URL);
const password = poolerUrl.password;
const username = poolerUrl.username.split('.')[0]; // postgres.<ref> → postgres

const directUrl = `postgresql://${username}:${password}@db.${projectRef}.supabase.co:5432/postgres`;

console.log('[Drizzle] Connecting to Supabase direct endpoint (port 5432)...');
console.log(`[Drizzle] Host: db.${projectRef}.supabase.co`);

const sql = postgres(directUrl, { max: 1, ssl: 'require' });
const db = drizzle(sql);

try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('[Drizzle] ✅ All migrations applied successfully!');
} catch (err) {
    console.error('[Drizzle] ❌ Migration failed:', err.message);
    process.exit(1);
} finally {
    await sql.end();
}
