// regex
import { GST_REGEX, IFSC_REGEX, UPI_REGEX } from "@/common/constants/regex";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createVendorRequestAction,
  selectVendorRequest
} from "@/store/features/actions/vendorRequestSlice";
import {
  createVendorOfferCategoryAction,
  selectVendorOfferCategory
} from "@/store/features/presets/vendorOfferCategorySlice";
import {
  createStateAction,
  selectState
} from "@/store/features/presets/stateSlice";
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";
import SelectImage from "@/components/custom/inputs/image/SelectImage";
import {
  createCommissionAction,
  selectCommission
} from "@/store/features/presets/commissionSlice";
import {
  createPaymentCycleAction,
  selectPaymentCycle
} from "@/store/features/presets/paymentCycleSlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type VendorDocument } from "@/common/types/documentation/users/vendor";
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: VendorDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // states
  const [vendorRequestId, setVendorRequestId] = useState<string>("");
  const [vendorRequest, setVendorRequest] = useState<VendorRequestDocument>();
  const [state, setState] = useState<string>(
    (initialDocument?.location.state as string) || ""
  );
  const [city, setCity] = useState<string>(
    (initialDocument?.location.city as string) || ""
  );
  const [bankAccountNumber, setBankAccountNumber] = useState<string>(
    initialDocument?.payment?.bank?.accountNumber || ""
  );
  const [verifyBankAccountNumber, setVerifyBankAccountNumber] =
    useState<string>(initialDocument?.payment?.bank?.accountNumber || "");
  const [commissionType, setCommissionType] = useState<
    "" | "fixed" | "percentage"
  >(initialDocument?.business?.commission?.type || "");

  // redux states
  const vendorRequestStatus = useSelector(selectVendorRequest.status);

  const { documents: vendorRequests, options: vendorRequestOptions } =
    useSelector((state) =>
      selectVendorRequest.documentList(state, {
        defaultFilterBy: "status",
        defaultFilterKeyword: "processing",
        sortBy: "businessName",
        orderBy: "asc"
      })
    );

  const stateStatus = useSelector(selectState.status);

  const { options: stateOptions } = useSelector((state) =>
    selectState.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const cityStatus = useSelector(selectCity.status);

  const { documents: cities, options: cityOptions } = useSelector(
    (reduxState) =>
      selectCity.documentList(reduxState, {
        active: true,
        filterBy: "state",
        filterKeyword: state,
        sortBy: "name",
        orderBy: "asc"
      })
  );

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

  // variables
  const vendorInputCity = vendorRequest
    ? cities.find(
        ({ name }) => name.toLowerCase() === vendorRequest.city.toLowerCase()
      )
    : undefined;

  // redux states
  const commissionStatus = useSelector(selectCommission.status);

  const { options: commissionOptions } = useSelector((state) =>
    selectCommission.documentList(state, {
      active: true,
      sortBy: "value",
      orderBy: "asc"
    })
  );

  const paymentCycleStatus = useSelector(selectPaymentCycle.status);

  const { options: paymentCycleOptions } = useSelector((state) =>
    selectPaymentCycle.documentList(state, {
      active: true,
      sortBy: "days",
      orderBy: "asc"
    })
  );

  // side effects
  useEffect(() => {
    if (vendorRequestStatus === "idle") {
      dispatch(createVendorRequestAction.fetchDocumentList());
    }
  }, [vendorRequestStatus, dispatch]);

  useEffect(() => {
    if (stateStatus === "idle") {
      dispatch(createStateAction.fetchDocumentList());
    }
  }, [stateStatus, dispatch]);

  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  useEffect(() => {
    if (vendorOfferCategoryStatus === "idle") {
      dispatch(createVendorOfferCategoryAction.fetchDocumentList());
    }
  }, [vendorOfferCategoryStatus, dispatch]);

  useEffect(() => {
    if (commissionStatus === "idle") {
      dispatch(createCommissionAction.fetchDocumentList());
    }
  }, [commissionStatus, dispatch]);

  useEffect(() => {
    if (paymentCycleStatus === "idle") {
      dispatch(createPaymentCycleAction.fetchDocumentList());
    }
  }, [paymentCycleStatus, dispatch]);

  useEffect(() => {
    setVendorRequest(vendorRequests.find(({ _id }) => _id === vendorRequestId));
  }, [vendorRequestId, vendorRequests]);

  useEffect(() => {
    if (vendorInputCity) {
      setState(vendorInputCity.state as string);
      setCity(vendorInputCity._id as string);
    }
  }, [vendorRequest, vendorInputCity]);

  useEffect(() => {
    if (initialDocument) {
      setState((initialDocument?.location?.state as string) || "");
      setCity((initialDocument?.location?.city as string) || "");
      setBankAccountNumber(initialDocument?.payment?.bank?.accountNumber || "");
      setCommissionType(initialDocument?.business?.commission?.type || "");
    }
  }, [initialDocument]);

  return (
    <section className="flex flex-col gap-3 w-[80dvw] p-1">
      {!initialDocument && (
        <Input
          type="dropdown"
          name="vendorRequest"
          isRequired
          labelConfig={{
            label: "Vendor Request"
          }}
          errorCheck={false}
          validCheck={false}
          nullOption
          customInitialValuePlaceholderLabel="Select Vendor Request"
          options={vendorRequestOptions}
          customValue={{
            value: vendorRequestId,
            setValue: setVendorRequestId
          }}
        />
      )}
      {(initialDocument || vendorRequest) && (
        <>
          <Input
            type="text"
            name="businessName"
            isRequired
            labelConfig={{
              label: "Business Name",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.businessName || vendorRequest?.businessName || ""
            }
            errorCheck={false}
            validCheck={false}
          />
          <Input
            type="text"
            name="ownerName"
            isRequired
            labelConfig={{
              label: "Owner Name",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.ownerName || vendorRequest?.ownerName || ""
            }
            errorCheck={false}
            validCheck={false}
          />
          <Input
            type="text"
            name="userName"
            isRequired
            labelConfig={{
              label: "User Name",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.userName || vendorRequest?.mail || ""
            }
            errorCheck={false}
            validCheck={false}
          />
          <Input
            type="text"
            name="password"
            isRequired
            labelConfig={{
              label: "Password",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.password || ""}
            errorCheck={false}
            validCheck={false}
          />
          <span className="text-xl pt-5 pb-3">Location Details</span>
          <Textarea
            name="address"
            labelConfig={{
              label: "Address",
              labelStyle: "",
              layoutStyle: ""
            }}
            isRequired
            defaultValue={
              initialDocument?.location.address || vendorRequest?.address || ""
            }
          />
          {vendorRequest && (
            <Input
              type="text"
              name="vendorInputCity"
              isRequired={false}
              isDisabled
              labelConfig={{
                label: "Vendor Input City",
                layoutStyle: ""
              }}
              defaultValue={vendorRequest.city}
              errorCheck={false}
              validCheck={false}
            />
          )}
          <Input
            type="dropdown"
            name="state"
            isRequired
            labelConfig={{
              label: "State"
            }}
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel="Select State"
            options={stateOptions}
            customValue={{
              value: state,
              setValue: setState
            }}
          />
          <Input
            type="dropdown"
            name="city"
            isRequired
            labelConfig={{
              label: "City"
            }}
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel="Select City"
            options={cityOptions}
            customValue={{
              value: city,
              setValue: setCity
            }}
          />
          <span className="text-xl pt-5 pb-3">Contact Details</span>
          <Input
            type="number"
            name="mobile"
            isRequired
            labelConfig={{
              label: "Mobile",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.contact.mobile || vendorRequest?.mobile
            }
            errorCheck
            errorLogic={(mobile) => mobile.length !== 10}
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="number"
            name="alternativeMobile"
            isRequired={false}
            labelConfig={{
              label: "Alternative Mobile",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.contact?.alternativeMobile || ""}
            errorCheck
            errorLogic={(alternativeMobile) =>
              alternativeMobile.length ? alternativeMobile.length !== 10 : false
            }
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="number"
            name="whatsapp"
            isRequired={false}
            labelConfig={{
              label: "Whatsapp",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.contact.whatsapp || vendorRequest?.whatsapp || ""
            }
            errorCheck
            errorLogic={(whatsapp) =>
              whatsapp.length ? whatsapp.length !== 10 : false
            }
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="text"
            name="mail"
            isRequired
            labelConfig={{
              label: "Mail",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.contact.mail || vendorRequest?.mail}
            errorCheck={false}
            validCheck={false}
          />
          <Input
            type="text"
            name="website"
            isRequired={false}
            labelConfig={{
              label: "Website",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.contact.website || vendorRequest?.website || ""
            }
            errorCheck={false}
            validCheck={false}
          />
          <span className="text-lg pt-3 pb-1">Social</span>
          <Input
            type="text"
            name="facebook"
            isRequired={false}
            labelConfig={{
              label: "Facebook Profile",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.contact?.social?.facebook ||
              vendorRequest?.socialMedia?.find(
                ({ name }) => name === "facebook"
              )?.url ||
              ""
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
              initialDocument?.contact?.social?.instagram ||
              vendorRequest?.socialMedia?.find(
                ({ name }) => name === "instagram"
              )?.url ||
              ""
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
              initialDocument?.contact?.social?.youtube ||
              vendorRequest?.socialMedia?.find(({ name }) => name === "youtube")
                ?.url ||
              ""
            }
            errorCheck={false}
            validCheck={false}
          />
          <span className="text-xl pt-5 pb-3">Identification Documents</span>
          <SelectImage
            manage="identification-image"
            name="photo"
            label="Photo"
            isRequired
            defaultValue={
              (initialDocument?.identification.photo as string) || ""
            }
          />
          <SelectImage
            manage="identification-image"
            name="aadhar"
            label="Aadhar"
            isRequired
            defaultValue={
              (initialDocument?.identification.aadhar as string) || ""
            }
          />
          <SelectImage
            manage="identification-image"
            name="pan"
            label="PAN"
            isRequired
            defaultValue={(initialDocument?.identification.pan as string) || ""}
          />
          <span className="text-xl pt-5 pb-3">Payment</span>
          <Input
            type="text"
            name="gstNumber"
            isRequired={false}
            labelConfig={{
              label: "GST Number",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.payment?.gstNumber ||
              vendorRequest?.gstNumber ||
              ""
            }
            errorCheck
            errorLogic={(gstNumber) => !GST_REGEX.test(gstNumber)}
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="text"
            name="upi"
            isRequired
            labelConfig={{
              label: "UPI ID",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.payment?.upi || ""}
            errorCheck
            errorLogic={(upi) => !UPI_REGEX.test(upi)}
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <span className="text-lg pt-5 pb-3">Bank</span>
          <Input
            type="text"
            name="bankName"
            isRequired
            labelConfig={{
              label: "Bank Name",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.payment?.bank?.name || ""}
            errorCheck={false}
            validCheck={false}
          />
          <Input
            type="text"
            name="branchName"
            isRequired
            labelConfig={{
              label: "Branch Name",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.payment?.bank?.branch || ""}
            errorCheck={false}
            validCheck={false}
          />
          <Input
            type="text"
            name="ifsc"
            isRequired
            labelConfig={{
              label: "IFSC Code",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.payment?.bank?.ifsc || ""}
            errorCheck
            errorLogic={(ifsc) => !IFSC_REGEX.test(ifsc)}
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="dropdown"
            name="accountType"
            labelConfig={{
              label: "Account Type"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel={"Select Account Type"}
            options={[
              {
                label: "Current",
                value: "current"
              },
              {
                label: "Savings",
                value: "savings"
              }
            ]}
            defaultValue={initialDocument?.payment?.bank?.accountType || ""}
          />
          <Input
            type="text"
            name="accountNumber"
            isRequired
            labelConfig={{
              label: "Account Number",
              layoutStyle: ""
            }}
            customValue={{
              value: bankAccountNumber,
              setValue: setBankAccountNumber
            }}
            errorCheck
            errorLogic={(accountNumber) =>
              Boolean(verifyBankAccountNumber.length) &&
              accountNumber !== verifyBankAccountNumber
            }
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="text"
            name="verifyAccountNumber"
            isRequired
            labelConfig={{
              label: "Verify Account Number",
              layoutStyle: ""
            }}
            customValue={{
              value: verifyBankAccountNumber,
              setValue: setVerifyBankAccountNumber
            }}
            errorCheck
            errorLogic={(verifyAccountNumber) =>
              verifyAccountNumber !== bankAccountNumber
            }
            errorStyle="!outline-red-600"
            validCheck={false}
          />
          <Input
            type="text"
            name="accountHolderName"
            isRequired
            labelConfig={{
              label: "Account Holder Name",
              layoutStyle: ""
            }}
            defaultValue={
              initialDocument?.payment?.bank?.accountHolderName || ""
            }
            errorCheck={false}
            validCheck={false}
          />
          <span className="text-xl pt-5 pb-3">Business</span>
          <AdvancedCheckbox
            name="categories"
            label="Interested Categories"
            searchPlaceholder="Search Interested Categories"
            isRequired
            options={vendorOfferCategoryOptions}
            defaultSelected={
              (initialDocument?.business?.categories as string[]) ||
              (vendorRequest?.categories as string[]) ||
              []
            }
          />
          <Input
            type="dropdown"
            name="paymentCycle"
            isRequired
            labelConfig={{
              label: "Payment Cycle"
            }}
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel="Select Payment Cycle"
            options={paymentCycleOptions}
            defaultValue={
              (initialDocument?.business?.paymentCycle as string) || ""
            }
          />
          <Toggle
            name="provideDelivery"
            label="Provide Delivery"
            isActive={initialDocument?.business?.provideDelivery || false}
          />
          <span className="text-lg pt-5 pb-3">Commission</span>
          <Input
            type="dropdown"
            name="commissionType"
            labelConfig={{
              label: "Commission Type"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel={"Select Commission Type"}
            options={[
              {
                label: "Fixed",
                value: "fixed"
              },
              {
                label: "Percentage",
                value: "percentage"
              }
            ]}
            customValue={{
              value: commissionType as string,
              setValue: (newCommissionType) => {
                setCommissionType(newCommissionType as "fixed" | "percentage");
              }
            }}
          />
          {commissionType === "percentage" && (
            <Input
              type="dropdown"
              name="commissionPercentage"
              isRequired
              labelConfig={{
                label: "Percentage"
              }}
              errorCheck={false}
              validCheck={false}
              nullOption
              customInitialValuePlaceholderLabel="Select Commission Percentage"
              options={commissionOptions}
              defaultValue={
                (initialDocument?.business?.commission?.percentage as string) ||
                ""
              }
            />
          )}
        </>
      )}
    </section>
  );
}
