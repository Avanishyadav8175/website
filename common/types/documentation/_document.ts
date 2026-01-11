// libraries
import { Document as MongooseDocument } from "mongoose";

// types
export interface ActionDocument extends MongooseDocument {
  isDeleted: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CategoryDocument extends MongooseDocument {
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ContentDocument extends MongooseDocument {
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface DynamicDocument extends MongooseDocument {
  createdBy?: string;
  updatedBy?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface MediaDocument extends MongooseDocument {
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface NestedDocument extends MongooseDocument {
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PageDocument extends MongooseDocument {
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PresetDocument extends MongooseDocument {
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SettingDocument extends MongooseDocument {
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UserDocument extends MongooseDocument {
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UtilDocument extends MongooseDocument {
  createdAt: string | Date;
  updatedAt: string | Date;
}
