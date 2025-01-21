/*
  # Create referrals table with RLS policies

  1. New Tables
    - `referrals`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `given_name` (text)
      - `surname` (text)
      - `email` (text)
      - `phone` (text)
      - `home_no` (text, nullable)
      - `street` (text, nullable)
      - `suburb` (text, nullable)
      - `state` (text, nullable)
      - `postcode` (text, nullable)
      - `country` (text)
      - `avatar_url` (text, nullable)

  2. Security
    - Enable RLS on `referrals` table
    - Add policies for:
      - Select: Allow authenticated users to read all referrals
      - Insert: Allow authenticated users to create referrals
      - Update: Allow authenticated users to update referrals
      - Delete: Allow authenticated users to delete referrals
*/

-- Create the referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  given_name text NOT NULL,
  surname text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  home_no text,
  street text,
  suburb text,
  state text,
  postcode text,
  country text NOT NULL,
  avatar_url text
);

-- Enable Row Level Security
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read referrals"
  ON referrals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create referrals"
  ON referrals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update referrals"
  ON referrals
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete referrals"
  ON referrals
  FOR DELETE
  TO authenticated
  USING (true);