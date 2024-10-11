-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    client_id UUID NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES public.clients(id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_client_id ON public.users(client_id);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at();

-- Add comments to the table and columns
COMMENT ON TABLE public.users IS 'Stores information about individual users associated with client companies';
COMMENT ON COLUMN public.users.id IS 'Unique identifier for the user record';
COMMENT ON COLUMN public.users.auth_user_id IS 'Foreign key to auth.users table';
COMMENT ON COLUMN public.users.email IS 'User''s email address';
COMMENT ON COLUMN public.users.first_name IS 'User''s first name';
COMMENT ON COLUMN public.users.last_name IS 'User''s last name';
COMMENT ON COLUMN public.users.client_id IS 'Foreign key to the clients table';
COMMENT ON COLUMN public.users.role IS 'User''s role within the client organization';
COMMENT ON COLUMN public.users.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN public.users.updated_at IS 'Timestamp when the record was last updated';