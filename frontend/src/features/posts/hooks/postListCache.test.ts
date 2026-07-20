import { describe, expect, it } from "vitest";
import { matchesPostLists } from "./postListCache";

describe("matchesPostLists", () => {
  it("matches the home feed, for any sort order", () => {
    expect(matchesPostLists(["posts", "list", "newest"])).toBe(true);
    expect(matchesPostLists(["posts", "list", "popular"])).toBe(true);
  });

  it("matches post lists on any profile", () => {
    expect(matchesPostLists(["users", "me", "posts"])).toBe(true);
    expect(matchesPostLists(["users", "me", "saved"])).toBe(true);
    expect(matchesPostLists(["users", 5, "posts"])).toBe(true);
  });

  it("ignores caches that do not hold an array of posts", () => {
    // the profile is an object — the optimistic update calls .map() and would blow up
    expect(matchesPostLists(["users", "me"])).toBe(false);
    expect(matchesPostLists(["users", 5])).toBe(false);

    // search and detail have a different shape
    expect(matchesPostLists(["posts", "search", "react"])).toBe(false);
    expect(matchesPostLists(["posts", "detail", "some-slug"])).toBe(false);
  });
});
