// Matches every cache holding an array of posts (feed + profile lists), but not
// the profile object or search results — those have a different shape.
export const matchesPostLists = (queryKey: readonly unknown[]): boolean =>
  (queryKey[0] === "posts" && queryKey[1] === "list") ||
  (queryKey[0] === "users" &&
    (queryKey[2] === "posts" || queryKey[2] === "saved"));
