async function getAllBlogs(title) {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${title}`, {
    method: 'GET',
    next: {
      revalidate: 5000,
    }
  });
  return res.json();
}


export default async function PostId({ params }) {
  // Await the params if necessary (Next.js 15's behavior)
  const { title } = await params;

  const data = await getAllBlogs(title);  // Correct use of title after extracting it

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  const { blog } = data;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
