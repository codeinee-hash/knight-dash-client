import { z } from 'zod';

export const authSchema = z.object({
  login: z.string({ required_error: 'Имя обязателен' }),
  telephone: z.string({ required_error: 'Номер обязателен' }),
});
