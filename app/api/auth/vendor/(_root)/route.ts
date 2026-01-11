// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAdvancePayments,
  handleGetAdvancePayments
} from "@/app/api/admin/preset/advance-payment/handler";

// methods
export const GET = handleGetAdvancePayments;

export const POST = handleAddAdvancePayments;
