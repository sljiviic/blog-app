// Hvata sve kesove koji drze niz postova (Home + profilne liste), a ne i
// profil objekat ni rezultate pretrage — oni imaju drugaciji oblik.
export const matchesPostLists = (queryKey: readonly unknown[]): boolean =>
  (queryKey[0] === "posts" && queryKey[1] === "list") ||
  (queryKey[0] === "users" &&
    (queryKey[2] === "posts" || queryKey[2] === "saved"));
