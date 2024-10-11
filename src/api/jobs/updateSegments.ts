import { CronJob } from 'cron';
import { supabase } from '../server';

async function updateSegments() {
  try {
    const { data: segments, error: segmentsError } = await supabase
      .from('segments')
      .select('id, criteria, tenant_id');

    if (segmentsError) throw segmentsError;

    for (const segment of segments) {
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('id')
        .eq('tenant_id', segment.tenant_id)
        .filter(segment.criteria);

      if (customersError) throw customersError;

      const customerIds = customers.map(c => c.id);

      // Remove customers no longer in the segment
      const { error: removeError } = await supabase
        .from('customer_segments')
        .delete()
        .eq('segment_id', segment.id)
        .not('customer_id', 'in', customerIds);

      if (removeError) throw removeError;

      // Add new customers to the segment
      const { error: addError } = await supabase
        .from('customer_segments')
        .upsert(
          customerIds.map(customerId => ({
            customer_id: customerId,
            segment_id: segment.id,
            tenant_id: segment.tenant_id
          })),
          { onConflict: ['customer_id', 'segment_id'] }
        );

      if (addError) throw addError;
    }

    console.log('Segments updated successfully');
  } catch (error) {
    console.error('Error updating segments:', error);
  }
}

// Run the job every day at midnight
const job = new CronJob('0 0 * * *', updateSegments);

export function startUpdateSegmentsJob() {
  job.start();
  console.log('Update segments job scheduled');
}