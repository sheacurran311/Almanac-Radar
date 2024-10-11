import { Response } from 'express';

export const handleError = (res: Response, error: unknown) => {
  console.error('Error:', error);

  if (error instanceof Error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(500).json({ error: 'An unexpected error occurred' });
};