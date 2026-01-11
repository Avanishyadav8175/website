import { LocalPincodeDocument } from "@/components/(frontend)/global/SelectCity/static/types";
import { CURR_LOCATION_SESSION_KEY } from "../constants/sessionKeys";
import { SetStateType } from "../types/reactTypes";

export const setAlreadySelectedCity = (
  dummyPincodes: LocalPincodeDocument[],
  setCurrPincode: SetStateType<LocalPincodeDocument | undefined>
) => {
  const sessionPincodeId = sessionStorage.getItem(CURR_LOCATION_SESSION_KEY);

  if (sessionPincodeId) {
    const pincodeDoc = (dummyPincodes as LocalPincodeDocument[]).find(
      ({ _id }) => _id === sessionPincodeId
    );

    if (pincodeDoc) {
      setCurrPincode((prev) => pincodeDoc);
    }
  }
};
