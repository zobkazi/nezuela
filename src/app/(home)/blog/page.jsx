import React from 'react';
import BlogList from './BlogList';

const BlogPage = async () => {
  // Fetch data on the server
  const res = await fetch('http://localhost:3000/api/blog', { cache: 'no-store' });
  const data = await res.json();

  return <BlogList blogs={data.blogs} />;
};

export default BlogPage;
