/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
        {
            source: '/api/:path*',
            headers: [
            {
                key: 'Access-Control-Allow-Origin',
                value: '*',
            },
            {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, POST, PUT, DELETE, OPTIONS',
            },
            {
                key: 'Access-Control-Allow-Headers',
                value: 'X-Requested-With, Content-Type, Authorization',
            },
            ],
        },
        ];
    },
    output: {
        filename: 'static/js/[name].[contenthash].js',
        assetModuleFilename: 'static/assets/[hash][ext][query]',
    },
    reactStrictMode: true,
    images: {
        domains: ['example.com'],
    },
};

export default nextConfig;
