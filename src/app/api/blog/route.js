
import connectMongo from "@/libs/dbConnect";
import Blog from "@/models/blog/Blog";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        await connectMongo();

        const newBlog = new Blog(body);
        await newBlog.save();

        return new NextResponse(
            JSON.stringify({ message: "User is created", data: newBlog }),
            { status: 200 }
          );
    } catch (error) {
        return new NextResponse("Error in creating user" + error.message, {
            status: 500,
          });
        
    }
}


export const GET = async (req) => {
    try {
        await connectMongo();
        const blogs = await Blog.find();
        return new NextResponse(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching users" + error.message, {
            status: 500,
          });
    }
}