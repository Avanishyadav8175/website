// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCatalogues,
  handleDeleteCatalogues,
  handleGetCatalogues,
  handleUpdateCatalogues
} from "@/app/api/admin/preset/catalogue/handler";

// libraries
import { NextRequest } from "next/server";

// constants
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";

// methods
export const GET = handleGetCatalogues;

export const POST = async (req: NextRequest): Promise<APIResponseType<CatalogueDocument | (CatalogueDocument | null)[]>> => {
  const response = await handleAddCatalogues(req);

  // Revalidate cache after adding catalogues
  if (response.status === 200 || response.status === 201) {
    fetch(`${DOMAIN}/api/admin/revalidate-cache/catalogue-categories`, {
      headers: { "x-api-key": X_API_KEY }
    }).catch(err => console.error("Failed to revalidate cache:", err));
  }

  return response;
};

export const PATCH = async (req: NextRequest): Promise<APIResponseType<boolean>> => {
  const response = await handleUpdateCatalogues(req);

  // Revalidate cache after updating catalogues
  if (response.status === 200) {
    fetch(`${DOMAIN}/api/admin/revalidate-cache/catalogue-categories`, {
      headers: { "x-api-key": X_API_KEY }
    }).catch(err => console.error("Failed to revalidate cache:", err));
  }

  return response;
};

export const DELETE = async (req: NextRequest): Promise<APIResponseType<boolean>> => {
  const response = await handleDeleteCatalogues(req);

  // Revalidate cache after deleting catalogues
  if (response.status === 200) {
    fetch(`${DOMAIN}/api/admin/revalidate-cache/catalogue-categories`, {
      headers: { "x-api-key": X_API_KEY }
    }).catch(err => console.error("Failed to revalidate cache:", err));
  }

  return response;
};
