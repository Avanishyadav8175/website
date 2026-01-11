// libraries
import { createAsyncThunk as createAsyncThunkReactRedux } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchReactRedux,
  useSelector as useSelectorReactRedux
} from "react-redux";

// types
// import { type DispatchType, type StateType } from "@/store/store";
import { type DispatchType, type StateType } from "@/store/types";
import { type ToastType } from "@/common/types/toast";

// hooks
export const createAsyncThunk = createAsyncThunkReactRedux.withTypes<{
  state: StateType;
  dispatch: DispatchType;
  rejectValue: ToastType[];
}>();
export const useDispatch = useDispatchReactRedux.withTypes<DispatchType>();
export const useSelector = useSelectorReactRedux.withTypes<StateType>();
