"use client";
import useSWR from "swr";
import { Suspense } from "react";
import { stringify } from "querystring";

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then();
type Photo = {
  id: string;
  title: string;
};

export default function Blob2Page() {
  const { data, error, isLoading } = useSWR<Photo[]>(
    "https://jsonplaceholder.typicode.com/photos",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>Blog2 Page - Photo Titles</h1>
      <ul>
        <Suspense>
          {data?.map((post: { id: string; title: string }) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </Suspense>
      </ul>
    </>
  );
}
