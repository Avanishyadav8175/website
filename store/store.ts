// libraries
import { configureStore } from "@reduxjs/toolkit";

// reducer
import reducer from "@/store/reducer";

// types
import type { Action, ThunkAction } from "@reduxjs/toolkit";

// store
export const store = configureStore({ reducer });

// store types
export type StoreType = typeof store;
export type StateType = ReturnType<StoreType["getState"]>;
export type DispatchType = StoreType["dispatch"];
export type ThunkType<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  StateType,
  unknown,
  Action
>;
