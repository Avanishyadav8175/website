import { clearCloudfrontCache } from "./cloudfront";
import { addFileToS3, addDirectoryToS3, deleteFileFromS3, deleteFilesFromS3, deleteDirectoryFromS3 } from "./s3";

export const cloudfront = { cache: { clear: clearCloudfrontCache } };

export const s3 = {
  file: {
    add: addFileToS3,
    delete: deleteFileFromS3,
    deleteMany: deleteFilesFromS3
  },
  directory: {
    add: addDirectoryToS3,
    delete: deleteDirectoryFromS3
  }
};

const aws = { cloudfront, s3 };

export default aws;
