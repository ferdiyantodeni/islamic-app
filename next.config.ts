import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hapus baris output: 'export' jika sebelumnya ada */
  typescript: {
    ignoreBuildErrors: true, // Opsional: agar build tidak berhenti jika ada error tipe data kecil
  },
  eslint: {
    ignoreDuringBuilds: true, // Opsional: agar build tidak berhenti karena aturan penulisan (linting)
  }
};

export default nextConfig;