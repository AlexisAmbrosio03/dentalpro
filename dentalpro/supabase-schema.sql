-- DentalPro - Esquema de base de datos
-- Ejecutar en Supabase > SQL Editor

-- Pacientes
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  birth_date date,
  phone text,
  email text,
  address text,
  notes text,
  created_at timestamptz default now()
);

-- Consultas / Historial clínico
create table if not exists consults (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  consult_date date not null default current_date,
  chief_complaint text,
  diagnosis text,
  notes text,
  created_at timestamptz default now()
);

-- Tratamientos
create table if not exists treatments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  description text not null,
  tooth_number text,
  status text default 'pendiente',
  cost numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- Citas
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  appointment_date date not null,
  appointment_time time not null,
  reason text,
  status text default 'programada',
  created_at timestamptz default now()
);

-- Odontograma
create table if not exists odontogram (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  tooth_number integer not null,
  status text default 'sano',
  notes text,
  updated_at timestamptz default now(),
  unique(patient_id, tooth_number)
);

-- Índices
create index if not exists idx_consults_patient on consults(patient_id);
create index if not exists idx_treatments_patient on treatments(patient_id);
create index if not exists idx_appointments_date on appointments(appointment_date);
create index if not exists idx_odontogram_patient on odontogram(patient_id);

-- Deshabilitar RLS (uso privado con service_role key)
alter table patients disable row level security;
alter table consults disable row level security;
alter table treatments disable row level security;
alter table appointments disable row level security;
alter table odontogram disable row level security;
