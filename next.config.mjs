/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  // ISR-friendly: static export disabled so we can use revalidate.
  // Dynamic pages are prerendered via generateStaticParams; new content
  // surfaces via on-demand or timed revalidation. See app/[locale]/resources/[slug]/page.tsx.
  //
  // Mutations go through HTTP route handlers (see src/app/api/contact/route.ts),
  // not Server Actions — keep it that way to avoid the experimental config surface.

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Root → default locale. i18n middleware handles browser detection
      // but this covers direct visits to bare paths.
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
