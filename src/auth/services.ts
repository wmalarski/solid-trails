import { getCookie, type HTTPEvent, setCookie } from "vinxi/http";
import { fetchStrava } from "~/utils/strava";

export type Athlete = unknown;

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

export const exchangeCode = async ({ code }: ExchangeCodeArgs) => {
  "use server";

  const formData = new FormData();
  formData.set("client_secret", import.meta.env.STRAVA_CLIENT_SECRET);
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
  formData.set("grant_type", "authorization_code");
  formData.set("code", code);

  const tokens = await fetchStrava<AuthTokenResponse>({
    init: { body: formData, method: "POST" },
    path: "oauth/token",
  });

  return tokens;
};

type RefreshTokensArgs = {
  refreshToken: string;
};

const refreshTokens = async ({ refreshToken }: RefreshTokensArgs) => {
  "use server";

  const formData = new FormData();
  formData.set("client_secret", import.meta.env.STRAVA_CLIENT_SECRET);
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
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

export const setSessionCookies = (
  event: HTTPEvent,
  tokens: AuthTokenResponse,
) => {
  "use server";

  setCookie(event, REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    sameSite: "strict",
  });

  const session = getSessionFromTokens(tokens);

  setCookie(event, AUTH_SESSION_COOKIE_NAME, JSON.stringify(session), {
    expires: new Date(tokens.expires_at),
    httpOnly: true,
    maxAge: tokens.expires_in,
    sameSite: "strict",
  });
};

const getSessionCookies = (event: HTTPEvent) => {
  "use server";

  const refreshToken = getCookie(event, REFRESH_TOKEN_COOKIE_NAME);
  const serializedSession = getCookie(event, AUTH_SESSION_COOKIE_NAME);

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
  const { session, refreshToken } = getSessionCookies(event);

  if (session) {
    return session;
  }

  if (!refreshToken) {
    return null;
  }

  try {
    const tokens = await refreshTokens({ refreshToken });

    setSessionCookies(event, tokens);

    return getSessionFromTokens(tokens);
  } catch {
    return null;
  }
};
