// components
import ColorInput from "./components/ColorInput";
import DateInput from "./components/DateInput";
import DropdownInput from "./components/DropdownInput";
import EmailInput from "./components/EmailInput";
import NumberInput from "./components/NumberInput";
import PasswordInput from "./components/PasswordInput";
import TextInput from "./components/TextInput";

// types
import { type CustomInputType } from "./static/types";

export default function Input(config: CustomInputType) {
  const { type } = config;

  switch (type) {
    case "text":
      return <TextInput {...config} />;

    case "number":
      return <NumberInput {...config} />;

    case "email":
      return <EmailInput {...config} />;

    case "password":
      return <PasswordInput {...config} />;

    case "dropdown":
      return <DropdownInput {...config} />;

    case "color":
      return <ColorInput {...config} />;

    case "date":
      return <DateInput {...config} />;

    default:
      return <></>;
  }
}
