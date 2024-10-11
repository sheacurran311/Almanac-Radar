import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';
import { redis } from '../services/redisService';

export const createSegment = async (req: Request, res: Response) => {
  const { name, description, criteria } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('segments')
      .insert({
        name,
        description,
        criteria,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    // Invalidate cache
    await redis.del(`segments:${tenantId}`);

    res.status(201).json({ message: 'Segment created successfully', segment: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const getSegment = async (req: Request, res: Response) => {
  const { segmentId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const cachedSegment = await redis.get(`segment:${tenantId}:${segmentId}`);
    if (cachedSegment) {
      return res.json(JSON.parse(cachedSegment));
    }

    const { data, error } = await supabase
      .from('segments')
      .select('*')
      .eq('id', segmentId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Segment not found' });
    }

    // Cache the result
    await redis.set(`segment:${tenantId}:${segmentId}`, JSON.stringify(data), 'EX', 3600);

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateSegment = async (req: Request, res: Response) => {
  const { segmentId } = req.params;
  const { name, description, criteria } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('segments')
      .update({
        name,
        description,
        criteria
      })
      .eq('id', segmentId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Segment not found' });
    }

    // Invalidate cache
    await redis.del(`segment:${tenantId}:${segmentId}`);
    await redis.del(`segments:${tenantId}`);

    res.json({ message: 'Segment updated successfully', segment: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteSegment = async (req: Request, res: Response) => {
  const { segmentId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('segments')
      .delete()
      .eq('id', segmentId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    // Invalidate cache
    await redis.del(`segment:${tenantId}:${segmentId}`);
    await redis.del(`segments:${tenantId}`);

    res.json({ message: 'Segment deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const listSegments = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;

  try {
    const cachedSegments = await redis.get(`segments:${tenantId}`);
    if (cachedSegments) {
      return res.json(JSON.parse(cachedSegments));
    }

    const { data, error } = await supabase
      .from('segments')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Cache the result
    await redis.set(`segments:${tenantId}`, JSON.stringify(data), 'EX', 3600);

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getSegmentCustomers = async (req: Request, res: Response) => {
  const { segmentId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data: segment, error: segmentError } = await supabase
      .from('segments')
      .select('criteria')
      .eq('id', segmentId)
      .eq('tenant_id', tenantId)
      .single();

    if (segmentError) throw segmentError;

    if (!segment) {
      return res.status(404).json({ error: 'Segment not found' });
    }

    // Apply segment criteria to fetch customers
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('*')
      .eq('tenant_id', tenantId)
      .filter(segment.criteria);

    if (customersError) throw customersError;

    res.json(customers);
  } catch (error) {
    handleError(res, error);
  }
};

export const applySegmentAction = async (req: Request, res: Response) => {
  const { segmentId } = req.params;
  const { action, actionData } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data: segment, error: segmentError } = await supabase
      .from('segments')
      .select('criteria')
      .eq('id', segmentId)
      .eq('tenant_id', tenantId)
      .single();

    if (segmentError) throw segmentError;

    if (!segment) {
      return res.status(404).json({ error: 'Segment not found' });
    }

    // Fetch customers in the segment
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('id')
      .eq('tenant_id', tenantId)
      .filter(segment.criteria);

    if (customersError) throw customersError;

    const customerIds = customers.map(c => c.id);

    // Apply the action to all customers in the segment
    switch (action) {
      case 'ADD_POINTS':
        await supabase.rpc('add_points_to_segment', {
          p_customer_ids: customerIds,
          p_points: actionData.points,
          p_tenant_id: tenantId
        });
        break;
      case 'ASSIGN_LEVEL':
        await supabase.rpc('assign_level_to_segment', {
          p_customer_ids: customerIds,
          p_level_id: actionData.levelId,
          p_tenant_id: tenantId
        });
        break;
      // Add more actions as needed
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({ message: 'Action applied successfully to the segment' });
  } catch (error) {
    handleError(res, error);
  }
};