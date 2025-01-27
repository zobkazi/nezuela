export default async function getPost(id) {
    const result = await fetch(
        `http://localhost:3000/api/blog${id}`,
    );

    return result.json();
}