import { Request, Response } from 'express';
import { supabase } from '../supabaseClient';

export const createTransaction = async (req: Request, res: Response) => {
  const { userId, type, amount } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type,
        amount,
        tenant_id: tenantId
      })
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error creating transaction' });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Transaction not found' });
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { userId } = req.query;

  try {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('tenant_id', tenantId);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching transactions' });
  }
};