import express from 'express';
import { 
  getIntegrations,
  updateIntegration
} from '../controllers/IntegrationController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateJWT, getIntegrations);
router.put('/:integrationId', authenticateJWT, updateIntegration);

export default router;