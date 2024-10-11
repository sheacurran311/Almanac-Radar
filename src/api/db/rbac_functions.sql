-- Function to get all permissions for a user
CREATE OR REPLACE FUNCTION get_user_permissions(p_user_id UUID, p_tenant_id UUID)
RETURNS TABLE (permission_name TEXT, resource TEXT, action TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT p.name, p.resource, p.action
  FROM permissions p
  JOIN role_permissions rp ON p.id = rp.permission_id
  JOIN user_roles ur ON rp.role_id = ur.role_id
  WHERE ur.user_id = p_user_id AND ur.tenant_id = p_tenant_id;
END;
$$;

-- Function to check if a user has a specific permission
CREATE OR REPLACE FUNCTION user_has_permission(p_user_id UUID, p_tenant_id UUID, p_permission_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM get_user_permissions(p_user_id, p_tenant_id) up
    WHERE up.permission_name = p_permission_name
  ) INTO v_has_permission;
  
  RETURN v_has_permission;
END;
$$;

-- Function to assign a role to a user
CREATE OR REPLACE FUNCTION assign_role_to_user(p_user_id UUID, p_role_id UUID, p_tenant_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO user_roles (user_id, role_id, tenant_id)
  VALUES (p_user_id, p_role_id, p_tenant_id)
  ON CONFLICT (user_id, role_id, tenant_id) DO NOTHING;
END;
$$;

-- Function to remove a role from a user
CREATE OR REPLACE FUNCTION remove_role_from_user(p_user_id UUID, p_role_id UUID, p_tenant_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM user_roles
  WHERE user_id = p_user_id AND role_id = p_role_id AND tenant_id = p_tenant_id;
END;
$$;