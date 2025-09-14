import type { RequestEvent } from "solid-js/web";
import * as v from "valibot";
import {
  type CookieSerializeOptions,
  deleteCookie,
  getCookie,
  type HTTPEvent,
  setCookie,
} from "vinxi/http";
import { refreshTokens } from "./services";
import type { Athlete, AuthTokenResponse } from "./types";

const REFRESH_TOKEN_COOKIE_NAME = "st-refresh-token";
const AUTH_SESSION_COOKIE_NAME = "st-auth-session";
const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60 * 90;

const COMMON_COOKIE_OPTIONS: CookieSerializeOptions = {
  httpOnly: true,
  sameSite: "lax",
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

export const UNAUTHORIZED_STATE: AuthState = { authorized: false };

export const getAuthStateFromTokens = (
  tokens: AuthTokenResponse,
): AuthState => {
  return {
    accessToken: tokens.access_token,
    athlete: tokens.athlete,
    authorized: true,
  };
};

type StoredTokens = {
  athlete: Athlete;
  refereshToken: string;
};

export const setAuthCookies = (
  event: RequestEvent,
  tokens: AuthTokenResponse,
) => {
  const storedTokens: StoredTokens = {
    athlete: tokens.athlete,
    refereshToken: tokens.refresh_token,
  };

  setCookie(
    event.nativeEvent,
    REFRESH_TOKEN_COOKIE_NAME,
    JSON.stringify(storedTokens),
    {
      ...COMMON_COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    },
  );

  setCookie(event.nativeEvent, AUTH_SESSION_COOKIE_NAME, tokens.access_token, {
    ...COMMON_COOKIE_OPTIONS,
    expires: new Date(tokens.expires_at),
    maxAge: tokens.expires_in,
  });
};

const getAuthCookies = (event: RequestEvent) => {
  const nativeEvent = event.nativeEvent;
  const serializedTokens = getCookie(nativeEvent, REFRESH_TOKEN_COOKIE_NAME);
  const accessToken = getCookie(nativeEvent, AUTH_SESSION_COOKIE_NAME);

  const parsed = v.safeParse(
    v.pipe(
      v.string(),
      v.parseJson(),
      v.object({ athlete: v.unknown(), refereshToken: v.string() }),
    ),
    serializedTokens,
  );

  if (!parsed.success) {
    return { accessToken, tokens: null };
  }

  return { accessToken, data: parsed.output as StoredTokens };
};

export const getRequestAuth = async (
  event: RequestEvent,
): Promise<AuthState> => {
  const localsAuth = event.locals.auth;

  if (localsAuth) {
    return localsAuth;
  }

  const { accessToken, data } = getAuthCookies(event);

  if (accessToken && data) {
    return { accessToken, athlete: data.athlete, authorized: true };
  }

  if (!data?.refereshToken) {
    return UNAUTHORIZED_STATE;
  }

  const refreshToken = data.refereshToken;
  const refreshResponse = await refreshTokens({ refreshToken });

  if (!refreshResponse.success) {
    return UNAUTHORIZED_STATE;
  }

  const refreshResponseWithAthete = {
    ...refreshResponse.data,
    athlete: data.athlete,
  };

  const updatedAuthState = getAuthStateFromTokens(refreshResponseWithAthete);

  setAuthCookies(event, refreshResponseWithAthete);

  return updatedAuthState;
};

export const removeSessionCookies = (event: HTTPEvent) => {
  deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
  deleteCookie(event, AUTH_SESSION_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
};
