import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Create a minimal product that satisfies the schema requirements
    const simpleProduct = {
      type: "product",
      name: "Sample Product " + Date.now(),
      slug: "sample-product-" + Date.now(),
      sku: "SAMPLE-" + Date.now(),
      
      // Required category structure
      category: {
        primary: null,
        contentCategory: null,
        topic: null,
        subTopic: null,
        subSubTopic: null,
        subSubSubTopic: null
      },
      
      // Required media structure
      media: {
        primary: null,
        images: [],
        videos: []
      },
      
      // Required price structure
      price: {
        base: 999,
        mrp: 1299,
        sellingPrice: 999,
        discount: {
          type: "percentage",
          value: 23
        }
      },
      
      // Required detail structure
      detail: {
        description: "This is a sample product for testing purposes",
        shortDescription: "Sample product",
        faqGroup: null,
        cancellationPolicy: null,
        careInfo: null,
        deliveryDetail: null
      },
      
      // Required audit fields
      createdBy: "system",
      updatedBy: "system"
    };

    const product = new models.Contents(simpleProduct);
    const savedProduct = await product.save();

    return NextResponse.json({
      success: true,
      message: "Simple product created successfully",
      data: savedProduct
    });
  } catch (error) {
    console.error("Error creating simple product:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}