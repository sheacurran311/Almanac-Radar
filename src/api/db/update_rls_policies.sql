-- Update the function to get the current tenant_id from the JWT
CREATE OR REPLACE FUNCTION get_current_tenant_id() RETURNS UUID AS $$
BEGIN
  RETURN (current_setting('request.jwt.claims', true)::jsonb->'user_metadata'->>'tenant_id')::UUID;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL::UUID;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies for all relevant tables
CREATE OR REPLACE POLICY tenant_isolation_policy ON "user"
    FOR ALL
    USING (tenant_id = get_current_tenant_id());

CREATE OR REPLACE POLICY tenant_isolation_policy ON clients
    FOR ALL
    USING (tenant_id = get_current_tenant_id());

CREATE OR REPLACE POLICY tenant_isolation_policy ON integrations
    FOR ALL
    USING (tenant_id = get_current_tenant_id());

CREATE OR REPLACE POLICY tenant_isolation_policy ON campaigns
    FOR ALL
    USING (tenant_id = get_current_tenant_id());

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';