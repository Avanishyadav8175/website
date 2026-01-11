import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const products = await models.Contents.find({ type: "product" })
      .populate('media.primary')
      .populate('category.primary')
      .limit(10);

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products.map(product => ({
        id: product._id,
        name: product.name,
        sku: product.sku,
        slug: product.slug,
        price: product.price?.base?.price || 0,
        mrp: product.price?.base?.mrp || 0,
        isActive: product.isActive,
        category: product.category?.primary || null,
        media: product.media?.primary || null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }))
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}