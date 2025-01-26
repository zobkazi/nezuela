import { NextResponse } from 'next/server';
import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';

// Get a specific blog by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { title } = await params;

    const blog = await Blog.findOne({ title });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog', details: error.message }, { status: 500 });
  }
}

// Update a specific blog by ID
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();
    const { title, content, author, category, tags, isPublished, featuredImage } = body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, category, tags, isPublished, featuredImage },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog updated successfully', blog: updatedBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog', details: error.message }, { status: 500 });
  }
}

// Delete a specific blog by ID
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog', details: error.message }, { status: 500 });
  }
}
