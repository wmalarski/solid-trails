import { buildSearchParams } from "./build-search-params";

export const STRAVA_BASE_URL = "https://www.strava.com";

type GetStravaApiPathArgs = {
  path: string;
  query?: Record<string, unknown>;
};

export const getStravaApiPath = (args: GetStravaApiPathArgs) => {
  const params = buildSearchParams(args.query);
  return `${STRAVA_BASE_URL}/${args.path}?${params}`;
};
