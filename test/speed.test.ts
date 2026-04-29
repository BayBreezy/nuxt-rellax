import { fileURLToPath } from "node:url";

import { setup, $fetch } from "@nuxt/test-utils/e2e";
import { describe, it, expect } from "vitest";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("v-rellax directive — speed attribute", async () => {
  await setup({ rootDir: fixtureDir });

  it("preserves positive speed attribute when rendered via SSR", async () => {
    const html = await $fetch("/speed");

    expect(html).toContain('data-rellax-speed="3"');
  });

  it("preserves negative speed attribute when rendered via SSR", async () => {
    const html = await $fetch("/speed");

    expect(html).toContain('data-rellax-speed="-5"');
  });
});
