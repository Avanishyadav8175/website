export type SelectCityVariantsType =
  | "header"
  | "button"
  | "only-city-name"
  | "header-2nd-row";

export type LocalCityDocument = {
  _id: string;
  name: string;
  image?: JSX.Element;
  defaultPincode: number;
  pincodeDistinguisher: number;
};

export type LocalPincodeDocument = {
  _id: string;
  city: string;
  pincode: number;
};
