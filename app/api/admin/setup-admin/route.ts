import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password, name } = await request.json();

    // Check if admin already exists
    const existingAdmin = await models.Admins.findOne({ 
      userName: email
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin already exists with this email"
      }, { status: 400 });
    }

    // For demo purposes, we'll store password as plain text (in production, use proper hashing)
    const hashedPassword = password;

    // Create admin user
    const admin = new models.Admins({
      userName: email,
      password: hashedPassword,
      status: "active",
      isSuperAdmin: true,
      createdBy: "system",
      updatedBy: "system"
    });

    const savedAdmin = await admin.save();

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      data: {
        id: savedAdmin._id,
        userName: savedAdmin.userName,
        status: savedAdmin.status,
        isSuperAdmin: savedAdmin.isSuperAdmin
      }
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}