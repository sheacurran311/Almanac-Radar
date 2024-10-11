import { Request, Response } from 'express';
import Stripe from 'stripe';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      // Add more cases for other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    handleError(res, error);
  }
};

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const { customer, metadata } = paymentIntent;

  if (!customer || !metadata.tenant_id) {
    console.error('Missing customer or tenant_id in payment intent');
    return;
  }

  try {
    // Record the transaction
    const { data: transactionData, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        customer_id: metadata.customer_id,
        amount: paymentIntent.amount / 100, // Convert from cents to dollars
        type: 'PURCHASE',
        description: 'Stripe payment',
        tenant_id: metadata.tenant_id,
        stripe_payment_intent_id: paymentIntent.id
      })
      .select();

    if (transactionError) throw transactionError;

    // Apply earning rules
    await supabase.rpc('apply_earning_rule', {
      p_customer_id: metadata.customer_id,
      p_event_type: 'TRANSACTION',
      p_event_name: 'PURCHASE',
      p_event_data: { amount: paymentIntent.amount / 100 },
      p_tenant_id: metadata.tenant_id
    });

    console.log('Payment recorded and points awarded:', transactionData);
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}