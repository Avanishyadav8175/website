// utils
import { createSelector } from "@reduxjs/toolkit";

// types
import { type Document as MongooseDocument } from "mongoose";
import {
  type DocumentKeyOption,
  type DocumentKeyOptions
} from "@/common/types/utils";
import {
  type FilterKeywordOptions,
  type FilterOptionWithKeywordOptions
} from "@/common/types/redux/filterOption";
import { type SelectOption } from "@/common/types/inputs";
import { type SliceState } from "@/common/types/redux/redux";
import { type StateType } from "@/store/types";

const getSelectors = <Document extends MongooseDocument>({
  sliceName,
  searchKeys,
  optionLabelKey
}: {
  sliceName: string;
  searchKeys: DocumentKeyOptions<Document>;
  optionLabelKey: DocumentKeyOption<Document>;
}) => {
  const documentList = (state: StateType) =>
    (state[sliceName as keyof StateType] as unknown as SliceState<Document>)
      .documentList;

  const controlledDocumentList = createSelector(
    [
      documentList,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.active,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.deleted,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.offset,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.limit,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.searchKeyword,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.defaultFilterBy,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.defaultFilterKeyword,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.filterBy,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.filterKeyword,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.filterFunction,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.sortBy,
      (
        state: StateType,
        options?: {
          active?: boolean;
          deleted?: boolean;
          offset?: number;
          limit?: number;
          searchKeyword?: string;
          defaultFilterBy?: string;
          defaultFilterKeyword?: string;
          filterBy?: string;
          filterKeyword?: string;
          filterFunction?: (document: Document) => boolean;
          sortBy?: string;
          orderBy?: "asc" | "desc";
        }
      ) => options?.orderBy
    ],
    (
      list,
      active,
      deleted,
      offset,
      limit,
      searchKeyword,
      defaultFilterBy,
      defaultFilterKeyword,
      filterBy,
      filterKeyword,
      filterFunction,
      sortBy,
      orderBy
    ) => {
      if (active !== undefined) {
        list = list.filter((item) =>
          "isActive" in item ? item.isActive === active : true
        );
      }

      if (deleted !== undefined) {
        list = list.filter((item) =>
          "isDeleted" in item ? item.isDeleted === deleted : true
        );
      }

      if (searchKeyword) {
        list = list.filter((item) => {
          const values = Object.keys(item)
            .filter((key) => (searchKeys as string[]).includes(key))
            .map((key) => item[key as keyof Document]);

          return values.some((value) =>
            Array.isArray(value)
              ? value
                  .map((item) => item.toString().toLowerCase())
                  .includes(searchKeyword.toLocaleLowerCase())
              : value
                  ?.toString()
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase())
          );
        });
      }

      if (defaultFilterBy && defaultFilterKeyword) {
        list = list.filter((item) => {
          // const value = item[defaultFilterBy as DocumentKeyOption<Document>];
          let value: any;

          if (defaultFilterBy.includes(".")) {
            value = defaultFilterBy
              .split(".")
              .reduce(
                (acc: any, key) => acc && acc[key as keyof typeof acc],
                item
              );
          } else {
            value = item[defaultFilterBy as DocumentKeyOption<Document>];
          }

          if (
            defaultFilterKeyword === "true" ||
            defaultFilterKeyword === "false"
          ) {
            if (defaultFilterKeyword === "true") {
              return Array.isArray(value)
                ? Boolean(value.length) === true
                : Boolean(value) === true;
            } else {
              return Array.isArray(value)
                ? Boolean(value.length) === false
                : Boolean(value) === false;
            }
          } else {
            return (
              // value &&
              // value
              //   .toString()
              //   .toLowerCase()
              //   .includes(defaultFilterKeyword.toLowerCase())
              value &&
              value.toString().toLowerCase() ===
                defaultFilterKeyword.toLowerCase()
            );
          }
        });
      }

      if (filterBy && filterKeyword) {
        list = list.filter((item) => {
          // const value = item[filterBy as DocumentKeyOption<Document>];
          let value: any;

          if (filterBy.includes(".")) {
            value = filterBy
              .split(".")
              .reduce(
                (acc: any, key) => acc && acc[key as keyof typeof acc],
                item
              );
          } else {
            value = item[filterBy as DocumentKeyOption<Document>];
          }

          if (filterKeyword === "true" || filterKeyword === "false") {
            if (filterKeyword === "true") {
              return Array.isArray(value)
                ? Boolean(value.length) === true
                : Boolean(value) === true;
            } else {
              return Array.isArray(value)
                ? Boolean(value.length) === false
                : Boolean(value) === false;
            }
          } else {
            if (Array.isArray(value)) {
              return value.includes(filterKeyword);
            } else {
              return (
                // value &&
                // value
                //   .toString()
                //   .toLowerCase()
                //   .includes(filterKeyword.toLowerCase())
                value &&
                value.toString().toLowerCase() === filterKeyword.toLowerCase()
              );
            }
          }
        });
      }

      if (filterFunction) {
        list = list.filter(filterFunction);
      }

      if (sortBy) {
        list = [...list].sort((a, b) => {
          const aValue = a[sortBy as DocumentKeyOption<Document>];
          const bValue = b[sortBy as DocumentKeyOption<Document>];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return orderBy === "asc" ? aValue - bValue : bValue - aValue;
          }

          if (typeof aValue === "string" && typeof bValue === "string") {
            return orderBy === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }

          if (aValue instanceof Date && bValue instanceof Date) {
            return orderBy === "asc"
              ? aValue.getTime() - bValue.getTime()
              : bValue.getTime() - aValue.getTime();
          }

          return 0;
        });
      }

      const count = list.length;

      if ((offset === 0 || offset) && offset >= 0) {
        list = list.slice(offset, limit ? offset + limit : list.length);
      }

      const options: SelectOption[] = list.map((item) => ({
        label: item[optionLabelKey as keyof Document] as string,
        value: item._id as string
      }));

      return {
        count,
        documents: list,
        options
      };
    }
  );

  const documents = (state: StateType) =>
    (state[sliceName as keyof StateType] as unknown as SliceState<Document>)
      .documents;

  const document = (state: StateType, documentId: string) =>
    (
      state[sliceName as keyof StateType] as unknown as SliceState<Document>
    ).documents.find((document) => document._id === documentId);

  const query = (
    state: StateType,
    filterKeywordOptions: FilterKeywordOptions<Document>
  ) => {
    const query = (
      state[sliceName as keyof StateType] as unknown as SliceState<Document>
    ).query;

    return {
      options: {
        filter: [...query.options.filter].map(({ label, value }) => ({
          label,
          value,
          options:
            filterKeywordOptions[
              value as keyof FilterKeywordOptions<Document>
            ] || []
        })) as FilterOptionWithKeywordOptions[],
        sort: [...query.options.sort]
      },
      default: {
        filter: query.default.filter,
        sort: query.default.sort,
        order: query.default.order
      }
    };
  };

  const status = (state: StateType) =>
    (state[sliceName as keyof StateType] as unknown as SliceState<Document>)
      .status;

  const notifications = (state: StateType) =>
    (state[sliceName as keyof StateType] as unknown as SliceState<Document>)
      .notifications;

  return {
    documentList: controlledDocumentList,
    documents,
    document,
    query,
    status,
    notifications
  };
};

export default getSelectors;
