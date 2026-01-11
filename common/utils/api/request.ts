export const getRequestBody = async <T>(req: Request): Promise<T> =>
  (await req.json()) as T;
