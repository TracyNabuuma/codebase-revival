create type public.app_role as enum ('owner','manager');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  legacy_user_id uuid unique,
  created_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles read" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  -- The first account on a fresh farm becomes its owner; later accounts wait for access.
  if not exists (select 1 from public.user_roles) then
    insert into public.user_roles (user_id, role) values (new.id, 'owner');
  end if;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.user_preferences (
  user_id uuid primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.user_preferences to authenticated;
grant all on public.user_preferences to service_role;
alter table public.user_preferences enable row level security;
create policy "own prefs" on public.user_preferences for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.record_store (
  owner_id uuid not null,
  table_name text not null,
  id text not null,
  data jsonb not null,
  deleted_at timestamptz,
  updated_at timestamptz not null default now(),
  server_updated_at timestamptz not null default now(),
  primary key (owner_id, table_name, id)
);
create index record_store_owner_pull_idx on public.record_store (owner_id, server_updated_at);
grant select, insert, update on public.record_store to authenticated;
grant all on public.record_store to service_role;
alter table public.record_store enable row level security;
create policy "own records read" on public.record_store for select to authenticated using (owner_id = auth.uid());
create policy "own records insert" on public.record_store for insert to authenticated with check (owner_id = auth.uid() and (public.has_role(auth.uid(),'owner') or public.has_role(auth.uid(),'manager')));
create policy "own records update" on public.record_store for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Newest updated_at wins; replays are safe. Runs as the caller so RLS applies.
create or replace function public.sync_push(changes jsonb)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare
  entry jsonb; r jsonb; tbl text; rid text; applied int := 0; n int;
  rejected jsonb := '[]'::jsonb;
  allowed text[] := array['flocks','dailyReports','eggRecords','mortalityRecords','feedUsage','weightSamples','customers','sales','salePayments','expenses','feedStock','feedPurchases','medicineStock','vaccinations','medicationApplications','biosecurityLog','alerts','documents','equipment','cashLogs','photos','suppliers','expenseCategories','expensePayments','priceHistory','staffPayments','maintenanceRecords','pushSubscriptions','auditLog'];
begin
  if auth.uid() is null then raise exception 'Not signed in.'; end if;
  for entry in select * from jsonb_array_elements(coalesce(changes,'[]'::jsonb)) loop
    tbl := entry->>'table';
    if tbl is null or not (tbl = any(allowed)) then
      rejected := rejected || jsonb_build_object('table', coalesce(tbl,'?'), 'id','*','reason','table not allowed');
      continue;
    end if;
    for r in select * from jsonb_array_elements(coalesce(entry->'rows','[]'::jsonb)) loop
      rid := r->>'id';
      if rid is null or rid = '' then
        rejected := rejected || jsonb_build_object('table',tbl,'id','*','reason','missing id'); continue;
      end if;
      begin
        insert into record_store (owner_id, table_name, id, data, deleted_at, updated_at, server_updated_at)
        values (auth.uid(), tbl, rid, r - 'updatedAt' - 'deletedAt',
                nullif(r->>'deletedAt','')::timestamptz,
                coalesce(nullif(r->>'updatedAt','')::timestamptz, now()), clock_timestamp())
        on conflict (owner_id, table_name, id) do update set
          data = excluded.data, deleted_at = excluded.deleted_at,
          updated_at = excluded.updated_at, server_updated_at = clock_timestamp()
        where record_store.updated_at <= excluded.updated_at;
        get diagnostics n = row_count;
        applied := applied + n;
      exception when others then
        rejected := rejected || jsonb_build_object('table',tbl,'id',rid,'reason','write failed');
      end;
    end loop;
  end loop;
  return jsonb_build_object('applied', applied, 'rejected', rejected);
end $$;
revoke all on function public.sync_push(jsonb) from public, anon;
grant execute on function public.sync_push(jsonb) to authenticated;