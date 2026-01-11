// next config
export const dynamic = "force-dynamic";

import { Response } from "@/common/utils/api/next";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";
import { NextRequest } from "next/server";

const { CatalogueCategories } = models;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Activate all catalogue categories
    const result = await CatalogueCategories.updateMany(
      {},
      { $set: { isActive: true } }
    );

    return Response({
      status: 200,
      data: {
        data: {
          message: `Activated ${result.modifiedCount} catalogue categories`,
          modifiedCount: result.modifiedCount
        },
        messages: [
          {
            type: "success",
            message: `Successfully activated ${result.modifiedCount} catalogue categories`
          }
        ]
      }
    });
  } catch (error: any) {
    return Response({
      status: 500,
      data: {
        data: null,
        messages: [
          {
            type: "error",
            message: error.message || "Failed to activate catalogue categories"
          }
        ]
      }
    });
  }
}
