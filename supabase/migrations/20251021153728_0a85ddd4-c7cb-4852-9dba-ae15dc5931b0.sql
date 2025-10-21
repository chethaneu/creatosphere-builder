-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_name TEXT NOT NULL,
  referrer_email TEXT NOT NULL,
  referred_name TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Anyone can submit referrals"
ON public.referrals
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view referrals"
ON public.referrals
FOR SELECT
USING (true);

CREATE POLICY "Allow delete referrals"
ON public.referrals
FOR DELETE
USING (true);

-- Create index for better performance
CREATE INDEX idx_referrals_created_at ON public.referrals(created_at DESC);
CREATE INDEX idx_referrals_referrer_email ON public.referrals(referrer_email);
CREATE INDEX idx_referrals_referred_email ON public.referrals(referred_email);