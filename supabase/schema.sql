create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  category_id uuid references public.categories(id),
  description text,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  created_at timestamptz default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_id uuid references public.customers(id),
  status text not null default 'pending',
  total_amount integer not null default 0,
  notes text,
  created_at timestamptz default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id),
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price integer not null,
  subtotal integer not null
);
