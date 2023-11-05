import { z } from "zod";

export const postSchema = z.object({
  title: z.string().max(200),
  author: z.string().max(200),
  content: z.string(),
});

export const commentSchema = z.object({
  postId: z.number(),
  content: z.string(),
});
