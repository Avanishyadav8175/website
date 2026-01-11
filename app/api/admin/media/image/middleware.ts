// libraries
import { v4 as uuid } from "uuid";
import sharp from "sharp";

// operations
import { fileOperation } from "@/app/api/admin/media/mediaOperation";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

export const uploadImageMiddleware = async (image: Partial<ImageDocument>) => {
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

  image.name = `${uuid().replaceAll("-", "").substring(0, 16)}.${image.extension}`;

  const url = (await fileOperation({
    type: "add",
    folderName: `${image.folderName as string}`,
    fileType: "image",
    fileName: image.name,
    buffer: optimizedBuffer || buffer,
    extension: image.extension as string
  })) as string;

  if (url) image.url = url;

  return image as ImageDocument;
};

export const deleteImageMiddleware = async (image: ImageDocument) => {
  await fileOperation({
    type: "delete",
    folderName: `${image.folderName}`,
    fileName: image.name
  });

  return image;
};

export const deleteImagesMiddleware = async (images: ImageDocument[]) => {
  const fileNames = images.map(
    ({ name, folderName }) => `${folderName}/${name}`
  );

  await fileOperation({
    type: "delete-many",
    folderName: "image",
    fileNames
  });

  return images;
};
