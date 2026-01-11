export const dynamic = "force-dynamic";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";
import { connectRedis, redisClient } from "@/db/redis/redis-client";

const client = new CloudFrontClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
});

export const GET = async (): Promise<NextResponse> => {
  try {
    const params = {
      DistributionId: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID as string,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: 1,
          Items: ["/*"]
        }
      }
    };

    revalidateTag("cache");

    await connectRedis();
    await redisClient.flushAll();

    const command = new CreateInvalidationCommand(params);

    try {
      revalidateTag("cache");

      const awsRes = await client.send(command);

      return NextResponse.json(
        { message: "Cache Reset Successfully", awsResponse: awsRes },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        { message: "Cache Reset Failed", error: error },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }
};
