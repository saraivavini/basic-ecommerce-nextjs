/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "themewagon.github.io",
        port: '',
        pathname: '/minishop/images/**'
      }
    ]
  }
}

module.exports = nextConfig
