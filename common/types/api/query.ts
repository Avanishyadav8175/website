import {
  type ArrayToSingle,
  type CombineKeys,
  type DocumentKeyOption,
  type DocumentKeyOptions,
  type ExcludeUndefined,
  type ExtractDocument,
  type IsOptional
} from "@/common/types/utils";
import { type Document, type ObjectId } from "mongoose";
import { SwapOrderType } from "../apiTypes";

type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;
type YYYYMMDD = `${Year}-${Month}-${Day}`;

type IsReference<T> = [ObjectId] extends [ToSingle<T>] ? true : false;

type ToSingle<T> = T extends (infer U)[] ? U : T;

type HandleDocument<K, T> = GeneratePopulate<K, T>;

type HandleReference<K, O extends boolean, T> = Populate<K, O, T>;

type Proceed<T> = [T] extends [undefined | string | ObjectId | Document]
  ? [T] extends [undefined | string]
    ? false
    : true
  : false;

type ProcessDocument<K, O extends boolean, T> =
  IsReference<T> extends true
    ? HandleReference<K, O, ExtractDocument<T>>
    : HandleDocument<K, ExtractDocument<T>>;

type Populate<K, O extends boolean, T> = {
  path: K;
  select?: DocumentKeyOptions<T>;
  exclude?: DocumentKeyOptions<T>;
  populate?: GeneratePopulate<null, T>[];
} & (O extends true ? { strict: false } : { strict?: true });

export type GeneratePopulate<Prefix, T> = {
  [K in keyof Omit<T, keyof Document>]: Proceed<
    ArrayToSingle<T[K]>
  > extends true
    ? IsOptional<T[K]> extends true
      ? ProcessDocument<
          CombineKeys<Prefix, K>,
          true,
          ExcludeUndefined<ArrayToSingle<T[K]>>
        >
      : ProcessDocument<
          CombineKeys<Prefix, K>,
          false,
          ExcludeUndefined<ArrayToSingle<T[K]>>
        >
    : never;
}[keyof Omit<T, keyof Document>];

export type Query<T extends Document> = {
  ids?: string[];
  select?: DocumentKeyOptions<T>;
  exclude?: DocumentKeyOptions<T>;
  populate?: GeneratePopulate<null, T>[];
  active?: boolean;
  deleted?: boolean;
  offset?: number;
  limit?: number;
  sortBy?: DocumentKeyOption<T>;
  orderBy?: "asc" | "desc";
  filterBy?: DocumentKeyOption<T>;
  keyword?: string;
  fromDate?: YYYYMMDD;
  toDate?: YYYYMMDD;
  swapOrder?: SwapOrderType;
};
