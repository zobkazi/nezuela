'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blog/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch blog');
          }
          const data = await response.json();
          setBlog(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog:', error);
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center text-lg font-semibold text-red-500">Blog not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.featuredImage} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-gray-600 mb-4">By {blog.author}</p>
      <p className="text-lg leading-relaxed">{blog.content}</p>
      <div className="mt-4">
        <span className="text-sm text-gray-500">Category: {blog.category}</span>
      </div>
    </div>
  );
};

export default BlogDetails;
