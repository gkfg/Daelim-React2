import Posts from "@/components/Posts";
import getPosts from "@/lib/getPosts";
import { Suspense } from "react";

export default async function Page() {
  const posts = getPosts("https://jsonplaceholder.typicode.com/posts");
  return (
    <div>
      <h1>Blog 페이지</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Posts posts={posts} />
      </Suspense>
    </div>
  );
}
