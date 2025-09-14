import type { Component } from "solid-js";
import { getLoginLink } from "~/integrations/auth/get-login-link";
import { useI18n } from "~/integrations/i18n";
import { css } from "~/styled-system/css";
import { Card } from "~/ui/card";
import { LinkButton } from "~/ui/link-button";

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
              {t("auth.signInWithStrava")}
            </LinkButton>
          </div>
        )}
      />
    </Card.Root>
  );
};
