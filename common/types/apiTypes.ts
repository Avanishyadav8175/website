import { NextResponse } from "next/server";

import { ToastType } from "@/common/types/toast";
import { ClientSession } from "mongoose";

export type MongooseErrorType =
  | CastErrorType
  | GeneralErrorType
  | ValidationErrorType;

export interface CastErrorType {
  stringValue?: string;
  messageFormat?: string;
  kind: "Boolean" | "Number" | "String";
  value?: string;
  path: string;
  valueType?: string;
}

export interface GeneralErrorType {
  errorResponse: GeneralErrorResponseType;
}

export interface GeneralErrorResponseType {
  index: number;
  code: number;
  errmsg: string;
  keyPattern: { [key: string]: number };
  keyValue: Record<string, number | string>;
}

export interface ValidationErrorType {
  errors: { [key: string]: CastErrorType | ValidatorErrorType };
}

export interface ValidatorErrorType {
  kind: string;
  path: string;
}

export interface PopulateType {
  path: string;
  select?: string[];
  populate?: PopulateType[];
  strictPopulate?: boolean;
}

export interface PopulateSearchParamType {
  path: string;
  select?: string[];
  exclude?: string[];
  populate?: PopulateSearchParamType[];
  strict?: boolean;
}

export interface SwapOrderType {
  id1: string;
  id2: string;
}

export interface SearchParamsType {
  ids?: string[];
  select?: string[];
  exclude?: string[];
  populate?: PopulateSearchParamType[];
  active?: boolean;
  deleted?: boolean;
  offset?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  filterBy?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  swapOrder?: SwapOrderType;
}

type IsAsync<T extends (...args: any) => any> =
  ReturnType<T> extends Promise<any> ? true : false;

export type Middleware<T> = (document: T) => T | null | Promise<T | null>;
export type SessionMiddleware<T> = (
  document: T,
  session: ClientSession
) => T | Promise<T>;

export interface ResponseDataType<T> {
  count?: number;
  data: null | Partial<T>;
  messages: ToastType[];
}

export type ResponseType<T> = {
  status: number;
  data: ResponseDataType<T>;
};

export type APIResponseType<T> = NextResponse<ResponseDataType<T>>;
