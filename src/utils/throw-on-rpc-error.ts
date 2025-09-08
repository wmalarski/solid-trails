import type { FetchStravaResult } from "./strava";

export const throwOnRpcError = <T>(result: FetchStravaResult<T>): T => {
  if (!result.success) {
    throw result.error;
  }

  return result.data;
};
