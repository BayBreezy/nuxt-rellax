import { fileURLToPath } from "node:url";

import { setup, $fetch } from "@nuxt/test-utils/e2e";
import { describe, it, expect } from "vitest";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("RellaxElement component", async () => {
  await setup({ rootDir: fixtureDir });

  it("renders as a div by default", async () => {
    const html = await $fetch("/rellax-element");

    expect(html).toContain('data-testid="rellax-element-div"');
    // Attribute appears on a div (not some other tag) — check the opening tag
    expect(html).toMatch(/<div[^>]*data-testid="rellax-element-div"/);
  });

  it("renders as the specified tag when tag prop is provided", async () => {
    const html = await $fetch("/rellax-element");

    expect(html).toContain('data-testid="rellax-element-span"');
    expect(html).toMatch(/<span[^>]*data-testid="rellax-element-span"/);
  });

  it("renders slot content", async () => {
    const html = await $fetch("/rellax-element");

    expect(html).toContain("RellaxElement content");
    expect(html).toContain("Span content");
  });

  it("passes extra attributes through to the rendered element", async () => {
    const html = await $fetch("/rellax-element");

    expect(html).toContain('data-testid="rellax-element-center"');
    expect(html).toContain("Center content");
  });
});
