import express from 'express';
import { 
  createNFT,
  getNFT,
  listNFTs,
  transferNFTToCustomer
} from '../controllers/nftController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createNFT);
router.get('/:nftId', authenticateJWT, getNFT);
router.get('/', authenticateJWT, listNFTs);
router.post('/transfer', authenticateJWT, transferNFTToCustomer);

export default router;