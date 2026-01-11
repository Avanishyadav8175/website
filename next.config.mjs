/**
 * @type {import('next').NextConfig}
 */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REMOTE_IMAGE_URLS = [];

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3lno5tuwkddps.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'd22rebqllszdz8.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.s3.*.amazonaws.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PATCH, DELETE"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Content-Type, Authorization"
          }
        ]
      }
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  }
};

export default nextConfig;
