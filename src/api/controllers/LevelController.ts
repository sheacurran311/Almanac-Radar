import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

export const createLevel = async (req: Request, res: Response) => {
  const { name, requiredPoints, description } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('levels')
      .insert({
        name,
        required_points: requiredPoints,
        description,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Level created successfully', level: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const getLevel = async (req: Request, res: Response) => {
  const { levelId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('levels')
      .select('*')
      .eq('id', levelId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Level not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateLevel = async (req: Request, res: Response) => {
  const { levelId } = req.params;
  const { name, requiredPoints, description } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('levels')
      .update({
        name,
        required_points: requiredPoints,
        description
      })
      .eq('id', levelId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Level not found' });
    }

    res.json({ message: 'Level updated successfully', level: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteLevel = async (req: Request, res: Response) => {
  const { levelId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('levels')
      .delete()
      .eq('id', levelId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json({ message: 'Level deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const listLevels = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('levels')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('required_points', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};