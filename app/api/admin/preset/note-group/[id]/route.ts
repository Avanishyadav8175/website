// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetNoteGroup,
  handleUpdateNoteGroup,
  handleDeleteNoteGroup
} from "@/app/api/admin/preset/note-group/handler";

// methods
export const GET = handleGetNoteGroup;

export const PATCH = handleUpdateNoteGroup;

export const DELETE = handleDeleteNoteGroup;
