-- Enable RLS on the campaigns table
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to see only data from their tenant
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'campaigns' AND policyname = 'tenant_isolation_policy'
    ) THEN
        CREATE POLICY tenant_isolation_policy ON campaigns
            FOR ALL
            USING (auth.jwt() ->> 'tenantId' = tenant_id::text);
    END IF;
END $$;

-- Repeat similar policies for other tables (users, rewards, transactions, points)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'users' AND policyname = 'tenant_isolation_policy'
    ) THEN
        CREATE POLICY tenant_isolation_policy ON users
            FOR ALL
            USING (auth.jwt() ->> 'tenantId' = tenant_id::text);
    END IF;
END $$;

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'rewards' AND policyname = 'tenant_isolation_policy'
    ) THEN
        CREATE POLICY tenant_isolation_policy ON rewards
            FOR ALL
            USING (auth.jwt() ->> 'tenantId' = tenant_id::text);
    END IF;
END $$;

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'transactions' AND policyname = 'tenant_isolation_policy'
    ) THEN
        CREATE POLICY tenant_isolation_policy ON transactions
            FOR ALL
            USING (auth.jwt() ->> 'tenantId' = tenant_id::text);
    END IF;
END $$;

ALTER TABLE points ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'points' AND policyname = 'tenant_isolation_policy'
    ) THEN
        CREATE POLICY tenant_isolation_policy ON points
            FOR ALL
            USING (auth.jwt() ->> 'tenantId' = tenant_id::text);
    END IF;
END $$;