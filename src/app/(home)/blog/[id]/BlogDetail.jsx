'use client';

import React from 'react';

const BlogDetail = ({ blog }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.featuredImage}
        alt={blog.title}
        className="w-full h-auto mb-6 rounded-lg"
      />
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <p className="text-sm text-gray-500">
        <strong>Author:</strong> {blog.author} | <strong>Category:</strong> {blog.category}
      </p>
      <div className="mt-4">
        <strong>Tags:</strong>{' '}
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
      {blog.isPublished && (
        <p className="mt-4 text-green-600 font-semibold">Published</p>
      )}
    </div>
  );
};

export default BlogDetail;
