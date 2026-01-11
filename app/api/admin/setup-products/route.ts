import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Create a dummy folder for images
    let dummyFolder = await models.Folders.findOne({ name: "sample-images" });
    if (!dummyFolder) {
      dummyFolder = await models.Folders.create({
        name: "sample-images",
        label: "Sample Images",
        colorName: "blue",
        isDeleted: false,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a dummy image for products
    let dummyImage = await models.Images.findOne({ name: "sample-product-image" });
    if (!dummyImage) {
      dummyImage = await models.Images.create({
        folderId: dummyFolder._id?.toString(),
        folderName: dummyFolder.label,
        name: "sample-product-image",
        defaultAlt: "Product Image",
        alt: "Sample Product Image",
        extension: "webp",
        width: 400,
        height: 400,
        size: 50000,
        url: "https://d22rebqllszdz8.cloudfront.net/sample-product.webp",
        usagesCount: 0,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // First, let's create some basic presets that products need
    
    // Create a basic FAQ Group
    let faqGroup = await models.FAQGroups.findOne({ name: "General FAQ" });
    if (!faqGroup) {
      faqGroup = await models.FAQGroups.create({
        name: "General FAQ",
        faqs: [
          {
            question: "How long does delivery take?",
            answer: "We deliver within 2-4 hours in most cities."
          }
        ],
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a basic Cancellation Policy
    let cancellationPolicy = await models.CancellationPolicies.findOne({ label: "Standard Policy" });
    if (!cancellationPolicy) {
      cancellationPolicy = await models.CancellationPolicies.create({
        label: "Standard Policy",
        content: "Free cancellation up to 2 hours before delivery. 50% refund after 2 hours.",
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a basic Care Info
    let careInfo = await models.CareInfos.findOne({ label: "Standard Care" });
    if (!careInfo) {
      careInfo = await models.CareInfos.create({
        label: "Standard Care",
        instructions: ["Keep in cool place", "Handle with care"],
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a basic Delivery Detail
    let deliveryDetail = await models.DeliveryDetails.findOne({ label: "Standard Delivery" });
    if (!deliveryDetail) {
      deliveryDetail = await models.DeliveryDetails.create({
        label: "Standard Delivery",
        instructions: ["Same day delivery available", "Delivery within 2-4 hours"],
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a basic Processing Time
    let processingTime = await models.ProcessingTimes.findOne({ hours: 2 });
    if (!processingTime) {
      processingTime = await models.ProcessingTimes.create({
        label: "Standard Processing",
        hours: 2,
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a basic Content Category
    let contentCategory = await models.ContentCategories.findOne({ name: "Flowers" });
    if (!contentCategory) {
      contentCategory = await models.ContentCategories.create({
        name: "Flowers",
        slug: "flowers",
        description: "Beautiful fresh flowers",
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Create a basic Brand
    let brand = await models.Brands.findOne({ name: "Decorwish" });
    if (!brand) {
      brand = await models.Brands.create({
        name: "Decorwish",
        mail: "info@decorwish.com",
        contactNumber: "7027463786",
        address: "123 Business Street, City, State, India",
        description: "Premium quality products",
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      });
    }

    // Now create sample products with all required fields
    const sampleProducts = [
      {
        type: "product",
        name: "Beautiful Red Rose Bouquet",
        slug: "beautiful-red-rose-bouquet",
        sku: "ROSE-001",
        
        category: {
          primary: contentCategory._id,
          contentCategory: contentCategory._id,
          topic: null,
          subTopic: null,
          subSubTopic: null,
          subSubSubTopic: null
        },
        
        media: {
          primary: dummyImage._id,
          gallery: [],
          video: null,
          review: []
        },
        
        price: {
          base: {
            mrp: 1299,
            price: 999
          }
        },
        
        detail: {
          description: "A stunning arrangement of fresh red roses perfect for any romantic occasion. Hand-picked premium roses arranged by expert florists.",
          shortDescription: "Fresh red roses bouquet",
          faqGroup: faqGroup._id,
          cancellationPolicy: cancellationPolicy._id,
          careInfo: careInfo._id,
          deliveryDetail: deliveryDetail._id
        },
        
        availability: {
          availableAt: "all-india",
          limitAvailability: false
        },

        brand: brand._id,

        seoMeta: {
          title: "Beautiful Red Rose Bouquet - Fresh Flowers",
          description: "Order fresh red roses bouquet online. Perfect for birthdays, anniversaries, and special occasions. Same day delivery available.",
          tags: ["roses", "bouquet", "flowers", "gift", "romantic"]
        },

        delivery: {
          processingTime: processingTime._id,
          deliveryType: null,
          deliveryDetail: deliveryDetail._id
        },
        
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      },
      {
        type: "product",
        name: "Chocolate Truffle Cake",
        slug: "chocolate-truffle-cake",
        sku: "CAKE-001",
        
        category: {
          primary: contentCategory._id,
          contentCategory: contentCategory._id,
          topic: null,
          subTopic: null,
          subSubTopic: null,
          subSubSubTopic: null
        },
        
        media: {
          primary: dummyImage._id,
          gallery: [],
          video: null,
          review: []
        },
        
        price: {
          base: {
            mrp: 899,
            price: 749
          }
        },
        
        detail: {
          description: "Rich and moist chocolate truffle cake made with premium Belgian chocolate. Perfect for celebrations and special moments.",
          shortDescription: "Premium chocolate truffle cake",
          faqGroup: faqGroup._id,
          cancellationPolicy: cancellationPolicy._id,
          careInfo: careInfo._id,
          deliveryDetail: deliveryDetail._id
        },
        
        availability: {
          availableAt: "all-india",
          limitAvailability: false
        },

        brand: brand._id,

        seoMeta: {
          title: "Chocolate Truffle Cake - Premium Cakes",
          description: "Indulge in our rich chocolate truffle cake made with premium Belgian chocolate. Perfect for birthdays and celebrations.",
          tags: ["cake", "chocolate", "truffle", "birthday", "celebration"]
        },

        delivery: {
          processingTime: processingTime._id,
          deliveryType: null,
          deliveryDetail: deliveryDetail._id
        },
        
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      },
      {
        type: "product",
        name: "Elegant White Orchid Plant",
        slug: "elegant-white-orchid-plant",
        sku: "PLANT-001",
        
        category: {
          primary: contentCategory._id,
          contentCategory: contentCategory._id,
          topic: null,
          subTopic: null,
          subSubTopic: null,
          subSubSubTopic: null
        },
        
        media: {
          primary: dummyImage._id,
          gallery: [],
          video: null,
          review: []
        },
        
        price: {
          base: {
            mrp: 1599,
            price: 1299
          }
        },
        
        detail: {
          description: "Beautiful white orchid plant in decorative ceramic pot. Perfect for home or office decoration. Low maintenance and long-lasting.",
          shortDescription: "White orchid plant in decorative pot",
          faqGroup: faqGroup._id,
          cancellationPolicy: cancellationPolicy._id,
          careInfo: careInfo._id,
          deliveryDetail: deliveryDetail._id
        },
        
        availability: {
          availableAt: "all-india",
          limitAvailability: false
        },

        brand: brand._id,

        seoMeta: {
          title: "Elegant White Orchid Plant - Indoor Plants",
          description: "Beautiful white orchid plant for your home or office. Low maintenance and elegant. Perfect gift for plant lovers.",
          tags: ["orchid", "plant", "indoor", "decoration", "gift"]
        },

        delivery: {
          processingTime: processingTime._id,
          deliveryType: null,
          deliveryDetail: deliveryDetail._id
        },
        
        isActive: true,
        createdBy: "system",
        updatedBy: "system"
      }
    ];

    // Clear existing sample products
    await models.Contents.deleteMany({ 
      sku: { $in: ["ROSE-001", "CAKE-001", "PLANT-001"] }
    });

    // Create sample products
    const createdProducts = [];
    for (const productData of sampleProducts) {
      const product = new models.Contents(productData);
      const savedProduct = await product.save();
      createdProducts.push(savedProduct);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdProducts.length} sample products with all required presets`,
      data: {
        products: createdProducts.map(p => ({
          id: p._id,
          name: p.name,
          sku: p.sku,
          price: p.price?.base?.price
        })),
        presets: {
          faqGroup: faqGroup.name,
          cancellationPolicy: cancellationPolicy.label,
          careInfo: careInfo.label,
          deliveryDetail: deliveryDetail.label,
          contentCategory: contentCategory.name
        }
      }
    });
  } catch (error) {
    console.error("Error creating products:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}