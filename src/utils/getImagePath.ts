const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_PATH as string;

export const getImagePath = () => {
  return IMAGE_PATH;
};
