import express from 'express';
import { 
  registerUser, 
  getUser, 
  updateUser, 
  listUsers, 
  getUserPoints,
  getUserTransactions,
  getUserCampaigns,
  getUserRewards
} from '../controllers/userController';
import { authenticateJWT } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenantMiddleware';
import { setTenantId } from '../supabaseClient';

const router = express.Router();

// Apply tenant middleware to all routes
router.use(tenantMiddleware);

// Set tenant ID before each request
router.use(async (req, res, next) => {
  await setTenantId((req as any).tenantId);
  next();
});

router.post('/register', registerUser);
router.get('/:userId', authenticateJWT, getUser);
router.put('/:userId', authenticateJWT, updateUser);
router.get('/', authenticateJWT, listUsers);
router.get('/:userId/points', authenticateJWT, getUserPoints);
router.get('/:userId/transactions', authenticateJWT, getUserTransactions);
router.get('/:userId/campaigns', authenticateJWT, getUserCampaigns);
router.get('/:userId/rewards', authenticateJWT, getUserRewards);

export default router;