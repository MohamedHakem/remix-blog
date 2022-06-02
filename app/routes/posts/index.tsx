import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPostsList } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

type LoaderData = {
  // the type of posts are the same as the awaited version
  // of what the return type of typeof getPostsList is.
  posts: Awaited<ReturnType<typeof getPostsList>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostsList();
  return json<LoaderData>({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData() as LoaderData;
  const adminUser = useOptionalAdminUser();

  // const isAdmin = user?.email === ENV.ADMIN_EMAIL;
  // console.log(ENV.ADMIN_EMAIL);
  return (
    <main>
      <h1>Posts!</h1>
      {adminUser && (
        <Link to="admin" className="text-red-600 underline">
          admin
        </Link>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
