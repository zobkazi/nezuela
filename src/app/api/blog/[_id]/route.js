import connectMongo from "@/libs/dbConnect";
import Blog from "@/models/blog/Blog";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Get the _id from params
    const { _id } = params;

    // Find blog post by ID
    const post = await Blog.findById(_id);

    // If no post found, return 404
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Return the post data
    return NextResponse.json(post);

  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Error fetching blog post: " + error.message },
      { status: 500 }
    );
  }
}