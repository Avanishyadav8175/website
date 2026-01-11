// utils
import { memo } from "react";

// components
import ContentDetailServingInfo from "./ContentDetailServingInfo";
import { DialogClose } from "@/components/ui/dialog";

// types
import { type UnitDocument } from "@/common/types/documentation/presets/unit";
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

function ContentDetailServingInfoDialogContent({
  serves,
  unit
}: {
  serves: UnitServeDocument[];
  unit: UnitDocument;
}) {
  return (
    <>
      <div className="col-span-2 pt-6 pb-3.5 font-light text-2xl">
        Serving Info
      </div>
      {serves.map((serve) => (
        <ContentDetailServingInfo
          key={serve._id as string}
          serve={serve}
          unit={unit}
        />
      ))}
      <DialogClose asChild>
        <div className="col-span-2 my-3.5 py-2 px-5 rounded-lg font-medium text-sm bg-charcoal-3/10 transition-all duration-300 hover:bg-charcoal-3/25 cursor-pointer w-fit">
          Close
        </div>
      </DialogClose>
    </>
  );
}

export default memo(ContentDetailServingInfoDialogContent);
