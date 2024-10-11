import express from 'express';
import { 
  createEarningRule, 
  getEarningRule, 
  updateEarningRule, 
  deleteEarningRule, 
  listEarningRules
} from '../controllers/EarningRuleController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createEarningRule);
router.get('/:ruleId', authenticateJWT, getEarningRule);
router.put('/:ruleId', authenticateJWT, updateEarningRule);
router.delete('/:ruleId', authenticateJWT, deleteEarningRule);
router.get('/', authenticateJWT, listEarningRules);

export default router;