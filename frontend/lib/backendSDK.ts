export type TPost = {
  id: number;
  createdAt: string;
  title: string;
  author: string;
  content: string;
};

export type TComment = {
  id: number;
  createdAt: string;
  content: string;
  postId: number;
};

if (!process.env.NEXT_API_URL) {
  throw new Error("Enviroment variables missing");
}

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_API_URL}/posts`, {
    cache: "no-cache",
  });
  const posts = (await res.json()) as TPost[];

  return posts;
}

export async function getPost(postId: number) {
  const res = await fetch(`${process.env.NEXT_API_URL}/posts/${postId}`, {
    cache: "no-cache",
  });

  const post = (await res.json()) as TPost;

  return {
    ...post,
    comments: await getComments(postId),
  };
}

export async function getComments(postId: number) {
  const res = await fetch(`${process.env.NEXT_API_URL}/comments`, {
    cache: "no-cache",
  });
  const comments = (await res.json()) as TComment[];

  return comments.filter((comment) => comment.postId === postId);
}
