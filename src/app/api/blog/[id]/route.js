// app/api/blog/[id]/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

export async function GET(req, { params }) {
  const { id } = await params;
  
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the blog post by ID
    const post = await Blog.findById(id).lean();
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
