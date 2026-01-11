import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Activate all sample products
    const result = await models.Contents.updateMany(
      { 
        sku: { $in: ["ROSE-001", "CAKE-001", "PLANT-001"] },
        type: "product"
      },
      { 
        $set: { 
          isActive: true,
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: `Activated ${result.modifiedCount} sample products`,
      data: {
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount
      }
    });
  } catch (error) {
    console.error("Error activating products:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}