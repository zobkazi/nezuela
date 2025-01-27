// components/news-details-fetcher.tsx
'use client';
import React, { useEffect, useState } from "react";



const NewsDetailsFetcher = ({ id }) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://bdtime24-net-api-6lh5.onrender.com/api/news/${id}`,
          {
            method: "GET",
            cache: "no-cache",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news details: ${response.status}`);
        }

        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!news) {
    return <p className="text-center">No news details available</p>;
  }

  return (
    <div className="news-details max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-600 mb-2">{news.subtitle}</p>
      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full h-auto rounded mb-4"
      />
      <div className="text-sm text-gray-500 mb-4">
        <p>Category: {news.category}</p>
        <p>Published: {new Date(news.createdAt).toLocaleDateString()}</p>
      </div>
      <div
        className="leading-relaxed text-lg"
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
    </div>
  );
};

export default NewsDetailsFetcher;
