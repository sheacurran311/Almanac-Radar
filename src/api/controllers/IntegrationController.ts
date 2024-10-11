import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

export const getIntegrations = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;

    // Mask API keys before sending the response
    const maskedData = data.map(integration => ({
      ...integration,
      apiKey: integration.apiKey ? '••••••••' : null
    }));

    res.json(maskedData);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateIntegration = async (req: Request, res: Response) => {
  const { integrationId } = req.params;
  const { apiKey, isActive } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('integrations')
      .update({ api_key: apiKey, is_active: isActive })
      .eq('id', integrationId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Mask API key before sending the response
    const maskedData = {
      ...data[0],
      apiKey: data[0].apiKey ? '••••••••' : null
    };

    res.json({ message: 'Integration updated successfully', integration: maskedData });
  } catch (error) {
    handleError(res, error);
  }
};