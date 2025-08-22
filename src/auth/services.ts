import { getRequestEvent } from "solid-js/web";
import {
  type CookieSerializeOptions,
  deleteCookie,
  getCookie,
  type HTTPEvent,
  setCookie,
} from "vinxi/http";
import { fetchStrava } from "~/utils/strava";
import type { Athlete } from "./types";

export type Session = {
  accessToken: string;
  athlete: Athlete;
};

type AuthTokenResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Athlete;
};

type ExchangeCodeArgs = {
  code: string;
};

const getStravaClientSecret = () => {
  return process.env.STRAVA_CLIENT_SECRET as string;
};

export const exchangeCode = async ({ code }: ExchangeCodeArgs) => {
  const formData = new FormData();
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
  formData.set("client_secret", getStravaClientSecret());
  formData.set("grant_type", "authorization_code");
  formData.set("code", code);

  console.log(
    "[exchangeCode]",
    formData,
    Object.fromEntries(formData.entries()),
  );

  const tokens = await fetchStrava<AuthTokenResponse>({
    init: { body: formData, method: "POST" },
    path: "api/v3/oauth/token",
  });

  return tokens;
};

type RefreshTokensArgs = {
  refreshToken: string;
};

const refreshTokens = async ({ refreshToken }: RefreshTokensArgs) => {
  const formData = new FormData();
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
  formData.set("client_secret", getStravaClientSecret());
  formData.set("grant_type", "refresh_token");
  formData.set("refresh_token", refreshToken);

  const tokens = await fetchStrava<AuthTokenResponse>({
    init: { body: formData, method: "POST" },
    path: "oauth/token",
  });

  return tokens;
};

const getSessionFromTokens = (tokens: AuthTokenResponse): Session => {
  return {
    accessToken: tokens.access_token,
    athlete: tokens.athlete,
  };
};

const REFRESH_TOKEN_COOKIE_NAME = "strava-refresh-token";
const AUTH_SESSION_COOKIE_NAME = "strava-auth-session";
const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60 * 90;

const COMMON_COOKIE_OPTIONS: CookieSerializeOptions = {
  httpOnly: true,
  sameSite: "strict",
};

export const setSessionCookies = (
  event: HTTPEvent,
  tokens: AuthTokenResponse,
) => {
  setCookie(event, REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
    ...COMMON_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  const session = getSessionFromTokens(tokens);

  setCookie(event, AUTH_SESSION_COOKIE_NAME, JSON.stringify(session), {
    ...COMMON_COOKIE_OPTIONS,
    expires: new Date(tokens.expires_at),
    maxAge: tokens.expires_in,
  });

  // setCookie

  return session;
};

const getSessionCookies = (event: HTTPEvent) => {
  const refreshToken = getCookie(event, REFRESH_TOKEN_COOKIE_NAME);
  const serializedSession = getCookie(event, AUTH_SESSION_COOKIE_NAME);

  console.log("[getSessionCookies]", {
    event,
    headers: event.headers,
    refreshToken,
    res: event.res,
    serializedSession,
    session: getRequestEvent()?.locals.session,
  });

  try {
    const session = serializedSession
      ? (JSON.parse(serializedSession) as Session)
      : null;
    return { refreshToken, session };
  } catch {
    return { refreshToken, session: null };
  }
};

export const getRequestSession = async (event: HTTPEvent) => {
  const localsSession = getRequestEvent()?.locals.session;

  if (localsSession) {
    return localsSession;
  }

  const { session, refreshToken } = getSessionCookies(event);

  console.log("[getRequestSession]", { refreshToken, session });

  if (session) {
    return session;
  }

  if (!refreshToken) {
    return null;
  }

  try {
    const tokens = await refreshTokens({ refreshToken });

    console.log("[getRequestSession]", { tokens });

    const session = setSessionCookies(event, tokens);

    console.log("[getRequestSession]", { session });

    return session;
  } catch {
    return null;
  }
};

export const removeSessionCookies = (event: HTTPEvent) => {
  deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
  deleteCookie(event, AUTH_SESSION_COOKIE_NAME, COMMON_COOKIE_OPTIONS);
};

type DeauthorizeTokensArgs = {
  accessToken: string;
};

export const deauthorizeTokens = ({ accessToken }: DeauthorizeTokensArgs) => {
  const formData = new FormData();

  return fetchStrava<AuthTokenResponse>({
    init: { body: formData, method: "POST" },
    path: "oauth/deauthorize",
    query: { access_token: accessToken },
  });
};
