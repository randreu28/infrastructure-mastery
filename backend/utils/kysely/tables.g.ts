import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Comments {
  content: string;
  createdAt: Timestamp;
  id: Generated<number>;
  postId: number;
}

export interface Posts {
  author: string;
  content: string;
  createdAt: Timestamp;
  id: Generated<number>;
  title: string;
}

export interface DB {
  comments: Comments;
  posts: Posts;
}
