import { Router } from 'express';
import { createPayment } from '../controllers/payment.controller.js';
import { tbankWebhook } from '../controllers/webhook.controller.js';

const router = Router();

router.post('/payments', createPayment);
router.post('/webhooks/tbank', tbankWebhook);

export default router;
