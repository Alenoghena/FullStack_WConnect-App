/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // reactStrictMode: true,
  serverRuntimeConfig: {
    development: {
      dbConfig: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Alenoghena@2",
        database: "nextdb",
      },
    },
    production: {
      dbConfig: {
        host: process.env.DB_PROD_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_PROD_USERNAME,
        password: process.env.DB_PROD_PASSWORD,
        database: process.env.DB_PROD_NAME,
      },
    },

    secret:
      "bd1c82768d21e48586ad4264b39d727c5509f26c12fb482264c53b1d137974e8c736a5223479c7c39551e6466e85d3fc9e6e17421",
    // secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : `${process.env.SITE_URL}/api`, // production api
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  serverExternalPackages: ["sequelize"],
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: ` ${process.env.SITE_URL}, http://localhost:3000, http://localhost:3001, http://localhost:3002`,
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
