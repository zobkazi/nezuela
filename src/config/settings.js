const apiBasseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const config = {
    api: {
        createBlog: `${apiBasseUrl}/api/blog`,
        getBlog: `${apiBasseUrl}/api/blog`,
    },
};

export default config;