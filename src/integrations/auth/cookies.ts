import type { RequestEvent } from "solid-js/web";
import {
  type CookieSerializeOptions,
  deleteCookie,
  getCookie,
  type HTTPEvent,
  setCookie,
} from "vinxi/http";
import type { AuthTokenResponseWithoutAthlete } from "~/integrations/strava/types";
import { refreshTokens } from "./services";

const REFRESH_TOKEN_COOKIE_NAME = "strava-refresh-token";
const AUTH_SESSION_COOKIE_NAME = "strava-auth-session";
const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60 * 90;

const COMMON_COOKIE_OPTIONS: CookieSerializeOptions = {
  httpOnly: true,
  sameSite: "lax",
};

export type AuthState =
  | { authorized: false }
  | { authorized: true; accessToken: string };

export const UNAUTHORIZED_STATE: AuthState = { authorized: false };

export const getAuthStateFromTokens = (
  tokens: AuthTokenResponseWithoutAthlete,
): AuthState => {
  return {
    accessToken: tokens.access_token,
    authorized: true,
  };
};

export const setAuthCookies = (
  event: RequestEvent,
  tokens: AuthTokenResponseWithoutAthlete,
) => {
  setCookie(
    event.nativeEvent,
    REFRESH_TOKEN_COOKIE_NAME,
    tokens.refresh_token,
    { ...COMMON_COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE },
  );

  setCookie(event.nativeEvent, AUTH_SESSION_COOKIE_NAME, tokens.access_token, {
    ...COMMON_COOKIE_OPTIONS,
    expires: new Date(tokens.expires_at),
    maxAge: tokens.expires_in,
  });
};

const getAuthCookies = (event: RequestEvent) => {
  const nativeEvent = event.nativeEvent;

  return {
    accessToken: getCookie(nativeEvent, AUTH_SESSION_COOKIE_NAME),
    refreshToken: getCookie(nativeEvent, REFRESH_TOKEN_COOKIE_NAME),
  };
};

export const getRequestAuth = async (
  event: RequestEvent,
): Promise<AuthState> => {
  const localsAuth = event.locals.auth;

  if (localsAuth) {
    return localsAuth;
  }

  const { accessToken, refreshToken } = getAuthCookies(event);

  if (accessToken) {
    return { accessToken, authorized: true };
  }

  if (!refreshToken) {
    return UNAUTHORIZED_STATE;
  }

  const refreshResponse = await refreshTokens({ refreshToken });

  if (!refreshResponse.success) {
    return UNAUTHORIZED_STATE;
  }

  setAuthCookies(event, refreshResponse.data);

  return getAuthStateFromTokens(refreshResponse.data);
};

export const removeSessionCookies = (event: HTTPEvent) => {
  deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
  deleteCookie(event, AUTH_SESSION_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
};
