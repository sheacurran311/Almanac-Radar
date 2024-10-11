-- Add missing columns to campaigns table
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS start_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS end_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS limit_per_user INTEGER;

-- Update the check_tenant_access function
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

-- Recreate the trigger for the campaigns table
DROP TRIGGER IF EXISTS check_campaigns_tenant ON campaigns;
CREATE TRIGGER check_campaigns_tenant
BEFORE INSERT OR UPDATE ON campaigns
FOR EACH ROW EXECUTE FUNCTION check_tenant_access();

-- Update the set_current_tenant function if it doesn't exist
CREATE OR REPLACE FUNCTION set_current_tenant(tenant_id uuid)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_tenant', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;