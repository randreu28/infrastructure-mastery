import type { PostType } from "../lib/types";
import useResource from "../lib/useResource";
import { formatDate } from "../lib/utils";

type Props = {
  postId: number;
};

export default function Post({ postId }: Props) {
  const {
    data: post,
    error,
    isLoading,
  } = useResource<PostType>("/posts/" + postId);

  if (isLoading || !post) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <h2 className="mb-2 text-3xl font-bold">{post.title}</h2>
      <div className="flex justify-between py-5 text-lg">
        <p className="capitalize">{post.author}</p>
        <p className="capitalize">
          {formatDate(new Date(post.createdAt)).text}
        </p>
      </div>

      <p className="text-base text-gray-500">{post.content}</p>
    </div>
  );
}
