import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("useRellax composable", async () => {
  await setup({ rootDir: fixtureDir });

  it("renders composable-bound element when using class selector", async () => {
    const html = await $fetch("/composable");

    expect(html).toContain('data-testid="composable-el"');
    expect(html).toContain("Speed = -3");
  });
});
