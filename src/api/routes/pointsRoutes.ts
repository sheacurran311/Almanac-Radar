import express from 'express';
import { 
  addPoints, 
  subtractPoints, 
  transferPoints, 
  getPointsHistory 
} from '../controllers/PointsController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/add', authenticateJWT, addPoints);
router.post('/subtract', authenticateJWT, subtractPoints);
router.post('/transfer', authenticateJWT, transferPoints);
router.get('/history/:customerId', authenticateJWT, getPointsHistory);

export default router;