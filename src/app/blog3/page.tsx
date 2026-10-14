import { posts } from './posts';
import Link from 'next/link';

export default function Blog(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div>
                    <h1>블로그 목록</h1>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link href={`/blog3/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}