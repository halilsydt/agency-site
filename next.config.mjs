/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header for cleaner responses
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Static assets (images, fonts, etc.) - cache for 1 year
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // JS and CSS bundles with hashes - cache for 1 year
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
