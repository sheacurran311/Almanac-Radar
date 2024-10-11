import { Request, Response } from 'express';
import { supabase } from '../index';

export const addPoints = async (req: Request, res: Response) => {
  const { customerId, points, note } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('add_points', {
      p_customer_id: customerId,
      p_points: points,
      p_note: note,
      p_tenant_id: tenantId
    });

    if (error) throw error;

    res.json({ message: 'Points added successfully', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const subtractPoints = async (req: Request, res: Response) => {
  const { customerId, points, note } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('subtract_points', {
      p_customer_id: customerId,
      p_points: points,
      p_note: note,
      p_tenant_id: tenantId
    });

    if (error) throw error;

    res.json({ message: 'Points subtracted successfully', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const transferPoints = async (req: Request, res: Response) => {
  const { fromCustomerId, toCustomerId, points, note } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('transfer_points', {
      p_from_customer_id: fromCustomerId,
      p_to_customer_id: toCustomerId,
      p_points: points,
      p_note: note,
      p_tenant_id: tenantId
    });

    if (error) throw error;

    res.json({ message: 'Points transferred successfully', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPointsHistory = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('points_history')
      .select('*')
      .eq('customer_id', customerId)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};