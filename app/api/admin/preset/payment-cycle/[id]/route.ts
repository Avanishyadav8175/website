// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetPaymentCycle,
  handleUpdatePaymentCycle,
  handleDeletePaymentCycle
} from "@/app/api/admin/preset/payment-cycle/handler";

// methods
export const GET = handleGetPaymentCycle;

export const PATCH = handleUpdatePaymentCycle;

export const DELETE = handleDeletePaymentCycle;
