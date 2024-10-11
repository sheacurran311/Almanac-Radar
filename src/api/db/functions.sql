-- Function to ensure tenant isolation
CREATE OR REPLACE FUNCTION check_tenant_access()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    RAISE EXCEPTION 'tenant_id cannot be null';
  END IF;

  IF NEW.tenant_id != current_setting('app.current_tenant')::uuid THEN
    RAISE EXCEPTION 'Access denied to this tenant''s data';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the tenant check trigger to all relevant tables
CREATE TRIGGER check_users_tenant BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

CREATE TRIGGER check_campaigns_tenant BEFORE INSERT OR UPDATE ON campaigns
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

CREATE TRIGGER check_rewards_tenant BEFORE INSERT OR UPDATE ON rewards
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

CREATE TRIGGER check_transactions_tenant BEFORE INSERT OR UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

CREATE TRIGGER check_points_tenant BEFORE INSERT OR UPDATE ON points
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

-- Function to set the current tenant
CREATE OR REPLACE FUNCTION set_current_tenant(tenant_id uuid)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_tenant', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;