import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z.string().nonempty({ message: 'Please enter your username or email.' }),
  password: z.string().nonempty({ message: 'Please enter your password.' }),
});
