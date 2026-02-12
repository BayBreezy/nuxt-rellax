import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch, useTestContext } from "@nuxt/test-utils/e2e";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("module setup", async () => {
  await setup({ rootDir: fixtureDir });

  it("renders basic page content when visiting index", async () => {
    const html = await $fetch("/");

    expect(html).toContain("<div>basic</div>");
  });

  it("provides $rellax when plugin is registered", async () => {
    const html = await $fetch("/");

    expect(html).toContain("rellax-available");
  });

  it("includes rellax in optimizeDeps for CJS interop", () => {
    const { nuxt } = useTestContext();

    expect(nuxt?.options.vite.optimizeDeps?.include).toContain("rellax");
  });

  it("excludes rellax from build.transpile to preserve pre-bundling", () => {
    const { nuxt } = useTestContext();

    expect(nuxt?.options.build.transpile).not.toContain("rellax");
  });
});
