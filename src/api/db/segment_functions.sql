-- Function to add points to all customers in a segment
CREATE OR REPLACE FUNCTION add_points_to_segment(
  p_customer_ids UUID[],
  p_points INTEGER,
  p_tenant_id UUID
) RETURNS VOID AS $$
BEGIN
  -- Add points to each customer
  UPDATE customers
  SET points = points + p_points
  WHERE id = ANY(p_customer_ids) AND tenant_id = p_tenant_id;

  -- Log the points transaction for each customer
  INSERT INTO points_transactions (customer_id, points, transaction_type, description, tenant_id)
  SELECT 
    id, 
    p_points, 
    'SEGMENT_ACTION', 
    'Points added through segment action', 
    p_tenant_id
  FROM customers
  WHERE id = ANY(p_customer_ids) AND tenant_id = p_tenant_id;
END;
$$ LANGUAGE plpgsql;

-- Function to assign a level to all customers in a segment
CREATE OR REPLACE FUNCTION assign_level_to_segment(
  p_customer_ids UUID[],
  p_level_id UUID,
  p_tenant_id UUID
) RETURNS VOID AS $$
BEGIN
  -- Assign the new level to each customer
  UPDATE customers
  SET level_id = p_level_id
  WHERE id = ANY(p_customer_ids) AND tenant_id = p_tenant_id;

  -- Log the level change for each customer
  INSERT INTO customer_level_changes (customer_id, new_level_id, change_reason, tenant_id)
  SELECT 
    id, 
    p_level_id, 
    'Assigned through segment action', 
    p_tenant_id
  FROM customers
  WHERE id = ANY(p_customer_ids) AND tenant_id = p_tenant_id;
END;
$$ LANGUAGE plpgsql;