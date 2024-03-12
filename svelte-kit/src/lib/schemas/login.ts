import { minLength, object, string, type Input } from 'valibot';

export const LoginSchema = object({
  usernameOrEmail: string('Please enter your username or email.', [minLength(1, 'Please enter your username or email.')]),
  password: string('Please enter your password.', [minLength(1, 'Please enter your password.')]),
});

export type LoginInput = Input<typeof LoginSchema>;
