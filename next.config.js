/** @type {import('next').NextConfig} */
const nextConfig = {
  // This option is the key to resolving the SWC native binary loading error
  // in environments where native addons are disabled (like WebContainers).
  // It forces Next.js to use a JavaScript-based minifier (Terser) instead of SWC.
  swcMinify: false,
};

module.exports = nextConfig;
