import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function verify() {
    try {
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'profiles';
        `;
        console.log('--- PROFILES COLUMNS ---');
        columns.forEach(c => console.log(`${c.column_name}: ${c.data_type}`));
    } catch (err) {
        console.error('Verification failed:', err.message);
    } finally {
        await sql.end();
    }
}

verify();
