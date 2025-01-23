import React from 'react';
import BlogDetail from './BlogDetail';

const BlogDetailPage = async ({ params }) => {
  // Fetch data on the server
  const res = await fetch(`http://localhost:3000/api/blog/${params.id}`, { cache: 'no-store' });
  const blog = await res.json();

  return <BlogDetail blog={blog} />;
};

export default BlogDetailPage;
