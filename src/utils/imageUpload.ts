export const imageUpload = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data: { data: { display_url: string } } = await response.json();
  return data.data.display_url;
};
