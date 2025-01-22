// src/components/BlogList.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blog?page=${currentPage}`);
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg shadow-md overflow-hidden">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">By {blog.author}</p>
              <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">Read More</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded-md">Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
