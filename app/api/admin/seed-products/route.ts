import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";

const sampleProducts = [
  {
    type: "product",
    name: "Beautiful Rose Bouquet",
    slug: "beautiful-rose-bouquet",
    sku: "ROSE-001",
    category: {
      contentCategory: null,
      topic: null,
      subTopic: null,
      subSubTopic: null,
      subSubSubTopic: null
    },
    media: {
      images: [],
      videos: []
    },
    price: {
      mrp: 1299,
      sellingPrice: 999,
      discount: {
        type: "percentage",
        value: 23
      }
    },
    detail: {
      description: "A stunning arrangement of fresh red roses perfect for any occasion",
      shortDescription: "Fresh red roses bouquet"
    },
    createdBy: "system",
    updatedBy: "system"
  },
  {
    type: "product",
    name: "Chocolate Cake Delight",
    slug: "chocolate-cake-delight",
    sku: "CAKE-001",
    category: {
      contentCategory: null,
      topic: null,
      subTopic: null,
      subSubTopic: null,
      subSubSubTopic: null
    },
    media: {
      images: [],
      videos: []
    },
    price: {
      mrp: 899,
      sellingPrice: 749,
      discount: {
        type: "percentage",
        value: 17
      }
    },
    detail: {
      description: "Rich and moist chocolate cake with premium cocoa and chocolate ganache",
      shortDescription: "Premium chocolate cake"
    },
    createdBy: "system",
    updatedBy: "system"
  },
  {
    type: "product",
    name: "Elegant Orchid Plant",
    slug: "elegant-orchid-plant",
    sku: "PLANT-001",
    category: {
      contentCategory: null,
      topic: null,
      subTopic: null,
      subSubTopic: null,
      subSubSubTopic: null
    },
    media: {
      images: [],
      videos: []
    },
    price: {
      mrp: 1599,
      sellingPrice: 1299,
      discount: {
        type: "percentage",
        value: 19
      }
    },
    detail: {
      description: "Beautiful white orchid plant in decorative pot, perfect for home or office",
      shortDescription: "White orchid plant"
    },
    createdBy: "system",
    updatedBy: "system"
  }
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing products (optional)
    await models.Contents.deleteMany({ type: "product" });

    // Create sample products
    const createdProducts = [];
    for (const productData of sampleProducts) {
      const product = new models.Contents({
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      const savedProduct = await product.save();
      createdProducts.push(savedProduct);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdProducts.length} sample products`,
      data: createdProducts
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}