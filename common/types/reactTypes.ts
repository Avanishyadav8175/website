import { SetStateAction } from "react";

export type Children = Readonly<React.ReactNode>;

export type SetStateType<T> = React.Dispatch<SetStateAction<T>>;

export type ClassNameType = string | undefined;
