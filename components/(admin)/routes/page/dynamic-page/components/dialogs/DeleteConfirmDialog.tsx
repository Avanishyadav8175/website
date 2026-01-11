import { SetStateType } from "@/common/types/reactTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function DeleteConfirmDialog({
  openDrop,
  setOpenDrop,
  setConfirmDrop,
  itemToDrop
}: {
  itemToDrop:
    | {
        type: "id" | "all";
        id: string;
      }
    | undefined;
  setConfirmDrop: SetStateType<boolean>;
  setOpenDrop: SetStateType<boolean>;
  openDrop: boolean;
}) {
  return (
    <Dialog
      open={openDrop}
      onOpenChange={setOpenDrop}
    >
      <DialogContent className="min-w-fit rounded-3xl flex flex-col justify-start max-w-[270px] outline-none border-none">
        <div className="text-2xl font-light pt-2 pr-10">
          {itemToDrop?.type === "all"
            ? "Delete all layouts?"
            : "Confirm deleting this layout"}
        </div>
        <div className="pt-1 flex items-center justify-start gap-x-3 *:py-2 *:px-4 *:rounded-lg *:transition-all *:duration-300 *:cursor-pointer">
          <div
            onClick={() => {
              setOpenDrop((prev) => false);
              setConfirmDrop((prev) => true);
            }}
            className="bg-rose-300/50 text-rose-600 hover:bg-rose-600 hover:text-white"
          >
            Confirm
          </div>
          <div
            onClick={() => {
              setOpenDrop((prev) => false);
              setConfirmDrop((prev) => false);
            }}
            className="hover:bg-ivory/40"
          >
            Cancel
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
