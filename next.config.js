/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: "storage.googleapis.com",
            }
        ]
    }
}

module.exports = nextConfig
