import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { loadPluginApp } from "@get-bb/plugin-sdk/testing/app";

const BRAND_ICONS = ["Discord", "DiscordLogo", "Github", "GithubLogo"];

const app = await loadPluginApp(() => import("./app"));

it("registers icon artwork and leaves bb's brand logos alone", () => {
  const names = app.icons.map((icon) => icon.name);
  expect(names.length).toBeGreaterThan(150);
  expect(names.filter((name) => BRAND_ICONS.includes(name))).toEqual([]);
});

it("draws each icon as Lucide artwork at stroke width 1.75, sized by the caller", () => {
  for (const { name, component: Artwork } of app.icons) {
    const html = renderToStaticMarkup(<Artwork className="size-4" />);
    expect(html, name).toMatch(/class="lucide [^"]*size-4"/);
    expect(html, name).toContain('stroke-width="1.75"');
    expect(html, name).toContain('stroke="currentColor"');
  }
});
