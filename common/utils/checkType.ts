type PrototypeType =
  | "array"
  | "object"
  | "function"
  | "string"
  | "number"
  | "boolean"
  | "undefined"
  | "null";

const prototypeAlpha: Record<PrototypeType, string> = {
  array: "[object Array]",
  boolean: "[object Boolean]",
  function: "[object Function]",
  number: "[object Number]",
  null: "[object Null]",
  object: "[object Object]",
  string: "[object String]",
  undefined: "[object Undefined]"
};

const prototypeCheck = (tester: any, type: PrototypeType): boolean =>
  Object.prototype.toString.call(tester) === prototypeAlpha[type];

/* 
=====[ exports ]=======================================================
*/

export const isArray = (arr: any): boolean =>
  Array.isArray(arr) && prototypeCheck(arr, "array");

export const isBoolean = (el: any): boolean => prototypeCheck(el, "boolean");

export const isFunction = (el: any): boolean => prototypeCheck(el, "function");

export const isNumber = (el: any): boolean => prototypeCheck(el, "number");

export const isNull = (el: any): boolean => prototypeCheck(el, "null");

export const isObject = (el: any): boolean => prototypeCheck(el, "object");

export const isString = (el: any): boolean => prototypeCheck(el, "string");

export const isUndefined = (el: any): boolean =>
  prototypeCheck(el, "undefined");
