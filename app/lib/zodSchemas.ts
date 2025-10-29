import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  price: z.coerce.number().int().min(1),
  images: z.array(z.string().min(1, 'at least one image is required')),
  category: z.enum(['men', 'women', 'kids']),
  isFeatured: z.boolean().optional(),
});
