const isPR = process.env.GITHUB_EVENT_NAME === "pull_request";
const prNumber = process.env.GITHUB_EVENT_NUMBER;
const assetPrefix = isPR ? `/pr-${prNumber}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  assetPrefix,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codeit-server.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.(?:woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    });

    return config;
  },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
