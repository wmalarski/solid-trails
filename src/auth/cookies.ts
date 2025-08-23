import { getRequestEvent } from "solid-js/web";
import {
  type CookieSerializeOptions,
  deleteCookie,
  getCookie,
  type HTTPEvent,
  setCookie,
} from "vinxi/http";
import { type AuthTokenResponse, refreshTokens } from "./services";
import type { Athlete } from "./types";

const REFRESH_TOKEN_COOKIE_NAME = "strava-refresh-token";
const AUTH_SESSION_COOKIE_NAME = "strava-auth-session";
const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60 * 90;

const COMMON_COOKIE_OPTIONS: CookieSerializeOptions = {
  httpOnly: true,
  sameSite: "strict",
};

export type AuthState =
  | {
      authorized: false;
    }
  | {
      authorized: true;
      accessToken: string;
      athlete: Athlete;
    };

export const getAuthStateFromTokens = (
  tokens: AuthTokenResponse,
): AuthState => {
  return {
    accessToken: tokens.access_token,
    athlete: tokens.athlete,
    authorized: true,
  };
};

type SetAuthCookiesArgs = {
  authState: AuthState;
  tokens: AuthTokenResponse;
};

export const setAuthCookies = (event: HTTPEvent, args: SetAuthCookiesArgs) => {
  setCookie(event, REFRESH_TOKEN_COOKIE_NAME, args.tokens.refresh_token, {
    ...COMMON_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  setCookie(event, AUTH_SESSION_COOKIE_NAME, JSON.stringify(args.authState), {
    ...COMMON_COOKIE_OPTIONS,
    expires: new Date(args.tokens.expires_at),
    maxAge: args.tokens.expires_in,
  });
};

const getAuthCookies = (event: HTTPEvent) => {
  const refreshToken = getCookie(event, REFRESH_TOKEN_COOKIE_NAME);
  const serializedAuth = getCookie(event, AUTH_SESSION_COOKIE_NAME);

  try {
    const authState = serializedAuth
      ? (JSON.parse(serializedAuth) as AuthState)
      : null;
    return { authState, refreshToken };
  } catch {
    return { authState: null, refreshToken };
  }
};

export const getRequestAuth = async (event: HTTPEvent) => {
  const localsAuth = getRequestEvent()?.locals.auth;

  if (localsAuth) {
    return localsAuth;
  }

  const { authState, refreshToken } = getAuthCookies(event);

  if (authState) {
    return authState;
  }

  if (!refreshToken) {
    return null;
  }

  const tokensResponse = await refreshTokens({ refreshToken });

  if (!tokensResponse.success) {
    return null;
  }

  const updatedAuthState = getAuthStateFromTokens(tokensResponse.data);

  setAuthCookies(event, {
    authState: updatedAuthState,
    tokens: tokensResponse.data,
  });

  return updatedAuthState;
};

export const removeSessionCookies = (event: HTTPEvent) => {
  deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
  deleteCookie(event, AUTH_SESSION_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
};
