// components/BlogList.js
'use client';
import { useEffect, useState } from 'react';

function BlogList({ initialBlogs, initialPagination }) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [pagination, setPagination] = useState(initialPagination);

    useEffect(() => {
        async function fetchBlogs(page = 1) {
            const res = await fetch(`/app/api/blog?page=${page}`);
            const data = await res.json();
            setBlogs(data.blogs);
            setPagination(data.pagination);
        }
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id} className="mb-4 p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p>{blog.content}</p>
                        <p className="text-gray-500">By {blog.author}</p>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                {Array.from({ length: pagination.totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 mr-2 ${index + 1 === pagination.currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => fetchBlogs(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BlogList;
