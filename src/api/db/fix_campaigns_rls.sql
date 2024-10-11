-- Enable RLS on the campaigns table
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS tenant_isolation_policy ON campaigns;

-- Create a function to get the current tenant_id from the JWT
CREATE OR REPLACE FUNCTION get_current_tenant_id() RETURNS UUID AS $$
BEGIN
  RETURN (current_setting('request.jwt.claims', true)::jsonb->>'tenant_id')::UUID;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL::UUID;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new policy for campaigns table
CREATE POLICY tenant_isolation_policy ON campaigns
    FOR ALL
    USING (tenant_id = get_current_tenant_id())
    WITH CHECK (tenant_id = get_current_tenant_id());

-- Grant necessary permissions
GRANT ALL ON campaigns TO authenticated;
GRANT USAGE ON SEQUENCE campaigns_id_seq TO authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';