import { type HTTPEvent, setCookie } from "vinxi/http";
import { fetchStrava } from "~/utils/strava";

type GetTokensArgs = {
  code: string;
};

type GetTokensResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: unknown;
};

export const getTokens = async ({ code }: GetTokensArgs) => {
  "use server";

  const formData = new FormData();
  formData.set("client_secret", import.meta.env.STRAVA_CLIENT_SECRET);
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
  formData.set("grant_type", "authorization_code");
  formData.set("code", code);

  const tokens = await fetchStrava<GetTokensResponse>({
    init: { body: formData, method: "POST" },
    path: "oauth/token",
  });

  return tokens;
};

const REFRESH_TOKEN_COOKIE_NAME = "strava-auth-refresh-token";
const ACCESS_TOKEN_COOKIE_NAME = "strava-auth-access-token";
const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60 * 90;

type SetSessionCookiesArgs = {
  tokens: GetTokensResponse;
  event: HTTPEvent;
};

export const setSessionCookies = ({ event, tokens }: SetSessionCookiesArgs) => {
  setCookie(event, REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    sameSite: "strict",
  });
  setCookie(event, ACCESS_TOKEN_COOKIE_NAME, tokens.access_token, {
    expires: new Date(tokens.expires_at),
    httpOnly: true,
    maxAge: tokens.expires_in,
    sameSite: "strict",
  });
};
