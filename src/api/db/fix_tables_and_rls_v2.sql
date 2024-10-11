-- Check if the "users" table exists and drop it if it does
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
        DROP TABLE IF EXISTS users CASCADE;
    END IF;
END $$;

-- Ensure the "user" table has the correct structure
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update foreign key constraints if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transactions_user_id_fkey') THEN
        ALTER TABLE transactions
        DROP CONSTRAINT transactions_user_id_fkey,
        ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'points_user_id_fkey') THEN
        ALTER TABLE points
        DROP CONSTRAINT points_user_id_fkey,
        ADD CONSTRAINT points_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);
    END IF;
END $$;

-- Enable RLS on the "user" table
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

-- Create or replace policy for "user" table
DROP POLICY IF EXISTS tenant_isolation_policy ON "user";
CREATE POLICY tenant_isolation_policy ON "user"
    FOR ALL
    USING (auth.jwt() ->> 'tenant_id' = tenant_id::text);

-- Enable RLS on the "clients" table
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create or replace policy for "clients" table
DROP POLICY IF EXISTS tenant_isolation_policy ON clients;
CREATE POLICY tenant_isolation_policy ON clients
    FOR ALL
    USING (auth.jwt() ->> 'tenant_id' = tenant_id::text);

-- Enable RLS on the "integrations" table
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Create or replace policy for "integrations" table
DROP POLICY IF EXISTS tenant_isolation_policy ON integrations;
CREATE POLICY tenant_isolation_policy ON integrations
    FOR ALL
    USING (auth.jwt() ->> 'tenant_id' = tenant_id::text);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';