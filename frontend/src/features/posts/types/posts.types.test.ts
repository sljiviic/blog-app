import { describe, expect, it } from "vitest";
import { basePostSchema, upsertPostSchema } from "./posts.types";

const rawPost = {
  id: 1,
  slug: "hello-world",
  title: "Hello world",
  content: "Some content",
  createdAt: "2026-01-01T00:00:00.000Z",
  authorId: 2,
};

describe("basePostSchema", () => {
  it("coerces createdAt into a Date", () => {
    const post = basePostSchema.parse({ ...rawPost, coverImage: "" });

    expect(post.createdAt).toBeInstanceOf(Date);
  });

  it("falls back to an empty coverImage when the API omits it", () => {
    const post = basePostSchema.parse(rawPost);

    expect(post.coverImage).toBe("");
  });
});

describe("upsertPostSchema", () => {
  it("requires a title of at least 3 characters", () => {
    const result = upsertPostSchema.safeParse({
      title: "ab",
      content: "Long enough content",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a valid post", () => {
    const result = upsertPostSchema.safeParse({
      title: "A valid title",
      content: "Long enough content",
    });

    expect(result.success).toBe(true);
  });
});
