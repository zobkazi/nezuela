import { NextResponse } from 'next/server';
import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

export async function GET(req, { params }) {
  try {
    await connectDB();

    // Ensure params are awaited properly
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog', details: error.message }, { status: 500 });
  }
}
