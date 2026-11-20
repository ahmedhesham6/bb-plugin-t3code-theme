import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "vitest";

const css = readFileSync(
  new URL("./themes/t3code.css", import.meta.url),
  "utf8",
);

function assertTokens(selector, expected) {
  const block = [...css.matchAll(/^([^\s{}@][^{}]*?)\s*\{([^{}]*)\}/gm)].find(
    (match) => match[1].replace(/\s+/g, " ") === selector,
  );
  assert.ok(block, `top-level ${selector} block`);
  const tokens = new Map(
    [...block[2].matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].replace(/\s+/g, " ").trim(),
    ]),
  );
  for (const [name, value] of Object.entries(expected)) {
    assert.equal(tokens.get(name), value, name);
  }
}

test("uses the light zinc palette, blue primary and selected font families", () => {
  assertTokens(":root, .light", {
    "--canvas": "oklch(from #fff 99.2% c h)",
    "--ink": "oklch(21% 0.006 285.885)",
    "--card": "#fff",
    "--primary": "oklch(0.488 0.217 264)",
    "--primary-foreground": "#fff",
    "--sidebar": "var(--secondary)",
    "--t3-contrast": "80%",
    "--foreground":
      "color-mix(in oklab, var(--ink) var(--t3-contrast), var(--canvas))",
    "--border":
      "color-mix(in oklab, oklch(92% 0.004 286.32) var(--t3-contrast), transparent)",
    "--input":
      "color-mix(in oklab, oklch(87.1% 0.006 286.286) var(--t3-contrast), transparent)",
    "--radius": "0.5rem",
    "--font-sans":
      '"SF Pro", -apple-system, BlinkMacSystemFont, "Inter Variable", "Segoe UI", system-ui, sans-serif',
    "--font-mono":
      'Menlo, "SF Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  });
});

test("uses true black, raised cards and the dark blue primary in dark mode", () => {
  assertTokens(".dark", {
    "--canvas": "#000",
    "--ink": "oklch(from #fff 97% c h)",
    "--card": "oklch(from var(--canvas) 17.9434% c h)",
    "--primary": "oklch(0.571 0.21 264)",
    "--sidebar": "#000",
    "--border":
      "color-mix(in oklab, rgb(255 255 255 / 8%) var(--t3-contrast), transparent)",
    "--input":
      "color-mix(in oklab, rgb(255 255 255 / 11%) var(--t3-contrast), transparent)",
  });
});
