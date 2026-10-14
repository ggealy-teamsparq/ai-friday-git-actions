import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "../app/page";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

function imageSources() {
  render(<Home />);
  const logo = screen.getByAltText("Next.js logo");
  const star = within(
    screen.getByRole("button", { name: "Show welcome message" }),
  ).getByRole("presentation");
  return { logo: logo.getAttribute("src"), star: star.getAttribute("src") };
}

describe("Home page image paths", () => {
  it("serves images from the deployed base path", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/ai-friday-git-actions");

    expect(imageSources()).toEqual({
      logo: "/ai-friday-git-actions/next.svg",
      star: "/ai-friday-git-actions/star.svg",
    });
  });

  it("serves images from the site root when no base path is set", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    vi.stubEnv("GITHUB_ACTIONS", "true");

    expect(imageSources()).toEqual({ logo: "/next.svg", star: "/star.svg" });
  });
});

describe("next.config base path", () => {
  it("passes the app the same base path it deploys under", async () => {
    vi.stubEnv("GITHUB_ACTIONS", "true");
    vi.stubEnv("GITHUB_REPOSITORY", "ggealy-teamsparq/ai-friday-git-actions");

    const { default: config } = await import("../next.config");

    expect(config.basePath).toBe("/ai-friday-git-actions");
    expect(config.env?.NEXT_PUBLIC_BASE_PATH).toBe(config.basePath);
  });

  it("uses no base path outside GitHub Actions", async () => {
    vi.stubEnv("GITHUB_ACTIONS", "");

    const { default: config } = await import("../next.config");

    expect(config.env?.NEXT_PUBLIC_BASE_PATH).toBe("");
  });
});
