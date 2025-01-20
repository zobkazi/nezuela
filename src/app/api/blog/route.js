import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/Blog';

export async function POST(req, res) {
    await dbConnect();

    try {
        const body = await req.json();
        const newBlog = await Blog.create(body);
        return new Response(JSON.stringify(newBlog), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

export async function GET(req, res) {
    await dbConnect();

    try {
        const blogs = await Blog.find({});
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
