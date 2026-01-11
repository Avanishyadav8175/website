// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAdvancePayment,
  handleUpdateAdvancePayment,
  handleDeleteAdvancePayment
} from "@/app/api/admin/preset/advance-payment/handler";

// methods
export const GET = handleGetAdvancePayment;

export const PATCH = handleUpdateAdvancePayment;

export const DELETE = handleDeleteAdvancePayment;
