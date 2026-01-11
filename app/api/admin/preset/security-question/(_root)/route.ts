// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddSecurityQuestions,
  handleDeleteSecurityQuestions,
  handleGetSecurityQuestions,
  handleUpdateSecurityQuestions
} from "@/app/api/admin/preset/security-question/handler";

// methods
export const GET = handleGetSecurityQuestions;

export const POST = handleAddSecurityQuestions;

export const PATCH = handleUpdateSecurityQuestions;

export const DELETE = handleDeleteSecurityQuestions;
