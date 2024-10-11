import { Request, Response, NextFunction } from 'express';
import { supabase } from '../server';

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;
    const tenantId = (req as any).tenantId;

    try {
      const { data, error } = await supabase.rpc('user_has_permission', {
        p_user_id: userId,
        p_tenant_id: tenantId,
        p_permission_name: requiredPermission
      });

      if (error) throw error;

      if (data) {
        next();
      } else {
        res.status(403).json({ error: 'Insufficient permissions' });
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};