export default async function getPost(id) {
    const bassUrl = process.env.NEXT_PUBLIC_API_URL;
    const result = await fetch(
        `${bassUrl}/posts/${id}`
    );

    return result.json();
}