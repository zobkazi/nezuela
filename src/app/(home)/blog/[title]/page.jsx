// src/app/blog/[title]/page.js (or page.jsx)


// Fetch blog data from API or DB
async function getBlogData(title) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${title}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog with title: ${title}`);
  }
  return res.json();
}

// The dynamic page component
export default async function PostId({ params }) {
  const { title } = params;

  const { blog } = await getBlogData(title);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}

// Generate static paths for all possible blog titles
export async function generateStaticParams() {
  // Fetch all possible blog titles (You can fetch this from your database or API)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/title`);
  const { titles } = await res.json();

  // Return an array of params for each blog title
  return titles.map(title => ({
    title,
  }));
}
