-- Empire Protocol Database Schema
-- Run this in your Supabase SQL Editor

-- ─── Profiles Table ───────────────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  full_name   text not null,
  age         int not null check (age >= 7 and age <= 14),
  avatar      text default '🧒',
  total_games int default 0,
  total_wins  int default 0,
  created_at  timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policy: users can read/update their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Policy: backend service role can do everything (handled via service key, not needed as policy)

-- ─── Game Sessions Table ──────────────────────────────────────────────────────
create table if not exists game_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references profiles(id) on delete cascade,
  level            int default 1,
  started_at       timestamptz default now(),
  ended_at         timestamptz,
  outcome          text check (outcome in ('win', 'loss_time', 'loss_bankrupt')),
  final_cash       int,
  final_revenue    int,
  final_morale     int,
  final_reputation int,
  ai_summary       jsonb
);

alter table game_sessions enable row level security;

create policy "Users can view own sessions" on game_sessions
  for select using (auth.uid() = user_id);

-- ─── Action Logs Table ────────────────────────────────────────────────────────
create table if not exists action_logs (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid references game_sessions(id) on delete cascade,
  timestamp_secs   int not null default 0,
  action_type      text not null,
  action_data      jsonb
);

alter table action_logs enable row level security;

create policy "Users can view own logs" on action_logs
  for select using (
    exists (
      select 1 from game_sessions gs
      where gs.id = action_logs.session_id
        and gs.user_id = auth.uid()
    )
  );

-- ─── Indexes ─────────────────────────────────────────────────────────────────
create index if not exists idx_game_sessions_user_id on game_sessions(user_id);
create index if not exists idx_action_logs_session_id on action_logs(session_id);
