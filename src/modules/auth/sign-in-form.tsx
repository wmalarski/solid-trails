import type { Component } from "solid-js";
import { getLoginLink } from "~/auth/get-login-link";
import { css } from "~/styled-system/css";
import { Card } from "~/ui/card";
import { LinkButton } from "~/ui/link-button";
import { useI18n } from "~/utils/i18n";

export const SignInForm: Component = () => {
  const { t } = useI18n();

  return (
    <Card.Root maxW="lg" w="full">
      <Card.Header>
        <Card.Title>{t("auth.signIn")}</Card.Title>
      </Card.Header>
      <Card.Body
        asChild={(bodyProps) => (
          <div {...bodyProps({ class: css({ gap: 4 }) })}>
            <LinkButton color="primary" href={getLoginLink()}>
              {t("auth.signIn")}
            </LinkButton>
          </div>
        )}
      />
    </Card.Root>
  );
};
