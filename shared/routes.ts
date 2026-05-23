import { z } from 'zod';
import { insertGameSchema, insertNewsSchema, insertTeamSchema, insertMessageSchema, games, news, team, messages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  games: {
    list: {
      method: 'GET' as const,
      path: '/api/games',
      responses: {
        200: z.array(z.custom<typeof games.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/games/:id',
      responses: {
        200: z.custom<typeof games.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  news: {
    list: {
      method: 'GET' as const,
      path: '/api/news',
      responses: {
        200: z.array(z.custom<typeof news.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/news/:id',
      responses: {
        200: z.custom<typeof news.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team',
      responses: {
        200: z.array(z.custom<typeof team.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
