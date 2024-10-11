import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';
import { sendEmail, generateWelcomeEmail } from '../services/emailService';
import { createCustomer as createStripeCustomer } from '../services/stripeService';

// ... (keep existing functions)

export const registerCustomer = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    // Create Stripe customer
    const stripeCustomerId = await createStripeCustomer(email, `${firstName} ${lastName}`);

    // Create customer in database
    const { data, error } = await supabase
      .from('customers')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        tenant_id: tenantId,
        stripe_customer_id: stripeCustomerId
      })
      .select();

    if (error) throw error;

    // Send welcome email
    const welcomeEmail = generateWelcomeEmail(firstName);
    await sendEmail(email, 'Welcome to Our Loyalty Program', welcomeEmail);

    res.status(201).json({ message: 'Customer registered successfully', customer: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

// ... (keep other existing functions)