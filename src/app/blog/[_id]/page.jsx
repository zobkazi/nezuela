import connectMongo from "@/libs/dbConnect";
import Blog from "@/models/blog/Blog";

// Fetch blog post by ID
async function getBlogPost(id) {
    await connectMongo();
    const post = await Blog.findById(id);
    return post;
}

// Fetch all blog posts for static paths
async function getAllBlogPosts() {
    await connectMongo();
    const posts = await Blog.find({});
    return posts;
}

// Generate static parameters
export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    
    return posts.map((post) => ({
        id: post._id.toString(),
    }));
}

// Page component
export default async function BlogPost({ params }) {
    const { id } = params;
    const post = await getBlogPost(id);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <article className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-2">By {post.author}</p>
            <time className="text-gray-500 mb-4 block">
                {new Date(post.createdAt).toLocaleDateString()}
            </time>
            <div className="prose max-w-none">
                {post.content}
            </div>
        </article>
    );
}