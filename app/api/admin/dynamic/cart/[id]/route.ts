// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCart,
  handleUpdateCart,
  handleDeleteCart
} from "@/app/api/admin/dynamic/cart/handler";

// methods
export const GET = handleGetCart;

export const PATCH = handleUpdateCart;

export const DELETE = handleDeleteCart;
