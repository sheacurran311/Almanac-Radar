import { Request, Response } from 'express';
import { supabase } from '../supabaseClient';

export const createReward = async (req: Request, res: Response) => {
  const { name, description, value, rewardType, active } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .insert({
        name,
        description,
        value,
        reward_type: rewardType,
        active,
        tenant_id: tenantId
      })
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error creating reward' });
  }
};

export const getReward = async (req: Request, res: Response) => {
  const { rewardId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Reward not found' });
  }
};

export const updateReward = async (req: Request, res: Response) => {
  const { rewardId } = req.params;
  const { name, description, value, rewardType, active } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .update({
        name,
        description,
        value,
        reward_type: rewardType,
        active
      })
      .eq('id', rewardId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error updating reward' });
  }
};

export const deleteReward = async (req: Request, res: Response) => {
  const { rewardId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('rewards')
      .delete()
      .eq('id', rewardId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json({ message: 'Reward deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting reward' });
  }
};

export const listRewards = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching rewards' });
  }
};

export const buyReward = async (req: Request, res: Response) => {
  const { userId, rewardId } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    // Start a Supabase transaction
    const { data, error } = await supabase.rpc('buy_reward', {
      p_user_id: userId,
      p_reward_id: rewardId,
      p_tenant_id: tenantId
    });

    if (error) throw error;

    res.json({ message: 'Reward purchased successfully', transaction: data });
  } catch (error) {
    res.status(400).json({ error: 'Error purchasing reward' });
  }
};