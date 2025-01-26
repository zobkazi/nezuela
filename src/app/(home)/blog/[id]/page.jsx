// /src/app/(home)/blog/[id]/page.jsx

import { notFound } from 'next/navigation'

async function getPost(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://zobkazi.github.io/nezuela'
  const res = await fetch(`${apiUrl}/api/blog/${id}`)
  const data = await res.json()

  if (!data.success || !data.data) {
    notFound()
  }
  return data.data
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`)
  const posts = await res.json()

  return posts.data.map((post) => ({
    id: String(post._id),  // MongoDB's _id field is used here, adjust if needed
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post.title, // Use post title for dynamic page title
  }
}

export default async function Page({ params }) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <article className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="mt-6 space-y-4">
        <p>{post.content}</p>
      </div>
    </article>
  )
}
