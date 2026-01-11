export const getImgData = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target?.result;

      if (typeof fileData === "string") resolve(fileData);
      else reject(new Error("Couldnt read image"));
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
