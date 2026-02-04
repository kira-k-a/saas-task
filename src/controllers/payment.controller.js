import { db } from '../db.js';

export async function createPayment(req, res) {
  try {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const amount = plan === 'pro' ? 1500 : 500;

    const invoice = await db.invoice.create({
      data: {
        userId,
        amount,
        currency: 'RUB',
        status: 'pending'
      }
    });

    const bankPaymentId = `tbank_${Date.now()}`;
    const paymentUrl = `https://fake-cake-tbank.ru/pay/${invoice.id}`;

    await db.payment.create({
      data: {
        invoiceId: invoice.id,
        provider: 'tbank',
        providerPaymentId: bankPaymentId,
        status: 'new'
      }
    });

    return res.json({ paymentUrl });
  } catch {
    return res.status(500).json({ error: 'Payment creation failed' });
  }
}
