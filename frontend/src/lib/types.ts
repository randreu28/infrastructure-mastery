export type Post = {
  id: number;
  createdAt: Date;
  title: string;
  author: string;
  content: string;
};

export type Comment = {
  id: number;
  createdAt: Date;
  content: string;
  postId: number;
};
