-- Drop the existing policy if it exists
DROP POLICY IF EXISTS tenant_isolation_policy ON campaigns;

-- Create a new policy that allows users to see and modify only data from their tenant
CREATE POLICY tenant_isolation_policy ON campaigns
    FOR ALL
    USING (auth.jwt() ->> 'tenantId' = tenant_id::text)
    WITH CHECK (auth.jwt() ->> 'tenantId' = tenant_id::text);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';