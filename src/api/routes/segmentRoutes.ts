import express from 'express';
import { 
  createSegment, 
  getSegment, 
  updateSegment, 
  deleteSegment, 
  listSegments,
  getSegmentCustomers
} from '../controllers/SegmentController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createSegment);
router.get('/:segmentId', authenticateJWT, getSegment);
router.put('/:segmentId', authenticateJWT, updateSegment);
router.delete('/:segmentId', authenticateJWT, deleteSegment);
router.get('/', authenticateJWT, listSegments);
router.get('/:segmentId/customers', authenticateJWT, getSegmentCustomers);

export default router;