-- Cadence LIVE schema (project gffawfrjmiujyabduqgo)
-- Auth-linked profiles, RLS user_id = auth.uid(), signup trigger.
-- Paste into SQL editor only if rebuilding; schema is already live.

-- Profiles mirror auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  display_name text,
  plan text not null default 'free',
  minutes_used numeric not null default 0,
  minutes_cap numeric not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  locale text not null,
  voice text,
  locked boolean not null default false,
  backend text,
  voice_id text,
  fingerprint text,
  created_at timestamptz not null default now()
);

create table if not exists public.scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'Scene 1',
  created_at timestamptz not null default now()
);

create table if not exists public.lines (
  id uuid primary key default gen_random_uuid(),
  scene_id uuid not null references public.scenes (id) on delete cascade,
  character_id uuid not null references public.characters (id) on delete restrict,
  user_id uuid not null references public.profiles (id) on delete cascade,
  text text not null,
  emotion text not null default 'calm',
  pause_ms integer not null default 240,
  sort integer not null default 0
);

create table if not exists public.takes (
  id uuid primary key default gen_random_uuid(),
  line_id uuid not null references public.lines (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'stub',
  duration text,
  note text,
  audio_key text,
  created_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on public.projects (user_id);
create index if not exists characters_project_id_idx on public.characters (project_id);
create index if not exists characters_user_id_idx on public.characters (user_id);
create index if not exists scenes_project_id_idx on public.scenes (project_id);
create index if not exists scenes_user_id_idx on public.scenes (user_id);
create index if not exists lines_scene_id_idx on public.lines (scene_id);
create index if not exists lines_user_id_idx on public.lines (user_id);
create index if not exists takes_line_id_idx on public.takes (line_id);
create index if not exists takes_user_id_idx on public.takes (user_id);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.characters enable row level security;
alter table public.scenes enable row level security;
alter table public.lines enable row level security;
alter table public.takes enable row level security;

-- Profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- Projects
drop policy if exists "projects_select_own" on public.projects;
create policy "projects_select_own" on public.projects
  for select using (user_id = auth.uid());
drop policy if exists "projects_insert_own" on public.projects;
create policy "projects_insert_own" on public.projects
  for insert with check (user_id = auth.uid());
drop policy if exists "projects_update_own" on public.projects;
create policy "projects_update_own" on public.projects
  for update using (user_id = auth.uid());
drop policy if exists "projects_delete_own" on public.projects;
create policy "projects_delete_own" on public.projects
  for delete using (user_id = auth.uid());

-- Characters
drop policy if exists "characters_select_own" on public.characters;
create policy "characters_select_own" on public.characters
  for select using (user_id = auth.uid());
drop policy if exists "characters_insert_own" on public.characters;
create policy "characters_insert_own" on public.characters
  for insert with check (user_id = auth.uid());
drop policy if exists "characters_update_own" on public.characters;
create policy "characters_update_own" on public.characters
  for update using (user_id = auth.uid());
drop policy if exists "characters_delete_own" on public.characters;
create policy "characters_delete_own" on public.characters
  for delete using (user_id = auth.uid());

-- Scenes
drop policy if exists "scenes_select_own" on public.scenes;
create policy "scenes_select_own" on public.scenes
  for select using (user_id = auth.uid());
drop policy if exists "scenes_insert_own" on public.scenes;
create policy "scenes_insert_own" on public.scenes
  for insert with check (user_id = auth.uid());
drop policy if exists "scenes_update_own" on public.scenes;
create policy "scenes_update_own" on public.scenes
  for update using (user_id = auth.uid());
drop policy if exists "scenes_delete_own" on public.scenes;
create policy "scenes_delete_own" on public.scenes
  for delete using (user_id = auth.uid());

-- Lines
drop policy if exists "lines_select_own" on public.lines;
create policy "lines_select_own" on public.lines
  for select using (user_id = auth.uid());
drop policy if exists "lines_insert_own" on public.lines;
create policy "lines_insert_own" on public.lines
  for insert with check (user_id = auth.uid());
drop policy if exists "lines_update_own" on public.lines;
create policy "lines_update_own" on public.lines
  for update using (user_id = auth.uid());
drop policy if exists "lines_delete_own" on public.lines;
create policy "lines_delete_own" on public.lines
  for delete using (user_id = auth.uid());

-- Takes
drop policy if exists "takes_select_own" on public.takes;
create policy "takes_select_own" on public.takes
  for select using (user_id = auth.uid());
drop policy if exists "takes_insert_own" on public.takes;
create policy "takes_insert_own" on public.takes
  for insert with check (user_id = auth.uid());
drop policy if exists "takes_update_own" on public.takes;
create policy "takes_update_own" on public.takes
  for update using (user_id = auth.uid());
drop policy if exists "takes_delete_own" on public.takes;
create policy "takes_delete_own" on public.takes
  for delete using (user_id = auth.uid());

-- Signup → profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Lock down trigger function
revoke all on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon, authenticated;
