import { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient';

export const tenantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'] as string;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('id')
      .eq('id', tenantId)
      .single();

    if (error || !data) {
      return res.status(403).json({ error: 'Invalid tenant ID' });
    }

    (req as any).tenantId = tenantId;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error verifying tenant' });
  }
};