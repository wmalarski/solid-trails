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

type FetchStravaArgs = {
  path: string;
  query?: Record<string, unknown>;
  init?: RequestInit;
};

export const fetchStrava = async <T = unknown>({
  path,
  query,
  init,
}: FetchStravaArgs): Promise<T> => {
  const url = getStravaApiPath({ path, query });
  const response = await fetch(url, init);

  if (!response.ok) {
    console.log("[fetchStrava]", { response });

    throw new Error(response.statusText);
  }

  return response.json();
};
