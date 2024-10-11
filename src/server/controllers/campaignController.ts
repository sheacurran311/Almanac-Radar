import { Request, Response } from 'express';
import { supabase } from '../index';
import { handleError } from '../utils/errorHandler';

export const createCampaign = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate, pointsReward, active } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        name,
        description,
        start_date: startDate,
        end_date: endDate,
        points_reward: pointsReward,
        active,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Campaign created successfully', campaign: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const getCampaign = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  const { name, description, startDate, endDate, pointsReward, active } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update({
        name,
        description,
        start_date: startDate,
        end_date: endDate,
        points_reward: pointsReward,
        active
      })
      .eq('id', campaignId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ message: 'Campaign updated successfully', campaign: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const listCampaigns = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { page = 1, limit = 10 } = req.query;

  try {
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    const { data, error, count } = await supabase
      .from('campaigns')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('start_date', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      campaigns: data,
      totalCount: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count! / Number(limit))
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const joinCampaign = async (req: Request, res: Response) => {
  const { customerId, campaignId } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('join_campaign', {
      p_customer_id: customerId,
      p_campaign_id: campaignId,
      p_tenant_id: tenantId
    });

    if (error) throw error;

    res.json({ message: 'Customer joined campaign successfully', data });
  } catch (error) {
    handleError(res, error);
  }
};