/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
        esmExternals: true,
   },
   output: "export",
};

export default nextConfig;
