'use client'; // Client-side rendering in Next.js App Router

import React, { useEffect, useState } from 'react';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
        
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        
        const data = await res.json();
        setBlogs(data.blogs);  // Assuming the response contains an array of blogs
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogs.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            <a
              href={`/blog/${blog.title}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
