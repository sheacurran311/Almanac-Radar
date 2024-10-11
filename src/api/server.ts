import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import routes from './routes';
import { handleError } from './utils/errorHandler';
import { startUpdateSegmentsJob } from './jobs/updateSegments';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { languageMiddleware } from './middleware/languageMiddleware';

config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3006',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// i18next setup
i18next
  .use(Backend)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './src/api/locales/{{lng}}.json'
    }
  });

app.use(languageMiddleware);

// Supabase client initialization
export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Tenant middleware
app.use((req: any, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }
  req.tenantId = tenantId;
  next();
});

// Routes
app.use('/api', routes);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  handleError(res, err);
});

// Start background jobs
startUpdateSegmentsJob();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { supabase };