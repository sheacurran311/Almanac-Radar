import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { supabase } from '../supabaseClient';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, tenantId: user.tenant_id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      await supabase
        .from('blacklisted_tokens')
        .insert({ token });

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during logout' });
    }
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};