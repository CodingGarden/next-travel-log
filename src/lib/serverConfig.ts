import { z } from 'zod';

const ServerConfigSchema = z.object({
  DB_URL: z.string().url(),
  DB_NAME: z.string().trim().min(1),
  API_KEY: z.string().trim().min(10),
  NODE_ENV: z
    .union([
      z.literal('production'),
      z.literal('development'),
      z.literal('test'),
    ])
    .default('development'),
});

export default ServerConfigSchema.parse(process.env);
