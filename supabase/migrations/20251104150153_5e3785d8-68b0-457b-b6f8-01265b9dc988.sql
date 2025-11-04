-- Add DELETE policy for admins on project_build_requests table
CREATE POLICY "Admins can delete project build requests"
ON public.project_build_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));