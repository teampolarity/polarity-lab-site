import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const instruments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/instruments' }),
  schema: z.object({
    title: z.string(),
    acronym: z.string(),
    project: z.string(),
    projectSlug: z.string(),
    status: z.enum([
      'observability-pilot',
      'platform-live-study-pending',
      'design-iteration',
      'concept',
    ]),
    evidenceSummary: z.string(),
    version: z.string(),
    limitations: z.array(z.string()).optional(),
  }),
});

export const collections = { instruments };
