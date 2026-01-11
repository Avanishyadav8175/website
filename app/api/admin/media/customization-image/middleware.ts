// libraries
import { v4 as uuid } from "uuid";
import sharp from "sharp";

// operations
import { fileOperation } from "@/app/api/admin/media/mediaOperation";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";

export const uploadCustomizationImageMiddleware = async (
  image: Partial<CustomizationImageDocument>
) => {
  const buffer = Buffer.from(image.data as string, "base64");
  let optimizedBuffer: Buffer | null = null;

  try {
    optimizedBuffer = await sharp(buffer)
      .rotate()
      .toFormat("webp")
      .webp({ quality: 95 })
      .withMetadata({ exif: undefined })
      .toBuffer();
  } catch (error) { }

  if (optimizedBuffer) {
    image.extension = "webp";
  }

  image.name = `${uuid()}.${image.extension}`;

  const url = (await fileOperation({
    type: "add",
    folderName: "customization-image",
    fileType: "image",
    fileName: image.name,
    buffer: optimizedBuffer || buffer,
    extension: image.extension as string
  })) as string;

  if (url) {
    image.url = url;
  }

  return image as CustomizationImageDocument;
};

export const deleteCustomizationImageMiddleware = async (
  image: CustomizationImageDocument
) => {
  await fileOperation({
    type: "delete",
    folderName: "customization-image",
    fileName: image.name
  });

  return image;
};

export const deleteCustomizationImagesMiddleware = async (
  images: CustomizationImageDocument[]
) => {
  const fileNames = images.map(({ name }) => name);

  await fileOperation({
    type: "delete-many",
    folderName: "customization-image",
    fileNames
  });

  return images;
};
