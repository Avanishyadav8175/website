// libraries
import moment from "moment";

// icons
import { Cake, Mail, PersonStanding, Smartphone } from "lucide-react";

// hooks
import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function CustomerDetail({
  onShowForm
}: {
  onShowForm: () => void;
}) {
  const {
    profile: {
      data: { detail }
    }
  } = useAppStates();

  return (
    <div className="flex flex-col justify-start gap-1.5">
      <div className="grid grid-cols-[24px_auto_1fr] gap-x-2 gap-y-6 lg:gap-y-4 items-center">
        <Smartphone
          strokeWidth={1.5}
          width={17}
          height={17}
          className="text-charcoal-3"
        />
        <span className="font-medium text-charcoal-3">Mobile:</span>
        <span className="pl-9">{detail?.mobileNumber || "-"}</span>

        <Mail
          strokeWidth={1.5}
          width={17}
          height={17}
          className="text-charcoal-3"
        />
        <span className="font-medium text-charcoal-3">Mail:</span>
        <span className="pl-9 truncate">{detail?.mail || "-"}</span>

        {/* <PersonStanding
          strokeWidth={1.5}
          width={17}
          height={17}
          className="text-charcoal-3"
        />
        <span className="font-medium text-charcoal-3">Gender:</span>
        <span className="pl-9">{detail?.gender || "-"}</span> */}

        {/* <Cake
          strokeWidth={1.5}
          width={17}
          height={17}
          className="text-charcoal-3"
        />
        <span className="font-medium text-charcoal-3">DOB:</span>
        <span className="pl-9">
          {detail?.dateOfBirth
            ? moment(detail.dateOfBirth).format("DD-MM-YYYY")
            : "-"}
        </span> */}
      </div>
      <div
        onClick={onShowForm}
        className="bg-sienna text-white flex items-center justify-center gap-1.5 rounded-md mt-7 mb-1 px-8 py-1.5 w-fit cursor-pointer transition-all duration-300 hover:bg-sienna-2"
      >
        Edit
      </div>
    </div>
  );
}
