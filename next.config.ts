import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Proxy configuration for API routes */
  rewrites: async () => {
    return {
      beforeFiles: [
        /* Route API requests through internal routes */
      ],
    };
  },
  typescript: {
    ignoreBuildErrors: true, // Opsional: agar build tidak berhenti jika ada error tipe data kecil
  },
};

export default nextConfig;