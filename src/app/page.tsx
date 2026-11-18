import Gallery from "@/components/Gallery";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Root 페이지</h1>
      <Gallery />
      <Link href="/blog">go to blog</Link>
    </div>
  );
}
