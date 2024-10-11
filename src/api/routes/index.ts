import express from 'express';
import customerRoutes from './customerRoutes';
import pointsRoutes from './pointsRoutes';
import rewardRoutes from './rewardRoutes';
import campaignRoutes from './campaignRoutes';
import nftRoutes from './nftRoutes';
import rbacRoutes from './rbacRoutes';
import levelRoutes from './levelRoutes';
import earningRuleRoutes from './earningRuleRoutes';
import segmentRoutes from './segmentRoutes';
import analyticsRoutes from './analyticsRoutes';
import transactionRoutes from './transactionRoutes';
import webhookRoutes from './webhookRoutes';
import integrationRoutes from './integrationRoutes';
import clientRoutes from './clientRoutes';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/customers', customerRoutes);
router.use('/points', pointsRoutes);
router.use('/rewards', rewardRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/nfts', nftRoutes);
router.use('/rbac', rbacRoutes);
router.use('/levels', levelRoutes);
router.use('/earning-rules', earningRuleRoutes);
router.use('/segments', segmentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/transactions', transactionRoutes);
router.use('/webhooks', webhookRoutes);
router.use('/integrations', integrationRoutes);

export default router;