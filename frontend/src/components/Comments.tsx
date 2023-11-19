import { CommentType } from "../lib/types";
import useResource from "../lib/useResource";

type Props = {
  postId: number;
};

export default function Comments({ postId }: Props) {
  const {
    data: comments,
    error,
    isLoading,
  } = useResource<CommentType[]>("/comments");

  if (isLoading || !comments) {
    return (
      <div>
        <h2 className="text-xl">Comments:</h2>

        <p>Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl">Comments:</h2>

        <p>An error occured. Try again later</p>
      </div>
    );
  }

  const postComments = comments.filter((comment) => comment.postId === postId);

  if (postComments.length === 0) {
    return (
      <div>
        <h2 className="text-xl">Comments:</h2>

        <p>No comments</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl">Comments</h2>

      <ul className="space-y-3 pt-5">
        {postComments.map((comment) => {
          return (
            <li className="ml-10 list-disc text-gray-500" key={comment.id}>
              {comment.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
