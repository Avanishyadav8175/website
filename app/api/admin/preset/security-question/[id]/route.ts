// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetSecurityQuestion,
  handleUpdateSecurityQuestion,
  handleDeleteSecurityQuestion
} from "@/app/api/admin/preset/security-question/handler";

// methods
export const GET = handleGetSecurityQuestion;

export const PATCH = handleUpdateSecurityQuestion;

export const DELETE = handleDeleteSecurityQuestion;
