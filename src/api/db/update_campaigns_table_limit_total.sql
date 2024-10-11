-- Add the limit_total column to campaigns table
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS limit_total INTEGER;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';