// type
import { type ResponseType } from "@/common/types/apiTypes";
import { type ToastType } from "@/common/types/toast";

export const successData = <T>(
  data: T,
  count?: number,
  messages?: ToastType[]
): ResponseType<T> => ({
  status: 200,
  data: {
    ...(typeof count === "number" ? { count } : {}),
    data,
    messages: messages && messages?.length ? messages : []
  }
});

export const partialSuccessData = <T>(
  data: T,
  count?: number,
  messages?: ToastType[]
): ResponseType<T> => ({
  status: 207,
  data: {
    ...(typeof count === "number" ? { count } : {}),
    data,
    messages: messages && messages?.length ? messages : []
  }
});
