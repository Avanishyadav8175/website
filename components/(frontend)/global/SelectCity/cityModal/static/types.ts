import { SetStateType } from "@/common/types/reactTypes";
import { LocalCityDocument, LocalPincodeDocument } from "../../static/types";

export type PincodeModalType = {
  showModal: boolean;
  topCities: LocalCityDocument[];
  availablePincodes: LocalPincodeDocument[];
  currPincode: LocalPincodeDocument | undefined;
  setShowModal: SetStateType<boolean>;
  onSelectPincode: (newPincode: LocalPincodeDocument) => void;
};
