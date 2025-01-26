import Blog from "@/modules/blog/blog.schema";
import connectToDatabase from "@/libs/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract query parameters from the request
    const title = req.nextUrl.searchParams.get("title");
    const content = req.nextUrl.searchParams.get("content");
    const category = req.nextUrl.searchParams.get("category");

    // Build the query dynamically
    const query = {};
    if (title) query.title = title;
    if (content) query.content = content;
    if (category) query.category = category;

    // Fetch blogs from the database with lean for plain objects
    const blogs = await Blog.find(query).lean();

    // Return the data as a JSON response
    return NextResponse.json({ success: true, blogs: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
};
