-- Create the rbac_audit_log table
CREATE TABLE rbac_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on tenant_id and created_at for faster querying
CREATE INDEX idx_rbac_audit_log_tenant_created ON rbac_audit_log(tenant_id, created_at);