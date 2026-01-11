// utils
import { memo } from "react";

// providers
import { LocationProvider } from "@/hooks/useLocation/useLocation";

// components
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CityPopup from "./CityPopup";

function CityDialog({
  showDialog,
  onToggleShowDialog
}: {
  showDialog: boolean;
  onToggleShowDialog: (showDialog: boolean) => void;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={onToggleShowDialog}
    >
      <DialogContent
        className={`min-w-fit border-none outline-none gap-0 transition-all duration-300 p-0 rounded-3xl overflow-hidden`}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <LocationProvider>
          <CityPopup
            closeDialog={() => {
              onToggleShowDialog(false);
            }}
          />
        </LocationProvider>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CityDialog);
