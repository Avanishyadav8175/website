// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddNoteGroups,
  handleDeleteNoteGroups,
  handleGetNoteGroups,
  handleUpdateNoteGroups
} from "@/app/api/admin/preset/note-group/handler";

// methods
export const GET = handleGetNoteGroups;

export const POST = handleAddNoteGroups;

export const PATCH = handleUpdateNoteGroups;

export const DELETE = handleDeleteNoteGroups;
