// icons
import { Dot, Users } from "lucide-react";

// utils
import { memo } from "react";

// types
import { type UnitDocument } from "@/common/types/documentation/presets/unit";
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

function ContentDetailServingInfo({
  serve: { value, minPerson, maxPerson },
  unit
}: {
  serve: UnitServeDocument;
  unit: UnitDocument;
}) {
  return (
    <>
      <div className={`flex items-center justify-start gap-x-2.5}`}>
        <Dot
          height={17}
          width={17}
          strokeWidth={1.5}
          fill="#000"
          className="scale-150"
        />
        <span>{`${value} ${unit.abbr}`}</span>
      </div>
      <div className={`flex items-center justify-start gap-x-1`}>
        <Users
          height={17}
          width={17}
          strokeWidth={1.5}
        />
        <span>{`${minPerson}-${maxPerson} people`}</span>
      </div>
    </>
  );
}

export default memo(ContentDetailServingInfo);
