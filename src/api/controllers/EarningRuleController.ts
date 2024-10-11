import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

export const createEarningRule = async (req: Request, res: Response) => {
  const { name, description, pointsAmount, eventType, eventName } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('earning_rules')
      .insert({
        name,
        description,
        points_amount: pointsAmount,
        event_type: eventType,
        event_name: eventName,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Earning rule created successfully', rule: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const getEarningRule = async (req: Request, res: Response) => {
  const { ruleId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('earning_rules')
      .select('*')
      .eq('id', ruleId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Earning rule not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateEarningRule = async (req: Request, res: Response) => {
  const { ruleId } = req.params;
  const { name, description, pointsAmount, eventType, eventName } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('earning_rules')
      .update({
        name,
        description,
        points_amount: pointsAmount,
        event_type: eventType,
        event_name: eventName
      })
      .eq('id', ruleId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Earning rule not found' });
    }

    res.json({ message: 'Earning rule updated successfully', rule: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteEarningRule = async (req: Request, res: Response) => {
  const { ruleId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('earning_rules')
      .delete()
      .eq('id', ruleId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json({ message: 'Earning rule deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const listEarningRules = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('earning_rules')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};