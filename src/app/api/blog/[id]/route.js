import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

// generateStaticParams function to generate static paths
export async function generateStaticParams() {
  const blogs = await Blog.find({});  // অথবা আপনার ডাটাবেস থেকে ব্লগ আইডিগুলি নিয়ে আসুন

  // Generate static params for each blog entry
  return blogs.map((blog) => ({
    id: blog._id.toString(),  // ব্লগের id এখানে staticভাবে আনা হবে
  }));
}

// GET method to handle fetching the blog details
export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;  // Staticly generated id
    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
