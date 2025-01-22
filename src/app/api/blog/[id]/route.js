import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

export async function GET(req, { params }) {
    await connectDB();

    try {
        // Await params before using it
        const { id } = await params;  // Awaiting params

        const blog = await Blog.findById(id);
        if (!blog) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
