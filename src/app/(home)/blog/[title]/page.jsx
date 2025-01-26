async function getAllBlogs(title) {
  const res = await fetch(`http://localhost:3000/api/blog/${title}`, {
    method: 'GET',
    next: {
      revalidate: 5000,
    }
  });
  return res.json();
}


export default async function PostId({params}) {
  const data = await getAllBlogs(params.title);

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  const { blog } = data;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  )
}