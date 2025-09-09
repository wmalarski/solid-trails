import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { fetchStrava } from "~/utils/strava";
import type { AuthTokenResponse } from "./types";

type ExchangeCodeArgs = {
  code: string;
};

const getStravaClientSecret = () => {
  const event = getRequestEventOrThrow();

  return (event.nativeEvent?.context?.cloudflare?.env?.STRAVA_CLIENT_SECRET ||
    ("process" in globalThis
      ? process?.env?.STRAVA_CLIENT_SECRET
      : undefined)) as string;
};

export const exchangeCode = ({ code }: ExchangeCodeArgs) => {
  const formData = new FormData();
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
  formData.set("client_secret", getStravaClientSecret());
  formData.set("grant_type", "authorization_code");
  formData.set("code", code);

  return fetchStrava<AuthTokenResponse>({
    init: { body: formData, method: "POST" },
    path: "oauth/token",
  });
};

type RefreshTokensArgs = {
  refreshToken: string;
};

export const refreshTokens = async ({ refreshToken }: RefreshTokensArgs) => {
  const formData = new FormData();
  formData.set("client_id", import.meta.env.VITE_STRAVA_CLIENT_ID);
  formData.set("client_secret", getStravaClientSecret());
  formData.set("grant_type", "refresh_token");
  formData.set("refresh_token", refreshToken);

  return fetchStrava<Omit<AuthTokenResponse, "athlete">>({
    init: { body: formData, method: "POST" },
    path: "oauth/token",
  });
};
