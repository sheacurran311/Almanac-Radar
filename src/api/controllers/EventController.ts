import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

export const createEvent = async (req: Request, res: Response) => {
  const { name, description, pointsValue, eventType } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('events')
      .insert({
        name,
        description,
        points_value: pointsValue,
        event_type: eventType,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Event created successfully', event: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { name, description, pointsValue, eventType } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('events')
      .update({
        name,
        description,
        points_value: pointsValue,
        event_type: eventType
      })
      .eq('id', eventId)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', event: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const listEvents = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { page = 1, limit = 10 } = req.query;

  try {
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    const { data, error, count } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      events: data,
      totalCount: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count! / Number(limit))
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const triggerEvent = async (req: Request, res: Response) => {
  const { customerId, eventId } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase.rpc('trigger_event', {
      p_customer_id: customerId,
      p_event_id: eventId,
      p_tenant_id: tenantId
    });

    if (error) throw error;

    res.json({ message: 'Event triggered successfully', data });
  } catch (error) {
    handleError(res, error);
  }
};