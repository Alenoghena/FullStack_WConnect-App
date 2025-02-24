/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Alenoghena@2",
      database: "nextdb",
    },
    secret:
      "bd1c82768d21e48586ad4264b39d727c5509f26c12fb482264c53b1d137974e8c736a5223479c7c39551e6466e85d3fc9e6e17421",
    // secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
