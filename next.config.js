/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/en/theme/paris",
        permanent: true,
      },
    ];
  },
  env: {
    // API_PROD_URL: "https://testapis.aenow.online/api/",
    API_PROD_URL: "https://fastkart-backend-api.onrender.com/api/",
    
    PAYMENT_RETURN_URL: "https://fastkart-backend-api.onrender.com",
    PAYMENT_CANCEL_URL: "https://fastkart-backend-api.onrender.com/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastkart-backend-api.onrender.com",
      },
      // {
      //   protocol: "http",
      //   hostname: "127.0.0.1",
      // },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      // },
    ],
  },
};

module.exports = nextConfig;
