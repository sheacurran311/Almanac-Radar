-- Enable RLS on the campaigns table
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS tenant_isolation_policy ON campaigns;

-- Create a new policy that allows users to see and modify only data from their tenant
CREATE POLICY tenant_isolation_policy ON campaigns
    FOR ALL
    USING (tenant_id::text = auth.jwt() ->> 'tenant_id')
    WITH CHECK (tenant_id::text = auth.jwt() ->> 'tenant_id');

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';