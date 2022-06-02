import { marked } from "marked";
import { type LoaderFunction, json } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

type LoaderData = {
  title: string;
  html: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug is required");
  const post: any = await getPost(slug);
  invariant(post, `post not found ${slug}`);
  const html = marked(post.markdown);
  return json<LoaderData>({ title: post.title, html });
};

export default function PostRoute() {
  const { title, html } = useLoaderData() as LoaderData;
  // TODO: a var state to track whether the post is in arabic or english
  // you can't do both, whether it's mainly ar or mainly en,
  // let the write/admin choose when she's writing the new post herslef.
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} dir="rtl" />
    </main>
  );
}
