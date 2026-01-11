const isAsync = (fn: Function): boolean =>
  fn.constructor.name === "AsyncFunction";

export default isAsync;
