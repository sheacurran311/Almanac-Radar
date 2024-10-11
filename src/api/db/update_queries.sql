-- Update any remaining references to the "users" table
UPDATE pg_catalog.pg_attribute SET attname = 'user_id'
WHERE attrelid = 'transactions'::regclass AND attname = 'user_id';

UPDATE pg_catalog.pg_attribute SET attname = 'user_id'
WHERE attrelid = 'points'::regclass AND attname = 'user_id';

-- Ensure the "user" table has the correct structure
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update foreign key constraints
ALTER TABLE transactions
DROP CONSTRAINT IF EXISTS transactions_user_id_fkey,
ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE points
DROP CONSTRAINT IF EXISTS points_user_id_fkey,
ADD CONSTRAINT points_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';