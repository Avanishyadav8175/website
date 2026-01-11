export const getImageProps = async (
  fileData: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      if (image) {
        resolve(image);
      } else {
        reject(new Error("Failed to read image"));
      }
    };

    image.src = fileData;
  });
};
