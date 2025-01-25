// /app/api/blog/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

// Create a new blog
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();
    const body = await req.json();
    const { title, content, author, category, tags, isPublished, featuredImage } = body;

    // Blog validation
    if (!title || title.length < 5 || title.length > 255) {
      return NextResponse.json({ error: 'Title must be between 5 and 255 characters' }, { status: 400 });
    }
    if (!content || content.length < 5 || content.length > 255) {
      return NextResponse.json({ error: 'Content must be between 5 and 255 characters' }, { status: 400 });
    }
    if (!author) {
      return NextResponse.json({ error: 'Author is required' }, { status: 400 });
    }
    if (!['TECHNOLOGY', 'DESIGN', 'LIFESTYLE', 'BUSINESS'].includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    // blog already exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return NextResponse.json({ error: 'Blog already exists' }, { status: 400 });
    }

    const blog = new Blog({ title, content, author, category, tags, isPublished, featuredImage });
    await blog.save();
    return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog', details: error.message }, { status: 500 });
  }
}

// Get all blogs with pagination
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments();
    const blogs = await Blog.find().skip(skip).limit(limit);

    return NextResponse.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalDocs: totalBlogs,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs', details: error.message }, { status: 500 });
  }
}
