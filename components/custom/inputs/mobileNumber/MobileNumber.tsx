// utils
import { getInitialMobileNumberValue } from "./utils/getInitialMobileNumberValue";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCountryCodeAction,
  selectCountryCode
} from "@/store/features/presets/countryCodeSlice";

// components
import Input from "@/lib/Forms/Input/Input";

export default function MobileNumber(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: string;
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
          defaultValue?: string;
        }
      | {
          value?: string;
          defaultValue?: undefined;
          onChangeValue: (newValue: string) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // hooks
  const dispatch = useDispatch();

  // redux states
  const countryCodeStatus = useSelector(selectCountryCode.status);

  const { documents: countryCodes } = useSelector((state) =>
    selectCountryCode.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [mobileNumber, setMobileNumber] = useState<string>(
    defaultValue || getInitialMobileNumberValue()
  );

  // variables
  const [countryCode, mobile] = mobileNumber.split("-");

  // side effects
  useEffect(() => {
    if (defaultValue) {
      setMobileNumber(defaultValue);
    } else {
      setMobileNumber(getInitialMobileNumberValue());
    }
  }, [defaultValue]);

  useEffect(() => {
    if (countryCodeStatus === "idle") {
      dispatch(createCountryCodeAction.fetchDocumentList());
    }
  }, [countryCodeStatus, dispatch]);

  return (
    <section className="grid grid-cols-[160px_1fr] items-center justify-center gap-3 w-full py-3">
      {label && <div className="pb-2">{label}</div>}
      <section className="flex gap-3">
        <Input
          customStyle="min-w-fit"
          type="dropdown"
          name="countryCode"
          isRequired={false}
          nullOption={false}
          options={countryCodes.map(({ name, code }) => ({
            label: `${code} (${name})`,
            value: code
          }))}
          customValue={{
            value: countryCode || "",
            setValue: (newCountryCode) => {
              setMobileNumber(`${newCountryCode}-${mobile}`);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="number"
          name="mobile"
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: mobile || "",
            setValue: (newMobile) => {
              setMobileNumber(`${countryCode}-${newMobile}`);
            }
          }}
        />
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={countryCode && mobile ? mobileNumber : ""}
        onChange={() => {}}
      />
    </section>
  );
}
