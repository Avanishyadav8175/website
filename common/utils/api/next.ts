// libraries
import { NextResponse } from "next/server";

// types
import {
  type APIResponseType,
  type ResponseType
} from "@/common/types/apiTypes";

export const Response = <T>(response: ResponseType<T>): APIResponseType<T> =>
  NextResponse.json(response.data, { status: response.status });
