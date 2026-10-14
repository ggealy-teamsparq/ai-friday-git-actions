import type { NextConfig } from "next";

// When building in GitHub Actions, the site is served from
// https://<user>.github.io/<repo>/ (a project page), so assets and
// links need to be prefixed with the repo name.
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // GitHub Pages has no server to run Next.js's image optimizer.
    unoptimized: true,
  },
  basePath,
  assetPrefix: isGithubActions ? `/${repo}/` : "",
  // next/image doesn't add basePath to `src`, so pages prefix their own
  // image paths with this value.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;