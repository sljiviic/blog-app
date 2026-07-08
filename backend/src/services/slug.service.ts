import slugify from "slugify";
import { prisma } from "../lib/prisma";

export const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, { lower: true, strict: true, locale: "sr" });

  const existingPosts = await prisma.post.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: {
      slug: true,
    },
  });

  if (existingPosts.length === 0) {
    return baseSlug;
  }

  const existingSlugs = existingPosts.map((p) => p.slug);
  let maxCounter = 0;

  const regex = new RegExp(`^${baseSlug}(?:-(\\d+))?$`);

  for (const currentSlug of existingSlugs) {
    const match = currentSlug.match(regex);
    if (match) {
      const currentNumber = match[1] ? parseInt(match[1], 10) : 0;
      if (currentNumber > maxCounter) {
        maxCounter = currentNumber;
      }
    }
  }

  return `${baseSlug}-${maxCounter + 1}`;
};
