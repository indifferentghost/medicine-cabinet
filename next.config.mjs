/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
    instrumentationHook: true,
  }
};

export default nextConfig;
