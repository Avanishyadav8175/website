import {
  DEFAULT_INPUT_ERROR_STYLE,
  DEFAULT_INPUT_VALID_STYLE
} from "../_static/constants";
import { InputAuthenticityType } from "../_static/types";
import { CustomInputType } from "../Input/static/types";
import { CustomTextareaType } from "../Textarea/static/types";

export const authenticityStyles = (
  config: CustomInputType | CustomTextareaType,
  mode: InputAuthenticityType
) =>
  mode === "error"
    ? config.errorCheck
      ? config.errorStyle
      : DEFAULT_INPUT_ERROR_STYLE
    : mode === "valid"
      ? config.validCheck
        ? config.validStyle
        : DEFAULT_INPUT_VALID_STYLE
      : "";
