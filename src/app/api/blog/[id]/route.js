import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

export async function generateStaticParams() {
    const blogs = await Blog.find({}); // অথবা আপনি ডাটাবেস থেকে ব্লগ আইডিগুলি নিয়ে আসতে পারেন

    // প্রতিটি ব্লগ আইডির জন্য প্যারামিটার তৈরি
    return blogs.map((blog) => ({
        id: blog._id.toString(),
    }));
}

export async function GET(req, { params }) {
    await connectDB();

    try {
        const { id } = params; // Now params is static because of generateStaticParams()
        const blog = await Blog.findById(id);
        if (!blog) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
