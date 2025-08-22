import { buildSearchParams } from "./build-search-params";

export const STRAVA_BASE_URL = "https://www.strava.com/api/v3";

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
    // {"message":"Authorization Error","errors":[{"resource":"AccessToken","field":"activity:read_permission","code":"missing"}]}
    console.log("[fetchStrava]", { init, response, url });
    throw new Error(response.statusText);
  }

  return response.json();
};

type GetStravaAuthHeadersArgs = {
  accessToken: string;
  headersInit?: HeadersInit;
};

const getStravaAuthHeaders = ({
  accessToken,
  headersInit,
}: GetStravaAuthHeadersArgs) => {
  const headers = new Headers(headersInit);
  headers.set("Authorization", `Bearer ${accessToken}`);
  return headers;
};

type FetchAuthorizedStravaArgs = FetchStravaArgs & {
  accessToken: string;
};

export const fetchAuthorizedStrava = async <T = unknown>({
  init,
  accessToken,
  ...args
}: FetchAuthorizedStravaArgs): Promise<T> => {
  return fetchStrava<T>({
    ...args,
    init: {
      ...init,
      headers: getStravaAuthHeaders({
        accessToken,
        headersInit: init?.headers,
      }),
    },
  });
};
