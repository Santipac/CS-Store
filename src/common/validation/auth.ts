import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, 'The password must contain at least 4 character(s)').max(12),
});

export const signUpSchema = loginSchema.extend({
  name: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
