// icons
import { Plus } from "lucide-react";

// hooks
import { useCustomerProfile } from "@/hooks/useCustomerProfile";

// components
import CustomerAddress from "./CustomerAddress";
import { CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

export default function CustomerAddressList({
  addresses,
  onAdd,
  onUpdate,
  onDelete
}: {
  addresses: CustomerAddressDocument[];
  onAdd: () => void;
  onUpdate: (addressId: string) => void;
  onDelete: (addressId: string) => void;
}) {
  const {
    address: { onSetDefault }
  } = useCustomerProfile();

  return (
    <section className="grid grid-cols-1 auto-rows-min">
      <div className="flex max-lg:flex-col max-lg:text-center items-center justify-start lg:justify-between pt-10 pb-6">
        <span className="flex flex-col justify-start lg:gap-1">
          <span className="text-2xl">Saved Addresses</span>
          <span className="text-sm text-charcoal-3/70">
            Addresses registered: {addresses.length}
          </span>
        </span>
        <div
          onClick={onAdd}
          className="w-fit justify-self-center flex items-center justify-center gap-2 lg:gap-3 py-2 lg:py-2.5 px-5 max-lg:mt-5 rounded-full lg:rounded-xl transition-all duration-300 cursor-pointer bg-sienna text-white hover:bg-sienna-2"
        >
          <Plus
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <span>Add an address</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 pt-2 pb-5 lg:py-5">
        {addresses
          // .sort((a: CustomerAddressDocument, b: CustomerAddressDocument) =>
          //   a.isDefault ? -1 : b.isDefault ? 1 : 0
          // )
          .map((address, index) => (
            <CustomerAddress
              key={index}
              index={index}
              address={address}
              onUpdate={() => {
                onUpdate(address._id as string);
              }}
              onSetDefault={() => {
                onSetDefault(address._id as string);
              }}
              onDelete={() => {
                onDelete(address._id as string);
              }}
            />
          ))}
      </div>
    </section>
  );
}
