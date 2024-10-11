import { Request, Response } from 'express';
import { supabase } from '../index';

export const registerCustomer = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, loyaltyCardNumber } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        loyalty_card_number: loyaltyCardNumber,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Customer registered successfully', customer: data[0] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const { firstName, lastName, email, phone } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('customers')
      .update({
        first_name: firstName,
        last_name: lastName,
        email,
        phone
      })
      .eq('id', customerId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully', customer: data[0] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCustomerTransactions = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', customerId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCustomerRewards = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('customer_rewards')
      .select('*, rewards(*)')
      .eq('customer_id', customerId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCustomerCampaigns = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('customer_campaigns')
      .select('*, campaigns(*)')
      .eq('customer_id', customerId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};