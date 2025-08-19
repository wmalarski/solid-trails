import { A } from "@solidjs/router";
import { Bookmark } from "lucide-solid";
import { type Component, Show } from "solid-js";
import { useUserContext } from "~/auth/user-context";
import { Button } from "~/ui/button";
import { Link } from "~/ui/link";
import { useI18n } from "~/utils/i18n";
import { paths } from "~/utils/paths";
import { SignOutButton } from "../auth/sign-out-button";

export const TopNavbar: Component = () => {
  const { t } = useI18n();

  const user = useUserContext();

  return (
    <div>
      <div>
        <h1>
          <Link href={paths.home}>
            <Bookmark />
            {t("info.title")}
          </Link>
        </h1>
      </div>
      <div>
        <Show
          fallback={
            <Button
              asChild={(buttonProps) => (
                <A {...buttonProps()} href={paths.signIn}>
                  {t("auth.signIn")}
                </A>
              )}
            />
          }
          when={user()}
        >
          <SignOutButton />
        </Show>
      </div>
    </div>
  );
};
