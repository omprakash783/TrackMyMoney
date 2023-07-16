import { z } from 'zod';

export const schema = z.object({
  desc: z.string().min(1, { message: 'This field is required' }),
  amount: z.string().min(1, { message: 'This field is required' }),
  category: z.string().min(1, { message: 'This field is required' }),
  date: z.string().min(1, { message: 'This field is required' }),
});

export type FormInputs = z.infer<typeof schema>;
