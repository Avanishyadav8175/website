import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import { redisClient } from "@/db/redis/redis-client";

export async function GET(request: NextRequest) {
  try {
    const results = {
      mongodb: { status: "disconnected", error: null as string | null },
      redis: { status: "disconnected", error: null as string | null },
      timestamp: new Date().toISOString()
    };

    // Test MongoDB connection
    try {
      await connectDB();
      results.mongodb.status = "connected";
    } catch (error) {
      results.mongodb.error = error instanceof Error ? error.message : "Unknown error";
    }

    // Test Redis connection
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      await redisClient.ping();
      results.redis.status = "connected";
    } catch (error) {
      results.redis.error = error instanceof Error ? error.message : "Unknown error";
    }

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}