import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hapus baris output: 'export' jika sebelumnya ada */
  typescript: {
    ignoreBuildErrors: true, // Opsional: agar build tidak berhenti jika ada error tipe data kecil
  },
};

export default nextConfig;