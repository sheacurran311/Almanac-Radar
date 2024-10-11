CREATE TABLE integrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  api_key VARCHAR(255),
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on tenant_id for faster queries
CREATE INDEX idx_integrations_tenant_id ON integrations(tenant_id);

-- Add a unique constraint to ensure each tenant can have only one integration of each type
ALTER TABLE integrations ADD CONSTRAINT unique_integration_per_tenant UNIQUE (tenant_id, name);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_integrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_integrations_updated_at
BEFORE UPDATE ON integrations
FOR EACH ROW
EXECUTE FUNCTION update_integrations_updated_at();