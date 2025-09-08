import { useSubmission } from "@solidjs/router";
import { LogOut } from "lucide-solid";
import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { Button } from "~/ui/button";
import { useI18n } from "~/utils/i18n";
import { signOutServerAction } from "./actions";

export const SignOutButton: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signOutServerAction);

  return (
    <form
      action={signOutServerAction}
      class={css({ display: "flex", flexDirection: "column", w: "full" })}
      method="post"
    >
      <Button
        disabled={submission.pending}
        isLoading={submission.pending}
        variant="subtle"
      >
        <LogOut class={css({ h: 4, w: 4 })} />
        {t("auth.signOut")}
      </Button>
    </form>
  );
};
