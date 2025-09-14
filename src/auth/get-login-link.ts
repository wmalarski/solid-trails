import { getStravaApiPath } from "~/integrations/strava/api";
import { STRAVA_SCOPE } from "./constants";

export const getLoginLink = () => {
  return getStravaApiPath({
    path: "oauth/authorize",
    query: {
      approval_prompt: "force",
      client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_STRAVA_REDIRECT_URL,
      response_type: "code",
      scope: STRAVA_SCOPE,
    },
  });
};
