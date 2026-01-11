// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCarts,
  handleGetCarts
} from "@/app/api/admin/dynamic/cart/handler";

// methods
export const GET = handleGetCarts;

export const POST = handleAddCarts;
