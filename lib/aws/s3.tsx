// import {
//   S3Client,
//   DeleteObjectCommand,
//   PutObjectCommand,
//   DeleteObjectsCommand
// } from "@aws-sdk/client-s3";

// // env
// const region = process.env.AWS_REGION || "";
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
// const bucketName = process.env.AWS_S3_BUCKET_NAME || "";

// const s3Client = new S3Client({
//   region,
//   credentials: {
//     accessKeyId,
//     secretAccessKey
//   }
// });

// export const addDirectoryToS3 = async ({
//   directoryName
// }: {
//   directoryName: string;
// }) => {
//   const params = {
//     Bucket: bucketName,
//     Key: `${directoryName}/`
//   };

//   const command = new PutObjectCommand(params);

//   await s3Client.send(command);
// };

// export const deleteDirectoryFromS3 = async ({
//   directoryName
// }: {
//   directoryName: string;
// }) => {
//   const params = {
//     Bucket: bucketName,
//     Key: `${directoryName}/`
//   };

//   const command = new DeleteObjectCommand(params);

//   await s3Client.send(command);
// };

// export const addFileToS3 = async ({
//   directoryName,
//   fileType,
//   fileName,
//   buffer,
//   extension
// }: {
//   directoryName: string;
//   fileType: "image";
//   fileName: string;
//   buffer: Buffer;
//   extension: string;
// }) => {
//   const params = {
//     Bucket: bucketName,
//     Key: `${directoryName}/${fileName}`,
//     Body: buffer,
//     ContentType: `${fileType}/${extension}`
//   };

//   const command = new PutObjectCommand(params);

//   await s3Client.send(command);
// };

// export const deleteFileFromS3 = async ({
//   directoryName,
//   fileName
// }: {
//   directoryName: string;
//   fileName: string;
// }) => {
//   const params = {
//     Bucket: bucketName,
//     Key: `${directoryName}/${fileName}`
//   };

//   const command = new DeleteObjectCommand(params);

//   await s3Client.send(command);
// };

// export const deleteFilesFromS3 = async ({
//   directoryName,
//   fileNames
// }: {
//   directoryName: string;
//   fileNames: string[];
// }) => {
//   const params = {
//     Bucket: bucketName,
//     Delete: {
//       Objects: fileNames.map((fileName) => ({
//         Key: `${directoryName}/${fileName}`
//       }))
//     }
//   };

//   const command = new DeleteObjectsCommand(params);

//   await s3Client.send(command);
// };


import {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

/* ------------------ ENV ------------------ */
const region = process.env.AWS_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const bucketName = process.env.AWS_S3_BUCKET_NAME!;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

/* -------------------------------------------------
   CREATE EMPTY DIRECTORY (just puts an empty key)
------------------------------------------------- */
export const addDirectoryToS3 = async ({
  directoryName
}: {
  directoryName: string;
}) => {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: `${directoryName}/`,
      Body: "" // empty object to simulate directory
    }
  });

  await upload.done();
};

/* -------------------------------------------------
   DELETE DIRECTORY
------------------------------------------------- */
export const deleteDirectoryFromS3 = async ({
  directoryName
}: {
  directoryName: string;
}) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: `${directoryName}/`
  });

  await s3Client.send(command);
};

/* -------------------------------------------------
   UPLOAD FILE (SAFE VERSION WITH UPLOAD)
------------------------------------------------- */
export const addFileToS3 = async ({
  directoryName,
  fileType,
  fileName,
  buffer,
  extension
}: {
  directoryName: string;
  fileType: "image";
  fileName: string;
  buffer: Buffer;
  extension: string;
}) => {

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: `${directoryName}/${fileName}`,
      Body: buffer,
      ContentType: `${fileType}/${extension}`
    }
  });

  await upload.done();
};

/* -------------------------------------------------
   DELETE SINGLE FILE
------------------------------------------------- */
export const deleteFileFromS3 = async ({
  directoryName,
  fileName
}: {
  directoryName: string;
  fileName: string;
}) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: `${directoryName}/${fileName}`
  });

  await s3Client.send(command);
};

/* -------------------------------------------------
   DELETE MULTIPLE FILES
------------------------------------------------- */
export const deleteFilesFromS3 = async ({
  directoryName,
  fileNames
}: {
  directoryName: string;
  fileNames: string[];
}) => {
  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: fileNames.map((file) => ({
        Key: `${directoryName}/${file}`
      }))
    }
  });

  await s3Client.send(command);
};
