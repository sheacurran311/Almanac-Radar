import express from 'express';
import { 
  createTransaction, 
  getTransaction, 
  listTransactions 
} from '../controllers/transactionController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createTransaction);
router.get('/:transactionId', authenticateJWT, getTransaction);
router.get('/', authenticateJWT, listTransactions);

export default router;