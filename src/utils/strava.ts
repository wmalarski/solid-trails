export const STRAVA_BASE_URL = "https://www.strava.com/api/v3";

const buildSearchParams = (
  query?: Record<string, unknown>,
): URLSearchParams => {
  const entries = Object.entries(query || {});
  const pairs = entries.flatMap(([key, value]) =>
    value !== undefined && value !== null ? [[key, `${value}`]] : [],
  );
  return new URLSearchParams(pairs);
};

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

type FetchStravaSuccessResult<T = unknown> = {
  success: true;
  data: T;
};

type FetchStravaFailureResult = {
  success: false;
  error: StravaApiError;
};

export type FetchStravaResult<T = unknown> =
  | FetchStravaSuccessResult<T>
  | FetchStravaFailureResult;

export const fetchStrava = async <T = unknown>({
  path,
  query,
  init,
}: FetchStravaArgs): Promise<FetchStravaResult<T>> => {
  const url = getStravaApiPath({ path, query });

  const response = await fetch(url, init);

  const json = await response.json();

  if (!response.ok) {
    const error = new StravaApiError(json.message, json.errors);
    return { error, success: false };
  }

  return { data: json, success: true };
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
}: FetchAuthorizedStravaArgs): Promise<FetchStravaResult<T>> => {
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

export type StravaApiErrorDetails = {
  resource: string;
  field: string;
  code: string;
};

export class StravaApiError extends Error {
  errors: StravaApiErrorDetails[];

  constructor(
    message: string,
    errors: StravaApiErrorDetails[],
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.errors = errors;
  }
}
