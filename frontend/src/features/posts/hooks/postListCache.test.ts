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
    // profil je objekat — optimisticki update radi .map() pa bi pukao
    expect(matchesPostLists(["users", "me"])).toBe(false);
    expect(matchesPostLists(["users", 5])).toBe(false);

    // pretraga i detalj imaju drugaciji oblik
    expect(matchesPostLists(["posts", "search", "react"])).toBe(false);
    expect(matchesPostLists(["posts", "detail", "some-slug"])).toBe(false);
  });
});
