// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createVendorOfferCategoryAction,
  selectVendorOfferCategory
} from "@/store/features/presets/vendorOfferCategorySlice";
import {
  createFoundUsSourceAction,
  selectFoundUsSource
} from "@/store/features/presets/foundUsSourceSlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: VendorRequestDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const vendorOfferCategoryStatus = useSelector(
    selectVendorOfferCategory.status
  );

  const { options: vendorOfferCategoryOptions } = useSelector((state) =>
    selectVendorOfferCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const foundUsSourceStatus = useSelector(selectFoundUsSource.status);

  const { options: foundUsSourceOptions } = useSelector((state) =>
    selectFoundUsSource.documentList(state, {
      active: true,
      sortBy: "source",
      orderBy: "asc"
    })
  );

  // states
  const [mobile, setMobile] = useState<string>(initialDocument?.mobile || "");

  // side effects
  useEffect(() => {
    if (vendorOfferCategoryStatus === "idle") {
      dispatch(createVendorOfferCategoryAction.fetchDocumentList());
    }
  }, [vendorOfferCategoryStatus, dispatch]);

  useEffect(() => {
    if (foundUsSourceStatus === "idle") {
      dispatch(createFoundUsSourceAction.fetchDocumentList());
    }
  }, [foundUsSourceStatus, dispatch]);

  useEffect(() => {
    if (initialDocument) {
      setMobile(initialDocument.mobile);
    }
  }, [initialDocument]);

  return (
    <section className="flex flex-col gap-3 w-[60vw] px-1">
      <Input
        type="text"
        name="ownerName"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.ownerName || ""}
        errorCheck={false}
        validCheck={false}
      />
      
      <Input
        type="text"
        name="city"
        isRequired
        labelConfig={{
          label: "Email",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.city || ""}
        errorCheck={false}
        validCheck={false}
      />
      {/* <Input
        type="text"
        name="mail"
        isRequired={false}
        labelConfig={{
          label: "Mail",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.mail || ""}
        errorCheck={false}
        validCheck={false}
      /> */}
      <Input
        type="text"
        name="mobile"
        isRequired
        labelConfig={{
          label: "Mobile",
          layoutStyle: ""
        }}
        customValue={{
          value: mobile,
          setValue: (mobile) => {
            setMobile(mobile);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />

      <Input
        type="text"
        name="businessName"
        isRequired
        labelConfig={{
          label: "Company Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.businessName || ""}
        errorCheck={false}
        validCheck={false}
      />
      
      {/* <Input
        type="text"
        name="whatsapp"
        isRequired={false}
        labelConfig={{
          label: "Whatsapp",
          layoutStyle: ""
        }}
        placeholder={mobile}
        defaultValue={
          initialDocument?.whatsapp
            ? initialDocument?.whatsapp === initialDocument?.mobile
              ? ""
              : initialDocument.whatsapp
            : ""
        }
        errorCheck={false}
        validCheck={false}
      /> */}
      
      <Textarea
        name="address"
        labelConfig={{
          label: "Message",
          labelStyle: "",
          layoutStyle: ""
        }}
        isRequired
        defaultValue={initialDocument?.address || ""}
      />


      {/* <Input
        type="text"
        name="facebook"
        isRequired={false}
        labelConfig={{
          label: "Facebook Profile",
          layoutStyle: ""
        }}
        defaultValue={
          initialDocument?.socialMedia?.find(({ name }) => name === "facebook")
            ?.url || ""
        }
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="instagram"
        isRequired={false}
        labelConfig={{
          label: "Instagram Profile",
          layoutStyle: ""
        }}
        defaultValue={
          initialDocument?.socialMedia?.find(({ name }) => name === "instagram")
            ?.url || ""
        }
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="youtube"
        isRequired={false}
        labelConfig={{
          label: "Youtube Profile",
          layoutStyle: ""
        }}
        defaultValue={
          initialDocument?.socialMedia?.find(({ name }) => name === "youtube")
            ?.url || ""
        }
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="website"
        isRequired={false}
        labelConfig={{
          label: "Portfolio Website",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.website || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="gstNumber"
        isRequired={false}
        labelConfig={{
          label: "GST Number",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.gstNumber || ""}
        errorCheck={false}
        validCheck={false}
      />
      <AdvancedCheckbox
        name="categories"
        label="Interested Categories"
        searchPlaceholder="Search Interested Category"
        isRequired
        options={vendorOfferCategoryOptions}
        defaultSelected={initialDocument?.categories as string[]}
      />
      <Input
        type="dropdown"
        name="foundUs"
        isRequired={false}
        labelConfig={{
          label: "Found Us From",
          layoutStyle: ""
        }}
        nullOption
        customInitialValuePlaceholderLabel="Select Option"
        options={foundUsSourceOptions}
        defaultValue={(initialDocument?.foundUs as string) || ""}
        errorCheck={false}
        validCheck={false}
      /> */}
    </section>
  );
}
