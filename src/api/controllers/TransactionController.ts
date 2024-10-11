import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

export const createTransaction = async (req: Request, res: Response) => {
  const { customerId, amount, type, description } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        customer_id: customerId,
        amount,
        type,
        description,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    // Apply earning rules if it's a purchase transaction
    if (type === 'PURCHASE') {
      await supabase.rpc('apply_earning_rule', {
        p_customer_id: customerId,
        p_event_type: 'TRANSACTION',
        p_event_name: 'PURCHASE',
        p_event_data: { amount },
        p_tenant_id: tenantId
      });
    }

    res.status(201).json({ message: 'Transaction created successfully', transaction: data[0] });
  } catch (error) {
    handleError(res, error);
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

    if (!data) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { page = 1, limit = 10, customerId } = req.query;

  try {
    let query = supabase
      .from('transactions')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (customerId) {
      query = query.eq('customer_id', customerId);
    }

    const { data, error, count } = await query
      .range((Number(page) - 1) * Number(limit), Number(page) * Number(limit) - 1);

    if (error) throw error;

    res.json({
      transactions: data,
      totalCount: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count! / Number(limit))
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const { amount, type, description } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .update({ amount, type, description })
      .eq('id', transactionId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction updated successfully', transaction: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};