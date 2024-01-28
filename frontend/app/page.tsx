import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { getPosts } from "@/lib/backendSDK";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="mt-10 text-5xl text-center font-bold">Posts</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
              <CardDescription>
                {formatDate(post.createdAt)}
                <br />
                Author: {post.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                {post.content}
              </p>
              <Link
                className="text-blue-500 hover:underline"
                href={`/posts/${post.id}`}
              >
                See more
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
