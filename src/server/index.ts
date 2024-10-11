import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import routes from './routes';
import { handleError } from './utils/errorHandler';
import { startUpdateSegmentsJob } from './jobs/updateSegments';

config();

const app = express();
const port = process.env.PORT || 3000;

// Check if JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set. Please set it in your .env file.');
  process.exit(1);
}

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3006',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Supabase client initialization
export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

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