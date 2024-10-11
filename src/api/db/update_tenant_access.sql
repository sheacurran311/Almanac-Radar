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

-- Recreate the trigger for the campaigns table
DROP TRIGGER IF EXISTS check_campaigns_tenant ON campaigns;
CREATE TRIGGER check_campaigns_tenant
BEFORE INSERT OR UPDATE ON campaigns
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();