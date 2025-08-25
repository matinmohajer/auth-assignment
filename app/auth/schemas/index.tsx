import { z } from 'zod';

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    phoneNumber: z
      .string()
      .min(1, t('auth.login.phoneNumber.required'))
      .regex(/^09\d{9}$/, t('auth.login.phoneNumber.invalid')),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
