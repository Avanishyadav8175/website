// libraries
import { v4 as uuid } from "uuid";
import sharp from "sharp";

// operations
import { fileOperation } from "@/app/api/admin/media/mediaOperation";

// types
import { type IssueImageDocument } from "@/common/types/documentation/media/issueImage";

export const uploadIssueImageMiddleware = async (
  image: Partial<IssueImageDocument>
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
    folderName: "issue-image",
    fileType: "image",
    fileName: image.name,
    buffer: optimizedBuffer || buffer,
    extension: image.extension as string
  })) as string;

  if (url) {
    image.url = url;
  }

  return image as IssueImageDocument;
};

export const deleteIssueImageMiddleware = async (image: IssueImageDocument) => {
  await fileOperation({
    type: "delete",
    folderName: "issue-image",
    fileName: image.name
  });

  return image;
};

export const deleteIssueImagesMiddleware = async (
  images: IssueImageDocument[]
) => {
  const fileNames = images.map(({ name }) => name);

  await fileOperation({
    type: "delete-many",
    folderName: "issue-image",
    fileNames
  });

  return images;
};
