// utils
import { getInitialCustomerAddressValue } from "./utils/getInitialCustomerAddressValue";

// hooks
import { useEffect, useMemo, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

export default function CustomerAddress(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: CustomerAddressDocument;
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        label: string;
      }
  ) &
    (
      | {
          value?: undefined;
          defaultValue?: CustomerAddressDocument;
        }
      | {
          value?: CustomerAddressDocument;
          defaultValue?: undefined;
          onChangeValue: (newValue: CustomerAddressDocument) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // states
  const [customerAddress, setCustomerAddress] =
    useState<CustomerAddressDocument>(
      defaultValue || getInitialCustomerAddressValue()
    );

  // variables
  const returnValue = useMemo(
    () =>
      ({
        address: customerAddress.address,
        ...(customerAddress.landmark
          ? { landmark: customerAddress.landmark }
          : { $unset: { landmark: "" } }),
        city: customerAddress.city,
        pincode: customerAddress.pincode,
        type: customerAddress.type,
        isDefault: customerAddress.isDefault
      }) as CustomerAddressDocument,
    [customerAddress]
  );

  // side effects
  useEffect(() => {
    if (defaultValue) {
      setCustomerAddress(defaultValue);
    } else {
      setCustomerAddress(getInitialCustomerAddressValue());
    }
  }, [defaultValue]);

  return (
    <section className="grid grid-cols-1 items-center justify-center gap-3 w-full py-3">
      {label && (
        <div className="pb-2 text-xl text-center font-light">{label}</div>
      )}
      <section className="flex flex-col gap-3">
        <Textarea
          name="customerAddress"
          labelConfig={{
            label: "Address",
            labelStyle: "",
            layoutStyle: ""
          }}
          isRequired
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: customerAddress.address,
            setValue: (newAddress) => {
              setCustomerAddress({
                ...customerAddress,
                address: newAddress
              } as CustomerAddressDocument);
            }
          }}
        />
        <Input
          type="text"
          name="landmark"
          labelConfig={{
            label: "Landmark"
          }}
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: customerAddress.landmark || "",
            setValue: (newLandmark) => {
              setCustomerAddress({
                ...customerAddress,
                landmark: newLandmark
              } as CustomerAddressDocument);
            }
          }}
        />
        <Input
          type="text"
          name="city"
          labelConfig={{
            label: "City"
          }}
          isRequired
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: customerAddress.city,
            setValue: (newCity) => {
              setCustomerAddress({
                ...customerAddress,
                city: newCity
              } as CustomerAddressDocument);
            }
          }}
        />
        <Input
          type="number"
          name="pincode"
          labelConfig={{
            label: "Pincode"
          }}
          isRequired
          errorCheck={false}
          validCheck={false}
          maxLength={6}
          customValue={{
            value: customerAddress.pincode,
            setValue: (newPincode) => {
              setCustomerAddress({
                ...customerAddress,
                pincode: newPincode
              } as CustomerAddressDocument);
            }
          }}
        />
        <Input
          type="text"
          name="type"
          labelConfig={{
            label: "Type"
          }}
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: customerAddress.type,
            setValue: (newType) => {
              setCustomerAddress({
                ...customerAddress,
                type: newType
              } as CustomerAddressDocument);
            }
          }}
        />
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(returnValue)}
        onChange={() => {}}
      />
    </section>
  );
}
