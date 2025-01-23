'use client';

import React from 'react';
import Link from 'next/link';

const BlogList = ({ blogs }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog List</h1>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
        >
          <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
          <Link href={`/blog/${blog._id}`}>
            <p className="text-blue-600 hover:underline">Read More</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
