import express from 'express';
import { 
  getTenants, 
  getUsage, 
  getAnalytics, 
  generateApiKey 
} from '../controllers/adminController';
import { authenticateJWT, authorizeRole } from '../middleware/auth';

const router = express.Router();

router.get('/tenants', authenticateJWT, authorizeRole(['admin']), getTenants);
router.get('/usage', authenticateJWT, authorizeRole(['admin']), getUsage);
router.get('/analytics', authenticateJWT, authorizeRole(['admin']), getAnalytics);
router.post('/tenants/:tenantId/api-key', authenticateJWT, authorizeRole(['admin']), generateApiKey);

export default router;