-- Update the check_tenant_access function
CREATE OR REPLACE FUNCTION check_tenant_access()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    RAISE EXCEPTION 'tenant_id cannot be null';
  END IF;

  IF NEW.tenant_id != (current_setting('jwt.claims.tenant_id', true))::uuid THEN
    RAISE EXCEPTION 'Access denied to this tenant''s data';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate triggers for all relevant tables
DROP TRIGGER IF EXISTS check_users_tenant ON users;
CREATE TRIGGER check_users_tenant
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

DROP TRIGGER IF EXISTS check_campaigns_tenant ON campaigns;
CREATE TRIGGER check_campaigns_tenant
BEFORE INSERT OR UPDATE ON campaigns
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

DROP TRIGGER IF EXISTS check_rewards_tenant ON rewards;
CREATE TRIGGER check_rewards_tenant
BEFORE INSERT OR UPDATE ON rewards
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

DROP TRIGGER IF EXISTS check_transactions_tenant ON transactions;
CREATE TRIGGER check_transactions_tenant
BEFORE INSERT OR UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

DROP TRIGGER IF EXISTS check_points_tenant ON points;
CREATE TRIGGER check_points_tenant
BEFORE INSERT OR UPDATE ON points
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

-- Create or replace the set_current_tenant function
CREATE OR REPLACE FUNCTION set_current_tenant(tenant_id uuid)
RETURNS void AS $$
BEGIN
  PERFORM set_config('jwt.claims.tenant_id', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;