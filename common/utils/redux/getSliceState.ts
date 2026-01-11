import { Document } from "mongoose";
import { SliceInitialState, SliceState } from "@/common/types/redux/redux";
import { getFilterByOptions, getSortByOptions } from "./getOptions";

const getSliceState = <T extends Document>({
  documentList,
  documents,
  query: {
    options: { filter: filterOptions, sort: sortOptions },
    default: {
      filter: defaultFilterOption,
      sort: defaultSortOption,
      order: defaultOrderOption
    }
  },
  status,
  notifications
}: SliceInitialState<T>): SliceState<T> => {
  const sliceState: SliceState<T> = {
    documentList,
    documents,
    query: {
      options: {
        filter: getFilterByOptions<T>(filterOptions),
        sort: getSortByOptions<T>(sortOptions)
      },
      default: {
        filter: defaultFilterOption,
        sort: defaultSortOption as string,
        order: defaultOrderOption
      }
    },
    status,
    notifications
  };

  return sliceState;
};

export default getSliceState;
