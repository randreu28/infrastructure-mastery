export type PostType = {
  id: number;
  createdAt: string;
  title: string;
  author: string;
  content: string;
};

export type CommentType = {
  id: number;
  createdAt: string;
  content: string;
  postId: number;
};
