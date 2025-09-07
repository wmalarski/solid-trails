import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import { useI18n } from "~/utils/i18n";
import { ActivityListDrawer } from "../activites/activity-list-drawer";
import { Logo } from "../common/logo";
import { ProfilePopover } from "./profile-popover";
import type { Activity } from "./types";

type TrailsTopContainerProps = {
  activities: Activity[];
};

export const TrailsTopContainer: Component<TrailsTopContainerProps> = (
  props,
) => {
  const { t } = useI18n();

  return (
    <HStack
      backgroundColor="bg.default"
      borderRadius="l2"
      gap={2}
      padding={2}
      position="absolute"
      right={2}
      top={2}
    >
      <Heading alignItems="center" as="h1" display="flex" gap="2">
        <Logo class={css({ h: 8, w: 8 })} />
        {t("info.title")}
      </Heading>
      <ActivityListDrawer activities={props.activities} />
      <ProfilePopover />
    </HStack>
  );
};
