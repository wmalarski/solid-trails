import { type Component, Show } from "solid-js";
import { useAthleteContext } from "~/auth/athlete-context";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import { Link } from "~/ui/link";
import { useI18n } from "~/utils/i18n";
import { paths } from "~/utils/paths";
import { Logo } from "./logo";
import { ProfilePopover } from "./profile-popover";

export const TopNavbar: Component = () => {
  const { t } = useI18n();

  const athlete = useAthleteContext();

  return (
    <HStack justifyContent="space-between" px={4} py={2} w="full">
      <Heading as="h1">
        <Link href={paths.home}>
          <Logo class={css({ h: 8, w: 8 })} />
          {t("info.title")}
        </Link>
      </Heading>
      <Show when={athlete()}>
        <ProfilePopover />
      </Show>
    </HStack>
  );
};
