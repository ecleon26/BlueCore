import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function run() {
    console.log('--- DB FIX START ---');
    try {
        // Add last_unlocked_level if missing
        console.log('Adding last_unlocked_level...');
        await sql`
            ALTER TABLE profiles 
            ADD COLUMN IF NOT EXISTS last_unlocked_level INTEGER DEFAULT 1;
        `;

        // Add tutorial_completed if missing
        console.log('Adding tutorial_completed...');
        await sql`
            ALTER TABLE profiles 
            ADD COLUMN IF NOT EXISTS tutorial_completed BOOLEAN DEFAULT false;
        `;

        console.log('Database schema updated successfully!');
    } catch (err) {
        console.error('Error updating database:', err.message);
    } finally {
        await sql.end();
        console.log('--- DB FIX END ---');
    }
}

run();
