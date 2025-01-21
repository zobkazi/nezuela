import dbConnect from '@/utils/dbConnect';
import Blog from '@/modules/blog/blog.schema';

export async function GET(req, { params }) {
    await dbConnect();

    try {
        const { id } = params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await dbConnect();

    try {
        const { id } = params;
        const body = await req.json();
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedBlog) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(updatedBlog), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}