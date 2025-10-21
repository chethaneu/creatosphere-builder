-- Add DELETE policies for admin access to project_requests
CREATE POLICY "Allow delete project requests"
ON public.project_requests
FOR DELETE
USING (true);

-- Add DELETE policies for admin access to contact_messages
CREATE POLICY "Allow delete contact messages"
ON public.contact_messages
FOR DELETE
USING (true);