import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    published: z.boolean().optional().default(true),
    description: z.string().optional(),
    layout: z.string().optional(),
  }),
});

export const collections = { blog };
