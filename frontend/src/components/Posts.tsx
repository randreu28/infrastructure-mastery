import { useSetAtom } from "jotai";
import { postStore } from "../lib/store";
import type { Post } from "../lib/types";
import useResource from "../lib/useResource";
import { formatDate } from "../lib/utils";

export default function Posts() {
  const { data: posts, error, isLoading } = useResource<Post[]>("/posts");
  const setSelectedPost = useSetAtom(postStore);

  if (isLoading || !posts) {
    return (
      <p className="flex h-screen items-center justify-center py-5 text-2xl">
        Loading...
      </p>
    );
  }

  if (error !== undefined) {
    return (
      <p className="flex h-screen items-center justify-center py-5 text-2xl text-red-500">
        An error occured. Please try again later
      </p>
    );
  }

  return (
    <>
      <ul className="space-y-10 py-10">
        {posts.map((post) => {
          const date = formatDate(new Date(post.createdAt));
          return (
            <li
              className="space-y-5 rounded-xl bg-neutral-800 p-5"
              key={post.id}
            >
              <button
                className="text-3xl hover:underline"
                onClick={() => setSelectedPost(post.id)}
              >
                {post.title}
              </button>
              <div className="flex justify-between">
                <p>{post.author}</p>
                <p>{date.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
