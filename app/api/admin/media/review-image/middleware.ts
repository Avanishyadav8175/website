// libraries
import { v4 as uuid } from "uuid";
import sharp from "sharp";

// operations
import { fileOperation } from "@/app/api/admin/media/mediaOperation";

// types
import { type ReviewImageDocument } from "@/common/types/documentation/media/reviewImage";

export const uploadReviewImageMiddleware = async (
  image: Partial<ReviewImageDocument>
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
    folderName: "review-image",
    fileType: "image",
    fileName: image.name,
    buffer: optimizedBuffer || buffer,
    extension: image.extension as string
  })) as string;

  if (url) {
    image.url = url;
  }

  return image as ReviewImageDocument;
};

export const deleteReviewImageMiddleware = async (
  image: ReviewImageDocument
) => {
  await fileOperation({
    type: "delete",
    folderName: "review-image",
    fileName: image.name
  });

  return image;
};

export const deleteReviewImagesMiddleware = async (
  images: ReviewImageDocument[]
) => {
  const fileNames = images.map(({ name }) => name);

  await fileOperation({
    type: "delete-many",
    folderName: "review-image",
    fileNames
  });

  return images;
};
