import { Request, Response } from 'express';
import { supabase } from '../supabaseClient';

export const createCampaign = async (req: Request, res: Response) => {
  const { name, campaignType, active, pointsReward, limitPerUser, limitTotal, startAt, endAt } = req.body;
  const tenantId = req.user?.tenant_id; // Get tenantId from the authenticated user

  if (!tenantId) {
    return res.status(401).json({ error: 'Unauthorized: No tenant ID found' });
  }

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        name,
        campaign_type: campaignType,
        active,
        points_reward: pointsReward,
        limit_per_user: limitPerUser,
        limit_total: limitTotal,
        start_at: startAt,
        end_at: endAt,
        tenant_id: tenantId
      })
      .single();

    if (error) throw error;

    res.status(201).json({ message: 'Campaign created successfully', campaign: data });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(400).json({ error: 'Error creating campaign' });
  }
};

// ... (keep other existing functions)