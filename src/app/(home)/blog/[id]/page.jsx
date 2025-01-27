// Next.js will invalidate the cache when a request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

// Fetch data and generate static params for all posts
export async function generateStaticParams() {
  const response = await fetch('https://bdtime24-net-api-6lh5.onrender.com/api/news', {
    cache: 'no-cache', // Ensure fresh data on every revalidation
  });
  const data = await response.json();

  // Extract the articles array from the API response
  const articles = data.articles || [];

  // Generate params from the articles
  return articles.map((article) => ({
    id: String(article._id),
  }));
}

// Page component to display individual post details
export default async function Page({ params }) {
  const { id } = await params;

  // Fetch the specific post by ID
  const response = await fetch(`https://bdtime24-net-api-6lh5.onrender.com/api/news/${id}`, {
    cache: 'no-cache', // Ensure fresh data for the post
  });

  // Handle potential errors
  if (!response.ok) {
    throw new Error(`Failed to fetch post with ID: ${id}`);
  }

  const post = await response.json();

  // Render the post details
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">{post.subtitle}</p>
      <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded mb-4" />
      <p className="text-lg leading-relaxed">{post.content}</p>
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Published: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">Location: {post.location}</p>
      </div>
    </main>
  );
}
