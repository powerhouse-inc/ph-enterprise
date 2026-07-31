import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/clint",
        destination: "/architecture#clint",
        permanent: true,
      },
      {
        source: "/connect",
        destination: "/architecture#connect",
        permanent: true,
      },
      {
        source: "/fusion",
        destination: "/architecture#fusion",
        permanent: true,
      },
      {
        source: "/switchboard",
        destination: "/architecture#switchboard",
        permanent: true,
      },
      {
        source: "/renown",
        destination: "/architecture#renown",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/architecture",
        permanent: true,
      },
      {
        source: "/reference-architecture",
        destination: "/architecture",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
