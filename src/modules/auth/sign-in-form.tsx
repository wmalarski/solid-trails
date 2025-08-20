import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { Card } from "~/ui/card";
import { LinkButton } from "~/ui/link-button";
import { useI18n } from "~/utils/i18n";
import { getStravaApiPath } from "~/utils/strava";

export const SignInForm: Component = () => {
  const { t } = useI18n();

  const path = getStravaApiPath({
    path: "oauth/authorize",
    query: {
      approval_prompt: "force",
      client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_STRAVA_REDIRECT_URL,
      response_type: "code",
      scope: "read",
    },
  });

  return (
    <Card.Root maxW="lg" w="full">
      <Card.Header>
        <Card.Title>{t("auth.signIn")}</Card.Title>
      </Card.Header>
      <Card.Body
        asChild={(bodyProps) => (
          <div {...bodyProps({ class: css({ gap: 4 }) })}>
            <LinkButton color="primary" href={path}>
              {t("auth.signIn")}
            </LinkButton>
          </div>
        )}
      />
    </Card.Root>
  );
};
