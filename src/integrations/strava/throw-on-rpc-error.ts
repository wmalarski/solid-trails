import type { FetchStravaResult } from "./api";

export const throwOnRpcError = <T>(result: FetchStravaResult<T>): T => {
  if (!result.success) {
    throw result.error;
  }

  return result.data;
};
