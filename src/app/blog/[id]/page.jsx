import getAllPosts from "@/libs/getAllBlogs";
import getPost from "@/libs/getBlog";

export async function generateMetadata({ params }) {
    const { id } = params;
    const post = await getPost(id);

    return {
        title: post.title,
        description: post.body,
    };
}

export default async function PostPage({ params }) {
    const { id } = params;
    const postPromise = getPost(id);
    // const commentsPromise = getComments(id);

    // const [post, comments] = await Promise.all([postPromise, commentsPromise]);
    const post = await postPromise;

    return (
        <div className="mt-6">
            <h2 className="text-blue-500">{post.title}</h2>
            <p className="mt-3">{post.body}</p>
            <hr />
            <h3 className="mt-6">Comments</h3>
        </div>
    );
}

export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}
