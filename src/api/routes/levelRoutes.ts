import express from 'express';
import { 
  createLevel, 
  getLevel, 
  updateLevel, 
  deleteLevel, 
  listLevels
} from '../controllers/LevelController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createLevel);
router.get('/:levelId', authenticateJWT, getLevel);
router.put('/:levelId', authenticateJWT, updateLevel);
router.delete('/:levelId', authenticateJWT, deleteLevel);
router.get('/', authenticateJWT, listLevels);

export default router;