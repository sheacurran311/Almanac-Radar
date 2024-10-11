import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

export const getCustomerStats = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('get_customer_stats', { p_tenant_id: tenantId });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPointsStats = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('get_points_stats', { p_tenant_id: tenantId });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getRewardStats = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('get_reward_stats', { p_tenant_id: tenantId });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCampaignStats = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('get_campaign_stats', { p_tenant_id: tenantId });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getTransactionStats = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { startDate, endDate } = req.query;

  try {
    const { data, error } = await supabase.rpc('get_transaction_stats', { 
      p_tenant_id: tenantId,
      p_start_date: startDate as string,
      p_end_date: endDate as string
    });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCustomerLifetimeValue = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { customerId } = req.params;

  try {
    const { data, error } = await supabase.rpc('get_customer_lifetime_value', { 
      p_tenant_id: tenantId,
      p_customer_id: customerId
    });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};