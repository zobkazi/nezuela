'use client';

import { useState, useEffect } from 'react';

const PaginatedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setBlogs(data);
      setTotalPages(Math.ceil(data.length / postsPerPage));
    };

    fetchBlogs();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedBlog(null); // Reset selected blog
  };

  const handleBlogClick = (blogId) => {
    const blog = blogs.find((b) => b.id === blogId);
    setSelectedBlog(blog);
  };

  const currentBlogs = blogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Blogs</h1>

      {/* Blog List */}
      {!selectedBlog && (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.map((blog) => (
              <li
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-800"
              >
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                  {blog.title}
                </h2>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Blog Details */}
      {selectedBlog && (
        <div className="p-6 border rounded-lg shadow bg-white dark:bg-gray-800">
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Back to blogs
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
          <p>{selectedBlog.body}</p>
        </div>
      )}
    </div>
  );
};

export default PaginatedBlogs;
