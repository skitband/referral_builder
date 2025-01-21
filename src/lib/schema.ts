import { z } from 'zod';

export const referralSchema = z.object({
  given_name: z.string().min(1, 'Given name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  home_no: z.string().optional(),
  street: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  avatar_url: z.string().optional(),
});

export type ReferralFormData = z.infer<typeof referralSchema>;