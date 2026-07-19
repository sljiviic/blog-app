import { beforeEach, describe, expect, it, vi } from "vitest";

const { findMany } = vi.hoisted(() => ({ findMany: vi.fn() }));

vi.mock("../lib/prisma", () => ({
  prisma: { post: { findMany } },
}));

import { generateUniqueSlug } from "./slug.service";

describe("generateUniqueSlug", () => {
  beforeEach(() => {
    findMany.mockReset();
  });

  it("slugifies the title when no post uses that slug", async () => {
    findMany.mockResolvedValue([]);

    await expect(generateUniqueSlug("Hello World")).resolves.toBe(
      "hello-world",
    );
  });

  it("appends a counter when the base slug is taken", async () => {
    findMany.mockResolvedValue([{ slug: "hello-world" }]);

    await expect(generateUniqueSlug("Hello World")).resolves.toBe(
      "hello-world-1",
    );
  });

  it("continues from the highest existing counter", async () => {
    findMany.mockResolvedValue([
      { slug: "hello-world" },
      { slug: "hello-world-3" },
      { slug: "hello-world-2" },
    ]);

    await expect(generateUniqueSlug("Hello World")).resolves.toBe(
      "hello-world-4",
    );
  });

  it("ignores slugs that only share a prefix", async () => {
    findMany.mockResolvedValue([{ slug: "hello-world-wide-web" }]);

    await expect(generateUniqueSlug("Hello World")).resolves.toBe(
      "hello-world-1",
    );
  });
});
