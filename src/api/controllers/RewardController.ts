import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const createReward = async (req: Request, res: Response) => {
  const { name, description, pointsCost, quantity, expirationDate } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .insert({
        name,
        description,
        points_cost: pointsCost,
        quantity,
        expiration_date: expirationDate,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Reward created successfully', reward: data[0] });
  } catch (error) {
    handleError(res, error);
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

    if (!data) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateReward = async (req: Request, res: Response) => {
  const { rewardId } = req.params;
  const { name, description, pointsCost, quantity, expirationDate } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('rewards')
      .update({
        name,
        description,
        points_cost: pointsCost,
        quantity,
        expiration_date: expirationDate
      })
      .eq('id', rewardId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    res.json({ message: 'Reward updated successfully', reward: data[0] });
  } catch (error) {
    handleError(res, error);
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
    handleError(res, error);
  }
};

export const listRewards = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { page = 1, limit = 10 } = req.query;

  try {
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    const { data, error, count } = await supabase
      .from('rewards')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('name', { ascending: true })
      .range(from, to);

    if (error) throw error;

    res.json({
      rewards: data,
      totalCount: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count! / Number(limit))
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const buyReward = async (req: Request, res: Response) => {
  const { customerId, rewardId } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    // First, check if the customer has enough points
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('points_cost, stripe_price_id')
      .eq('id', rewardId)
      .eq('tenant_id', tenantId)
      .single();

    if (rewardError) throw rewardError;

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('points, stripe_customer_id')
      .eq('id', customerId)
      .eq('tenant_id', tenantId)
      .single();

    if (customerError) throw customerError;

    if (customer.points < reward.points_cost) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Create a Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reward.points_cost * 100, // Stripe uses cents
      currency: 'usd',
      customer: customer.stripe_customer_id,
      payment_method_types: ['card'],
      metadata: {
        reward_id: rewardId,
        customer_id: customerId,
        tenant_id: tenantId
      }
    });

    // Deduct points and record the transaction
    const { data, error } = await supabase.rpc('buy_reward', {
      p_customer_id: customerId,
      p_reward_id: rewardId,
      p_tenant_id: tenantId,
      p_payment_intent_id: paymentIntent.id
    });

    if (error) throw error;

    res.json({ 
      message: 'Reward purchase initiated', 
      data,
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    handleError(res, error);
  }
};