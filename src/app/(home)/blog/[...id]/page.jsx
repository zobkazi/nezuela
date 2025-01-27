// pages/news/[id].tsx
import React from "react";
import NewsDetailsFetcher from "@/components/ui/NewsDtails";

export default function NewsPage({ params }) {
  return (
    <main className="min-h-screen p-6">
      <NewsDetailsFetcher id={params.id} />
    </main>
  );
}
