-- Rename the "users" table to "user"
ALTER TABLE IF EXISTS users RENAME TO "user";

-- Update foreign key constraints
ALTER TABLE transactions
RENAME CONSTRAINT transactions_user_id_fkey TO transactions_user_id_fkey_new;

ALTER TABLE points
RENAME CONSTRAINT points_user_id_fkey TO points_user_id_fkey_new;

-- Enable RLS on the "user" table
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

-- Create policy for "user" table
CREATE POLICY tenant_isolation_policy ON "user"
    FOR ALL
    USING (auth.jwt() ->> 'tenant_id' = tenant_id::text);

-- Enable RLS on the "clients" table
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policy for "clients" table
CREATE POLICY tenant_isolation_policy ON clients
    FOR ALL
    USING (auth.jwt() ->> 'tenant_id' = tenant_id::text);

-- Enable RLS on the "integrations" table
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Create policy for "integrations" table
CREATE POLICY tenant_isolation_policy ON integrations
    FOR ALL
    USING (auth.jwt() ->> 'tenant_id' = tenant_id::text);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';