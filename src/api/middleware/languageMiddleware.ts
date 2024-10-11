import { Request, Response, NextFunction } from 'express';
import i18next from 'i18next';

export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const lang = req.headers['accept-language'] || 'en';
  req.language = lang.split(',')[0].split('-')[0]; // Extract the primary language
  i18next.changeLanguage(req.language);
  next();
};