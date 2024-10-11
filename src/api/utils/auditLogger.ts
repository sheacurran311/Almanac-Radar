import { supabase } from '../server';

export const logRBACAction = async (
  userId: string,
  action: string,
  entityType: string,
  entityId: string | null,
  details: any,
  tenantId: string
) => {
  try {
    await supabase.from('rbac_audit_log').insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      tenant_id: tenantId
    });
  } catch (error) {
    console.error('Error logging RBAC action:', error);
  }
};