import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/libs/connectDB';
import Blog from '@/modules/blog/blog.schema';
import connectMongo from '@/db/connectMongo';
import { getSingleProduct } from '@/db/queries/product.queries';

// Function to generate static params for blogs
export async function generateStaticParams() {
  await connectDB();
  const blogs = await Blog.find({}, '_id');
  return blogs.map(blog => ({ params: { id: blog._id.toString() } }));
}

// Function to get a blog by ID
export async function GET(req, { params }) {
  try {
    await connectDB();

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

// Function to get a single product by ID
export const GETProduct = async (req, { params: { id } }) => {
  await connectMongo();
  try {
    const product = await getSingleProduct(id);
    return NextResponse.json({ stock: product.stock_count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product', details: error.message }, { status: 500 });
  }
};
