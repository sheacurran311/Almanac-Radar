-- Drop the "users" table if it exists
DROP TABLE IF EXISTS users CASCADE;

-- Create or update the "user" table
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update foreign key constraints for transactions and points tables
ALTER TABLE transactions
DROP CONSTRAINT IF EXISTS transactions_user_id_fkey,
ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE points
DROP CONSTRAINT IF EXISTS points_user_id_fkey,
ADD CONSTRAINT points_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);

-- Enable RLS on relevant tables
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create or replace RLS policies
CREATE OR REPLACE FUNCTION auth_tenant_id() RETURNS UUID AS $$
  SELECT COALESCE(auth.jwt() ->> 'tenant_id', (current_setting('request.jwt.claims', true)::json ->> 'tenant_id'))::UUID;
$$ LANGUAGE SQL STABLE;

-- Policy for "user" table
DROP POLICY IF EXISTS tenant_isolation_policy ON "user";
CREATE POLICY tenant_isolation_policy ON "user"
    FOR ALL
    USING (tenant_id = auth_tenant_id());

-- Policy for "clients" table
DROP POLICY IF EXISTS tenant_isolation_policy ON clients;
CREATE POLICY tenant_isolation_policy ON clients
    FOR ALL
    USING (tenant_id = auth_tenant_id());

-- Policy for "integrations" table
DROP POLICY IF EXISTS tenant_isolation_policy ON integrations;
CREATE POLICY tenant_isolation_policy ON integrations
    FOR ALL
    USING (tenant_id = auth_tenant_id());

-- Policy for "campaigns" table
DROP POLICY IF EXISTS tenant_isolation_policy ON campaigns;
CREATE POLICY tenant_isolation_policy ON campaigns
    FOR ALL
    USING (tenant_id = auth_tenant_id());

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';