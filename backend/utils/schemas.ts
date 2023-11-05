import { z } from "zod";

export const postSchema = z.object({
  createdAt: z.date(),
  title: z.string().max(200),
  author: z.string().max(200),
  content: z.string(),
});

export const commentScema = z.object({
  createdAt: z.date(),
  postId: z.number(),
  content: z.string(),
});
