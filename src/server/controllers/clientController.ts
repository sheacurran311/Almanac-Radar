import { Request, Response } from 'express';
import { supabase } from '../index';
import { v4 as uuidv4 } from 'uuid';

export const registerClient = async (req: Request, res: Response) => {
  // ... (keep the existing implementation)
};

export const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (clientError) throw clientError;

      res.json({ 
        message: 'Login successful',
        user: data.user,
        client: clientData,
        session: data.session
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred during login.' });
  }
};

export const getClientProfile = async (req: Request, res: Response) => {
  // ... (keep the existing implementation)
};

export const updateClientProfile = async (req: Request, res: Response) => {
  // ... (keep the existing implementation)
};