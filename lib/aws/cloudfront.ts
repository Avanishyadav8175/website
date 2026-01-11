import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

const region = process.env.AWS_REGION || "";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const distributionId = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID || "";

const cloudfrontClient = new CloudFrontClient({
  region,
  credentials: { accessKeyId, secretAccessKey }
});

export const clearCloudfrontCache = async ({ path }: { path: string }) => {
  const command = new CreateInvalidationCommand({
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: `${Date.now()}`,
      Paths: { Quantity: 1, Items: [path] }
    }
  });

  const response = await cloudfrontClient.send(command);

  return response.Invalidation?.Status === "InProgress";
};
