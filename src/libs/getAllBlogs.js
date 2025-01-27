export default async function getAllPosts() {
    const result = await fetch(
        "http://localhost:3000/api/blog",
        {
            next: {
                revalidate: 10,
            },
        }
    );

    if (!result.ok) {
        throw new Error("There was an error fetching posts");
    }

    return result.json();
}