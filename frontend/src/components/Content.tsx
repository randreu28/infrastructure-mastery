import { useAtomValue } from "jotai";
import { postStore } from "../lib/store";
import Comments from "./Comments";
import Post from "./Post";

export default function Content() {
  const selectedPost = useAtomValue(postStore);

  if (!selectedPost) {
    return (
      <p className="flex h-screen w-full items-center justify-center text-gray-500">
        No posts selected
      </p>
    );
  }

  return (
    <div>
      <Post postId={selectedPost} />
      <p className="my-5 border border-gray-800" />
      <Comments postId={selectedPost} />
    </div>
  );
}
