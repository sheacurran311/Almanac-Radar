import { Request, Response } from 'express';
import { supabase } from '../supabaseClient';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, loyaltyCardNumber } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        loyalty_card_number: loyaltyCardNumber,
        tenant_id: tenantId
      })
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phone, loyaltyCardNumber } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        loyalty_card_number: loyaltyCardNumber
      })
      .eq('id', userId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching users' });
  }
};

export const getUserPoints = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('points')
      .select('points')
      .eq('user_id', userId)
      .eq('tenant_id', tenantId)
      .sum('points');

    if (error) throw error;

    res.json({ points: data[0].sum });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user points' });
  }
};

export const getUserTransactions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user transactions' });
  }
};

export const getUserCampaigns = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('tenant_id', tenantId)
      .filter('start_at', 'lte', new Date().toISOString())
      .filter('end_at', 'gte', new Date().toISOString());

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user campaigns' });
  }
};

export const getUserRewards = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user rewards' });
  }
};