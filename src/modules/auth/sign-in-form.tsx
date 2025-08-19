import { useSubmission } from "@solidjs/router";
import { type Component, createUniqueId } from "solid-js";
import { css } from "~/styled-system/css";
import { Button } from "~/ui/button";
import { Card } from "~/ui/card";
import { useI18n } from "~/utils/i18n";
import { signInServerAction } from "./actions";

export const SignInForm: Component = () => {
  const { t } = useI18n();

  const formId = createUniqueId();

  const submission = useSubmission(signInServerAction);

  return (
    <Card.Root maxW="lg" w="full">
      <Card.Header>
        <Card.Title>{t("auth.signIn")}</Card.Title>
      </Card.Header>
      <Card.Body
        asChild={(bodyProps) => (
          <form
            {...bodyProps({ class: css({ gap: 4 }) })}
            action={signInServerAction}
            id={formId}
            method="post"
          >
            <Button
              color="primary"
              disabled={submission.pending}
              form={formId}
              isLoading={submission.pending}
              type="submit"
            >
              {t("auth.signIn")}
            </Button>
          </form>
        )}
      />
    </Card.Root>
  );
};
