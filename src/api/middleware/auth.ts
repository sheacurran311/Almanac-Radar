import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabaseClient';

interface DecodedToken {
  userId: string;
  tenantId: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      
      // Check if the token is blacklisted
      const { data, error } = await supabase
        .from('blacklisted_tokens')
        .select('token')
        .eq('token', token)
        .single();

      if (data) {
        return res.sendStatus(401);
      }

      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};

// ... (keep other existing functions)