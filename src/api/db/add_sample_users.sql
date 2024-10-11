-- Insert sample users into the public.users table
INSERT INTO public.users (user_id, email, company_name)
VALUES
  (uuid_generate_v4(), 'john.doe@example.com', 'Acme Corporation'),
  (uuid_generate_v4(), 'jane.smith@example.com', 'TechStart Inc.'),
  (uuid_generate_v4(), 'mike.johnson@example.com', 'Global Innovations'),
  (uuid_generate_v4(), 'sarah.williams@example.com', 'Future Systems'),
  (uuid_generate_v4(), 'alex.brown@example.com', 'EcoSolutions Ltd.');

-- Verify the inserted data
SELECT * FROM public.users;