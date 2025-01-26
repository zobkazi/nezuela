/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://zobkazi.github.io/nezuela/api/:path*",
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Accept",
                    },
                ],
            },
        ];
    },
}

export default nextConfig;
