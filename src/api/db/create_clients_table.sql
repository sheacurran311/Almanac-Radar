-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the clients table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    tenant_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on tenant_id for faster queries
CREATE INDEX IF NOT EXISTS idx_clients_tenant_id ON public.clients(tenant_id);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_clients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_clients_updated_at ON public.clients;
CREATE TRIGGER trigger_update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION update_clients_updated_at();

-- Add comments to the table and columns
COMMENT ON TABLE public.clients IS 'Stores information about client companies using the loyalty platform';
COMMENT ON COLUMN public.clients.id IS 'Unique identifier for the client, matches the user id from auth.users';
COMMENT ON COLUMN public.clients.email IS 'Primary contact email for the client';
COMMENT ON COLUMN public.clients.company_name IS 'Name of the client company';
COMMENT ON COLUMN public.clients.tenant_id IS 'Unique identifier for multi-tenancy purposes';
COMMENT ON COLUMN public.clients.created_at IS 'Timestamp of when the client record was created';
COMMENT ON COLUMN public.clients.updated_at IS 'Timestamp of when the client record was last updated';