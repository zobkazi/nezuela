import { NextResponse } from 'next/server';
import connectToDatabase from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

export async function GET(req) {
  try {
    // Get query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    // Establish a database connection
    await connectToDatabase();

    // Fetch blogs with pagination
    const blogs = await Blog.find()
      .skip((page - 1) * limit) // Skip the appropriate number of posts
      .limit(limit) // Limit the number of posts
      .lean(); // For better performance
    
    // Get the total number of blogs for pagination metadata
    const totalPosts = await Blog.countDocuments();

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        details: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
