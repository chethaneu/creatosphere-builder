-- Create table for project build requests
CREATE TABLE IF NOT EXISTS public.project_build_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_title TEXT NOT NULL,
  project_description TEXT,
  skill_level TEXT,
  interest TEXT,
  department TEXT,
  additional_requirements TEXT,
  budget_range TEXT,
  timeline TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_build_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert requests
CREATE POLICY "Anyone can submit project build requests"
ON public.project_build_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy for admins to view all requests
CREATE POLICY "Admins can view all project build requests"
ON public.project_build_requests
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);