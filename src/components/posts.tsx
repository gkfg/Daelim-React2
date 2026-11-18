"use client";

import { use } from "react";

export default function Posts({
  posts,
}: {
  posts: Promise<{ id: number; title: string }[]>;
}) {
  const allPosts = use(posts);
  return (
    <div>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
}
