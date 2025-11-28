import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Run on port 3001 to match frontend expectations
if (process.env.PORT) {
  process.env.PORT = process.env.PORT;
}

export default nextConfig;
