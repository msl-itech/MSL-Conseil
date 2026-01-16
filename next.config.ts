import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Optimisations pour améliorer le Speed Index
  experimental: {
    // Optimise le CSS critique (inline au-dessus de la ligne de flottaison)
    optimizeCss: true,
    // Réduit la taille des imports pour les bibliothèques
    optimizePackageImports: ['gsap', '@gsap/react', 'react-hot-toast', 'lenis'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
