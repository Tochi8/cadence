-- Cadence v1. Paste into Supabase SQL editor and run once.
-- Auth users will map to profiles.id = auth.uid() later.

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  plan text not null default 'free',
  minutes_used numeric not null default 0,
  minutes_cap numeric not null default 10,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists characters (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  locale text not null,
  voice text,
  locked boolean not null default false,
  backend text,
  voice_id text,
  fingerprint text,
  created_at timestamptz not null default now()
);

create table if not exists scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null default 'Scene 1',
  created_at timestamptz not null default now()
);

create table if not exists lines (
  id uuid primary key default gen_random_uuid(),
  scene_id uuid not null references scenes(id) on delete cascade,
  character_id uuid not null references characters(id) on delete restrict,
  text text not null,
  emotion text not null default 'calm',
  pause_ms integer not null default 240,
  sort integer not null default 0
);

create table if not exists takes (
  id uuid primary key default gen_random_uuid(),
  line_id uuid not null references lines(id) on delete cascade,
  status text not null default 'stub',
  duration text,
  note text,
  audio_key text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table projects enable row level security;
alter table characters enable row level security;
alter table scenes enable row level security;
alter table lines enable row level security;
alter table takes enable row level security;

-- Server uses the service role and bypasses RLS.
-- When email auth lands, replace these with user_id = auth.uid() policies.

insert into profiles (email, plan, minutes_used, minutes_cap)
values ('demo@cadence.local', 'free', 2.4, 10)
on conflict (email) do nothing;
