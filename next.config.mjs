/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bbau.ac.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bbau.ac.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

