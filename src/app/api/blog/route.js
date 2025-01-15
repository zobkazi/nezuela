import { NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/modules/blogs/blog.controller';
import { connectDB } from '@/libs/connectDB';

// Handle GET and POST methods
export async function GET(req) {
  try {
    await connectDB();
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newBlog = await createBlog(body);
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
