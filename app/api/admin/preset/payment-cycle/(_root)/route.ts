// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddPaymentCycles,
  handleDeletePaymentCycles,
  handleGetPaymentCycles,
  handleUpdatePaymentCycles
} from "@/app/api/admin/preset/payment-cycle/handler";

// methods
export const GET = handleGetPaymentCycles;

export const POST = handleAddPaymentCycles;

export const PATCH = handleUpdatePaymentCycles;

export const DELETE = handleDeletePaymentCycles;
