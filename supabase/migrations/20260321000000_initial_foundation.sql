-- ============================================================
-- ANNASETU PRODUCTION FOUNDATION MIGRATION
-- Version: 20260321000000
-- Description: Core schema, tables, foreign keys, indexes, RLS policies, and seed data.
-- ============================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (Linked to auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. ORGANIZATIONS (Tenants: Restaurants, NGOs, Community Partners, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization_type TEXT NOT NULL CHECK (organization_type IN ('RESTAURANT', 'FOOD_BUSINESS', 'HOTEL', 'CANTEEN', 'INSTITUTION', 'NGO', 'COMMUNITY_PARTNER', 'PLATFORM')),
  legal_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_verification')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. BRANCHES (Organization locations/branches)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. ROLES (Global platform roles)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. PERMISSIONS (Granular platform permissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. ROLE_PERMISSIONS (Mapping roles to permissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_role_permission UNIQUE (role_id, permission_id)
);

-- ============================================================
-- 7. ORGANIZATION_MEMBERS (User membership within organizations)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES public.roles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'invited')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_organization UNIQUE (organization_id, user_id)
);

-- ============================================================
-- 8. AUDIT_LOGS (Immutable event audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_branches_org_id ON public.branches(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_org_id ON public.audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON public.audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

-- ============================================================
-- HELPER FUNCTIONS FOR RLS (Recursion Safety via SECURITY DEFINER)
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_user_org_ids(p_user_id UUID)
RETURNS SETOF UUID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT organization_id FROM public.organization_members WHERE user_id = p_user_id AND status = 'active';
$$;

CREATE OR REPLACE FUNCTION public.user_has_role(p_user_id UUID, p_role_code TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.organization_members om
    JOIN public.roles r ON om.role_id = r.id
    WHERE om.user_id = p_user_id AND r.code = p_role_code AND om.status = 'active'
  );
$$;

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ORGANIZATIONS POLICIES
DROP POLICY IF EXISTS "Members can view their organizations" ON public.organizations;
CREATE POLICY "Members can view their organizations" ON public.organizations
  FOR SELECT USING (id IN (SELECT public.get_user_org_ids(auth.uid())));

DROP POLICY IF EXISTS "Organization admins can update organization" ON public.organizations;
CREATE POLICY "Organization admins can update organization" ON public.organizations
  FOR UPDATE USING (id IN (SELECT public.get_user_org_ids(auth.uid())));

DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;
CREATE POLICY "Authenticated users can create organizations" ON public.organizations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- BRANCHES POLICIES
DROP POLICY IF EXISTS "Members can view organization branches" ON public.branches;
CREATE POLICY "Members can view organization branches" ON public.branches
  FOR SELECT USING (organization_id IN (SELECT public.get_user_org_ids(auth.uid())));

DROP POLICY IF EXISTS "Organization members can manage branches" ON public.branches;
CREATE POLICY "Organization members can manage branches" ON public.branches
  FOR ALL USING (organization_id IN (SELECT public.get_user_org_ids(auth.uid())));

-- ROLES & PERMISSIONS POLICIES (Read-only for authenticated users)
DROP POLICY IF EXISTS "Anyone authenticated can read roles" ON public.roles;
CREATE POLICY "Anyone authenticated can read roles" ON public.roles
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone authenticated can read permissions" ON public.permissions;
CREATE POLICY "Anyone authenticated can read permissions" ON public.permissions
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone authenticated can read role_permissions" ON public.role_permissions;
CREATE POLICY "Anyone authenticated can read role_permissions" ON public.role_permissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- ORGANIZATION MEMBERS POLICIES
DROP POLICY IF EXISTS "Members can view organization members" ON public.organization_members;
CREATE POLICY "Members can view organization members" ON public.organization_members
  FOR SELECT USING (organization_id IN (SELECT public.get_user_org_ids(auth.uid())));

DROP POLICY IF EXISTS "Organization admins can manage members" ON public.organization_members;
CREATE POLICY "Organization members can insert membership on creation" ON public.organization_members
  FOR INSERT WITH CHECK (user_id = auth.uid() OR organization_id IN (SELECT public.get_user_org_ids(auth.uid())));

-- AUDIT LOGS POLICIES
DROP POLICY IF EXISTS "Organization members can view audit logs" ON public.audit_logs;
CREATE POLICY "Organization members can view audit logs" ON public.audit_logs
  FOR SELECT USING (organization_id IN (SELECT public.get_user_org_ids(auth.uid())));

DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON public.audit_logs;
CREATE POLICY "Authenticated users can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA (Idempotent Roles & Permissions)
-- ============================================================
INSERT INTO public.roles (code, name, description) VALUES
  ('SUPER_ADMIN', 'Super Admin', 'Full system access'),
  ('PLATFORM_ADMIN', 'Platform Admin', 'Platform management access'),
  ('RESTAURANT_OWNER', 'Restaurant Owner', 'Owner of restaurant organization'),
  ('RESTAURANT_ADMIN', 'Restaurant Admin', 'Administrator of restaurant branch/org'),
  ('RESTAURANT_STAFF', 'Restaurant Staff', 'Staff operational access'),
  ('NGO_ADMIN', 'NGO Admin', 'Administrator of NGO organization'),
  ('NGO_STAFF', 'NGO Staff', 'NGO operational staff'),
  ('COMMUNITY_PARTNER', 'Community Partner', 'Verified community rescue partner'),
  ('DRIVER', 'Delivery Driver', 'Logistics and pickup driver'),
  ('CONSUMER', 'Consumer', 'Marketplace rescue consumer')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.permissions (code, description) VALUES
  ('organization.read', 'Read organization details'),
  ('organization.write', 'Modify organization details'),
  ('branch.read', 'Read branch details'),
  ('branch.write', 'Modify branch details'),
  ('profile.read', 'Read user profile'),
  ('profile.write', 'Modify user profile'),
  ('inventory.read', 'Read inventory items'),
  ('inventory.write', 'Modify inventory items'),
  ('surplus.read', 'Read surplus batches'),
  ('surplus.write', 'Modify surplus batches'),
  ('match.read', 'Read NGO/community matches'),
  ('match.write', 'Modify NGO/community matches'),
  ('audit.read', 'Read audit logs')
ON CONFLICT (code) DO NOTHING;
