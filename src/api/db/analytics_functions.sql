-- Drop the existing function
DROP FUNCTION IF EXISTS public.get_user_stats(UUID);

-- Create the updated function
CREATE OR REPLACE FUNCTION public.get_user_stats(p_tenant_id UUID)
RETURNS TABLE (
  total_users BIGINT,
  active_users BIGINT,
  new_users_last_30_days BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_users,
    COUNT(*)::BIGINT AS active_users, -- We'll consider all users as active for now
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::BIGINT AS new_users_last_30_days
  FROM "user"
  WHERE tenant_id = p_tenant_id;
END;
$$ LANGUAGE plpgsql;