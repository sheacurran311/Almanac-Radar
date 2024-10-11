import express from 'express';
import { registerClient, loginClient, getClientProfile, updateClientProfile } from '../controllers/ClientController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerClient);
router.post('/login', loginClient);
router.get('/profile', authenticateJWT, getClientProfile);
router.put('/profile', authenticateJWT, updateClientProfile);

export default router;