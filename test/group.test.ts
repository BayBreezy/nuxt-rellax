import { fileURLToPath } from "node:url";

import { setup, $fetch } from "@nuxt/test-utils/e2e";
import { describe, it, expect } from "vitest";

const fixtureDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

describe("useRellaxGroup composable", async () => {
  await setup({ rootDir: fixtureDir });

  it("renders all group-managed elements", async () => {
    const html = await $fetch("/group");

    expect(html).toContain('data-testid="group-el-1"');
    expect(html).toContain('data-testid="group-el-2"');
    expect(html).toContain('data-testid="group-el-3"');
  });

  it("renders content inside each group element", async () => {
    const html = await $fetch("/group");

    expect(html).toContain("Element 1");
    expect(html).toContain("Element 2");
    expect(html).toContain("Element 3");
  });

  it("renders the group wrapper element", async () => {
    const html = await $fetch("/group");

    expect(html).toContain('id="group-wrapper"');
  });
});
