
// constants
import { ADDRESS_TYPES } from "../constants/addressTypes";

// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// utils
import { getInitialCustomerAddress } from "../utils/getInitialCustomerAddress";

// hooks
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

export default function CustomerAddressForm({
  addressCount,
  showForm,
  defaultValue,
  onChangeShowForm,
  onSubmit
}: {
  addressCount: number;
  showForm: boolean;
  defaultValue?: CustomerAddressDocument;
  onChangeShowForm: (newShowForm: boolean) => void;
  onSubmit: (newAddress: CustomerAddressDocument) => void;
}) {
  // hooks
  const { toast } = useToast();

  // states
  const [customerAddress, setCustomerAddress] =
    useState<CustomerAddressDocument>(
      defaultValue ||
        getInitialCustomerAddress({ isDefault: !Boolean(addressCount) })
    );

  // handlers
  const handleReset = () => {
    setCustomerAddress(
      defaultValue ||
        getInitialCustomerAddress({ isDefault: !Boolean(addressCount) })
    );
  };

  const handleSubmit = () => {
    if (!customerAddress.address.trim()) {
      toast({
        title: "Missing Address",
        description: "Address is Required",
        variant: "warning"
      });
    } else if (!customerAddress.city.trim()) {
      toast({
        title: "Missing City",
        description: "City is Required",
        variant: "warning"
      });
    } else if (!customerAddress.pincode.trim()) {
      toast({
        title: "Missing Pincode",
        description: "Pincode is Required",
        variant: "warning"
      });
    } else if (customerAddress.pincode.length !== 6) {
      toast({
        title: "Invalid Pincode",
        description: "Pincode is Invalid",
        variant: "warning"
      });
    } else {
      onSubmit(customerAddress);
      onChangeShowForm(false);
    }
  };

  // side effects
  useEffect(() => {
    if (defaultValue) {
      setCustomerAddress(defaultValue);
    } else {
      setCustomerAddress(
        getInitialCustomerAddress({ isDefault: !Boolean(addressCount) })
      );
    }
  }, [defaultValue, addressCount]);

  const customInputStyle =
    "outline-none text-charcoal-3/90 transition-all duration-300 bg-ivory-2/80 rounded-xl w-full py-2.5 px-3.5 text-base hover:bg-ivory-2 focus:bg-sienna-1/10 focus:ring-1 focus:ring-sienna-1/50 focus:ring-offset-2";

  return (
    <Dialog
      open={showForm}
      onOpenChange={onChangeShowForm}
    >
      <DialogContent className="outline-none min-w-fit max-lg:w-device max-lg:h-device px-3.5 lg:p-5 lg:rounded-2xl lg:pb-3 z-[995]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-5 lg:gap-4 w-full pt-3">
          <div className="flex items-center justify-start gap-3">
            <div className="bg-sienna w-1 h-7 rounded-full -translate-y-1" />
            <span className="font-light text-2xl pb-2.5">Save New Address</span>
          </div>
          <Textarea
            customStyle={`${customInputStyle} h-16 resize-none`}
            name="address"
            labelConfig={{
              label: "Address",
              layoutStyle: "grid lg:grid-cols-[120px_1fr]",
              labelStyle: ""
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: customerAddress.address,
              setValue: (newAddress: string) => {
                setCustomerAddress({
                  ...customerAddress,
                  address: newAddress
                } as CustomerAddressDocument);
              }
            }}
          />
          <Input
            customStyle={customInputStyle}
            type="text"
            name="city"
            labelConfig={{
              label: "City",
              layoutStyle: "grid lg:grid-cols-[120px_1fr]",
              labelStyle: "mb-1"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: customerAddress.city,
              setValue: (newCity: string) => {
                setCustomerAddress({
                  ...customerAddress,
                  city: newCity
                } as CustomerAddressDocument);
              }
            }}
          />
          <Input
            customStyle={customInputStyle}
            type="number"
            name="pincode"
            labelConfig={{
              label: "Pincode",
              layoutStyle: "grid lg:grid-cols-[120px_1fr]",
              labelStyle: "mb-1"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            maxLength={6}
            customValue={{
              value: customerAddress.pincode,
              setValue: (newPincode: string) => {
                setCustomerAddress({
                  ...customerAddress,
                  pincode: newPincode
                } as CustomerAddressDocument);
              }
            }}
          />
          <Input
            customStyle={customInputStyle}
            type="text"
            name="landmark"
            labelConfig={{
              label: "Landmark",
              layoutStyle: "grid lg:grid-cols-[120px_1fr]",
              labelStyle: "mb-1"
            }}
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: customerAddress.landmark || "",
              setValue: (newLandmark: string) => {
                setCustomerAddress({
                  ...customerAddress,
                  landmark: newLandmark
                } as CustomerAddressDocument);
              }
            }}
          />
          <div className="relative">
            <Input
              customStyle={customInputStyle}
              type="text"
              name="type"
              labelConfig={{
                label: "Address Type",
                layoutStyle: "grid lg:grid-cols-[120px_1fr]",
                labelStyle: "translate-y-2"
              }}
              isRequired={false}
              errorCheck={false}
              validCheck={false}
              customValue={{
                value: customerAddress.type,
                setValue: (newType: string) => {
                  if (newType.length <= 30) {
                    setCustomerAddress({
                      ...customerAddress,
                      type: newType
                    } as CustomerAddressDocument);
                  }
                }
              }}
            />
            <span className="absolute right-3 bottom-3 text-sm text-charcoal-3/70">
              {customerAddress.type.length}/30
            </span>
          </div>
          <div className="pl-[120px] max-w-[calc(100dvw_-_28px)] lg:max-w-[470px] pb-1.5 flex items-center justify-start flex-wrap gap-1.5 *:py-1 *:px-2.5 *:border *:border-charcoal-3/30 *:text-charcoal-3 *:transition-all *:duration-300 *:cursor-pointer *:rounded-lg *:text-sm">
            {ADDRESS_TYPES.map(({ label, svg }, index) => (
              <span
                key={index}
                className={`hover:bg-charcoal-3/10 hover:border-charcoal-3/70 whitespace-nowrap flex items-center justify-center gap-1.5 ${customerAddress.type.toLowerCase() === label.toLowerCase() ? "!border-sienna !text-sienna font-medium !bg-sienna-3/10" : ""}`}
                onClick={() =>
                  setCustomerAddress({
                    ...customerAddress,
                    type: label
                  } as CustomerAddressDocument)
                }
              >
                {svg}
                <span>{label}</span>
              </span>
            ))}
          </div>
          <section className="flex max-lg:flex-col items-center justify-center lg:justify-start lg:pl-[120px] gap-2 w-full lg:py-2">
            <div
              className={`${BUTTON_STYLES.GENESIS} !bg-emerald-500 !text-white`}
              onClick={handleSubmit}
            >
              Submit
            </div>

            <div
              className={BUTTON_STYLES.GHOST}
              onClick={handleReset}
            >
              Reset
            </div>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
