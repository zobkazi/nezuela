export default async function getPost(_id) {
    const result = await fetch(
        `http://localhost:3000/api/blog${_id}`,
    );

    return result.json();
}