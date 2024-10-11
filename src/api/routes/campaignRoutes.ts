import express from 'express';
import { 
  createCampaign, 
  getCampaign, 
  updateCampaign, 
  listCampaigns, 
  activateCampaign, 
  deactivateCampaign 
} from '../controllers/campaignController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createCampaign);
router.get('/:campaignId', authenticateJWT, getCampaign);
router.put('/:campaignId', authenticateJWT, updateCampaign);
router.get('/', authenticateJWT, listCampaigns);
router.post('/:campaignId/activate', authenticateJWT, activateCampaign);
router.post('/:campaignId/deactivate', authenticateJWT, deactivateCampaign);

export default router;