import express from 'express';
import { 
  getCustomerStats,
  getPointsStats,
  getRewardStats,
  getCampaignStats
} from '../controllers/AnalyticsController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.get('/customers', authenticateJWT, getCustomerStats);
router.get('/points', authenticateJWT, getPointsStats);
router.get('/rewards', authenticateJWT, getRewardStats);
router.get('/campaigns', authenticateJWT, getCampaignStats);

export default router;