import { z } from 'zod';

const ClientConfigSchema = z.object({
  NEXT_PUBLIC_MAP_TILE_URL: z.string().url(),
});

export default ClientConfigSchema.parse({
  NEXT_PUBLIC_MAP_TILE_URL: process.env.NEXT_PUBLIC_MAP_TILE_URL,
});
