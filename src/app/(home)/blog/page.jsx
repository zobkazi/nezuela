'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    const res = await fetch(`/api/blog?page=${page}&limit=5`);
    const data = await res.json();

    if (data.success) {
      setPosts(data.data);
      setPagination(data.pagination);
    } else {
      console.error('Failed to fetch posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    router.push(`?page=${page}`);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post._id} className="border p-4 rounded shadow-md hover:shadow-lg transition-all">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="mt-2">{post.content.slice(0, 150)}...</p>
                <Link href={`/blog/${post._id}`}>
                  <p className="mt-4 text-blue-500">Read More</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="flex items-center justify-center text-lg">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
