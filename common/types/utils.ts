import { type Document } from "mongoose";
import { ContentDocument } from "./documentation/contents/content";

export type ArrayToSingle<T> = T extends (infer U)[] ? U : T;

export type CombineKeys<T1, T2> = T1 extends string
  ? `${T1 & string}.${T2 & string}`
  : T2;

export type DocumentKey<
  T extends Document,
  K extends DocumentKeyOption<T>
> = DocumentKeyOption<Omit<T, K>>;

export type DocumentKeyOption<T> = keyof Omit<T, keyof Document>;

export type DocumentKeyOptions<T> = DocumentKeyOption<T>[];

export type ExcludeUndefined<T> = Exclude<T, undefined>;

export type ExtractDocument<T> = T extends Document | Document[] ? T : never;

export type IsOptional<T> = undefined extends T ? true : false;

type ExcludeDocumentProps<T> = Omit<T, keyof Document>;

type FlattenKeys<T, Prefix extends string = ""> = {
  [K in keyof ExcludeDocumentProps<T>]: T[K] extends
    | Document
    | Document[]
    | undefined
    ?
        | `${Prefix}${K & string}`
        | FlattenKeys<
            ArrayToSingle<Exclude<T[K], undefined>>,
            `${Prefix}${K & string}.`
          >
    : `${Prefix}${K & string}`;
}[keyof ExcludeDocumentProps<T>];

export type DocumentNestedKeyOption<T> = FlattenKeys<T>;
export type DocumentNestedKeyOptions<T> = DocumentNestedKeyOption<T>[];
