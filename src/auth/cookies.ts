import {
  type CookieSerializeOptions,
  deleteCookie,
  getCookie,
  type HTTPEvent,
  setCookie,
} from "vinxi/http";
import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
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

type SetAuthCookiesArgs = {
  authState: AuthState;
  tokens: AuthTokenResponse;
};

export const setAuthCookies = (args: SetAuthCookiesArgs) => {
  const event = getRequestEventOrThrow();

  setCookie(
    event.nativeEvent,
    REFRESH_TOKEN_COOKIE_NAME,
    args.tokens.refresh_token,
    {
      ...COMMON_COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    },
  );

  setCookie(
    event.nativeEvent,
    AUTH_SESSION_COOKIE_NAME,
    JSON.stringify(args.authState),
    {
      ...COMMON_COOKIE_OPTIONS,
      expires: new Date(args.tokens.expires_at),
      maxAge: args.tokens.expires_in,
    },
  );
};

const getAuthCookies = () => {
  const event = getRequestEventOrThrow();

  const refreshToken = getCookie(event.nativeEvent, REFRESH_TOKEN_COOKIE_NAME);
  const serializedAuth = getCookie(event.nativeEvent, AUTH_SESSION_COOKIE_NAME);

  try {
    const authState = serializedAuth
      ? (JSON.parse(serializedAuth) as AuthState)
      : null;
    return { authState, refreshToken };
  } catch {
    return { authState: null, refreshToken };
  }
};

export const getRequestAuth = async (): Promise<AuthState> => {
  const event = getRequestEventOrThrow();
  const localsAuth = event.locals.auth;

  if (localsAuth) {
    return localsAuth;
  }

  const { authState, refreshToken } = getAuthCookies();

  if (authState) {
    return authState;
  }

  if (!refreshToken) {
    return UNAUTHORIZED_STATE;
  }

  const tokensResponse = await refreshTokens({ refreshToken });

  if (!tokensResponse.success) {
    return UNAUTHORIZED_STATE;
  }

  console.log("[getRequestAuth]", { tokensResponse });

  const updatedAuthState = getAuthStateFromTokens(tokensResponse.data);

  console.log("[getRequestAuth]", { updatedAuthState });

  setAuthCookies({ authState: updatedAuthState, tokens: tokensResponse.data });

  return updatedAuthState;
};

export const removeSessionCookies = (event: HTTPEvent) => {
  deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
  deleteCookie(event, AUTH_SESSION_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
};
