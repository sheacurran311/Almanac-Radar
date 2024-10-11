import express from 'express';
import { 
  createReward, 
  getReward, 
  updateReward, 
  listRewards, 
  buyReward 
} from '../controllers/rewardController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createReward);
router.get('/:rewardId', authenticateJWT, getReward);
router.put('/:rewardId', authenticateJWT, updateReward);
router.get('/', authenticateJWT, listRewards);
router.post('/:rewardId/buy', authenticateJWT, buyReward);

export default router;