import { pgTable, uuid, text, integer, jsonb, timestamp, check, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─── Profiles ─────────────────────────────────────────────────────────────────
export const profiles = pgTable(
    'profiles',
    {
        id: uuid('id').primaryKey(), // References auth.users(id) — set by Supabase Auth
        username: text('username').unique().notNull(),
        full_name: text('full_name').notNull(),
        age: integer('age').notNull(),
        avatar: text('avatar').default('🧒'),
        total_games: integer('total_games').default(0),
        total_wins: integer('total_wins').default(0),
        last_unlocked_level: integer('last_unlocked_level').default(1),
        tutorial_completed: boolean('tutorial_completed').default(false),
        created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
    },
    (t) => [
        check('age_range', sql`${t.age} >= 7 AND ${t.age} <= 14`)
    ]
);

// ─── Game Sessions ─────────────────────────────────────────────────────────────
export const gameSessions = pgTable(
    'game_sessions',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        user_id: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
        level: integer('level').default(1),
        started_at: timestamp('started_at', { withTimezone: true }).defaultNow(),
        ended_at: timestamp('ended_at', { withTimezone: true }),
        outcome: text('outcome'),
        final_cash: integer('final_cash'),
        final_revenue: integer('final_revenue'),
        final_morale: integer('final_morale'),
        final_reputation: integer('final_reputation'),
        ai_summary: jsonb('ai_summary')
    },
    (t) => [
        check('valid_outcome', sql`${t.outcome} IN ('win', 'loss_time', 'loss_bankrupt')`)
    ]
);

// ─── Action Logs ───────────────────────────────────────────────────────────────
export const actionLogs = pgTable('action_logs', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    session_id: uuid('session_id').references(() => gameSessions.id, { onDelete: 'cascade' }),
    timestamp_secs: integer('timestamp_secs').notNull().default(0),
    action_type: text('action_type').notNull(),
    action_data: jsonb('action_data')
});
