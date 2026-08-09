-- ============================================================================
-- BRANIFY SUPABASE DATABASE SCHEMA MIGRATION
-- Phase 1: Schema Setup & Security Policies
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. SECURITY HELPER FUNCTION
-- ----------------------------------------------------------------------------
-- Helper function to check if the current auth user is an authorized admin.
-- Uses SECURITY DEFINER to bypass recursive RLS checks on admin_users table.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Helper function to automatically update timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 2. TABLES DEFINITION
-- ----------------------------------------------------------------------------

-- A. admin_users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- B. products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  sale_price NUMERIC(10, 2) CHECK (sale_price >= 0),
  product_type TEXT NOT NULL DEFAULT 'digital',
  download_info JSONB,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- C. blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  read_time TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- D. portfolio_items
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  metrics JSONB,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  testimonial JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- E. contact_submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- F. newsletter_subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'subscribed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- G. orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- H. order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. TRIGGERS FOR UPDATED_AT
-- ----------------------------------------------------------------------------
CREATE TRIGGER tr_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tr_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tr_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tr_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category_active ON public.products(category, is_active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON public.blog_posts(is_published, date DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_slug ON public.portfolio_items(slug);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON public.newsletter_subscriptions(email);

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 1. admin_users
CREATE POLICY "Admin users viewable only by admin"
  ON public.admin_users FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin users manageable only by admin"
  ON public.admin_users FOR ALL
  USING (public.is_admin());

-- 2. products
CREATE POLICY "Public users read active products"
  ON public.products FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin full manage products"
  ON public.products FOR ALL
  USING (public.is_admin());

-- 3. blog_posts
CREATE POLICY "Public users read published blog posts"
  ON public.blog_posts FOR SELECT
  USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin full manage blog posts"
  ON public.blog_posts FOR ALL
  USING (public.is_admin());

-- 4. portfolio_items
CREATE POLICY "Public users read portfolio items"
  ON public.portfolio_items FOR SELECT
  USING (true);

CREATE POLICY "Admin full manage portfolio items"
  ON public.portfolio_items FOR ALL
  USING (public.is_admin());

-- 5. contact_submissions
CREATE POLICY "Public submit contact forms"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin manage contact submissions"
  ON public.contact_submissions FOR ALL
  USING (public.is_admin());

-- 6. newsletter_subscriptions
CREATE POLICY "Public subscribe to newsletter"
  ON public.newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin manage newsletter subscriptions"
  ON public.newsletter_subscriptions FOR ALL
  USING (public.is_admin());

-- 7. orders
CREATE POLICY "Admin manage orders"
  ON public.orders FOR ALL
  USING (public.is_admin());

-- 8. order_items
CREATE POLICY "Admin manage order items"
  ON public.order_items FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6. SUPABASE STORAGE BUCKETS & SECURITY
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES
  ('product-images', 'product-images', true),
  ('product-files', 'product-files', false),
  ('blog-images', 'blog-images', true),
  ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to public image buckets
CREATE POLICY "Public read for public image buckets"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('product-images', 'blog-images', 'portfolio-images'));

-- Admin full access across all storage buckets
CREATE POLICY "Admin manage storage objects"
  ON storage.objects FOR ALL
  USING (public.is_admin());
