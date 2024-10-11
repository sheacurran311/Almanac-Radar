import express from 'express';
import clientRoutes from './clientRoutes';
import customerRoutes from './customerRoutes';
import pointsRoutes from './pointsRoutes';
import rewardRoutes from './rewardRoutes';
import campaignRoutes from './campaignRoutes';
import integrationRoutes from './integrationRoutes';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/customers', customerRoutes);
router.use('/points', pointsRoutes);
router.use('/rewards', rewardRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/integrations', integrationRoutes);

export default router;