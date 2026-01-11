import { SetStateType } from "@/common/types/reactTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function SaveDataConfirmDialog({
  open,
  setOpen,
  setConfirmSave
}: {
  open: boolean;
  setOpen: SetStateType<boolean>;
  setConfirmSave: SetStateType<boolean>;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="min-w-fit rounded-3xl flex flex-col justify-start max-w-[270px] outline-none border-none">
        <div className="text-2xl font-light pt-2 pr-10">
          Confirm Save Changes
        </div>
        <div className="pt-1 flex items-center justify-start gap-x-3 *:py-2 *:px-4 *:rounded-lg *:transition-all *:duration-300 *:cursor-pointer">
          <div
            onClick={() => {
              setOpen((prev) => false);
              setConfirmSave((prev) => true);
            }}
            className="bg-green-300/50 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Confirm
          </div>
          <div
            onClick={() => {
              setOpen((prev) => false);
              setConfirmSave((prev) => false);
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
