const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AVATAR_TRANSFORM = "f_auto,q_auto,c_fill,g_face,w_256,h_256";
const COVER_TRANSFORM = "f_auto,q_auto,c_fill,w_1000,h_560";

const upload = async (file: File, transform: string): Promise<string> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary nije konfigurisan. Dodaj VITE_CLOUDINARY_CLOUD_NAME i VITE_CLOUDINARY_UPLOAD_PRESET u .env.",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // fetch umesto axios instance — drugi host, bez naseg Bearer tokena
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) {
    throw new Error("Image upload failed. Please try again.");
  }

  const data: { secure_url: string } = await response.json();

  return data.secure_url.replace("/upload/", `/upload/${transform}/`);
};

export const uploadProfileImage = (file: File): Promise<string> =>
  upload(file, AVATAR_TRANSFORM);

export const uploadCoverImage = (file: File): Promise<string> =>
  upload(file, COVER_TRANSFORM);
