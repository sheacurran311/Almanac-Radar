import { Request, Response } from 'express';
import { supabase } from '../server';
import { v4 as uuidv4 } from 'uuid';

export const registerClient = async (req: Request, res: Response) => {
  const { company_name, email, password } = req.body;
  
  try {
    if (!company_name || !email || !password) {
      return res.status(400).json({ error: 'Company name, email, and password are required.' });
    }

    const tenant_id = uuidv4();
    
    // Create a new user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (!authData.user) {
      return res.status(500).json({ error: 'Failed to create user. Please try again.' });
    }

    // Create a record in the clients table
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .insert({ 
        id: authData.user.id, 
        company_name, 
        email,
        tenant_id 
      })
      .single();

    if (clientError) throw clientError;

    res.status(201).json({ 
      message: 'Client registered successfully', 
      user: { id: authData.user.id, email: authData.user.email },
      client: clientData 
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred during registration.' });
  }
};

// ... (keep other existing functions)