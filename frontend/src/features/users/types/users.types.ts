import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  profileImage: z.string(),
  stats: z.object({
    blogsPublished: z.number(),
    likesReceived: z.number(),
    postsSaved: z.number(),
  }),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// Bez email-a i broja sacuvanih postova — to je privatno
export const publicUserProfileSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string(),
  stats: z.object({
    blogsPublished: z.number(),
    likesReceived: z.number(),
  }),
});

export type PublicUserProfile = z.infer<typeof publicUserProfileSchema>;

export const editProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export type EditProfileFormType = z.infer<typeof editProfileSchema>;

export type UpdateProfileDTO = EditProfileFormType & { profileImage: string };
