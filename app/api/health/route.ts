import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import { redisClient } from "@/db/redis/redis-client";
import models from "@/db/mongoose/models";

export async function GET(request: NextRequest) {
  try {
    const healthCheck = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        mongodb: { status: "unknown", details: null as any },
        redis: { status: "unknown", details: null as any },
        aws: { status: "configured", details: null as any }
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || "development",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME
      },
      database: {
        collections: 0,
        sampleData: {} as any
      }
    };

    // Test MongoDB
    try {
      const connection = await connectDB();
      healthCheck.services.mongodb.status = "connected";
      healthCheck.services.mongodb.details = {
        readyState: connection.connection.readyState,
        host: connection.connection.host,
        name: connection.connection.name
      };

      // Count collections
      const collections = await connection.connection.db.listCollections().toArray();
      healthCheck.database.collections = collections.length;

      // Get sample data counts
      try {
        const productCount = await models.Contents.countDocuments({ type: "product" });
        const customerCount = await models.Customers.countDocuments();
        const orderCount = await models.Orders.countDocuments();
        
        healthCheck.database.sampleData = {
          products: productCount,
          customers: customerCount,
          orders: orderCount
        };
      } catch (err) {
        healthCheck.database.sampleData = { error: "Could not fetch counts" };
      }
    } catch (error) {
      healthCheck.services.mongodb.status = "error";
      healthCheck.services.mongodb.details = error instanceof Error ? error.message : "Unknown error";
      healthCheck.status = "degraded";
    }

    // Test Redis
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      const pong = await redisClient.ping();
      healthCheck.services.redis.status = pong === "PONG" ? "connected" : "error";
      healthCheck.services.redis.details = { response: pong };
    } catch (error) {
      healthCheck.services.redis.status = "error";
      healthCheck.services.redis.details = error instanceof Error ? error.message : "Unknown error";
      healthCheck.status = "degraded";
    }

    // Check AWS configuration
    const awsConfig = {
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      cloudfront: process.env.AWS_CLOUDFRONT_URL,
      hasCredentials: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
    };
    healthCheck.services.aws.details = awsConfig;

    const statusCode = healthCheck.status === "healthy" ? 200 : 503;
    
    return NextResponse.json(healthCheck, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}