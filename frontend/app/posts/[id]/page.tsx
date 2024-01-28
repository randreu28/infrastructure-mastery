import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { getPost } from "@/lib/backendSDK";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: { id: string | undefined } };

export default async function Post({ params: { id } }: Props) {
  const postId = Number(id);

  if (isNaN(postId)) {
    return notFound();
  }

  const post = await getPost(postId);

  return (
    <section className="p-4 md:p-6">
      <Link className="text-blue-500 hover:underline" href="/">
        <p className="p-4">Go back</p>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{formatDate(post.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          Author: {post.author}
          <br />
          <div className="container pt-10">{post.content}</div>
        </CardContent>
      </Card>
      <div className="mt-6 space-y-5">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        {post.comments.map((comment) => (
          <Card key={comment.id}>
            <p className="text-sm text-gray-500 dark:text-gray-400 p-5">
              {comment.content}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
