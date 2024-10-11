import { Request, Response } from 'express';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const getTenants = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants' });
  }
};

export const getUsage = async (req: Request, res: Response) => {
  try {
    // Implement logic to fetch usage data from your database or analytics service
    const usage = {
      totalApiCalls: 1000000,
      activeUsers: 50000,
      storageUsed: 500
    };

    res.json(usage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching usage data' });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Implement logic to fetch analytics data from your database or analytics service
    const analytics = {
      newTenants: 50,
      totalRevenue: 100000
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};

export const generateApiKey = async (req: Request, res: Response) => {
  const { tenantId } = req.params;

  try {
    const apiKey = uuidv4();

    const { data, error } = await supabase
      .from('tenants')
      .update({ api_key: apiKey })
      .eq('id', tenantId);

    if (error) throw error;

    res.json({ apiKey });
  } catch (error) {
    res.status(500).json({ message: 'Error generating API key' });
  }
};