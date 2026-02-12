import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("v-rellax directive — custom wrapper", async () => {
  await setup({ rootDir: fixtureDir });

  it("renders directive-bound element when wrapper option is set", async () => {
    const html = await $fetch("/custom-wrapper");

    expect(html).toContain('data-testid="directive-el"');
    expect(html).toContain("I have rellax");
  });
});
