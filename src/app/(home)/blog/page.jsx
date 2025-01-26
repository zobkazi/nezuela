'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog');
  const posts = await data.json();

  return (
    <ul>
      {posts.map((post) => (
        <div key={post.id}>
          <li>{post.title}</li>
          <p>{post.content}</p>
          <Link href={`/blog/${post.id}`}>
            <p>Read More</p>
          </Link>
        </div>
      ))}
    </ul>
  );
}
