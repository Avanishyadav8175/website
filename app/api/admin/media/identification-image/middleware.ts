// libraries
import { v4 as uuid } from "uuid";
import sharp from "sharp";

// operations
import { fileOperation } from "@/app/api/admin/media/mediaOperation";

// types
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";

export const uploadIdentificationImageMiddleware = async (
  image: Partial<IdentificationImageDocument>
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
    folderName: "identification-image",
    fileType: "image",
    fileName: image.name,
    buffer: optimizedBuffer || buffer,
    extension: image.extension as string
  })) as string;

  if (url) {
    image.url = url;
  }

  return image as IdentificationImageDocument;
};

export const deleteIdentificationImageMiddleware = async (
  image: IdentificationImageDocument
) => {
  await fileOperation({
    type: "delete",
    folderName: "identification-image",
    fileName: image.name
  });

  return image;
};

export const deleteIdentificationImagesMiddleware = async (
  images: IdentificationImageDocument[]
) => {
  const fileNames = images.map(({ name }) => name);

  await fileOperation({
    type: "delete-many",
    folderName: "identification-image",
    fileNames
  });

  return images;
};
