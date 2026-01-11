// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAdvancePayments,
  handleDeleteAdvancePayments,
  handleGetAdvancePayments,
  handleUpdateAdvancePayments
} from "@/app/api/admin/preset/advance-payment/handler";

// methods
export const GET = handleGetAdvancePayments;

export const POST = handleAddAdvancePayments;

export const PATCH = handleUpdateAdvancePayments;

export const DELETE = handleDeleteAdvancePayments;
