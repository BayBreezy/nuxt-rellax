import { fileURLToPath } from "node:url";

import { setup, $fetch } from "@nuxt/test-utils/e2e";
import { describe, it, expect } from "vitest";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("v-rellax directive modifiers", async () => {
  await setup({ rootDir: fixtureDir });

  it("renders element with .center modifier", async () => {
    const html = await $fetch("/modifiers");

    expect(html).toContain('data-testid="center-modifier-el"');
    expect(html).toContain("Center modifier");
  });

  it("renders element with .horizontal modifier", async () => {
    const html = await $fetch("/modifiers");

    expect(html).toContain('data-testid="horizontal-modifier-el"');
    expect(html).toContain("Horizontal modifier");
  });

  it("renders plain directive element alongside modified elements", async () => {
    const html = await $fetch("/modifiers");

    expect(html).toContain('data-testid="plain-directive-el"');
    expect(html).toContain("Plain directive");
  });

  it("renders all three elements in the same wrapper", async () => {
    const html = await $fetch("/modifiers");

    expect(html).toContain('id="mod-wrapper"');
    expect(html).toContain('data-testid="center-modifier-el"');
    expect(html).toContain('data-testid="horizontal-modifier-el"');
    expect(html).toContain('data-testid="plain-directive-el"');
  });
});
