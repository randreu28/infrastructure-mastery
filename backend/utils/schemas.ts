import { z } from "zod";

export const postSchema = z.object({
  title: z.string().max(200),
  author: z.string().max(200),
  content: z.string(),
});

export const commentScema = z.object({
  postId: z.number(),
  content: z.string(),
});
