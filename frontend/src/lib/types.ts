export type Post = {
  id: number;
  createdAt: string;
  title: string;
  author: string;
  content: string;
};

export type Comment = {
  id: number;
  createdAt: string;
  content: string;
  postId: number;
};
