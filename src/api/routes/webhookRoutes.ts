import express from 'express';
import { handleStripeWebhook } from '../controllers/WebhookController';

const router = express.Router();

router.post('/stripe', handleStripeWebhook);

export default router;