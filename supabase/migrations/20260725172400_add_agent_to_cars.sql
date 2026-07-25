-- Add agent_name to cars table
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS agent_name text;
